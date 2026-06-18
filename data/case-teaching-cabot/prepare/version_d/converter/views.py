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

from .postprocess import postprocess_text

# In-memory job store — suitable for local dev use
_jobs = {}
_jobs_lock = threading.Lock()


def index(request):
    return render(request, 'index.html')


@csrf_exempt
@require_POST
def upload(request):
    pdf_file = request.FILES.get('pdf')
    if not pdf_file:
        return JsonResponse({'error': 'No file provided'}, status=400)

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
            'result':   None,
            'stats':    {},
            'error':    None,
            'started':  time.time(),
        }

    t = threading.Thread(target=_run_conversion, args=(job_id, input_path, tmp_dir), daemon=True)
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
        'filename': job['filename'],
        'stats':    job['stats'],
    })


def _update_progress(job_id, message):
    with _jobs_lock:
        if job_id in _jobs:
            _jobs[job_id]['progress'] = message


def _run_conversion(job_id, input_path, tmp_dir):
    ocr_path = os.path.join(tmp_dir, 'ocr.pdf')
    try:
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

        _update_progress(job_id, 'Extracting text…')
        doc = fitz.open(ocr_path)
        pages = []
        for i in range(len(doc)):
            page_text = doc.load_page(i).get_text('text')
            pages.append((i + 1, page_text))
        doc.close()

        raw_text = '\n\n'.join(
            f'--- PAGE {n} ---\n\n{t.strip()}' for n, t in pages
        )

        _update_progress(job_id, 'Post-processing…')
        corrected_text, stats = postprocess_text(raw_text)

        word_count = len(corrected_text.split())
        stats['pages'] = len(pages)
        stats['words'] = word_count

        with _jobs_lock:
            _jobs[job_id].update({
                'status':   'done',
                'progress': 'Done',
                'result':   corrected_text,
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
