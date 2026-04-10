#!/usr/bin/env python3
"""
playlist_toc.py — renumber #### entries and regenerate TOC in playlist.md

Usage: python3 playlist_toc.py [path_to_playlist.md]
       Defaults to playlist.md in the same directory as the script.

Structure expected:
  ### <N>. <MONTH>-<YEAR>       — month header
  #### <N>.<M>. <Title>         — numbered entry (or unnumbered #### <Title>)
  * <url>                       — link line
  * <comment>                   — optional comment

The script:
1. Parses all ### month sections
2. Renumbers #### entries sequentially within each month
3. Regenerates the TOC block between <!-- TOC --> and <!-- /TOC -->
4. Removes exact duplicate entries (same URL within a section)
5. Writes the file back in place
"""

import re
import sys
import os


def slugify(text):
    """GitHub-flavored markdown anchor slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def parse_and_fix(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()

    # Split into: preamble (before TOC), TOC, body (after TOC)
    toc_start = None
    toc_end = None
    for i, line in enumerate(lines):
        if line.strip() == '<!-- TOC -->':
            toc_start = i
        elif line.strip() == '<!-- /TOC -->':
            toc_end = i

    if toc_start is None or toc_end is None:
        print("ERROR: <!-- TOC --> markers not found")
        sys.exit(1)

    preamble = lines[:toc_start + 1]  # up to and including <!-- TOC -->
    body_lines = lines[toc_end:]       # from <!-- /TOC --> onward

    # Parse body into month sections, renumber entries, deduplicate
    result_body = []
    toc_entries = []
    current_month_num = None
    current_entry_num = 0
    seen_urls = set()

    i = 0
    while i < len(body_lines):
        line = body_lines[i]

        # Match month header: ### <N>. <MONTH>-<YEAR>
        month_match = re.match(r'^### (\d+)\.\s+(.+)$', line)
        if month_match:
            current_month_num = int(month_match.group(1))
            month_title = month_match.group(2).strip()
            current_entry_num = 0
            seen_urls = set()
            result_body.append(line)
            toc_entries.append(('month', current_month_num, month_title, line.strip()))
            i += 1
            continue

        # Match entry header: #### [<N>.<M>.] <Title>
        entry_match = re.match(r'^####\s+(?:\d+\.\d+\.?\s+)?(.+)$', line)
        if entry_match and current_month_num is not None:
            title = entry_match.group(1).strip()

            # Look ahead for URL to detect duplicates
            url = None
            j = i + 1
            while j < len(body_lines) and not body_lines[j].startswith('#'):
                url_match = re.match(r'^\*\s*<(.+?)>', body_lines[j])
                if url_match:
                    url = url_match.group(1)
                    break
                j += 1

            # Skip duplicate URLs within the same month
            if url and url in seen_urls:
                # Skip this entry and its body lines
                i += 1
                while i < len(body_lines) and not body_lines[i].startswith('#'):
                    i += 1
                continue

            if url:
                seen_urls.add(url)

            current_entry_num += 1
            numbered_title = f"#### {current_month_num}.{current_entry_num}. {title}\n"
            result_body.append(numbered_title)
            toc_entries.append(('entry', current_month_num, current_entry_num, title))
            i += 1
            continue

        result_body.append(line)
        i += 1

    # Generate TOC
    toc_lines = ['\n']
    for entry in toc_entries:
        if entry[0] == 'month':
            _, num, title, _ = entry
            heading = f"{num}. {title}"
            slug = slugify(heading)
            toc_lines.append(f'- [{heading}](#{slug})\n')
        elif entry[0] == 'entry':
            _, month_num, entry_num, title = entry
            heading = f"{month_num}.{entry_num}. {title}"
            slug = slugify(heading)
            toc_lines.append(f'  - [{heading}](#{slug})\n')

    # Assemble final file
    output = preamble + toc_lines + result_body

    with open(filepath, 'w') as f:
        f.writelines(output)

    entry_count = sum(1 for e in toc_entries if e[0] == 'entry')
    month_count = sum(1 for e in toc_entries if e[0] == 'month')
    print(f"Done: {month_count} months, {entry_count} entries, TOC regenerated")


if __name__ == '__main__':
    if len(sys.argv) > 1:
        path = sys.argv[1]
    else:
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'playlist.md')
    parse_and_fix(path)
