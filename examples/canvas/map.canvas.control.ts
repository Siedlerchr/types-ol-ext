import { downloadMapPdf } from '../.shared/print';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/control/defaults';
import Geoportail from 'ol-ext/layer/Geoportail';
import Print from 'ol-ext/control/Print';
import CanvasScaleLine from 'ol-ext/control/CanvasScaleLine';
import CanvasAttribution from 'ol-ext/control/CanvasAttribution';
import CanvasTitle from 'ol-ext/control/CanvasTitle';
import CenterPosition from 'ol-ext/control/CenterPosition';
import * as coordinate from 'ol/coordinate';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 14,
    center: [270148, 6247782],
  }),
  controls: defaults({ attribution: false }),
  layers: [
    new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'),
    new Geoportail('GEOGRAPHICALNAMES.NAMES'),
  ],
});

// Print control
const printControl = new Print();
map.addControl(printControl);

// CanvasScaleLine control
const scaleLineControl = new CanvasScaleLine();
map.addControl(scaleLineControl);

// CanvasAttribution control
const attributionControl = new CanvasAttribution();
map.addControl(attributionControl);
attributionControl.setCanvas(
  document.querySelector<HTMLInputElement>('#attribution')!.checked,
);

// CanvasTitle control
const titleControl = new CanvasTitle();
map.addControl(titleControl);

// Coordinate control
const positionControl = new CenterPosition({
  canvas: document.querySelector<HTMLInputElement>('#coordinate')!.checked,
  coordinateFormat: function (coord) {
    return coordinate.toStringHDMS(coord!);
  },
  projection: 'EPSG:4326',
});
map.addControl(positionControl);

// setStyle function: Change control style
function setControlStyle(
  c?: CanvasScaleLine | CanvasAttribution | CanvasTitle | CenterPosition,
) {
  if (!c) {
    setControlStyle(scaleLineControl);
    setControlStyle(attributionControl);
    setControlStyle(titleControl);
    setControlStyle(positionControl);
    return;
  }
  c.setStyle(
    new Style({
      text: new Text({
        text: document.querySelector<HTMLInputElement>('#title')!.value,
        font:
          (document.querySelector<HTMLInputElement>('#italic')!.checked
            ? 'italic '
            : '') +
          (document.querySelector<HTMLInputElement>('#bold')!.checked
            ? 'bold '
            : '') +
          (c === titleControl ? 28 : 12) +
          'px ' +
          document.querySelector<HTMLInputElement>('#font')!.value,
        fill: new Fill({
          color: document.querySelector<HTMLInputElement>('#color')!.value,
        }),
      }),
      stroke: new Stroke({
        width: 2,
        color: document.querySelector<HTMLInputElement>('#color')!.value,
      }),
    }),
  );
}
setControlStyle();

// Handle propertie changes
const titleInput = document.querySelector<HTMLInputElement>('#title')!;
titleInput.addEventListener('change', () =>
  titleControl.setTitle(titleInput.value),
);
const attributionInput =
  document.querySelector<HTMLInputElement>('#attribution')!;
attributionInput.addEventListener('change', () =>
  attributionControl.setCanvas(attributionInput.checked),
);
const coordinateInput =
  document.querySelector<HTMLInputElement>('#coordinate')!;
coordinateInput.addEventListener('change', () =>
  positionControl.setCanvas(coordinateInput.checked),
);

printControl.on('error', () => {
  document.body.style.opacity = '';
  console.warn('No canvas to export');
});
printControl.on('print', (event) => {
  document.body.style.opacity = '';
  if (!event.image) return;
  if (event.pdf) {
    downloadMapPdf(event);
    return;
  }
  event.canvas.toBlob(
    (blob) =>
      downloadBlob(blob, 'map.' + event.imageType.replace('image/', '')),
    event.imageType,
    event.quality,
  );
});

Object.assign(window, { printControl, setControlStyle });
