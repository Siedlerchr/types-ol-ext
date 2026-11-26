import Feature, { type FeatureLike } from 'ol/Feature';
import { getCenter } from 'ol/extent';
import Geoportail from 'ol-ext/layer/Geoportail';
import Photo from 'ol-ext/style/Photo';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import View from 'ol/View';
import Timeline from 'ol-ext/control/Timeline';
import Select from 'ol/interaction/Select';

declare const $: JQueryStatic;

// Two base layers
var carto = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// Style function
const cache: Partial<Record<string, Style>> = {};
function style(select = false) {
  return function (f: FeatureLike) {
    var style = cache[f.get('img') + '-' + select];
    if (!style) {
      var img = new Photo({
        src: '//wsrv.nl/?url=' + f.get('img'),
        radius: select ? 20 : 15,
        shadow: 5,
        stroke: new Stroke({
          width: 4,
          color: select ? '#fff' : '#fafafa',
        }),
        onload: () => vector.changed(),
      });
      style = cache[f.get('img') + '-' + select] = new Style({
        image: img,
      });
    }
    return style;
  };
}

// GeoJSON layer with a preview attribute
var vectorSource = new VectorSource({
  url: '../data/fond_guerre.geojson',
  format: new GeoJSON<Feature>(),
  attributions: [
    "&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>",
  ],
});
var vector = new VectorLayer({
  properties: {
    name: '1914-18',
    preview:
      'https://www.culture.gouv.fr/Wave/image/memoire/2445/sap40_z0004141_v.jpg',
  },
  source: vectorSource,
  style: style(),
});

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [173664, 6166327],
  }),
  layers: [carto, vector],
});

// Create Timeline control when features are loaded
var tline = new Timeline({
  className: 'ol-zoomhover',
  source: vectorSource,
  graduation: 'day', // 'month'
  zoomButton: true,
  getHTML: function (f) {
    return (
      '<img src="//wsrv.nl/?url=' +
      f.get('img') +
      '"/> ' +
      (f.get('text') || '')
    );
  },
  getFeatureDate: function (f) {
    return f.get('date');
  },
  endFeatureDate: function (f) {
    var d = f.get('endDate');
    // Create end date
    if (!d) {
      d = new Date(f.get('date'));
      d = new Date(
        d.getTime() + (5 + 10 * Math.random()) * 10 * 24 * 60 * 60 * 1000,
      );
      f.set('endDate', d);
    }
    return d;
  },
});
map.addControl(tline);
vectorSource.once('featuresloadend', () => tline.refresh());

// Select a feature
tline.on('select', function (e) {
  // Center map on feature
  const geometry = e.feature.getGeometry();
  if (!geometry) return;
  map.getView().animate({
    center: getCenter(geometry.getExtent()),
    zoom: 10,
  });
  // Center time line on feature
  tline.setDate(e.feature);
  // Select feature on the map
  select.getFeatures().clear();
  select.getFeatures().push(e.feature);
});
// Collapse the line
tline.on('collapse', function (e) {
  if (e.collapsed) $('#map').addClass('noimg');
  else $('#map').removeClass('noimg');
});
// >croll the line
tline.on('scroll', function (e) {
  $('.options .date').text(e.date.toLocaleDateString());
});

var select = new Select({ hitTolerance: 5, style: style(true) });
map.addInteraction(select);
select.on('select', function (e) {
  var f = e.selected[0];
  if (f) {
    tline.setDate(f);
  }
});

Object.assign(window, { tline });
