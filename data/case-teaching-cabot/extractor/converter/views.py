import os
import shutil
import tempfile
import threading
import time
import uuid

import fitz  # PyMuPDF
import ocrmypdf
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .postprocess import postprocess_text, text_to_markdown, postprocess_markdown

try:
    from markitdown import MarkItDown as _MarkItDown
    _MARKITDOWN_AVAILABLE = True
except ImportError:
    _MARKITDOWN_AVAILABLE = False

# In-memory job store — suitable for local dev use
_jobs = {}
_jobs_lock = threading.Lock()


def index(request):
    return render(request, 'index.html', {
        'markitdown_available': _MARKITDOWN_AVAILABLE,
    })


@csrf_exempt
@require_POST
def upload(request):
    pdf_file = request.FILES.get('pdf')
    if not pdf_file:
        return JsonResponse({'error': 'No file provided'}, status=400)

    options = {
        'format':     request.POST.get('format', 'text'),      # 'text' | 'markdown'
        'ocr':        request.POST.get('ocr', 'ocrmypdf'),     # 'ocrmypdf' | 'none'
        'extraction': request.POST.get('extraction', 'pymupdf'), # 'pymupdf' | 'markitdown' | 'pymupdf_heuristic'
    }

    if options['extraction'] == 'markitdown' and not _MARKITDOWN_AVAILABLE:
        return JsonResponse({'error': 'markitdown not installed. Run: pip install "markitdown[pdf]"'}, status=400)

    job_id = uuid.uuid4().hex[:10]
    tmp_dir = tempfile.mkdtemp(prefix='pdfscribe_')
    input_path = os.path.join(tmp_dir, 'input.pdf')

    with open(input_path, 'wb') as f:
        for chunk in pdf_file.chunks():
            f.write(chunk)

    with _jobs_lock:
        _jobs[job_id] = {
            'status':   'processing',
            'progress': 'Starting…',
            'filename': pdf_file.name,
            'options':  options,
            'result':   None,
            'stats':    {},
            'error':    None,
            'started':  time.time(),
        }

    t = threading.Thread(
        target=_run_conversion,
        args=(job_id, input_path, tmp_dir, options),
        daemon=True,
    )
    t.start()

    return JsonResponse({'job_id': job_id})


@require_GET
def status(request, job_id):
    with _jobs_lock:
        job = _jobs.get(job_id)
    if not job:
        return JsonResponse({'error': 'Not found'}, status=404)
    return JsonResponse({
        'status':   job['status'],
        'progress': job['progress'],
        'filename': job['filename'],
        'options':  job['options'],
        'stats':    job['stats'],
        'error':    job['error'],
        'elapsed':  round(time.time() - job['started'], 1),
    })


@require_GET
def result(request, job_id):
    with _jobs_lock:
        job = _jobs.get(job_id)
    if not job:
        return JsonResponse({'error': 'Not found'}, status=404)
    if job['status'] != 'done':
        return JsonResponse({'error': 'Not ready yet'}, status=202)
    return JsonResponse({
        'text':     job['result'],
        'format':   job['options']['format'],
        'filename': job['filename'],
        'stats':    job['stats'],
    })


def _update_progress(job_id, message):
    with _jobs_lock:
        if job_id in _jobs:
            _jobs[job_id]['progress'] = message


def _run_conversion(job_id, input_path, tmp_dir, options):
    fmt        = options['format']       # 'text' | 'markdown'
    ocr_engine = options['ocr']          # 'ocrmypdf' | 'none'
    extraction = options['extraction']   # 'pymupdf' | 'markitdown' | 'pymupdf_heuristic'

    pdf_to_extract = input_path  # default if OCR is skipped

    try:
        # ── Step 1: OCR ────────────────────────────────────────────────
        if ocr_engine == 'ocrmypdf':
            ocr_path = os.path.join(tmp_dir, 'ocr.pdf')
            _update_progress(job_id, 'Running OCR — this may take a few minutes…')
            ocrmypdf.ocr(
                input_file=input_path,
                output_file=ocr_path,
                language='eng',
                deskew=True,
                rotate_pages=True,
                force_ocr=True,
                optimize=1,
                progress_bar=False,
            )
            pdf_to_extract = ocr_path

        # ── Step 2: Text extraction ─────────────────────────────────────
        _update_progress(job_id, 'Extracting text…')

        if extraction == 'markitdown':
            md_converter = _MarkItDown()
            raw_text = md_converter.convert(pdf_to_extract).text_content
        else:
            # PyMuPDF — used for both 'pymupdf' and 'pymupdf_heuristic'
            doc = fitz.open(pdf_to_extract)
            pages = [
                (i + 1, doc.load_page(i).get_text('text'))
                for i in range(len(doc))
            ]
            doc.close()
            raw_text = '\n\n'.join(
                f'--- PAGE {n} ---\n\n{t.strip()}' for n, t in pages
            )

        # ── Step 3: Post-processing ─────────────────────────────────────
        _update_progress(job_id, 'Post-processing…')

        if fmt == 'markdown' and extraction == 'markitdown':
            result_text, stats = postprocess_markdown(raw_text)
        elif fmt == 'markdown':
            # 'pymupdf' or 'pymupdf_heuristic' → convert page-marked text to Markdown
            result_text, stats = text_to_markdown(raw_text)
        else:
            result_text, stats = postprocess_text(raw_text)

        stats['pages'] = len(pages) if extraction != 'markitdown' else None
        stats['words'] = len(result_text.split())

        with _jobs_lock:
            _jobs[job_id].update({
                'status':   'done',
                'progress': 'Done',
                'result':   result_text,
                'stats':    stats,
            })

    except Exception as exc:
        with _jobs_lock:
            _jobs[job_id].update({
                'status':   'error',
                'progress': 'Error',
                'error':    str(exc),
            })
    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)
