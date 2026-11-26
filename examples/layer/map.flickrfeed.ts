import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/interaction/defaults';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Photo from 'ol-ext/style/Photo';
import Stroke from 'ol/style/Stroke';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import { ol_style_dbPediaStyleFunction } from 'ol-ext/source/DBPedia';
import Fill from 'ol/style/Fill';
import 'ol-ext/style/FontAwesomeDef';

declare const $: JQueryStatic;
interface FlickrItem {
  title: string;
  longitude: string;
  latitude: string;
  link: string;
  media: { m: string };
}

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [159167, 5950510],
  }),
  interactions: defaults(),
  layers: [new TileLayer({ source: new OSM() })],
});

const vector = new VectorLayer({
  properties: { name: 'DBPedia' },
  source: new VectorSource(),
  style: function (f) {
    return new Style({
      image: new Photo({
        src: f.get('img'),
        radius: 20,
        crop: true,
        shadow: 5,
        onload: function () {
          vector.changed();
        },
        stroke: new Stroke({
          width: 3,
          color: '#fff',
        }),
      }),
    });
  },
});

map.addLayer(vector);

// Load feed
$.ajax({
  url: 'https://api.flickr.com/services/feeds/geo/',
  dataType: 'jsonp',
  jsonpCallback: 'jsonFlickrFeed',
  data: {
    format: 'json',
    // A comma delimited list of tags to filter the feed by.
    tags: 'oiseau,france',
    // Control whether items must have ALL the tags (tagmode=all), or ANY (tagmode=any) of the tags. Default is ALL.
    tagmode: 'all',
    // A comma delimited list of user IDs
    ids: '',
    // The display language for the feed
    lang: 'fr-fr',
  },
  success: function (resp: { items: FlickrItem[] }) {
    console.log(resp.items.length + ' items.');
    const features: Feature<Point>[] = [];
    resp.items.forEach(function (item) {
      const feature = new Feature<Point>({ ...item });
      feature.set('img', item.media.m);
      feature.unset('media');
      const geom = new Point([
        parseFloat(item.longitude),
        parseFloat(item.latitude),
      ]);
      feature.setGeometry(
        geom.transform('EPSG:4326', map.getView().getProjection()),
      );
      features.push(feature);
    });
    vector.getSource()!.addFeatures(features);
  },
  error: function () {
    console.log('oops');
  },
});

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
    $('<h2>').text(el.get('title')).appendTo(info);
    // $("<img>").attr('src',el.get("img")).appendTo(info);
    $('<img>').attr('src', el.get('img')).appendTo(info);
    $('<a>').attr('href', el.get('link')).text('View on Flickr').appendTo(info);
  }
});
select.getFeatures().on('remove', () => $('#select').empty());

Object.assign(window, { map });
