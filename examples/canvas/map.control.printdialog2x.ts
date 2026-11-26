import { jsPDF } from 'jspdf';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/control/defaults';
import Geoportail from 'ol-ext/layer/Geoportail';
import CanvasAttribution from 'ol-ext/control/CanvasAttribution';
import Synchronize from 'ol-ext/interaction/Synchronize';
import PrintDialog2x from 'ol-ext/control/PrintDialog2x';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [266812, 5960201],
  }),
  controls: defaults({ attribution: false }),
  layers: [
    new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' }),
    new Geoportail({ layer: 'GEOGRAPHICALNAMES.NAMES' }),
  ],
});
map.addControl(new CanvasAttribution({ canvas: true }));

const map2 = new Map({
  target: 'map2',
  view: new View({
    zoom: 5,
    center: [266812, 5960201],
  }),
  controls: defaults({ attribution: false }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
});
map2.addControl(new CanvasAttribution({ canvas: true }));

// Synchronize the maps
map.addInteraction(new Synchronize({ maps: [map2] }));
map2.addInteraction(new Synchronize({ maps: [map] }));

// Print control
const printControl = new PrintDialog2x({
  jsPDF,
  saveAs: downloadBlob,
  // target: document.querySelector('.info'),
  // targetDialog: map.getTargetElement()
  // save: false,
  // copy: false,
  // pdf: false
});
printControl.setSize('A4');
map.addControl(printControl);
printControl.setMap2(map2);

printControl.on('error', () => console.warn('No canvas to export'));
