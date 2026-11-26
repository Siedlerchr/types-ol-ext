import 'ol-ext/geom/GeomUtils';
import Polygon from 'ol/geom/Polygon';
import { createJstsParser } from '../.shared/jsts';
import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import defaultStyle from 'ol-ext/style/defaultStyle';
import OlCircle from 'ol/style/Circle';
import MultiPoint from 'ol/geom/MultiPoint';
import Draw from 'ol/interaction/Draw';
import { fromCircle } from 'ol/geom/Polygon';
import * as sphere from 'ol/sphere';
import 'ol-ext/style/FontAwesomeDef';

declare const $: JQueryStatic;

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 10,
    center: [261204, 6250258],
  }),
  layers: [
    new Geoportail({
      layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
      visible: true,
    }),
  ],
});

const circleGeometry = new Circle([261204, 6250258], 20000);
var circle = new Feature(circleGeometry);
var vector = new VectorLayer({
  source: new VectorSource(),
  style: function (f) {
    const geometry = f.getGeometry();
    if (geometry instanceof Circle) {
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
          image: new OlCircle({
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
vector.getSource()!.addFeature(circle);

var draw = new Draw({ type: 'Polygon' });
map.addInteraction(draw);

var jstsParser = createJstsParser();
var polyCircle = fromCircle(
  circleGeometry,
  Math.round(circleGeometry.getRadius() / 20),
);
var jstsCircle = jstsParser?.read(polyCircle);
var circleArea = sphere.getArea(polyCircle);

// Calculate intersection on drawend
draw.on('drawend', function (e) {
  const drawn = e.feature.getGeometry();
  if (!(drawn instanceof Polygon)) return;
  var dt = performance.now();
  var g = circleGeometry.intersection(drawn, 100);
  dt = performance.now() - dt;
  // Using jsts
  var jstsclip;
  var dt2 = performance.now();
  try {
    jstsclip = jstsParser && jstsCircle?.intersection(jstsParser.read(drawn));
  } catch (e) {}
  dt2 = performance.now() - dt2;

  vector.getSource()!.clear();
  vector.getSource()!.addFeature(circle);
  if (g) vector.getSource()!.addFeature(new Feature(g));
  var a = g ? sphere.getArea(g) : 0;
  var polyArea = sphere.getArea(drawn);
  var jstsarea =
    jstsclip && jstsParser
      ? jstsclip.isEmpty()
        ? 0
        : sphere.getArea(jstsParser.write(jstsclip))
      : NaN;
  $('.options .extent span').html((circleArea / 10000).toFixed(2));
  $('.options .poly span').html((polyArea / 10000).toFixed(2));
  $('.options .jstsclip span').html(
    jstsclip ? (jstsarea / 10000).toFixed(2) : '',
  );
  $('.options .diff span').html(
    (a / 10000).toFixed(2) +
      ' ha - ' +
      ((a / circleArea) * 100).toFixed(0) +
      '%',
  );
  $('.options .delta span').html(((jstsarea / a - 1) * 100).toFixed(3));
  $('.options .ol span').html(dt.toFixed(2) + ' ms');
  $('.options .jsts span').html(
    jstsParser ? dt2.toFixed(2) + ' ms' : 'unavailable',
  );
});
