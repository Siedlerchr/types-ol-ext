import { loadFontAwesome } from '../.shared/font-awesome';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import SearchPhoton from 'ol-ext/control/SearchPhoton';
import WikiCommons from 'ol-ext/source/WikiCommons';
import * as loadingstrategy from 'ol/loadingstrategy';
import { createXYZ } from 'ol/tilegrid';
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import ordering from 'ol-ext/render/Ordering';
import Select from 'ol/interaction/Select';
import FontSymbol from 'ol-ext/style/FontSymbol';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
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
map.addControl(new SearchPhoton({ centerOnSelect: true }));

// WikiCommons layer source
const vectorSource = new WikiCommons({
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

let iconStyle = [new Style()];
let selectStyle = [new Style()];
const vector = new VectorLayer({
  properties: { name: 'WikiCommons' },
  source: vectorSource,
  // Limit resolution to avoid large area request
  maxResolution: 10, // > zoom 14
  // y ordering
  renderOrder: ordering.yOrdering(),
  style: function () {
    return iconStyle;
  },
});

map.addLayer(vector);

// Control Select
const select = new Select({
  style: function () {
    return selectStyle;
  },
});
map.addInteraction(select);
// On select > show information
select.getFeatures().on('add', function (e) {
  const info = $('#select').html('');
  if (e.type == 'add') {
    const el = e.element;
    console.log(el.getProperties());
    $('<h2>').text(el.get('title')).appendTo(info);
    if (el.get('thumbnail')) {
      $('<img>')
        .attr('src', el.get('thumbnail'))
        .appendTo(info)
        .wrap($('<a>').attr({ href: el.get('descriptionurl'), target: 'new' }));
    }
    $('<p>')
      .text('© WikiCommons - ' + el.get('user') + ' - ' + el.get('copy'))
      .appendTo(info);
  }
});
select.getFeatures().on('remove', () => $('#select').empty());

loadFontAwesome()
  .then(() => {
    iconStyle = [
      new Style({
        image: new FontSymbol({
          fill: new Fill({ color: '#369' }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
          radius: 10,
          glyph: 'fa-camera',
        }),
      }),
    ];
    selectStyle = [
      new Style({
        image: new FontSymbol({
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
          radius: 12,
          glyph: 'fa-camera',
        }),
      }),
    ];
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
  downloadBlob(blob, 'commons.geojson');
}

Object.assign(window, { map, save });
