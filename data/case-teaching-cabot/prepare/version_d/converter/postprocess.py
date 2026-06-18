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
    # Skip short words, proper nouns (capitalized), non-alpha tokens
    if not word or len(word) <= 2 or word[0].isupper() or not word.isalpha():
        return word
    suggestions = sym_spell.lookup(word, Verbosity.CLOSEST, max_edit_distance=1)
    if suggestions and suggestions[0].distance > 0:
        return suggestions[0].term
    return word


def postprocess_text(text, use_spellcheck=True):
    """
    Post-process OCR-extracted text to fix common errors.
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

    # 2. Remove noise lines — short lines with low alphabetic ratio
    #    (common on title pages with decorative engravings or stamps)
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

    # 3. Normalize multiple spaces within lines (preserve line breaks)
    text = re.sub(r'[ \t]{2,}', ' ', text)

    # 4. Collapse runs of 3+ blank lines to 2
    text = re.sub(r'\n{3,}', '\n\n', text)

    # 5. Optional spell correction (edit distance 1 — conservative)
    if use_spellcheck and _SYMSPELL_AVAILABLE:
        sym_spell = _load_sym_spell()
        if sym_spell:
            result_lines = []
            for line in text.split('\n'):
                if re.match(r'^---\s*PAGE', line.strip()):
                    result_lines.append(line)
                    continue
                # Split on non-alpha boundaries, correct alpha tokens only
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
            text = '\n'.join(result_lines)

    return text, stats
