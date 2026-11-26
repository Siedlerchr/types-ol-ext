#!/usr/bin/env python3
"""Report upstream HTML examples that do not yet have a TypeScript port."""
from collections import Counter
import argparse
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UPSTREAM = ROOT / 'ol-ext' / 'examples'
PORTS = ROOT / 'examples'


class InlineMapScripts(HTMLParser):
    """Count inline scripts recognized by the example-serving script."""

    def __init__(self):
        super().__init__()
        self.current = None
        self.count = 0

    def handle_starttag(self, tag, attrs):
        if tag == 'script' and 'src' not in dict(attrs):
            self.current = ''

    def handle_data(self, data):
        if self.current is not None:
            self.current += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.current is not None:
            if 'ol.Map' in self.current or 'ol.ext' in self.current:
                self.count += 1
            self.current = None


def main():
    parser_args = argparse.ArgumentParser(description=__doc__)
    parser_args.add_argument('--update-status', action='store_true',
                             help='Refresh the missing example list in docs/audit-status.mk')
    args = parser_args.parse_args()
    if not UPSTREAM.is_dir():
        raise SystemExit('Missing ol-ext/examples; check out the upstream release first.')
    remaining = []
    for html in sorted(UPSTREAM.rglob('*.html')):
        relative = html.relative_to(UPSTREAM)
        if (PORTS / relative).with_suffix('.ts').exists():
            continue
        parser = InlineMapScripts()
        parser.feed(html.read_text(encoding='utf-8-sig', errors='replace'))
        remaining.append((relative, parser.count))
    if args.update_status:
        status = ROOT / 'docs' / 'audit-status.mk'
        content = status.read_text(encoding='utf-8')
        begin = '# BEGIN GENERATED MISSING EXAMPLES'
        end = '# END GENERATED MISSING EXAMPLES'
        entries = '\n'.join(f'#   {path.as_posix()} (inline scripts: {count})'
                            for path, count in remaining)
        generated = f'{begin}\n# {len(remaining)} upstream HTML files without a matching TypeScript port.\n{entries}\n{end}'
        if begin in content and end in content:
            start = content.index(begin)
            finish = content.index(end, start) + len(end)
            content = content[:start] + generated + content[finish:]
        else:
            marker = '\n# A completed step records the current evidence, not a release approval.'
            if marker not in content:
                raise SystemExit('Could not find the example status insertion point.')
            content = content.replace(marker, '\n' + generated + '\n' + marker, 1)
        status.write_text(content, encoding='utf-8')
    groups = Counter(path.parts[0] for path, _ in remaining)
    print(f'{len(remaining)} upstream HTML files have no matching TypeScript port:')
    for group, count in sorted(groups.items()):
        print(f'  {group}: {count}')
    print('\nRemaining files (number of recognizable inline scripts):')
    for path, count in remaining:
        print(f'  {path} ({count})')


if __name__ == '__main__':
    main()
