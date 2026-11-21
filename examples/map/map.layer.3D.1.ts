import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/interaction/defaults';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import render3D from 'ol-ext/layer/Render3D';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import type Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 13,
    center: [260841, 6250141],
  }),
  interactions: defaults(),
  layers: [new TileLayer({ source: new OSM() })],
});

// Create layer
const vectorSource = new VectorSource({
  url: '../data/dvf-75-2017-100m.geojson',
  // projection: 'EPSG:3857',
  format: new GeoJSON<Feature>(),
  attributions: [
    "&copy; <a href='https://cadastre.data.gouv.fr/dvf'>DGFiP</a>",
  ],
});
const vector = new VectorLayer({
  source: vectorSource,
  maxResolution: 40,
});
map.addLayer(vector);

// Set 3D renderer
const r3D = new render3D({
  layer: vector,
  style: new Style({
    stroke: new Stroke({ width: 3, color: [255, 0, 0] }),
    geometry: function (f) {
      return f.get('geom');
    },
  }),
  height: buildingHeight,
  maxResolution: 40,
  defaultHeight: 0,
});
vectorSource.once('featuresloadend', () => {
  document.querySelector<HTMLElement>('.loading')!.hidden = true;
  vectorSource.getFeatures().forEach((feature) => {
    const geometry = feature.getGeometry();
    if (geometry instanceof Polygon)
      feature.set('geom', geometry.getInteriorPoint());
  });
});

function buildingHeight(feature: Feature): number {
  return feature.get('nb') * 20;
}
let extruded = true;
function doAnime() {
  if (r3D.animating()) return;
  extruded = !extruded;
  r3D.animate({ height: extruded ? buildingHeight : 0 });
}

Object.assign(window, { doAnime });
