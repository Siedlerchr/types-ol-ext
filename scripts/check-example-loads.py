#!/usr/bin/env python3
"""Check locally served example pages using the JetBrains Chrome DevTools CLI.

Start `npm run serve-examples` first, then supply the CLI path as the argument.
The script creates one browser page and navigates it through matching examples.
Console errors include failed external resources, which need separate review.
"""
import argparse
import re
import subprocess
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent.parent


def run(cli, *args):
    result = subprocess.run([cli, *args], text=True, capture_output=True, timeout=45)
    if result.returncode:
        raise RuntimeError(result.stderr or result.stdout)
    return result.stdout


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('cli', help='Path returned by get_chrome_connect_cli')
    parser.add_argument('--base-url', default='http://localhost:8765')
    parser.add_argument('--match', action='append', default=[],
                        help='Only check paths containing this text (repeat to match several)')
    args = parser.parse_args()
    output = run(args.cli, 'new_page', 'about:blank')
    selected = re.search(r'^\s*(\d+):.*\[selected\]', output, re.MULTILINE)
    if not selected:
        raise SystemExit('Could not identify the page created by the browser CLI.')
    page = selected.group(1)
    try:
        for example in sorted((ROOT / 'examples').rglob('*.ts')):
            relative = example.relative_to(ROOT).with_suffix('.html').as_posix()
            if args.match and not any(match in relative for match in args.match):
                continue
            url = f'{args.base_url.rstrip("/")}/{relative}'
            try:
                with urlopen(url, timeout=5) as response:
                    html = response.read().decode('utf-8', errors='replace')
                if f'{example.stem}.js' not in html:
                    print(f'SKIP {relative}: no port script in served HTML', flush=True)
                    continue
                run(args.cli, 'navigate_page', page, '--url', url, '--timeout', '20000')
                messages = run(args.cli, 'list_console_messages', page, '--types', 'error')
                errors = [line.strip() for line in messages.splitlines() if '[error]' in line]
                print(f'{"ERROR" if errors else "OK"} {relative}', flush=True)
                for error in errors:
                    print(f'  {error}', flush=True)
            except (HTTPError, URLError, RuntimeError, subprocess.TimeoutExpired) as error:
                print(f'ERROR {relative}: {error}', flush=True)
    finally:
        run(args.cli, 'close_page', page)


if __name__ == '__main__':
    main()
