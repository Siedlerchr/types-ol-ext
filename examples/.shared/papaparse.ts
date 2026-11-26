type CsvRow = Record<string, string>;

interface CsvResult {
  data: CsvRow[];
  meta: { fields?: string[] };
}

interface PapaParse {
  parse(
    file: File,
    options: { header: true; complete: (result: CsvResult) => void },
  ): void;
  unparse(rows: (string | number)[][]): string;
}

declare const Papa: PapaParse;

export function getPapaParse(): PapaParse {
  // The upstream HTML loads Papa Parse before the example bundle.
  return Papa;
}
