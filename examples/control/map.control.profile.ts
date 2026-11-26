import type { Coordinate } from 'ol/coordinate';
import type { ProfilePointerEvent } from 'ol-ext/control/Profile';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Profile from 'ol-ext/control/Profile';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import RegularShape from 'ol/style/RegularShape';
import Stroke from 'ol/style/Stroke';
import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Hover from 'ol-ext/interaction/Hover';
import { Geometry } from 'ol/geom';

// Layers
const layer = new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS');
const layer2 = new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2');

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 13,
    center: [649083, 5408224],
  }),
  layers: [layer2, layer],
});
map.addControl(new LayerSwitcher());

// New profile in the map
const profile = new Profile();
map.addControl(profile);
// New profile outside the map
const profile2 = new Profile({
  target: document.querySelector<HTMLElement>('.options')!,
  selectable: true,
  skipFirst: 5,
  zoomable: true,
  style: new Style({
    fill: new Fill({ color: '#ccc' }),
  }),
  width: 400,
  height: 200,
});
map.addControl(profile2);

// Vector style
const style = [
  new Style({
    image: new RegularShape({
      radius: 10,
      radius2: 5,
      points: 5,
      fill: new Fill({ color: 'blue' }),
    }),
    stroke: new Stroke({
      color: [255, 0, 0],
      width: 2,
    }),
  }),
];
const selStyle = [
  new Style({
    stroke: new Stroke({
      color: [0, 0, 255],
      width: 2,
    }),
  }),
];

// Vector layer
const source = new VectorSource({
  //url: '../data/192553.gpx',
  url: '../data/2009-09-04_rando.gpx',
  format: new GPX(),
});
const vector = new VectorLayer({
  source: source,
  style: function (f) {
    return f.get('select') ? selStyle : style;
  },
});
map.addLayer(vector);

// Show feature profile when loaded
let pt: Feature<Point> | undefined;
let feature: Feature | undefined;
source.once('featuresloadend', (event) => {
  feature = event.features?.[0];
  if (feature) {
    profile.setGeometry(feature);
    profile2.setGeometry(feature, {
      graduation: 250,
      amplitude: 1000,
      zmin: 0,
    });
    pt = new Feature(new Point([0, 0]));
    pt.setStyle([]);
    source.addFeature(pt);
  }
});

// Draw a point on the map when mouse fly over profile
function drawPoint(coordinate?: Coordinate) {
  if (!pt) return;
  if (coordinate) pt.setGeometry(new Point(coordinate));
  pt.setStyle(coordinate ? null : []);
}

profile.on('over', (event) => {
  profile.popup(event.coord[2] + ' m');
  drawPoint(event.coord);
});
profile.on('out', () => drawPoint());
profile2.on('over', (event) => drawPoint(event.coord));
profile2.on('out', () => drawPoint());

// Show selection
let start = 0;
let selection: Feature | undefined;
profile2.on('click', function (e) {
  if (selection) {
    source.removeFeature(selection);
    selection = undefined;
  }
});
profile2.on('dragstart', function (e) {
  start = e.index;
});
function updateSelection(event: ProfilePointerEvent) {
  const coordinates = profile2.getSelection(start, event.index);
  if (!coordinates) return;
  const line = new LineString(coordinates);
  if (selection) {
    selection.setGeometry(line);
  } else {
    selection = new Feature(line);
    selection.set('select', true);
    source.addFeature(selection);
  }
}
profile2.on('dragend', updateSelection);
profile2.on('dragging', updateSelection);
profile2.on('zoom', function (e) {
  setTimeout(function () {
    if (selection) source.removeFeature(selection);
    if (e.geometry) {
      selection = new Feature(e.geometry);
      selection.set('select', true);
      source.addFeature(selection);
    } else {
      selection = undefined;
    }
  });
});

// Show on map over
const hover = new Hover({ cursor: 'pointer', hitTolerance: 10 });
map.addInteraction(hover);
hover.on('hover', function (e) {
  // Point on the line
  const geometry = feature?.getGeometry();
  if (!geometry) return;
  drawPoint(geometry.getClosestPoint(e.coordinate));
  // Show profile
  const p = profile.showAt(e.coordinate);
  if (p) profile.popup(p[2] + ' m');
  profile2.showAt(e.coordinate);
});
hover.on('leave', function (e) {
  profile.popup('');
  profile.showAt();
  profile2.showAt();
  drawPoint();
});

Object.assign(window, { profile });
