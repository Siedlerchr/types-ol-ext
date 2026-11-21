import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import ModifyFeature from 'ol-ext/interaction/ModifyFeature';
import SnapGuides from 'ol-ext/interaction/SnapGuides';
import VectorImage from 'ol/layer/VectorImage';
import * as proj from 'ol/proj';

// Layers
const layers = [new TileLayer({ source: new OSM() })];

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 17,
    center: [0, 6713891],
  }),
  layers: layers,
});

// New vector layer
const source = new VectorSource();
const vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source,
});
map.addLayer(vector);

const drawi = new Draw({
  source,
  //type: "LineString"
  type: 'Polygon',
});
map.addInteraction(drawi);

const modi = new ModifyFeature({ source });
map.addInteraction(modi);

class ExampleSnapGuides extends SnapGuides {
  declare enableInitialGuides_: boolean;
}
const snapi = new ExampleSnapGuides({
  vectorClass: VectorImage,
});
snapi.setDrawInteraction(drawi);
snapi.setModifyInteraction(modi);
map.addInteraction(snapi);

// New guide on meridian (default Greenwich)
function addMeridian(x = 0) {
  const p1 = proj.transform(
    [x || 0, 1],
    'EPSG:4326',
    map.getView().getProjection(),
  );
  const p2 = proj.transform(
    [x || 0, -1],
    'EPSG:4326',
    map.getView().getProjection(),
  );
  snapi.addGuide([p1, p2]);
}
// Switch initial condition
function setInitial(b: boolean) {
  snapi.enableInitialGuides_ = b;
}

Object.assign(window, { addMeridian, setInitial });
