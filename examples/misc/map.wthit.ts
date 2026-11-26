import Map from 'ol/Map';
import { defaults } from 'ol/interaction/defaults';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import DayNight from 'ol-ext/source/DayNight';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import LineString from 'ol/geom/LineString';
import * as coordinate from 'ol/coordinate';
import Interaction from 'ol/interaction/Interaction';
import ScaleLine from 'ol/control/ScaleLine';
import Status from 'ol-ext/control/Status';

declare const $: JQueryStatic;

// The map
var map = new Map({
  target: 'map',
  interactions: defaults({ altShiftDragRotate: false, pinchRotate: false }),
  view: new View({
    zoom: 5,
    center: [0, 0],
    maxZoom: 10,
    projection: 'EPSG:4326',
  }),
});

// Earth photo
map.addLayer(
  new Geoportail({
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
  }),
);
// Day/night
var daynight = new DayNight({});
map.addLayer(
  new VectorLayer({
    source: daynight,
    style: new Style({
      fill: new Fill({
        color: [0, 0, 50, 0.5],
      }),
    }),
  }),
);

var issSource = new VectorSource({
  attributions: ['&copy; <a href="https://wheretheiss.at/">WhereTheISS.at</a>'],
});
map.addLayer(
  new VectorLayer({
    properties: { title: 'ISS' },
    className: 'vector',
    source: issSource,
    style: new Style({
      image: new Circle({
        radius: 2,
        fill: new Fill({ color: '#fff' }),
      }),
      stroke: new Stroke({
        color: [255, 255, 255, 0.75],
        width: 1.25,
      }),
    }),
  }),
);
var iss = new Feature(new Point([0, 0]));
issSource.addFeature(iss);
const issImage = new Icon({
  src: '../img/iss.png',
  scale: 0,
  crossOrigin: 'anonymous',
});
iss.setStyle(
  new Style({
    image: issImage,
  }),
);
var track = new Feature(new LineString([]));
issSource.addFeature(track);

// Get older
// https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902

interface Position {
  timestamp: number;
  longitude: number;
  latitude: number;
  altitude: number;
  velocity: number;
}
let start: Position | undefined;
let destination: Position | undefined;
let renderedAt = 0;
var delay = 50;

// Get ISS position
function trackISS() {
  // Next position in delay mn later
  var date = new Date();
  var stamp = Math.round(date.getTime() / 1000) + delay;
  $.ajax({
    url:
      'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' +
      stamp,
    success: function (pos) {
      // console.log('load destination');
      if (destination) start = destination;
      destination = pos[0];
      setTimeout(trackISS, (delay - 1) * 1000);
      // issSource.addFeature(new ol.Feature(new ol.geom.Point([pos[0].longitude, pos[0].latitude])))
    },
  });
}
$.ajax({
  url: 'https://api.wheretheiss.at/v1/satellites/25544/',
  success: function (pos) {
    start = pos;
    // Start tracking
    trackISS();
  },
});

function drawISS() {
  //var date = new Date((new Date()).getTime() - 1*60*60*1000);
  var date = new Date();
  // 25 img/s
  if (date.getTime() - renderedAt > 1000 / 25) {
    var stamp = Math.round(date.getTime() / 1000);
    // Interpolate position
    if (start && destination) {
      var sc =
        (stamp - start.timestamp) / (destination.timestamp - start.timestamp);
      renderedAt = date.getTime();
      const current = {
        position: [
          start.longitude + sc * (destination.longitude - start.longitude),
          start.latitude + sc * (destination.latitude - start.latitude),
        ],
        timestamp: date.getTime(),
      };
      var res = map.getView().getResolution();
      issImage.setScale(Math.max(0.15, 0.025 / Math.sqrt(res ?? 1)));
      issImage.setRotation(
        Math.PI / 2 +
          Math.atan2(
            destination.latitude - start.latitude,
            start.longitude - destination.longitude,
          ),
      );
      iss.getGeometry()!.setCoordinates(current.position);
      var t = track.getGeometry()!.getCoordinates();
      t.push(current.position);
      track.getGeometry()!.setCoordinates(t);
      //map.getView().animate({ center: current.position } );
      // Show info
      $('#status .lonlat').text(coordinate.toStringHDMS(current.position));
      $('#status .alt').text(
        (start.altitude + sc * (destination.altitude - start.altitude)).toFixed(
          1,
        ),
      );
      $('#status .speed').text(
        (start.velocity + sc * (destination.velocity - start.velocity)).toFixed(
          1,
        ),
      );
      $('#status .date').text(date.toLocaleString());
      // Center if not interacting
      if (!interacting) map.getView().setCenter(current.position);
      // Update day/night
      daynight.setTime(date);
    }
  }
  requestAnimationFrame(drawISS);
}
drawISS();

var interacting = false;
var tout: string | number | NodeJS.Timeout | undefined;
map.addInteraction(
  new Interaction({
    handleEvent: function (e) {
      if (e.type !== 'pointermove') {
        interacting = true;
        clearTimeout(tout);
        tout = setTimeout(function () {
          interacting = false;
        }, 500);
      }
      return true;
    },
  }),
);

map.addControl(new ScaleLine());

var ctrl = new Status();
map.addControl(ctrl);
ctrl.status($('#status').get(0));
