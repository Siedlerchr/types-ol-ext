import Polygon from 'ol/geom/Polygon';
import 'ol-ext/featureanimation/FeatureAnimation';
import Geoportail from 'ol-ext/layer/Geoportail';
import Colorize from 'ol-ext/filter/Colorize';
import Map from 'ol/Map';
import View from 'ol/View';
import Permalink from 'ol-ext/control/Permalink';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import RegularShape from 'ol/style/RegularShape';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Delaunay from 'ol-ext/source/Delaunay';
import Zoom, {
  ol_featureAnimation_ZoomOut as ZoomOut,
} from 'ol-ext/featureanimation/Zoom';
import * as easing from 'ol/easing';
import Feature from 'ol/Feature';
import Blink from 'ol-ext/featureanimation/Blink';
import Bar from 'ol-ext/control/Bar';
import Draw from 'ol/interaction/Draw';
import Toggle from 'ol-ext/control/Toggle';
import Select from 'ol/interaction/Select';
import Hover from 'ol-ext/interaction/Hover';
import OlCircle from 'ol/geom/Circle';
import 'ol-ext/filter/Base';

// Base layers
var carte = new Geoportail({
  layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
  //layer: 'ORTHOIMAGERY.ORTHOPHOTOS'
  //layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS'
});
// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [205461, 5867916],
  }),
  layers: [carte],
});
map.addControl(new Permalink({ visible: false }));

// Default style
const lineStyle = [
  new Style({
    stroke: new Stroke({
      color: [0, 255, 255],
      width: 1,
    }),
    fill: new Fill({ color: [0, 255, 255, 0.2] }),
  }),
];
var circleRedStyle = new Style({
  image: new Circle({
    radius: 30,
    stroke: new Stroke({ color: [0, 255, 192], width: 1.5 }),
  }),
});
const styles: Record<string, Style[]> = {
  hexa: [
    new Style({
      image: new RegularShape({
        radius: 10,
        points: 6,
        stroke: new Stroke({
          color: [0, 255, 0],
          width: 1.5,
        }),
      }),
    }),
    new Style({
      image: new RegularShape({
        radius: 5,
        points: 6,
        fill: new Fill({
          color: [0, 255, 0],
        }),
      }),
    }),
  ],
  square: [
    new Style({
      image: new RegularShape({
        radius: 8,
        points: 4,
        angle: Math.PI / 4,
        fill: new Fill({
          color: [255, 192, 0],
        }),
      }),
    }),
  ],
  losange: [
    new Style({
      image: new RegularShape({
        radius: 10,
        points: 4,
        stroke: new Stroke({
          color: [255, 255, 0],
          width: 1.5,
        }),
      }),
    }),
    new Style({
      image: new RegularShape({
        radius: 5,
        points: 4,
        fill: new Fill({
          color: [255, 255, 0],
        }),
      }),
    }),
  ],
  triangle: [
    new Style({
      image: new RegularShape({
        radius: 12,
        points: 3,
        stroke: new Stroke({
          color: [255, 0, 0],
          width: 1.5,
        }),
      }),
    }),
    new Style({
      image: new Circle({
        radius: 4,
        fill: new Fill({
          color: [255, 0, 0],
        }),
      }),
    }),
  ],
};
var keys = Object.keys(styles);

// Node source
var nodes = new VectorSource();
nodes.on('addfeature', function (e) {
  e.feature?.set('style', keys[Math.floor(Math.random() * keys.length)]);
});
var vector = new VectorLayer({
  properties: { name: 'vector' },
  source: nodes,
  style: function (f) {
    return styles[String(f.get('style'))];
  },
});

// Delaunay source based on the node source
var delaunay = new Delaunay({
  source: nodes,
});
var triangle = new VectorLayer({
  properties: { name: 'triangle' },
  source: delaunay,
  style: function () {
    return lineStyle;
  },
});

// Add to map
map.addLayer(triangle);
map.addLayer(vector);

// Check adds
vector.getSource()!.on('addfeature', function (e) {
  const feature = e.feature;
  const geometry = feature?.getGeometry();
  if (!feature || !geometry) return;
  vector.animateFeature(
    feature,
    new Zoom({
      duration: 500,
      easing: easing.easeIn,
    }),
  );
  var f = new Feature(geometry.clone());
  f.setStyle(circleRedStyle);
  vector.animateFeature(
    f,
    new ZoomOut({
      fade: easing.easeOut,
      duration: 1500,
      easing: easing.linear,
    }),
  );
});
triangle.getSource()!.on('addfeature', function (e) {
  if (!e.feature) return;
  triangle.animateFeature(
    e.feature,
    new Blink({
      nb: 15,
      duration: 2000,
      easing: easing.easeIn,
    }),
  );
});

// Control Bar
var bar = new Bar({ toggleOne: true });
map.addControl(bar);

// Draw interaction to add new points
var draw = new Draw({ source: nodes, type: 'Point' });
bar.addControl(
  new Toggle({
    className: 'ol-text-button',
    html: 'add',
    interaction: draw,
    active: true,
  }),
);

// Delete
var del = new Select({
  layers: [vector],
  hitTolerance: 5,
});
del.on('select', function (e) {
  var f = e.selected[0];
  if (f) nodes.removeFeature(f);
  del.getFeatures().clear();
});
bar.addControl(
  new Toggle({
    className: 'ol-text-button',
    html: 'del',
    interaction: del,
  }),
);

// Select
var circle = new VectorLayer({
  properties: { name: 'circle' },
  source: new VectorSource(),
  //    style: redStyle
});
map.addLayer(circle);

// Show circumcircle on hover
var hover = new Hover({
  layers: [triangle],
});
hover.on('enter', function (e) {
  circle.getSource()!.clear();
  const geometry = e.feature.getGeometry();
  if (e.layer !== triangle || !(geometry instanceof Polygon)) return;
  const result = delaunay.getCircumCircle(geometry.getCoordinates()[0]);
  if (result.radius) {
    circle
      .getSource()!
      .addFeature(new Feature(new OlCircle(result.center, result.radius)));
  }
});
hover.on('leave', function (e) {
  circle.getSource()!.clear();
});
bar.addControl(
  new Toggle({
    className: 'ol-text-button',
    html: 'circle',
    interaction: hover,
  }),
);
