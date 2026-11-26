import { loadFontAwesome } from '../.shared/font-awesome';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DBPedia from 'ol-ext/source/DBPedia';
import * as loadingstrategy from 'ol/loadingstrategy';
import { createXYZ } from 'ol/tilegrid';
import VectorLayer from 'ol/layer/Vector';
import ordering from 'ol-ext/render/Ordering';
import { ol_style_dbPediaStyleFunction } from 'ol-ext/source/DBPedia';
import Select from 'ol/interaction/Select';
import Fill from 'ol/style/Fill';
import { ol_style_clearDBPediaStyleCache } from 'ol-ext/source/DBPedia';
import GeoJSON from 'ol/format/GeoJSON';
import 'ol-ext/style/FontAwesomeDef';

declare const $: JQueryStatic;

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [261204.43490751847, 6250258.191535994],
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

// DBPedia layer source
const vectorSource = new DBPedia({
  // Tile strategy load at zoom 14
  strategy: loadingstrategy.tile(
    createXYZ({ minZoom: 14, maxZoom: 14, tileSize: 512 }),
  ),
  // Bbox strategy : reload at each move
  //strategy: ol.loadingstrategy.bbox,
  // Language
  lang: 'fr',
});

// Force layer reload on resolution change
map.getView().on('change:resolution', function (evt) {
  //vectorSource.clear();
  if ((map.getView().getZoom() ?? 0) < 14)
    $('.options').first().text('Zoom to load data...');
  else $('.options').first().text('');
});

const vector = new VectorLayer({
  properties: { name: 'DBPedia' },
  source: vectorSource,
  // Limit resolution to avoid large area request
  maxResolution: 10, // > zoom 14
  // y ordering
  renderOrder: ordering.yOrdering(),
  // default dbPedia style function
  style: ol_style_dbPediaStyleFunction(),
});

map.addLayer(vector);

// Control Select
const select = new Select({
  // select dbPedia style function
  style: ol_style_dbPediaStyleFunction({
    prefix: 'sel',
    radius: 12,
    fill: new Fill({ color: 'red' }),
  }),
});
map.addInteraction(select);
// On selected
select.getFeatures().on('add', function (e) {
  const info = $('#select').html('');
  if (e.type == 'add') {
    const el = e.element;
    $('<h2>').text(el.get('label')).appendTo(info);
    if (el.get('thumbnail'))
      $('<img>').attr('src', el.get('thumbnail')).appendTo(info);
    $('<p>').text(el.get('abstract')).appendTo(info);
  }
});
select.getFeatures().on('remove', () => $('#select').empty());

loadFontAwesome()
  .then(() => {
    ol_style_clearDBPediaStyleCache();
    vector.changed();
    console.log('FontAwesome is loaded!');
  })
  .catch((error) => console.warn('Unable to load FontAwesome', error));

function save() {
  const format = new GeoJSON();
  const data = format.writeFeatures(vectorSource.getFeatures(), {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'wiki.geojson');
}

Object.assign(window, { map, save });
