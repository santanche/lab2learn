# PDF Scribe — version_d

Django web app: upload a scanned PDF → OCR → post-processed plain text.

## Stack

| Layer | Tool |
|---|---|
| OCR | OCRmyPDF + Tesseract |
| Text extraction | PyMuPDF |
| Post-processing | regex + symspellpy (optional) |
| Server | Django 4.2+ |

## Setup

### Create and activate virtual environment

~~~bash
python3 -m venv .venv
source .venv/bin/activate
~~~

### Install Python dependencies

~~~bash
pip install -r requirements.txt
~~~

### Install system dependencies (Tesseract)

~~~bash
sudo apt update && sudo apt install tesseract-ocr
~~~

> symspellpy is optional. If not installed, spell correction is silently skipped
> and all other post-processing steps still run.

## Run

~~~bash
python manage.py runserver
~~~

Then open http://127.0.0.1:8000 in your browser.

## Usage

1. Drag a PDF onto the page (or click **Select PDF**)
2. Wait for the OCR pipeline to finish (1–5 min for a full book)
3. Browse the text in the document viewer, navigate by page
4. Click **Download .txt** to save the result

## Post-processing pipeline

Applied in order after OCR+extraction:

1. **Hyphen join** — `atten-\ntion` → `attention`
2. **Noise removal** — drops short lines with low alphabetic ratio (OCR artefacts on decorative pages)
3. **Whitespace normalisation** — collapses multiple spaces; max two consecutive blank lines
4. **Spell correction** (if symspellpy installed) — edit distance 1, skips capitalised words and non-alpha tokens
