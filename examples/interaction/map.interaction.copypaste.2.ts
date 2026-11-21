import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import Transform from 'ol-ext/interaction/Transform';
import * as condition from 'ol/events/condition';
import CopyPaste from 'ol-ext/interaction/CopyPaste';

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
});

var map2 = new Map({
  target: 'map2',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
});

// New vector layer
var vector = new VectorLayer({ source: new VectorSource() });
map.addLayer(vector);
vector.getSource()!.addFeature(
  new Feature(
    new LineString([
      [-288626, 5757848],
      [210354, 5576845],
      [34243, 6305749],
    ]),
  ),
);
vector.getSource()!.addFeature(
  new Feature(
    new Polygon([
      [
        [406033, 5664901],
        [689767, 5718712],
        [699551, 6149206],
        [425601, 6183449],
        [406033, 5664901],
      ],
    ]),
  ),
);

var vector2 = new VectorLayer({ source: new VectorSource() });
map2.addLayer(vector2);

// Interactions
var transform = new Transform({
  addCondition: condition.shiftKeyOnly,
});
map.addInteraction(transform);

var copy = new CopyPaste({
  //      condition: function(e) { return e.type==='pointerdown'; },
  destination: vector.getSource()!,
  features: transform.getFeatures(),
});
map.addInteraction(copy);

var transform2 = new Transform({
  addCondition: condition.shiftKeyOnly,
});
map2.addInteraction(transform2);

var copy2 = new CopyPaste({
  destination: vector2.getSource()!,
  features: transform2.getFeatures(),
});
map2.addInteraction(copy2);

// Update feature on copy
copy.on('copy', () => copy2.copy({ features: copy.getFeatures() }));
copy.on('cut', () => {
  copy2.copy({ features: copy.getFeatures() });
  transform.select();
});
copy.on('paste', function (e) {
  transform.select();
  e.features?.forEach(function (f) {
    transform.select(f, true);
  });
});

copy2.on('copy', () => copy.copy({ features: copy2.getFeatures() }));
copy2.on('cut', () => {
  copy.copy({ features: copy2.getFeatures() });
  transform2.select();
});
copy2.on('paste', function (e) {
  transform2.select();
  e.features?.forEach(function (f) {
    transform2.select(f, true);
  });
});

// Show focus
function setFocus(active: Map, inactive: Map) {
  active.getTargetElement()!.classList.add('focus');
  inactive.getTargetElement()!.classList.remove('focus');
}
map.addEventListener('focus', () => setFocus(map, map2));
map2.addEventListener('focus', () => setFocus(map2, map));
