import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import type { Coordinate } from 'ol/coordinate';
import type { animationControler } from 'ol-ext/featureanimation/FeatureAnimation';
import Style from 'ol/style/Style';
import Shadow from 'ol-ext/style/Shadow';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import RegularShape from 'ol/style/RegularShape';
import Bounce from 'ol-ext/featureanimation/Bounce';
import Select from 'ol/interaction/Select';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';

// Layers
const layer = new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS');

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: [layer],
});
// Change pointer over feature
map.on('pointermove', function (evt) {
  const hit = map.hasFeatureAtPixel(evt.pixel);
  if (hit) map.getViewport()!.style.cursor = 'pointer';
  else map.getViewport()!.style.cursor = '';
});

// Style to draw the feature
const color = [0, 0, 255];
const fillcolor = [0, 0, 255, 0.3];
const style = [
  new Style({
    image: new Shadow({ radius: 15 }),
    stroke: new Stroke({ color: [0, 0, 0, 0.3], width: 2 }),
    fill: new Fill({ color: [0, 0, 0, 0.3] }),
    zIndex: -1,
  }),
  new Style({
    image: new RegularShape({
      radius: 10,
      radius2: 5,
      points: 5,
      displacement: [0, 10],
      fill: new Fill({ color: color }),
    }),
    /** /
      image: new ol.style.Icon({
        src: 'https://cdn.pixabay.com/photo/2014/04/02/10/45/poi-304466_960_720.png',
        scale: .05,
        anchor: [0.5, 1]
      }),
      /**/
    stroke: new Stroke({ color: color, width: 2 }),
    fill: new Fill({ color: fillcolor }),
  }),
];

// Transparent style to handle click on animation
const transparent = [0, 0, 0, 0.01];
const filltransparent = [0, 0, 0, 0];
const transparentStyle = [
  new Style({
    image: new RegularShape({
      radius: 10,
      radius2: 5,
      points: 5,
      displacement: [0, 10],
      fill: new Fill({ color: transparent }),
    }),
    stroke: new Stroke({ color: transparent, width: 2 }),
    fill: new Fill({ color: filltransparent }),
  }),
];

// Intinite loop animation
const animTab: animationControler[] = [];
const anim = new Bounce({
  duration: 800,
  hiddenStyle: transparentStyle,
});
// Continune animation if not stop by user
anim.on('animationend', function (e) {
  if (!e.user)
    animTab[e.feature.get('nb')] = vector.animateFeature(e.feature, anim);
});

// On select start/stop animation
const select = new Select({ hitTolerance: 1 });
map.addInteraction(select);
select.on('select', function (e) {
  if (e.selected.length) {
    const f = e.selected[0];
    select.getFeatures().clear();
    // Create animation if doesn't exist
    if (!animTab[f.get('nb')]) {
      animTab[f.get('nb')] = vector.animateFeature(f, anim);
    }
    // Stop animation if playing
    else if (animTab[f.get('nb')].isPlaying()) {
      animTab[f.get('nb')].stop({ user: true });
    } else {
      animTab[f.get('nb')].start();
    }
  }
});

// Vector layer
const source = new VectorSource();
const vector = new VectorLayer({
  source: source,
  style: style,
});
map.addLayer(vector);

// Add a feature on the map
function addFeatureAt(nb: number, featureType: number, p: Coordinate) {
  let f: Feature;
  const r = (map.getView().getResolution() ?? 1) * 10;
  switch (featureType) {
    case 0:
      f = new Feature(
        new LineString([
          [p[0] - 8 * r, p[1] - 3 * r],
          [p[0] - 2 * r, p[1] + 1 * r],
          [p[0] + 2 * r, p[1] - 1 * r],
          [p[0] + 8 * r, p[1] + 3 * r],
        ]),
      );
      break;
    case 1:
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
        ]),
      );
      break;
    default:
      f = new Feature(new Point(p));
      break;
  }
  f.set('nb', nb);
  source.addFeature(f);
}

// Add 10 random features
function add10() {
  // Clear and end animation loop
  source.clear();
  select.getFeatures().clear();
  const ex = map.getView().calculateExtent(map.getSize());
  // Add features after animation ends
  for (let i = 0; i < 10; i++) {
    addFeatureAt(i, Math.round(Math.random() * 3), [
      ex[0] + Math.random() * (ex[2] - ex[0]),
      ex[1] + Math.random() * (ex[3] - ex[1]),
    ]);
  }
}
add10();
