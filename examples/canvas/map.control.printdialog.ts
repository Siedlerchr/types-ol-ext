import { jsPDF } from 'jspdf';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/control/defaults';
import Geoportail from 'ol-ext/layer/Geoportail';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import CanvasAttribution from 'ol-ext/control/CanvasAttribution';
import CanvasTitle from 'ol-ext/control/CanvasTitle';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Legend from 'ol-ext/legend/Legend';
import Icon from 'ol/style/Icon';
import defaultStyle from 'ol-ext/style/defaultStyle';
import ExtLegend from 'ol-ext/control/Legend';
import CanvasScaleLine from 'ol-ext/control/CanvasScaleLine';
import PrintDialog from 'ol-ext/control/PrintDialog';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [266812, 5960201],
  }),
  controls: defaults({ attribution: false }),
  layers: [
    new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' }),
    new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS', visible: false }),
    new Geoportail({ layer: 'GEOGRAPHICALNAMES.NAMES', visible: false }),
  ],
});
map.addControl(new LayerSwitcher());
map.addControl(new CanvasAttribution({ canvas: true }));
// Add a title control
map.addControl(
  new CanvasTitle({
    title: 'my title',
    visible: false,
    style: new Style({
      text: new Text({
        font: '20px "Lucida Grande",Verdana,Geneva,Lucida,Arial,Helvetica,sans-serif',
      }),
    }),
  }),
);

// Legend
const legend = new Legend({
  title: 'Legend',
  margin: 5,
  items: [
    {
      title: 'Church',
      typeGeom: 'Point',
      style: new Style({
        image: new Icon({
          src: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Eglise_icone_2.svg',
          width: 30,
          crossOrigin: 'anonymous', // Enable print
        }),
      }),
    },
    {
      title: 'Photo',
      typeGeom: 'Point',
      style: new Style({
        image: new Icon({
          src: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Icone_appareil_photo.svg',
          width: 30,
          crossOrigin: 'anonymous', // Enable print
        }),
      }),
    },
    {
      title: 'Line',
      typeGeom: 'LineString',
      style: defaultStyle(),
    },
    {
      title: 'Polygon',
      typeGeom: 'Polygon',
      style: defaultStyle(),
    },
  ],
});

// Add a legend to the print
const legendCtrl = new ExtLegend({ legend: legend });
map.addControl(legendCtrl);

// Add a ScaleLine control
map.addControl(new CanvasScaleLine());

// Print control
const printControl = new PrintDialog({
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

printControl.on('error', () => console.warn('No canvas to export'));

document.addEventListener('keydown', function (e) {
  if (e.key === 'p' && e.ctrlKey) {
    e.preventDefault();
    printControl.print();
  }
});
