import type Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import GeoJSONX from 'ol-ext/format/GeoJSONX';
import VectorImage from 'ol/layer/VectorImage';
import Select from 'ol/interaction/Select';
import * as condition from 'ol/events/condition';
import FeatureList from 'ol-ext/control/FeatureList';

// Layers
const layers = [
  new TileLayer({
    properties: { title: 'OSM' },
    source: new OSM(),
  }),
];

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: layers,
});

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/departements.geojsonx',
  // url: '../data/habitats_doubs.geojsonx',
  format: new GeoJSONX(),
  /* large dataset * /
    url: 'https://raw.githubusercontent.com/IGNF-Ma-carte/mcstatistic/main/assets/data/example/USGS-Earthquake-2015.json',
    format: new ol.format.GeoJSON(),
    /**/
  attributions: [
    "&copy; <a href='https://www.insee.fr'>INSEE</a>",
    "&copy; <a href='https://www.data.gouv.fr/fr/datasets/geofla-r/'>IGN</a>",
  ],
});

map.addLayer(
  new VectorImage({
    properties: { name: 'Departements' },
    source: vectorSource,
  }),
);

// Select  interaction
const selecti = new Select({
  hitTolerance: 5,
  condition: condition.singleClick,
});
map.addInteraction(selecti);
// Select feature when click on the reference index
selecti.on('select', function (e) {
  const f = e.selected[0];
  if (f) {
    showInfo(f);
    listCtrl.select(f);
  }
});

function showInfo(f: Feature) {
  const list = document.querySelector('.options ul')!;
  list.replaceChildren();
  for (const [key, value] of Object.entries(f.getProperties())) {
    if (key === 'geometry') continue;
    const item = document.createElement('li');
    item.textContent = `${key}: ${value}`;
    list.append(item);
  }
}

// Select control
const listCtrl = new FeatureList({
  title: 'Communes',
  // className: 'ol-bottom',
  collapsed: false,
  features: vectorSource,
  // number: 20,
  // target: document.body
});
listCtrl.enableSort('nom', 'region', 'mag');
map.addControl(listCtrl);
listCtrl.on('select', function (e) {
  selecti.getFeatures().clear();
  selecti.getFeatures().push(e.feature);
  showInfo(e.feature);
});
listCtrl.on('dblclick', function (e) {
  const geometry = e.feature.getGeometry();
  if (!geometry) return;
  const view = map.getView();
  view.fit(geometry.getExtent());
  const zoom = view.getZoom();
  if (zoom !== undefined) view.setZoom(zoom - 1);
});

listCtrl.on(['resize', 'collapse', 'sort'], function (e) {
  console.log(e);
});

Object.assign(window, { listCtrl });
