import TileLayer from 'ol/layer/Tile';
import { Stamen } from 'ol/source';
import { Map, View, Feature } from 'ol';
import { Style, Stroke, Fill, RegularShape } from 'ol/style';
import Shadow from 'ol-ext/style/Shadow';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { LineString, Point, Polygon } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
import 'ol-ext/render/AnimExtent';
import featureAnimation from 'ol-ext/featureanimation/FeatureAnimation';
import { getKey } from 'ol/tilecoord';
// Layers
let layer = new TileLayer({
  source: new Stamen({ layer: 'terrain' }),
});

// The map
let map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: [layer],
});

let style = [
  new Style({
    image: new Shadow({
      radius: 15,
    }),
    stroke: new Stroke({
      color: [0, 0, 0, 0.3],
      width: 2,
    }),
    fill: new Fill({
      color: [0, 0, 0, 0.3],
    }),
    zIndex: -1,
  }),
  new Style({
    /* image: new Icon({ src:"data/camera.png", scale: 0.8 }), */
    image: new RegularShape({
      radius: 10,
      radius2: 5,
      points: 5,
      fill: new Fill({ color: 'blue' }),
    }),
    stroke: new Stroke({
      color: [0, 0, 255],
      width: 2,
    }),
    fill: new Fill({
      color: [0, 0, 255, 0.3],
    }),
  }),
];
style[1].getImage().getAnchor()[1] += 10;

// Vector layer
let source = new VectorSource();
let vector = new VectorLayer({
  source,
  style, // function() { return style }
});
map.addLayer(vector);

/* Use filter or opacity * /
var c = map.getView().getCenter()
var g = Polygon.fromExtent(extent.buffer(extent.boundingExtent([c]),500000));
vector.addFilter(new filter.Crop({
feature: new Feature(g),
fill: new Fill({color: [255,0,0,.5]})
}));
vector.setOpacity(.5)
/**/

// Add a feature on the map
function addFeatureAt(p: Coordinate) {
  const resolution = map.getView()?.getResolution();
  let f, r = resolution ? resolution * 10 : 0;
  switch ($('#geom').val()) {
    case 'LineString':
      f = new Feature(
        new LineString([
          [p[0] - 8 * r, p[1] - 3 * r],
          [p[0] - 2 * r, p[1] + 1 * r],
          [p[0] + 2 * r, p[1] - 1 * r],
          [p[0] + 8 * r, p[1] + 3 * r],
        ])
      );
      break;
    case 'Polygon':
      f = new Feature(
        new Polygon([
          [
            [p[0] - 4 * r, p[1] - 2 * r],
            [p[0] + 3 * r, p[1] - 2 * r],
            [p[0] + 1 * r, p[1] - 0.5 * r],
            [p[0] + 4 * r, p[1] + 2 * r],
            [p[0] - 2 * r, p[1] + 2 * r],
            [p[0] - 4 * r, p[1] - 2 * r],
          ],
        ])
      );
      break;
    case 'Point':
    default:
      f = new Feature(new Point(p));
      break;
  }


  vector.getSource().addFeature(f);
  vector.animateFeature(f, [
    new featureAnimation[$('#anim2').text()] ({
      speed: Number($('#speed').val()),
      duration: Number(1000 -Number($('#speed').val()) * 300),
      side: $('#side').prop('checked'),
    }),
    new featureAnimation[$('#anim2').text()]({
      speed: Number($('#speed').val()),
      duration: Number(1000 - Number($('#speed').val()) * 300),
      horizontal: /Slide/.test($('#anim').text()),
    }),
  ]);
}

// Add 10 random features
function add10() {
  vector.getSource().clear();
  let ex = map.getView().calculateExtent(map.getSize());
  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      addFeatureAt([
        ex[0] + Math.random() * (ex[2] - ex[0]),
        ex[1] + Math.random() * (ex[3] - ex[1]),
      ]);
    }, 100 * i);
  }
}
add10();

// Drop a feature on click
map.on('singleclick', function (evt) {
  let f,
    revers = false;
  map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    f = feature;
    return true;
  });
  if (f) {
    // Remove feature
    vector.getSource().removeFeature(f);
    // Show animation
    vector.animateFeature(f, [
      new featureAnimation[$('#anim').text()]({
        speed: Number($('#speed').val()),
        duration: Number(1000 - Number($('#speed').val()) * 300),
        side: $('#side').prop('checked'),
        revers: true,
      }),
    ]);
  } else {
    addFeatureAt(evt.coordinate);
  }



});
