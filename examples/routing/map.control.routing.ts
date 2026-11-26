import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { downloadBlob } from '../.shared/download';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Permalink from 'ol-ext/control/Permalink';
import RoutingGeoportail from 'ol-ext/control/RoutingGeoportail';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { ol_coordinate_equal } from 'ol-ext/geom/GeomUtils';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Modify from 'ol/interaction/Modify';
import Select from 'ol/interaction/Select';
import defaultStyle from 'ol-ext/style/defaultStyle';
import Hover from 'ol-ext/interaction/Hover';
import Popup from 'ol-ext/overlay/Popup';
import GeoJSON from 'ol/format/GeoJSON';
import DropFile from 'ol-ext/interaction/DropFile';
import LineString from 'ol/geom/LineString';
import * as proj from 'ol/proj';

declare const $: JQueryStatic;

// Layers
var layers = [new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2')];

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: layers,
});

map.addControl(new Permalink({ hidden: true }));

// Set the routing control
var search = new RoutingGeoportail({
  // apiKey: apiKey // 'essentiels' default key
});
map.addControl(search);

var vector = new VectorLayer({
  properties: { title: 'trajet' },
  source: new VectorSource(),
  style: [
    new Style({
      stroke: new Stroke({ color: [255, 255, 255, 0.5], width: 10 }),
    }),
    new Style({
      stroke: new Stroke({ color: [255, 0, 0, 1], width: 7 }),
      zIndex: 1,
    }),
  ],
});
map.addLayer(vector);

search.on('routing:start', function (routing) {
  $('body').addClass('routing');
});
search.on(['routing', 'error'], function (routing) {
  $('body').removeClass('routing');
});

// Preocess result
search.on('routing', function (routing) {
  if ($('.remove').prop('checked')) vector.getSource()!.clear();
  if ($('.merge').prop('checked')) {
    vector.getSource()!.addFeatures([routing.feature]);
  } else if ($('.cumul').prop('checked')) {
    const source = vector.getSource()!;
    routing.features.forEach(function (f) {
      const line = f.getGeometry();
      if (!(line instanceof LineString)) return;
      const pt1 = line.getFirstCoordinate();
      const pt2 = line.getLastCoordinate();
      var features = source.getFeaturesAtCoordinate(pt1);
      var found = false;
      for (var i = 0; i < features.length; i++) {
        const f2 = features[i];
        const geometry = f2.getGeometry();
        if (!(geometry instanceof LineString)) continue;
        // Same feature
        if (
          (ol_coordinate_equal(pt1, geometry.getFirstCoordinate()) &&
            ol_coordinate_equal(pt2, geometry.getLastCoordinate())) ||
          (ol_coordinate_equal(pt2, geometry.getFirstCoordinate()) &&
            ol_coordinate_equal(pt1, geometry.getLastCoordinate()))
        ) {
          f2.set('count', f2.get('count') + 1);
          found = true;
          break;
        }
      }
      if (!found) {
        f.set('count', 1);
        source.addFeature(f);
      }
    });
  } else {
    vector.getSource()!.addFeatures(routing.features);
  }
  setTimeout(function () {
    const extent = vector.getSource()!.getExtent();
    if (extent) map.getView().fit(extent, { duration: 1000 });
  }, 500);
});

var steps = new VectorLayer({
  properties: { title: 'Steps' },
  //ol.style.Style.defaultStyle,
  style: function (f) {
    return new Style({
      image: new Circle({
        stroke: new Stroke({
          width: 2,
          color:
            f.get('pos') === 'start'
              ? 'green'
              : f.get('pos') === 'end'
                ? 'red'
                : 'blue',
        }),
        fill: new Fill({ color: '#fff' }),
        radius: 8,
      }),
      text: new Text({
        text: String(f.get('step') + 1),
        font: 'bold 12px sans-serif',
        offsetY: 2,
      }),
    });
  },
  source: search.getSource(),
});
map.addLayer(steps);
map.addControl(new LayerSwitcher());
var modify = new Modify({ source: search.getSource() });
map.addInteraction(modify);
// is modifying
var modif = false;
modify.on('modifystart', function () {
  popup.hide();
  modif = true;
});
modify.on('modifyend', function () {
  modif = false;
  search.calculate();
});

// Dispkay information on hover
var select = new Select({ style: defaultStyle() });
map.addInteraction(select);
var hover = new Hover({
  layers: [vector, steps],
  cursor: 'pointer',
  hitTolerance: 5,
});
hover.on('enter', function (e) {
  if (modif || !(e.feature instanceof Feature)) return;
  select.getFeatures().clear();
  select.getFeatures().push(e.feature);
  if (e.feature.get('step') !== undefined) {
    content =
      e.feature.get('name') +
      '<br/>' +
      'Step: ' +
      (e.feature.get('step') + 1) +
      (e.feature.get('pos') ? ' (' + e.feature.get('pos') + ')' : '');
  } else {
    var t = e.feature.get('durationT');
    var content;
    if (t) {
      content =
        e.feature.get('name') +
        '<br/>' +
        (e.feature.get('distanceT') > 1000
          ? (e.feature.get('distanceT') / 1000).toFixed(2) + 'km'
          : e.feature.get('distanceT') + 'm') +
        ' - ' +
        (t > 3600
          ? Math.floor(t / 3600) + 'h ' + ((t % 36000) / 60).toFixed() + 'mn'
          : Math.floor(t / 60) + 'mn ' + Math.floor(t % 60) + 's');
    } else {
      t = e.feature.get('duration');
      content =
        e.feature.get('start') +
        '<br/>' +
        e.feature.get('end') +
        '<br/>' +
        (e.feature.get('distance') > 1000
          ? (e.feature.get('distance') / 1000).toFixed(2) + 'km'
          : e.feature.get('distance') + 'm') +
        ' - ' +
        (t > 3600
          ? Math.floor(t / 3600) + 'h ' + ((t % 36000) / 60).toFixed() + 'mn'
          : Math.floor(t / 60) + 'mn ' + Math.floor(t % 60) + 's');
    }
  }
  if (e.feature.get('count')) {
    content += '<br/>count: ' + e.feature.get('count');
  }
  popup.show(e.coordinate, content);
});
hover.on('hover', function (e) {
  if (!modif) popup.show(e.coordinate);
});
hover.on('leave', function (e) {
  if (!modif) select.getFeatures().clear();
  popup.hide();
});
map.addInteraction(hover);
var popup = new Popup({
  popupClass: 'black',
  positioning: 'bottom-center',
});
map.addOverlay(popup);

function save() {
  var format = new GeoJSON();
  var data = format.writeFeatures(vector.getSource()!.getFeatures(), {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'route.geojson');
}

// Drop file
var drop = new DropFile();
map.addInteraction(drop);
drop.on('addfeatures', (event) => {
  vector.getSource()!.clear();
  const waypoint = search.getSource().getFeatures()[0];
  const waypointGeometry = waypoint?.getGeometry();
  const routes = event.features.flatMap((feature) => {
    const geometry = feature.getGeometry();
    if (geometry instanceof LineString) return [geometry];
    if (geometry instanceof Point && waypointGeometry instanceof Point) {
      const a = waypointGeometry.getCoordinates();
      const b = geometry.getCoordinates();
      return [new LineString(waypoint.get('step') === 0 ? [a, b] : [b, a])];
    }
    return [];
  });
  $('.remove').prop('checked', false);
  function nextRoute() {
    const route = routes.shift();
    if (!route) return;
    search.once('routing', nextRoute);
    search.calculate([
      proj.toLonLat(route.getFirstCoordinate()),
      proj.toLonLat(route.getLastCoordinate()),
    ]);
  }
  nextRoute();
});

Object.assign(window, { search, save });
