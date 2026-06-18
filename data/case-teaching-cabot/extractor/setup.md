# PDF Scribe — extractor

Django web app: upload a scanned PDF → OCR → post-processed plain text or Markdown.

## Stack

| Layer | Tool |
|---|---|
| OCR | OCRmyPDF + Tesseract (system) |
| Text extraction | PyMuPDF or MarkItDown (pdfminer.six) |
| Post-processing | regex + symspellpy (optional) |
| Server | Django 4.2+ |

## Setup

### System dependency (Tesseract — required for OCR)

~~~bash
sudo apt update && sudo apt install tesseract-ocr
~~~

### Python environment

~~~bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
~~~

> `symspellpy` is optional. If not installed, spell correction is silently skipped
> and all other post-processing steps still run.

## Run

~~~bash
source .venv/bin/activate
python manage.py runserver
~~~

Then open http://127.0.0.1:8000 in your browser.

## Usage

1. Drag a PDF onto the page (or click **Select PDF**)
2. Choose output format (**Plain text** or **Markdown**), OCR engine, and extraction tool
3. Wait for the pipeline to finish (1–5 min for a full book)
4. Browse the result in the document viewer (page navigation for text; TOC for Markdown)
5. Click **Download** to save as `.txt` or `.md`

## Output format options

| Format | OCR | Extraction | Notes |
|---|---|---|---|
| Plain text | OCRmyPDF | PyMuPDF | Page markers `--- PAGE N ---` for RAG chunking |
| Markdown | OCRmyPDF | PyMuPDF + heuristics | Heading detection from all-caps lines |
| Markdown | OCRmyPDF | MarkItDown | pdfminer.six extraction |
| Either | None | Any | Skip OCR for born-digital PDFs |

## Post-processing pipeline

Applied in order after extraction:

1. **Hyphen join** — `atten-\ntion` → `attention`
2. **Noise removal** — drops short lines with low alphabetic ratio (OCR artefacts on decorative pages)
3. **Whitespace normalisation** — collapses multiple spaces; max two consecutive blank lines
4. **Heading detection** *(Markdown only)* — all-caps lines promoted to `# H1` / `## H2`
5. **Spell correction** *(if symspellpy installed)* — edit distance 1, skips capitalised words and non-alpha tokens
