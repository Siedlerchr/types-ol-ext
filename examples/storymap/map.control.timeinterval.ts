import Feature, { type FeatureLike } from 'ol/Feature';
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
var cache: Record<string, Style> = {};
function style(select = false) {
  return function (f: FeatureLike) {
    // Is hidden
    if (!f.get('visible')) return [];
    // Display feature on the map
    var style = cache[f.get('img') + '-' + select];
    if (!style) {
      var img = new Photo({
        src: '//wsrv.nl/?url=' + f.get('img'),
        radius: select ? 20 : 15,
        shadow: 1,
        stroke: new Stroke({
          width: 4,
          color: select ? '#fff' : '#fafafa',
        }),
        onload: function () {
          if (f instanceof Feature) f.changed();
        },
      });
      style = cache[f.get('img') + '-' + select] = new Style({
        image: img,
        zIndex: select ? 1 : 0,
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
  properties: { name: '1914-18' },
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

// One feature per year
var features = [];
for (var i = 1915; i < 1920; i++) {
  features.push(
    new Feature({
      text: i,
      date: new Date(i + '/01/01'),
      endDate: new Date(i + '/12/31'),
    }),
  );
}

// Create Timeline control
var tline = new Timeline({
  features: features,
  interval: '90d', // 90 days = 3 month interval
  graduation: 'day', // 'month'
  minDate: new Date('1914-01-01'),
  maxDate: new Date('1920-01-01'),
  getHTML: function (f) {
    return f.get('text');
  },
  getFeatureDate: function (f) {
    return f.get('date');
  },
  endFeatureDate: function (f) {
    return f.get('endDate');
  },
});
map.addControl(tline);
vectorSource.once('featuresloadend', () =>
  tline.setDate('1915-06-01', { anim: false }),
);

// Show features on scroll
tline.on('scroll', function (e) {
  // Start and end date
  $('.dateStart').text(
    e.dateStart.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  );
  $('.dateEnd').text(
    e.dateEnd.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  );
  // Filter features visibility
  vectorSource.getFeatures().forEach(function (f) {
    var date = new Date(f.get('date'));
    if (date < e.dateStart || date > e.dateEnd) {
      f.set('visible', false);
    } else {
      f.set('visible', true);
    }
  });
});

// Show feature on select
var select = new Select({ hitTolerance: 5, style: style(true) });
map.addInteraction(select);
select.on('select', function (e) {
  var f = e.selected[0];
  if (f) {
    // Center
    tline.setDate(f.get('date'));
    // Show info
    var info = $('#select').html('');
    $('<img>')
      .attr('src', '//wsrv.nl/?url=' + f.get('img'))
      .appendTo(info);
    $('<p>').text(f.get('text')).appendTo(info);
    $('<p>')
      .text(
        f.get('commune') +
          ' (' +
          f.get('region') +
          ' - ' +
          new Date(f.get('date')).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }) +
          ')',
      )
      .appendTo(info);
    $('<p>')
      .addClass('copy')
      .html('&copy; ' + f.get('copy') + ' - ' + f.get('author'))
      .appendTo(info);
  } else {
    $('#select').html('<p>Select an image.</p>');
  }
});

Object.assign(window, { tline });
