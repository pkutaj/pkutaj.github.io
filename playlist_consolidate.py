#!/usr/bin/env python3
"""
playlist_consolidate.py — consolidate loose entries and renumber playlist.md

Expected file structure:
  ## N. MONTH-YEAR        — month header (H2)
  ### N.M. Title          — numbered entry (H3)
  * <url>
   * <summary>

Loose entries appended by the bookmark command use #### (H4) and land
outside any month section. This script:
  1. Collects all loose #### entries from the end of the file
  2. Finds or creates the target month section (default: current month)
  3. Appends loose entries there (deduped by URL across the whole file)
  4. Renumbers all ### entries within each ## section
  5. Regenerates the <!-- TOC --> / <!-- /TOC --> block

Usage:
  python3 playlist_consolidate.py [playlist.md] [MON-YYYY]
  MON-YYYY default: current month e.g. JUN-2026
"""

import re
import sys
import os
from datetime import datetime

MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
               'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


def extract_url(body_lines):
    for line in body_lines:
        m = re.match(r"^\*\s*<(.+?)>", line)
        if m:
            return m.group(1)
    return None


def extract_entry_title(heading):
    """Strip hashes and optional N.M. numbering from a heading line."""
    m = re.match(r"^#{2,5}\s+(?:\d+\.\d+\.?\s+)?(.+)", heading)
    return m.group(1).strip() if m else heading.strip("# \n")


def parse_entries(lines):
    """
    Parse a list of lines into sections and entries.

    Returns:
      sections: list of dicts with keys:
        num   — int
        title — str (e.g. 'MAY-2026')
        head  — original header line
        entries — list of {heading, body, url}
      loose — entries found before the first ## section or after the last one
              but outside any ## section (#### lines)
    """
    sections = []
    loose = []
    current = None
    seen_urls = {}  # url -> (section_idx, entry_idx) for dedup tracking

    i = 0
    while i < len(lines):
        line = lines[i]

        # Month header
        m = re.match(r"^## (\d+)\.\s+(.+)$", line)
        if m:
            current = {
                "num": int(m.group(1)),
                "title": m.group(2).strip(),
                "head": line,
                "entries": [],
            }
            sections.append(current)
            i += 1
            continue

        # Entry (### or ####)
        if re.match(r"^#{3,4}\s+\S", line):
            heading = line
            body = []
            i += 1
            while i < len(lines) and not re.match(r"^#{2,4}\s", lines[i]):
                body.append(lines[i])
                i += 1
            url = extract_url(body)
            entry = {"heading": heading, "body": body, "url": url}

            is_loose = re.match(r"^####\s", heading) and current is None
            # Also treat #### entries inside a section as loose
            # (they were appended to the wrong level)
            is_wrong_level = re.match(r"^####\s", heading)

            if is_wrong_level:
                loose.append(entry)
            elif current is not None:
                current["entries"].append(entry)
            else:
                loose.append(entry)
            continue

        i += 1

    return sections, loose


def dedup_loose(sections, loose):
    """Remove loose entries whose URL already exists in any section."""
    existing_urls = set()
    for s in sections:
        for e in s["entries"]:
            if e["url"]:
                existing_urls.add(e["url"])

    seen_in_loose = set()
    clean = []
    for entry in loose:
        url = entry["url"]
        if url and (url in existing_urls or url in seen_in_loose):
            continue
        if url:
            seen_in_loose.add(url)
        clean.append(entry)
    return clean


def renumber(sections):
    """Renumber ### N.M. entries within each section in place."""
    for s in sections:
        for j, entry in enumerate(s["entries"], start=1):
            title = extract_entry_title(entry["heading"])
            entry["heading"] = f"### {s['num']}.{j}. {title}\n"


def build_toc(sections):
    lines = []
    for s in sections:
        heading = f"{s['num']}. {s['title']}"
        slug = slugify(heading)
        lines.append(f"- [{heading}](#{slug})\n")
        for entry in s["entries"]:
            m = re.match(r"### (\d+)\.(\d+)\. (.+)", entry["heading"])
            if m:
                e_heading = f"{m.group(1)}.{m.group(2)}. {m.group(3).strip()}"
                e_slug = slugify(e_heading)
                lines.append(f"  - [{e_heading}](#{e_slug})\n")
    return lines


def consolidate(filepath, target_month=None):
    if target_month is None:
        now = datetime.now()
        target_month = f"{MONTH_NAMES[now.month - 1]}-{now.year}"

    with open(filepath) as f:
        all_lines = f.readlines()

    # Split around TOC markers
    toc_start = toc_end = None
    for i, line in enumerate(all_lines):
        if line.strip() == "<!-- TOC -->":
            toc_start = i
        elif line.strip() == "<!-- /TOC -->":
            toc_end = i

    if toc_start is None or toc_end is None:
        sys.exit("ERROR: <!-- TOC --> markers not found")

    preamble = all_lines[: toc_start + 1]   # up to and including <!-- TOC -->
    suffix_start = all_lines[toc_end:]       # from <!-- /TOC --> onward

    sections, loose = parse_entries(suffix_start)

    # Dedup loose against existing sections
    loose = dedup_loose(sections, loose)

    if loose:
        # Find or create target section
        target = next((s for s in sections if s["title"] == target_month), None)
        if target is None:
            next_num = max((s["num"] for s in sections), default=0) + 1
            target = {
                "num": next_num,
                "title": target_month,
                "head": f"## {next_num}. {target_month}\n",
                "entries": [],
            }
            sections.append(target)
            sections.sort(key=lambda s: s["num"])
        target["entries"].extend(loose)

    renumber(sections)
    toc_lines = build_toc(sections)

    # Rebuild body (skip original ### / #### lines — we regenerate from sections)
    body_lines = ["\n"]
    for s in sections:
        body_lines.append("\n")
        body_lines.append(f"## {s['num']}. {s['title']}\n")
        for entry in s["entries"]:
            body_lines.append(entry["heading"])
            body_lines.extend(entry["body"])

    output = preamble + ["\n"] + toc_lines + ["<!-- /TOC -->\n"] + body_lines

    with open(filepath, "w") as f:
        f.writelines(output)

    total_entries = sum(len(s["entries"]) for s in sections)
    print(
        f"Done: {len(sections)} months, {total_entries} entries "
        f"({len(loose)} loose → {target_month}), TOC regenerated"
    )


if __name__ == "__main__":
    args = sys.argv[1:]
    path = args[0] if args else os.path.join(os.path.dirname(os.path.abspath(__file__)), "playlist.md")
    month = args[1] if len(args) > 1 else None
    consolidate(path, month)
