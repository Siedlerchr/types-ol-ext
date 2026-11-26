import { downloadMapPdf } from '../.shared/print';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Print from 'ol-ext/control/Print';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [266812, 5960201],
  }),
  layers: [
    new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'),
    new Geoportail('GEOGRAPHICALNAMES.NAMES'),
  ],
});

map.addControl(new LayerSwitcher());

// GeoJSON vector layer
const vector = new VectorLayer({
  properties: { name: '1914-18' },
  source: new VectorSource({
    url: '../data/fond_guerre.geojson',
    format: new GeoJSON(),
    attributions: [
      '&copy; <a href="https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire">data.culture.gouv.fr</a>',
    ],
  }),
});

map.addLayer(vector);

// Print control
const printControl = new Print();
map.addControl(printControl);

printControl.on('error', () => {
  document.body.style.opacity = '';
  console.warn('No canvas to export');
});
printControl.on('printing', () => {
  document.body.style.opacity = '0.5';
});
printControl.on('print', (event) => {
  document.body.style.opacity = '';
  if (!event.image) return;
  if (event.pdf) {
    downloadMapPdf(event);
    return;
  }
  if (!document.querySelector<HTMLInputElement>('#file')!.checked) {
    document.querySelector<HTMLImageElement>('#image img')!.src = event.image;
    return;
  }
  event.canvas.toBlob(
    (blob) =>
      downloadBlob(blob, 'map.' + event.imageType.replace('image/', '')),
    event.imageType,
    event.quality,
  );
});

Object.assign(window, { printControl });
