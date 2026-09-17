#!/usr/bin/env python3
"""Relative link checker for the vendor-risk-rubric repository.

Walks the repository for Markdown (*.md) and HTML (*.html) files, extracts
relative links, anchors, and src references, resolves each one relative to
the file that contains it, and reports any target that does not exist.

Standard library only. Exits 1 if any broken link is found.

Usage:
    python3 scripts/check_links.py                # check the repo
    python3 scripts/check_links.py --root PATH    # check another tree
    python3 scripts/check_links.py --include-external  # also HEAD-check http(s) links
    python3 scripts/check_links.py --quiet        # summary line only
"""

import argparse
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

SKIP_DIRS = {".git", "node_modules", "scratch", "scratchpad", "__pycache__"}
SKIP_SCHEMES = ("http:", "https:", "mailto:", "tel:", "data:", "javascript:")

MD_INLINE_RE = re.compile(r"!?\[[^\]]*\]\(\s*<?([^)<>\s]+)>?(?:\s+[\"'][^\"']*[\"'])?\s*\)")
MD_REFDEF_RE = re.compile(r"^\s{0,3}\[[^\]]+\]:\s+<?(\S+?)>?(?:\s+[\"'(].*)?$")
HTML_ATTR_RE = re.compile(r"(?:href|src)\s*=\s*[\"']([^\"']+)[\"']", re.IGNORECASE)
ATX_HEADING_RE = re.compile(r"^\s{0,3}#{1,6}\s+(.*?)\s*#*\s*$")
HTML_ID_RE = re.compile(r"(?:\bid|\bname)\s*=\s*[\"']([^\"']+)[\"']", re.IGNORECASE)


def find_files(root: Path):
    """Yield all .md and .html files under root, skipping SKIP_DIRS."""
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in sorted(filenames):
            if name.lower().endswith((".md", ".html")):
                yield Path(dirpath) / name


def extract_links(path: Path):
    """Yield (line_number, target) for every link/anchor/src in the file."""
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as exc:  # unreadable file
        print(f"{path}: cannot read ({exc})", file=sys.stderr)
        return
    lines = text.splitlines()
    if path.suffix.lower() == ".md":
        in_fence = False
        for i, line in enumerate(lines, 1):
            stripped = line.lstrip()
            if stripped.startswith("```") or stripped.startswith("~~~"):
                in_fence = not in_fence
                continue
            if in_fence:
                continue
            for match in MD_INLINE_RE.finditer(line):
                yield i, match.group(1)
            ref = MD_REFDEF_RE.match(line)
            if ref:
                yield i, ref.group(1)
            for match in HTML_ATTR_RE.finditer(line):
                yield i, match.group(1)
    else:
        for i, line in enumerate(lines, 1):
            for match in HTML_ATTR_RE.finditer(line):
                yield i, match.group(1)


def github_slugs(md_path: Path):
    """Return the set of GitHub-style anchor slugs for a Markdown file's headings."""
    slugs = set()
    seen = {}
    try:
        text = md_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return slugs
    in_fence = False
    for line in text.splitlines():
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        match = ATX_HEADING_RE.match(line)
        if not match:
            continue
        heading = match.group(1)
        # Strip markdown emphasis/code/link syntax roughly
        heading = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", heading)
        heading = re.sub(r"[*_`]", "", heading)
        slug = heading.strip().lower()
        slug = re.sub(r"[^\w\- ]", "", slug)
        slug = slug.replace(" ", "-")
        if slug in seen:
            seen[slug] += 1
            slug = f"{slug}-{seen[slug]}"
        else:
            seen[slug] = 0
        slugs.add(slug)
    return slugs


def html_ids(html_path: Path):
    """Return the set of id/name attribute values in an HTML file."""
    try:
        text = html_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return set()
    return set(HTML_ID_RE.findall(text))


def case_sensitive_exists(path: Path, root: Path):
    """Check that path exists with exact case in every component below root."""
    try:
        resolved = path.resolve()
    except OSError:
        return False, "unresolvable path"
    if not resolved.exists():
        return False, "file not found"
    # Verify case component by component (case-insensitive filesystems lie).
    try:
        rel = resolved.relative_to(root.resolve())
    except ValueError:
        return True, ""  # outside the root; existence check is enough
    current = root.resolve()
    for part in rel.parts:
        try:
            entries = os.listdir(current)
        except OSError:
            return True, ""
        if part not in entries:
            return False, "case mismatch"
        current = current / part
    return True, ""


def check_external(url: str):
    """HEAD-request an external URL. Returns (ok, reason)."""
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "check-links/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            if resp.status >= 400:
                return False, f"HTTP {resp.status}"
            return True, ""
    except Exception as exc:  # noqa: BLE001 - report any failure as broken
        return False, str(exc).splitlines()[0][:120]


def main(argv=None):
    parser = argparse.ArgumentParser(description="Check relative links in *.md and *.html files.")
    parser.add_argument("--root", default=".", help="root directory to walk (default: current directory)")
    parser.add_argument("--include-external", action="store_true",
                        help="also check http(s) links with a HEAD request (5s timeout)")
    parser.add_argument("--quiet", action="store_true", help="print only the summary line")
    args = parser.parse_args(argv)

    root = Path(args.root).resolve()
    if not root.is_dir():
        print(f"error: --root {root} is not a directory", file=sys.stderr)
        return 2

    slug_cache = {}
    id_cache = {}
    checked = 0
    broken = 0
    files_scanned = 0
    problems = []

    for src_file in find_files(root):
        files_scanned += 1
        rel_src = src_file.relative_to(root)
        for lineno, raw_target in extract_links(src_file):
            target = raw_target.strip()
            if not target:
                continue
            lower = target.lower()
            if lower.startswith(SKIP_SCHEMES):
                if args.include_external and lower.startswith(("http:", "https:")):
                    checked += 1
                    ok, reason = check_external(target)
                    if not ok:
                        broken += 1
                        problems.append(f"{rel_src}:{lineno}: BROKEN -> {target} ({reason})")
                continue
            if lower.startswith(("//", "irc:", "ftp:")):
                continue
            checked += 1
            if target.startswith("/"):
                broken += 1
                problems.append(f"{rel_src}:{lineno}: BROKEN -> {target} (absolute path; use a relative link)")
                continue

            decoded = urllib.parse.unquote(target)
            path_part, _, fragment = decoded.partition("#")
            path_part = path_part.split("?", 1)[0]

            if path_part:
                dest = (src_file.parent / path_part)
                ok, reason = case_sensitive_exists(dest, root)
                if not ok:
                    broken += 1
                    problems.append(f"{rel_src}:{lineno}: BROKEN -> {target} ({reason})")
                    continue
                dest = dest.resolve()
            else:
                dest = src_file  # pure fragment: anchor within the same file

            if fragment:
                if dest.is_dir():
                    continue  # cannot anchor into a directory listing
                if dest.suffix.lower() == ".md":
                    if dest not in slug_cache:
                        slug_cache[dest] = github_slugs(dest)
                    if fragment.lower() not in slug_cache[dest]:
                        broken += 1
                        problems.append(f"{rel_src}:{lineno}: BROKEN -> {target} (anchor not found)")
                elif dest.suffix.lower() in (".html", ".htm"):
                    if dest not in id_cache:
                        id_cache[dest] = html_ids(dest)
                    if fragment not in id_cache[dest]:
                        broken += 1
                        problems.append(f"{rel_src}:{lineno}: BROKEN -> {target} (anchor not found)")

    if not args.quiet:
        for line in problems:
            print(line)
    print(f"Checked {checked} links in {files_scanned} files, {broken} broken")
    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
