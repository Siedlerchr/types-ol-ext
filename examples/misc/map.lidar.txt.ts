import { register } from 'ol/proj/proj4';
import Geoportail from 'ol-ext/layer/Geoportail';
import CSS from 'ol-ext/filter/CSS';
import Map from 'ol/Map';
import View from 'ol/View';
import IDW from 'ol-ext/source/IDW';
import VectorSource from 'ol/source/Vector';
import Image from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Dialog from 'ol-ext/control/Dialog';
import TextStreamReader from 'ol-ext/util/TextStreamReader';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import proj4 from 'proj4';
import 'ol-ext/filter/Base';

// Define proj4 projection
proj4.defs(
  'EPSG:2154',
  '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);
register(proj4);

var plan = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });
plan.addFilter(new CSS({ filter: 'grayscale(1)' }));
// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [267702, 5868654],
  }),
  layers: [plan],
});

var idw = new IDW({
  useWorker: true,
  scale: 10,
  // Source that contains the data
  source: new VectorSource(),
  // Use val as weight property
  weight(feature) {
    const geometry = feature.getGeometry();
    if (!(geometry instanceof Point)) return 0;
    return max > min
      ? ((geometry.getCoordinates()[2] - min) / (max - min)) * 100
      : 0;
  },
});
var max = -Infinity;
var min = Infinity;
idw.getSource().on('addfeature', function (e) {
  const geometry = e.feature?.getGeometry();
  if (!(geometry instanceof Point)) return;
  const elevation = geometry.getCoordinates()[2];
  max = Math.max(max, elevation);
  min = Math.min(min, elevation);
});
map.addLayer(
  new Image({
    properties: { title: 'IDW' },
    source: idw,
    opacity: 0.5,
  }),
);

var vector = new VectorLayer({
  properties: { title: 'Points' },
  visible: false,
  source: idw.getSource(),
});
map.addLayer(vector);

map.addControl(new LayerSwitcher());

var dialog = new Dialog();
map.addControl(dialog);

window.addEventListener('dragenter', function (e) {
  e.preventDefault();
});
window.addEventListener('dragover', function (e) {
  e.preventDefault();
});
window.addEventListener('dragleave', function (e) {
  e.preventDefault();
});
window.addEventListener('drop', function (e) {
  e.preventDefault();
  if (e.dataTransfer) {
    var files = [];
    for (var i = 0; i < e.dataTransfer.files.length; i++)
      files.push(e.dataTransfer.files[i]);
    parseFile(files);
  }
});

function parseFile(files: File[]) {
  var file = files.pop();
  if (!file) return;

  dialog.show({
    title: 'Loading...',
    max: 1,
  });
  console.time();

  const dem = new globalThis.Map<string, number[]>();
  var tileSize = 50;

  var reader = new TextStreamReader({ file: file });
  reader.readLines(
    (line) => {
      // Read a new line / collect coords
      const [x, y, z] = line.split(',').map((value) => parseFloat(value));
      if (![x, y, z].every(Number.isFinite)) return;
      const id = Math.round(x / tileSize) + '-' + Math.round(y / tileSize);
      if (!dem.has(id)) dem.set(id, [x, y, z]);
    },
    function (t, end) {
      // on end
      if (end) {
        // Add features
        const features = Array.from(dem.values(), (coordinate) => {
          const point = new Point(coordinate);
          point.transform('EPSG:2154', map.getView().getProjection());
          return new Feature(point);
        });
        vector.getSource()!.addFeatures(features);
        const extent = vector.getSource()!.getExtent();
        if (features.length && extent) map.getView().fit(extent);
        dialog.close();
        console.timeEnd();
        // read nex tile
        if (files.length) parseFile(files);
      } else {
        // On progress
        dialog.setProgress(t);
      }
    },
  );
}
