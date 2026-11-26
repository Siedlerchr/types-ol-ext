import LineString from 'ol/geom/LineString';

import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Dijkstra from 'ol-ext/geom/Dijkstra';
import * as sphere from 'ol/sphere';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Placemark from 'ol-ext/overlay/Placemark';
import { Geometry } from 'ol/geom';
import RenderFeature from 'ol/render/Feature';
import { Coordinate } from 'ol/coordinate';

declare const $: JQueryStatic;

// Calculate the speed factor
const speed: Record<string, number> = { A: 1, P: 1, R: 1, L: 1 };
function calcSpeed() {
  if (document.querySelector<HTMLInputElement>('#speed')!.checked) {
    speed.A = 1 / Math.max(Number($('.speed #A').val()), 1);
    speed.P = 1 / Math.max(Number($('.speed #P').val()), 1);
    speed.R = 1 / Math.max(Number($('.speed #R').val()), 1);
    speed.L = 1 / Math.max(Number($('.speed #L').val()), 1);
  } else {
    Object.assign(speed, { A: 1, P: 1, R: 1, L: 1 });
  }
}
calcSpeed();

// Layers
var layers = [new TileLayer({ source: new OSM() })];

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 11,
    center: [-847139, 3971185],
  }),
  layers: layers,
});

// The vector graph
var graph = new VectorSource({
  url: '../data/network.geojson',
  format: new GeoJSON<Feature>(),
});
graph.once('featuresloadend', () => $('.loading').hide());
var vector = new VectorLayer({
  properties: { title: 'Graph' },
  source: graph,
});
map.addLayer(vector);

var stations = new VectorSource({
  url: '../data/station.geojson',
  format: new GeoJSON<Feature>(),
});
map.addLayer(
  new VectorLayer({
    properties: { title: 'Stations' },
    source: stations,
  }),
);

// A layer to draw the result
var result = new VectorSource();
map.addLayer(
  new VectorLayer({
    source: result,
    style: new Style({
      stroke: new Stroke({
        width: 2,
        color: '#f00',
      }),
    }),
  }),
);

// Dijkstra
var dijkstra = new Dijkstra({
  source: graph,
});
// Start processing
dijkstra.on('start', function (e) {
  $('#warning').hide();
  $('#notfound').hide();
  $('#notfound0').hide();
  $('#result').hide();
  result.clear();
});
// Finish > show the route
dijkstra.on('finish', function (e) {
  $('#warning').hide();
  result.clear();
  console.log(e);
  if (!e.route.length) {
    if (e.wDistance === -1) $('#notfound0').show();
    else $('#notfound').show();
    $('#result').hide();
  } else {
    $('#result').show();
    var t = ((e.distance ?? 0) / 1000).toFixed(2) + 'km';
    // Weighted distance
    if (document.querySelector<HTMLInputElement>('#speed')!.checked) {
      var h = e.wDistance / 1000;
      var mn = Math.round(((e.wDistance % 1000) / 1000) * 60);

      t += '<br/>' + h.toFixed(0) + 'h ' + String(mn).padStart(2, '0') + 'mn';
    }
    $('#result span').html(t);
  }
  result.addFeatures(e.route);
  // Get stations
  e.route.forEach((feature, index) => {
    const line = feature.getGeometry();
    if (!(line instanceof LineString)) return;
    const coordinates =
      index === 0
        ? [line.getFirstCoordinate(), line.getLastCoordinate()]
        : [line.getLastCoordinate()];
    for (const coordinate of coordinates) {
      const [station] = stations.getFeaturesAtCoordinate(coordinate);
      if (station) console.log(feature.get('name'), '-', station.get('name'));
    }
  });
  // Restart from here
  start = end;
  popStart.show(start);
  popEnd.hide();
});
// Paused > resume
dijkstra.on('pause', function (e) {
  if (e.overflow) {
    $('#warning').show();
    dijkstra.resume();
  } else {
    // User pause
  }
});
// Calculating > show the current "best way"
dijkstra.on('calculating', function (e) {
  if (document.querySelector<HTMLInputElement>('#path')!.checked) {
    var route = dijkstra.getBestWay();
    result.clear();
    result.addFeatures(route);
  }
});

// Get the weight of an edge
dijkstra.weight = function (feature) {
  const type = feature ? String(feature.get('type')) : 'A';
  if (!speed[type]) console.error(type);
  return speed[type] || speed.L;
};
// Get direction of the edge
dijkstra.direction = function (feature) {
  return feature.get('dir');
};
// Get the real length of the geom
dijkstra.getLength = function (value) {
  const geometry = value instanceof Feature ? value.getGeometry() : value;
  return geometry ? sphere.getLength(geometry) : 0;
};

// Display nodes in a layer
var nodes = new VectorLayer({
  properties: { title: 'Nodes' },
  source: dijkstra.getNodeSource(),
  style: new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({ color: [255, 0, 0, 0.1] }),
    }),
  }),
});
map.addLayer(nodes);

// Start / end Placemark
var popStart = new Placemark({ popupClass: 'flagv', color: '#080' });
map.addOverlay(popStart);
var popEnd = new Placemark({ popupClass: 'flag finish', color: '#000' });
map.addOverlay(popEnd);

// Manage start / end on click
let start: Coordinate | undefined;
let end: Coordinate;
map.on('click', function (e) {
  if (!start) {
    start = e.coordinate;
    popStart.show(start);
  } else {
    const origin = start;
    popEnd.show(e.coordinate);
    setTimeout(function () {
      var se = dijkstra.path(origin, e.coordinate);
      if (se) {
        start = se[0];
        end = se[1];
      } else {
        popEnd.hide();
      }
    }, 100);
  }
});

Object.assign(window, { calcSpeed, nodes });
