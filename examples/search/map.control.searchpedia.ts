import exif2geojson from 'ol-ext/utils/Exif2Geojson';
import { downloadBlob } from '../.shared/download';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import Permalink from 'ol-ext/control/Permalink';
import SearchWikipedia from 'ol-ext/control/SearchWikipedia';
import Select from 'ol/interaction/Select';
import PopupFeature from 'ol-ext/overlay/PopupFeature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import FontSymbol from 'ol-ext/style/FontSymbol';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as proj from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Coordinate } from 'ol/coordinate';

declare const $: JQueryStatic;

// Layers
var layers = [new TileLayer({ source: new OSM() })];

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: layers,
});

var perma = new Permalink({
  hidden: true,
});
map.addControl(perma);

var lang =
  perma.getUrlParam('lang') || navigator.language.split('-')[0] || 'en';

const language = document.querySelector<HTMLSelectElement>('#lang')!;
language.value = lang;
language.addEventListener('change', () => {
  perma.setUrlParam('lang', language.value);
  search.setLang(language.value);
});

// Set the control search
var search = new SearchWikipedia({
  target: $('#control').get(0),
  lang: lang,
});
map.addControl(search);

var select = new Select();
map.addInteraction(select);

var popup = new PopupFeature({
  popupClass: 'default anim',
  showImage: true,
  template: {
    title: function () {
      return 'WikiPedia';
    },
  },
  select: select,
});
map.addOverlay(popup);

var vector = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    image: new FontSymbol({
      form: 'marker',
      radius: 20,
      color: '#fff',
      glyph: 'W',
      fontSize: 0.7,
      fontStyle: 'bold',
      offsetY: -20,
      stroke: new Stroke({ color: '#fff', width: 2 }),
      fill: new Fill({ color: '#369' }),
    }),
  }),
});
map.addLayer(vector);

let feature: Feature<Point> | null = null;
function addFeature() {
  if (feature) {
    var f = feature.clone();
    // Get thumb ?
    if (document.querySelector<HTMLInputElement>('#imgsize')!.value) {
      var img = f.get('img');
      if (img) {
        img = img.split(/\/commons\//);
        img =
          img[0] +
          '/commons/thumb/' +
          img[1] +
          '/' +
          document.querySelector<HTMLInputElement>('#imgsize')!.value +
          '-' +
          img[1].split('/').slice(2).join('/');
        f.set('img', img);
      }
    }
    vector.getSource()!.addFeature(f);
  }
}

// Select feature when click on the reference index
let img: JQuery<HTMLImageElement> | undefined;
search.on('select', function (e) {
  if (img) img.off();
  $('#result').html('');
  var a = $('<a>')
    .attr('target', 'new')
    .attr('href', e.search.url)
    .appendTo($('#result'));
  $('<h3>').text(e.search.title).appendTo(a);
  if (e.search.img) {
    img = $('<img>') as JQuery<HTMLImageElement>;
    img.attr('src', e.search.img).appendTo($('#result'));
  }
  var desc = e.search.desc || '';
  if (document.querySelector<HTMLInputElement>('#text')!.value) {
    desc = desc
      .split('\n')
      .splice(
        0,
        parseInt(document.querySelector<HTMLInputElement>('#text')!.value),
      )
      .join('\n');
  }
  $('<p>').html(desc.replace('\n', '<br/>')).appendTo($('#result'));
  function showFeature(coord: Coordinate) {
    map.getView().animate({
      center: coord,
      zoom: Math.max(map.getView().getZoom() ?? 0, 13),
    });
    $('#add').show();
    feature = new Feature({
      geometry: new Point(coord),
      title: e.search.title,
      desc: desc,
      img: e.search.img,
      pageid: e.search.pageid,
      url: e.search.url,
    });
  }
  if (e.coordinate) {
    showFeature(e.coordinate);
  } else {
    // Try to get info in image exif
    if (img) {
      const image = img.get(0);
      if (!image) return;

      img.on('load', function () {
        exif2geojson([image], {
          onLoad: function (json) {
            if (json.features.length) {
              var coord = json.features[0].geometry.coordinates;
              coord = proj.transform(
                coord,
                'EPSG:4326',
                map.getView().getProjection(),
              );
              showFeature(coord);
            }
          },
        });
      });
    }
    $('#add').hide();
    feature = null;
  }
});

// Save
function save() {
  var format = new GeoJSON();
  var features = vector.getSource()!.getFeatures();
  var data = format.writeFeatures(features, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'wiki.geojson');
}

Object.assign(window, { addFeature, save });
