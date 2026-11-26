import { jsPDF } from 'jspdf';
import type { PrintEvent } from 'ol-ext/control/Print';

export function downloadMapPdf(event: PrintEvent): void {
  const { image, print } = event;
  if (!image || !print.position || !print.imageWidth || !print.imageHeight)
    return;
  const pdf = new jsPDF({
    orientation: print.orientation === 'landscape' ? 'landscape' : 'portrait',
    unit: print.unit,
    format: print.format || print.size,
  });
  pdf.addImage(
    image,
    'JPEG',
    print.position[0],
    print.position[1],
    print.imageWidth,
    print.imageHeight,
  );
  pdf.save('map.pdf');
}
