import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/interaction/defaults';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style';
import Photo from 'ol-ext/style/Photo';
import Stroke from 'ol/style/Stroke';
import RegularShape from 'ol/style/RegularShape';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import DBPedia from 'ol-ext/source/DBPedia';
import * as loadingstrategy from 'ol/loadingstrategy';
import { createXYZ } from 'ol/tilegrid';
import Cluster from 'ol/source/Cluster';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import ordering from 'ol-ext/render/Ordering';
import Select from 'ol/interaction/Select';
import { FeatureLike } from 'ol/Feature';

declare const $: JQueryStatic;

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [261204.43490751847, 6250258.191535994],
  }),
  interactions: defaults(),
  layers: [new TileLayer({ source: new OSM() })],
});

// Style
const styleCache: Partial<Record<string, Style>> = {};
function getFeatureStyle(feature: FeatureLike, _resolution: number, sel = '') {
  var f = feature.get('features')[0];
  var nb = feature.get('features').length;
  var th = f.get('thumbnail');
  var k =
    th.replace(/(.*)\/(.*)\?(.*)/, '$2') +
    (nb > 1 ? '_0' : '_1') +
    (sel === 'sel' ? '_1' : '');
  var style = styleCache[k];
  if (!style) {
    styleCache[k] = style = new Style({
      image: new Photo({
        src: th,
        radius: 20,
        crop: true,
        kind: nb > 1 ? 'folio' : 'square',
        shadow: 5,
        onload: function () {
          vector.changed();
        },
        stroke: new Stroke({
          width: sel === 'sel' ? 5 : 3,
          color: sel === 'sel' ? 'red' : '#fff',
        }),
      }),
    });
  }
  if (nb > 1) {
    var count = new Style({
      image: new RegularShape({
        points: 12,
        radius: 9,
        displacement: [20, 20],
        fill: new Fill({
          color: '#fff',
        }),
      }),
      text: new Text({
        text: nb.toString(),
        font: 'bold 12px helvetica,sans-serif',
        offsetX: 20,
        offsetY: -20,
        fill: new Fill({
          color: '#000',
        }),
      }),
    });
    return [style, count];
  } else return [style];
}

// DBPedia layer source
var vectorSource = new DBPedia({
  // Tile strategy load at zoom 14
  strategy: loadingstrategy.tile(
    createXYZ({ minZoom: 14, maxZoom: 14, tileSize: 512 }),
  ),
  // Bbox strategy : reload at each move
  //strategy: ol.loadingstrategy.bbox,
  //maxResolution: 10, // > zoom 14
  // Language
  lang: 'fr',
});

// Force thumbnail to non optional
vectorSource.querySubject = function () {
  return (
    '?subject rdfs:label ?label. ' +
    '?subject dbo:thumbnail ?thumbnail.' +
    'OPTIONAL {?subject dbo:abstract ?abstract} . ' +
    'OPTIONAL {?subject rdf:type ?type}'
  );
};

// Force layer reload on resolution change
map.getView().on('change:resolution', function (evt) {
  //vectorSource.clear();
  if ((map.getView().getZoom() ?? 0) < 14)
    $('.options').first().text('Zoom to load data...');
  else $('.options').first().text('');
});

var clusterSource = new Cluster({
  distance: 60,
  source: vectorSource,
});

var vector = new AnimatedCluster({
  source: clusterSource,
  // Limit resolution to avoid large area request
  maxResolution: 40, // > zoom 12
  // y ordering
  renderOrder: ordering.yOrdering(),
  // default dbPedia style function
  style: getFeatureStyle,
});

map.addLayer(vector);

// Control Select
var select = new Select({
  // select dbPedia style function
  style: function (f, res) {
    return getFeatureStyle(f, res, 'sel');
  },
});
map.addInteraction(select);
// On selected
select.getFeatures().on('add', function (e) {
  var info = $('#select').html('');
  if (e.type == 'add') {
    var el = e.element.get('features')[0];
    $('<h2>').text(el.get('label')).appendTo(info);
    if (el.get('thumbnail'))
      $('<img>').attr('src', el.get('thumbnail')).appendTo(info);
    $('<p>').text(el.get('abstract')).appendTo(info);
  }
});

select.getFeatures().on('remove', () => $('#select').empty());
