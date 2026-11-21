import type Feature from 'ol/Feature';

import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/interaction/defaults';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Renderer from 'ol-ext/source/Vector3D';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 19,
    center: [-245406, 5986536], // [-245575, 5986863], //[-244777, 5989809]
  }),
  interactions: defaults(),
  layers: [new TileLayer({ source: new OSM() })],
});

// Create layer
const vectorSource = new VectorSource({
  url: '../data/ignf.json',
  // projection: 'EPSG:3857',
  format: new GeoJSON<Feature>(),
  attributions: [
    "&copy; <a href='http://professionnels.ign.fr/bdtopo'>ign.fr</a>",
  ],
});
const vector = new VectorLayer({
  source: vectorSource,
  maxResolution: 2,
});
map.addLayer(vector);

const dbpSource = new VectorSource({
  url: '../data/dbpedia.json',
  format: new GeoJSON<Feature>(),
  attributions: ['&copy; DBPedia'],
});
const dbp = new VectorLayer({
  source: dbpSource,
});
//  map.addLayer(dbp);

vectorSource.once('featuresloadend', () => {
  document.querySelector<HTMLElement>('.loading')!.hidden = true;
  setTimeout(doAnime, 200);
});

// Set 3D layer
const r3D = new Renderer({
  source: vectorSource,
  height: 0,
  maxResolution: 0.6,
  defaultHeight: 3.5,
});
map.addLayer(r3D);

// Labels
const r3D2 = new Renderer({
  source: dbpSource,
  style: new Style({
    stroke: new Stroke({ width: 1, color: 'red' }),
    fill: new Fill({ color: [255, 255, 255, 0.5] }),
    text: new Text({
      fill: new Fill({ color: '#333' }),
    }),
  }),
  height: 100,
  maxResolution: 10,
});
map.addLayer(r3D2);

let height: number | string = 0;
function doAnime() {
  if (r3D.animating()) return;
  r3D2.animate({ height: height ? 0 : 100 });
  height = height ? 0 : 'HAUTEUR';
  r3D.animate({ height: height });
}

Object.assign(window, { doAnime });
