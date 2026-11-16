#!/usr/bin/env python3
"""Compare Geoportail WMTS matrix-set responses for specified z/x/y tiles."""
import argparse
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import urlopen


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('tiles', nargs='+', help='Tile coordinates as zoom/column/row')
    parser.add_argument('--layer', default='GEOGRAPHICALNAMES.NAMES')
    parser.add_argument('--matrix', action='append', dest='matrices', help='Matrix set (repeatable; defaults to PM and PM_6_18)')
    args = parser.parse_args()
    for tile in args.tiles:
        try:
            zoom, column, row = (int(value) for value in tile.split('/'))
        except ValueError:
            parser.error(f'Invalid tile: {tile}; expected zoom/column/row')
        for matrix in args.matrices or ['PM', 'PM_6_18']:
            params = {
                'SERVICE': 'WMTS', 'REQUEST': 'GetTile', 'VERSION': '1.0.0',
                'LAYER': args.layer, 'STYLE': 'normal', 'FORMAT': 'image/png',
                'TILEMATRIXSET': matrix, 'TILEMATRIX': zoom,
                'TILECOL': column, 'TILEROW': row,
            }
            url = 'https://data.geopf.fr/wmts?' + urlencode(params)
            try:
                with urlopen(url, timeout=15) as response:
                    data = response.read()
                    print(f'{tile} {matrix}: {response.status}, {response.headers.get("Content-Type")}, {len(data)} bytes')
            except (HTTPError, URLError) as error:
                print(f'{tile} {matrix}: {error}')


if __name__ == '__main__':
    main()
