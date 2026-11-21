import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import defaultStyle from 'ol-ext/style/defaultStyle';
import Profile from 'ol-ext/style/Profile';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import VectorLayer from 'ol/layer/Vector';
import ExtProfile from 'ol-ext/control/Profile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

// Layers
const layer = new Geoportail({
  layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 13,
    //center: [740741, 5776642]
    center: [646752, 5407059],
  }),
  layers: [layer],
});

// GPX vetor layer
const source = new VectorSource({
  //url: '../data/192553.gpx',
  url: '../data/2009-09-04_rando.gpx',
  format: new GPX(),
});
const style = defaultStyle();
style.push(
  new Profile({
    stroke: new Stroke({ color: [255, 255, 255, 0.5], width: 1 }),
    fill: new Fill({ color: [255, 255, 255, 0.3] }),
    scale: 0.2,
  }),
);
const vector = new VectorLayer({
  source: source,
  style: style,
});
map.addLayer(vector);

// Profile control
const profile = new ExtProfile({
  target: document.querySelector<HTMLElement>('.options')!,
  skipFirst: 5,
});
map.addControl(profile);
source.once('change', function (e) {
  if (source.getState() === 'ready') {
    profile.setGeometry(source.getFeatures()[0]);
  }
});

// Show feature profile when loaded
const pt = new Feature(new Point([0, 0]));
const overlay = new VectorLayer({ source: new VectorSource({ features: [pt] }) });
overlay.setMap(map);

source.once('change', function (e) {
  if (source.getState() === 'ready') {
    profile.setGeometry(source.getFeatures()[0]);
  }
});

// Show a popup on over
profile.on('over', (e) => {
  pt.setGeometry(new Point(e.coord));
  pt.setStyle(style);
});
profile.on('out', () => pt.setStyle([]));
