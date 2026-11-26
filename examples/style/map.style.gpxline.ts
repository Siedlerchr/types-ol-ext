import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import FlowLine from 'ol-ext/style/FlowLine';
import VectorSource from 'ol/source/Vector';
import GPX from 'ol/format/GPX';
import VectorImage from 'ol/layer/VectorImage';
import Profile from 'ol-ext/control/Profile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Fill from 'ol/style/Fill';
import VectorLayer from 'ol/layer/Vector';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';
import { asString } from 'ol/color';
import Legend from 'ol-ext/legend/Legend';
import Text from 'ol/style/Text';
import ExtLegend from 'ol-ext/control/Legend';
import type { FeatureLike } from 'ol/Feature';

declare const $: JQueryStatic;

// Layers
var layer = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' });

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 13,
    //center: [740741, 5776642]
    center: [646752, 5407059],
  }),
  layers: [layer],
});

let min = Infinity;
let max = -Infinity;
function getLine(feature: FeatureLike) {
  const geometry = feature.getGeometry();
  if (geometry instanceof MultiLineString)
    return geometry.getLineString(0) ?? undefined;
  if (geometry instanceof LineString) return geometry;
  return undefined;
}
function getColor(dh: number) {
  if (dh < 128) return asString([2 * dh, 160 - dh, 0, 1]);
  return asString([255, Math.min(255, (dh - 128) * 4), (dh - 128) * 1.5, 1]);
}
const flowStyle = new FlowLine({
  visible: false,
  lineCap: 'round',
  color(feature, step) {
    const altitude = getLine(feature)?.getCoordinateAt(step)[2];
    const level =
      altitude === undefined || max <= min
        ? 0
        : (255 * (altitude - min)) / (max - min);
    return getColor(Math.max(0, Math.min(255, level)));
  },
  width: 5,
  geometry: getLine,
});
// GPX vetor layer
var source = new VectorSource({
  //url: '../data/192553.gpx',
  url: '../data/2009-09-04_rando.gpx',
  format: new GPX(),
});
var vector = new VectorImage({
  source: source,
  style: flowStyle,
});
map.addLayer(vector);

// Profile control
var profile = new Profile({
  target: $('.options').get(0),
});
map.addControl(profile);

// Show feature profile when loaded
var pt = new Feature(new Point([0, 0]));
var style = new Style({
  zIndex: 1,
  image: new RegularShape({
    radius: 10,
    radius2: 5,
    points: 5,
    fill: new Fill({ color: 'blue' }),
  }),
});
var overlay = new VectorLayer({ source: new VectorSource() });
overlay.getSource()!.addFeature(pt);
overlay.setMap(map);

source.once('featuresloadend', ({ features }) => {
  const trail = features?.find((feature) => getLine(feature));
  if (!trail) return;
  for (const point of getLine(trail)?.getCoordinates() ?? []) {
    if (Number.isFinite(point[2])) {
      min = Math.min(min, point[2]);
      max = Math.max(max, point[2]);
    }
  }
  if (Number.isFinite(min) && Number.isFinite(max)) {
    min = Math.floor(min / 10) * 10;
    max = Math.ceil(max / 10) * 10;
    createLegend();
  }
  profile.setGeometry(trail);
});
pt.setStyle([]);
profile.on('over', ({ coord }) => {
  pt.setGeometry(new Point(coord));
  pt.setStyle(style);
});
profile.on('out', () => pt.setStyle([]));

// Define a new legend
function createLegend() {
  const legend = new Legend({
    style: function (f) {
      var dh = f.get('dh');
      return [
        new Style({
          fill: new Fill({
            color: getColor(dh),
          }),
        }),
      ];
    },
    textStyle: new Text({
      font: '12px sans-serif',
    }),
    margin: 0,
    size: [10, 5],
  });
  map.addControl(new ExtLegend({ legend: legend, collapsible: false }));

  legend.addItem({});
  legend.addItem({ title: ' Altitude ' });
  legend.addItem({});
  legend.addItem({});
  legend.addItem({});
  legend.addItem({
    title: '  ' + max + 'm',
    properties: { dh: 255 },
    typeGeom: 'Polygon',
  });
  legend.addItem({ title: '', properties: { dh: 224 }, typeGeom: 'Polygon' });
  legend.addItem({ title: '', properties: { dh: 192 }, typeGeom: 'Polygon' });
  legend.addItem({ title: '', properties: { dh: 160 }, typeGeom: 'Polygon' });
  legend.addItem({ title: '', properties: { dh: 128 }, typeGeom: 'Polygon' });
  legend.addItem({ title: '', properties: { dh: 96 }, typeGeom: 'Polygon' });
  legend.addItem({ title: '', properties: { dh: 64 }, typeGeom: 'Polygon' });
  legend.addItem({
    title: '  ' + min + 'm',
    properties: { dh: 32 },
    typeGeom: 'Polygon',
  });
  legend.addItem({ title: '', properties: { dh: 0 }, typeGeom: 'Polygon' });
}
