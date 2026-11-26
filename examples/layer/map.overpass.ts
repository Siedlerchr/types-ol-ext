import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overpass from 'ol-ext/source/Overpass';
import * as loadingstrategy from 'ol/loadingstrategy';
import { createXYZ } from 'ol/tilegrid';
import VectorLayer from 'ol/layer/Vector';
import Select from 'ol/interaction/Select';
import * as condition from 'ol/events/condition';
import 'ol-ext/style/FontAwesomeDef';

const info = document.querySelector<HTMLElement>('#select')!;

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [261204.43490751847, 6250258.191535994],
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

function setFilter(filter: string) {
  console.log('filter:', filter.split(','));
  vectorSource = new Overpass({
    //relation: false,
    filter: filter.split(','),
    // Tile strategy load at zoom 14
    strategy: loadingstrategy.tile(
      createXYZ({ minZoom: 14, maxZoom: 14, tileSize: 512 }),
    ),
    // Bbox strategy : reload at each move
    //strategy: ol.loadingstrategy.bbox,
  });
  vector.setSource(vectorSource);
}

// DBPedia layer source
let vectorSource = new Overpass({
  //way: false,
  filter: ['highway=bus_stop'],
  //filter: [ 'leisure' ],
  // filter: [ 'leisure', 'sport=swimming' ],
  // filter: [ 'highway' ],
  // Tile strategy load at zoom 14
  strategy: loadingstrategy.tile(
    createXYZ({ minZoom: 14, maxZoom: 14, tileSize: 512 }),
  ),
  // Bbox strategy : reload at each move
  //strategy: ol.loadingstrategy.bbox,
});

// Force layer reload on resolution change
map.getView().on('change:resolution', function (evt) {
  //vectorSource.clear();
  select.getFeatures().clear();
  info.textContent =
    (map.getView().getZoom() ?? 0) < 14 ? 'Zoom to load data...' : '';
});

const vector = new VectorLayer({
  source: vectorSource,
  // Limit resolution to avoid large area request
  maxResolution: 10, // > zoom 14
});

map.addLayer(vector);

// Control Select
const select = new Select({
  hitTolerance: 3,
  condition: condition.click,
});
map.addInteraction(select);
// On selected
select.getFeatures().on('add', (e) => {
  const list = document.createElement('ul');
  for (const [key, value] of Object.entries(e.element.getProperties())) {
    if (key === 'geometry') continue;
    const item = document.createElement('li');
    const label = document.createElement('i');
    label.textContent = key;
    item.append(label, `: ${value}`);
    list.append(item);
  }
  info.replaceChildren(list);
});
select.getFeatures().on('remove', () => info.replaceChildren());

Object.assign(window, { setFilter });
