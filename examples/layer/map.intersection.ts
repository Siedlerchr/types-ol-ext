import Polygon from 'ol/geom/Polygon';
import { createJstsParser } from '../.shared/jsts';
import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import Feature from 'ol/Feature';
import { fromExtent } from 'ol/geom/Polygon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import defaultStyle from 'ol-ext/style/defaultStyle';
import Circle from 'ol/style/Circle';
import MultiPoint from 'ol/geom/MultiPoint';
import Draw from 'ol/interaction/Draw';
import * as sphere from 'ol/sphere';
import { extentIntersection } from 'ol-ext/geom/GeomUtils';
import 'ol-ext/style/FontAwesomeDef';

declare const $: JQueryStatic;

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 10,
    center: [261204.43490751847, 6250258.191535994],
  }),
  layers: [
    new Geoportail({
      layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
      visible: true,
    }),
  ],
});

var extent = [241380, 6237740, 285037, 6265025];
const extentGeometry = fromExtent(extent);
var extentFeature = new Feature(extentGeometry);
extentFeature.set('extent', true);
var vector = new VectorLayer({
  source: new VectorSource(),
  style: function (f) {
    const geometry = f.getGeometry();
    if (f.get('extent')) {
      return new Style({
        stroke: new Stroke({
          width: 1.5,
          color: '#f00',
          lineDash: [4, 5],
        }),
      });
    } else if (geometry instanceof Polygon) {
      var style = defaultStyle({
        color: '#05f',
        fillColor: [0, 128, 255, 0.5],
      });
      style.push(
        new Style({
          image: new Circle({
            stroke: new Stroke({ color: 'red', width: 4 }),
            radius: 2,
          }),
          geometry: new MultiPoint(geometry.getCoordinates()[0]),
        }),
      );
      return style;
    }
  },
});
map.addLayer(vector);
vector.getSource()!.addFeature(extentFeature);

var draw = new Draw({ type: 'Polygon', freehand: true });
map.addInteraction(draw);

var jstsParser = createJstsParser();
var jstsExtent = jstsParser?.read(extentGeometry);
var extentArea = sphere.getArea(extentGeometry);

// Calculate intersection on drawend
draw.on('drawend', function (e) {
  const drawn = e.feature.getGeometry();
  if (!(drawn instanceof Polygon)) return;
  var dt = performance.now();
  var g = extentIntersection(extent, drawn);
  dt = performance.now() - dt;
  // Using jsts
  var dt2 = performance.now();
  try {
    if (jstsParser) jstsExtent?.intersection(jstsParser.read(drawn));
  } catch (e) {}
  dt2 = performance.now() - dt2;

  vector.getSource()!.clear();
  vector.getSource()!.addFeature(extentFeature);
  if (g) vector.getSource()!.addFeature(new Feature(g));
  var a = g ? sphere.getArea(g) : 0;
  var polyArea = sphere.getArea(drawn);
  $('.options .extent span').html((extentArea / 10000).toFixed(2));
  $('.options .poly span').html((polyArea / 10000).toFixed(2));
  $('.options .diff span').html(
    (a / 10000).toFixed(2) +
      ' ha - ' +
      ((a / extentArea) * 100).toFixed(0) +
      '%',
  );
  $('.options .ol span').html(dt.toFixed(2) + ' ms');
  $('.options .jsts span').html(
    jstsParser ? dt2.toFixed(2) + ' ms' : 'unavailable',
  );
});
