import re

try:
    from symspellpy import SymSpell, Verbosity
    import pkg_resources
    _SYMSPELL_AVAILABLE = True
except ImportError:
    _SYMSPELL_AVAILABLE = False

_sym_spell = None


def _load_sym_spell():
    global _sym_spell
    if _sym_spell is not None:
        return _sym_spell
    try:
        ss = SymSpell(max_dictionary_edit_distance=2, prefix_length=7)
        dict_path = pkg_resources.resource_filename(
            'symspellpy', 'frequency_dictionary_en_82_765.txt'
        )
        ss.load_dictionary(dict_path, term_index=0, count_index=1)
        _sym_spell = ss
    except Exception:
        pass
    return _sym_spell


def _correct_word(word, sym_spell):
    """Return spell-corrected word, or original if no conservative correction found."""
    if not word or len(word) <= 2 or word[0].isupper() or not word.isalpha():
        return word
    suggestions = sym_spell.lookup(word, Verbosity.CLOSEST, max_edit_distance=1)
    if suggestions and suggestions[0].distance > 0:
        return suggestions[0].term
    return word


def _apply_spell_correction(text, stats):
    """Apply symspellpy correction in-place; updates stats['spell_corrections']."""
    if not (_SYMSPELL_AVAILABLE):
        return text
    sym_spell = _load_sym_spell()
    if not sym_spell:
        return text
    result_lines = []
    for line in text.split('\n'):
        tokens = re.split(r'(\W+)', line)
        new_tokens = []
        for token in tokens:
            if token.isalpha():
                corrected = _correct_word(token, sym_spell)
                if corrected != token:
                    stats['spell_corrections'] += 1
                new_tokens.append(corrected)
            else:
                new_tokens.append(token)
        result_lines.append(''.join(new_tokens))
    return '\n'.join(result_lines)


def _classify_line_for_heading(stripped):
    """
    Classify a stripped line as 'h1', 'h2', or 'body'.

    Heuristic: if ≥80% of alphabetic chars are uppercase, the line is a
    section heading. Short (≤4 words) → h1, medium (5-8 words) → h2.
    Applied to 1906 OCR output where headings are typeset in all-caps.
    """
    if not stripped:
        return 'body'
    alpha = [c for c in stripped if c.isalpha()]
    if len(alpha) < 3:
        return 'body'
    upper_ratio = sum(1 for c in alpha if c.isupper()) / len(alpha)
    if upper_ratio < 0.80:
        return 'body'
    words = stripped.split()
    if 1 <= len(words) <= 4 and len(stripped) <= 40:
        return 'h1'
    if 5 <= len(words) <= 8 and len(stripped) <= 60:
        return 'h2'
    return 'body'


# ── Plain-text pipeline ────────────────────────────────────────────────────

def postprocess_text(text, use_spellcheck=True):
    """
    Post-process OCR plain text (page-marked output from PyMuPDF).
    Returns (corrected_text, stats_dict).
    """
    stats = {
        'hyphen_joins': 0,
        'noise_lines_removed': 0,
        'spell_corrections': 0,
        'spellcheck_available': _SYMSPELL_AVAILABLE and use_spellcheck,
    }

    # 1. Join hyphenated line breaks: "atten-\ntion" → "attention"
    def join_hyphen(m):
        stats['hyphen_joins'] += 1
        return m.group(1) + m.group(2)
    text = re.sub(r'(\w+)-\n(\w+)', join_hyphen, text)

    # 2. Remove noise lines — short, low alphabetic-ratio artefacts
    lines = text.split('\n')
    cleaned = []
    for line in lines:
        stripped = line.strip()
        if not stripped or re.match(r'^---\s*PAGE', stripped):
            cleaned.append(line)
            continue
        alpha_count = sum(1 for c in stripped if c.isalpha())
        if len(stripped) < 15 and alpha_count < len(stripped) * 0.4:
            stats['noise_lines_removed'] += 1
            continue
        cleaned.append(line)
    text = '\n'.join(cleaned)

    # 3. Normalise multiple spaces and excessive blank lines
    text = re.sub(r'[ \t]{2,}', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)

    # 4. Optional spell correction (edit distance 1 — conservative)
    if use_spellcheck and _SYMSPELL_AVAILABLE:
        lines_filtered = []
        for line in text.split('\n'):
            if re.match(r'^---\s*PAGE', line.strip()):
                lines_filtered.append(line)
                continue
            lines_filtered.append(line)
        text = '\n'.join(lines_filtered)
        text = _apply_spell_correction(text, stats)

    return text, stats


# ── Markdown pipeline (PyMuPDF + heuristic headings) ──────────────────────

def text_to_markdown(text, use_spellcheck=True):
    """
    Convert OCR plain text (page-marked, from PyMuPDF) to Markdown.

    Applies the same cleanup as postprocess_text, then promotes all-caps
    short lines to Markdown headings and converts page markers to --- dividers.
    Returns (markdown_text, stats_dict).
    """
    # Reuse base cleanup (hyphen join, noise removal, whitespace, spell)
    text, stats = postprocess_text(text, use_spellcheck=use_spellcheck)
    stats['headings_detected'] = 0

    lines = text.split('\n')
    output = []
    for line in lines:
        stripped = line.strip()

        # Page markers → horizontal rule + italic page label
        m = re.match(r'^---\s*PAGE\s+(\d+)\s*---\s*$', stripped)
        if m:
            output.extend(['', '---', '', f'*— Page {m.group(1)} —*', ''])
            continue

        cls = _classify_line_for_heading(stripped)
        if cls == 'h1':
            stats['headings_detected'] += 1
            output.extend(['', f'# {stripped.title()}', ''])
        elif cls == 'h2':
            stats['headings_detected'] += 1
            output.extend(['', f'## {stripped.title()}', ''])
        else:
            output.append(line)

    return '\n'.join(output), stats


# ── Markdown pipeline (MarkItDown extraction) ─────────────────────────────

def postprocess_markdown(text, use_spellcheck=True):
    """
    Post-process Markdown text produced by MarkItDown (pdfminer extraction).

    MarkItDown gives flowing text without page markers. Apply heading
    heuristics, hyphen joins, whitespace cleanup, and optional spell
    correction.  Returns (markdown_text, stats_dict).
    """
    stats = {
        'hyphen_joins': 0,
        'noise_lines_removed': 0,
        'spell_corrections': 0,
        'spellcheck_available': _SYMSPELL_AVAILABLE and use_spellcheck,
        'headings_detected': 0,
    }

    # 1. Join hyphenated line breaks
    def join_hyphen(m):
        stats['hyphen_joins'] += 1
        return m.group(1) + m.group(2)
    text = re.sub(r'(\w+)-\n(\w+)', join_hyphen, text)

    # 2. Remove noise lines
    lines = text.split('\n')
    cleaned = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            cleaned.append(line)
            continue
        alpha_count = sum(1 for c in stripped if c.isalpha())
        if len(stripped) < 15 and alpha_count < len(stripped) * 0.4:
            stats['noise_lines_removed'] += 1
            continue
        cleaned.append(line)
    text = '\n'.join(cleaned)

    # 3. Heading heuristics on all-caps lines
    lines = text.split('\n')
    output = []
    for line in lines:
        stripped = line.strip()
        cls = _classify_line_for_heading(stripped)
        if cls == 'h1':
            stats['headings_detected'] += 1
            output.extend(['', f'# {stripped.title()}', ''])
        elif cls == 'h2':
            stats['headings_detected'] += 1
            output.extend(['', f'## {stripped.title()}', ''])
        else:
            output.append(line)
    text = '\n'.join(output)

    # 4. Normalise whitespace
    text = re.sub(r'[ \t]{2,}', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)

    # 5. Optional spell correction (skip Markdown headings)
    if use_spellcheck and _SYMSPELL_AVAILABLE:
        result_lines = []
        for line in text.split('\n'):
            if line.startswith('#'):
                result_lines.append(line)
                continue
            result_lines.append(line)
        text = '\n'.join(result_lines)
        text = _apply_spell_correction(text, stats)

    return text, stats
