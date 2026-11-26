import Feature, { type FeatureLike } from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
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
var stamen = new TileLayer({
  properties: { title: 'OSM' },
  source: new OSM(),
});

// Style function
var cache: Record<string, Style[]> = {};
function style(select = false) {
  return function (f: FeatureLike) {
    const magnitude = Number(f.get('mag'));
    var style = cache[f.get('mag') + '-' + select];
    if (!style) {
      var img = new Circle({
        radius: magnitude ** 2 / 2,
        fill: new Fill({
          color: select ? 'rgba(255,0,0,.5)' : 'rgba(255,128,0,.3)',
        }),
      });
      var img2 = new Circle({
        radius: magnitude ** 2 / 4,
        fill: new Fill({
          color: select ? 'rgba(255,0,0,.5)' : 'rgba(255,128,0,.3)',
        }),
      });
      style = cache[f.get('mag') + '-' + select] = [
        new Style({ image: img }),
        new Style({ image: img2 }),
      ];
    }
    return style;
  };
}

// Earthquake layer
var vectorSource = new VectorSource({
  url: '../data/USGS-Earthquake-2015-mag5.json',
  format: new GeoJSON<Feature>(),
  attributions: [
    "&copy; <a href='https://earthquake.usgs.gov/earthquakes/'>USGS</a>",
  ],
});

var vector = new VectorLayer({
  properties: { name: 'Earthquake' },
  source: vectorSource,
  style: style(),
});

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 1,
    center: [0, 0],
  }),
  layers: [stamen, vector],
});

// Create Timeline control
var tline = new Timeline({
  className: 'ol-pointer',
  features: [
    new Feature({
      text: 2015,
      date: new Date('2015/01/01'),
      endDate: new Date('2015/12/31'),
    }),
  ],
  graduation: 'day', // 'month'
  minDate: new Date('2014/06/01'),
  maxDate: new Date('2016/02/01'),
  getHTML: function (f) {
    return 2015;
  },
  getFeatureDate: function (f) {
    return f.get('date');
  },
  endFeatureDate: function (f) {
    return f.get('endDate');
  },
});
map.addControl(tline);
// Set the date when ready
setTimeout(function () {
  tline.setDate('2015');
});
tline.addButton({
  className: 'go',
  title: 'GO!',
  handleClick: function () {
    go();
  },
});

// Show features on scroll
tline.on('scroll', function (e) {
  var d = tline.roundDate(e.date, 'day');
  $('.dateStart').text(
    d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  );
  // Filter features visibility
  vectorSource.getFeatures().forEach(function (f) {
    var dt = Number(f.get('time')) - e.date.getTime();
    if (Math.abs(dt) > 1000 * 3600 * 12) {
      f.setStyle([]);
    } else {
      f.setStyle();
    }
  });
});

var select = new Select({ hitTolerance: 5, style: style(true) });
map.addInteraction(select);
select.on('select', function (e) {
  var f = e.selected[0];
  if (f) {
    // Show info
    var info = $('#select').html('');
    $('<p>')
      .text(new Date(f.get('time')).toLocaleString())
      .appendTo(info);
    $('<p>')
      .text('MAG.: ' + f.get('mag') + ' - ' + f.get('place'))
      .appendTo(info);
  } else {
    $('#select').html('');
  }
});

const timelineElement = map.getViewport()?.querySelector('.ol-timeline');
// Run on the timeline
let running: ReturnType<typeof setTimeout> | undefined;
var start = new Date('2015');
var end = new Date('2016');
function go(next = false) {
  var date = tline.getDate();
  if (running) clearTimeout(running);
  if (!next) {
    // stop
    if (date > start && date < end && running) {
      running = undefined;
      timelineElement?.classList.remove('running');
      return;
    }
    if (date > end) {
      date = start;
    }
  }
  if (date > end) {
    running = undefined;
    timelineElement?.classList.remove('running');
    return;
  }
  if (date < start) {
    date = start;
  }
  // 1 day
  date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  tline.setDate(date, { anim: false });
  // next
  timelineElement?.classList.add('running');
  running = setTimeout(function () {
    go(true);
  }, 100);
}
