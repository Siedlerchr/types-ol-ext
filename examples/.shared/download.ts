/** Save a generated file using the browser's download support. */
export function downloadBlob(blob: Blob | null, filename: string): void {
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
