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
import SearchBAN from 'ol-ext/control/SearchBAN';
import Bar from 'ol-ext/control/Bar';
import Button from 'ol-ext/control/Button';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
});

// New vector layer
const vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source: new VectorSource(),
});
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

const transform = new Transform({
  addCondition: condition.shiftKeyOnly,
});
map.addInteraction(transform);

const copy = new CopyPaste({
  destination: vector.getSource()!,
  features: transform.getFeatures(),
});
map.addInteraction(copy);
// Remove selection if cut
copy.on('cut', function (e) {
  transform.select();
});
copy.on('paste', function (e) {
  transform.select();
  e.features?.forEach(function (f) {
    transform.select(f, true);
  });
});

map.addControl(new SearchBAN());

map.addControl(
  new Bar({
    controls: [
      new Button({
        html: 'C',
        handleClick: function () {
          copy.copy({ silent: false });
        },
      }),
      new Button({
        html: 'X',
        handleClick: function () {
          copy.copy({ cut: true, silent: false });
        },
      }),
      new Button({
        html: 'V',
        handleClick: function () {
          copy.paste({ silent: false });
        },
      }),
    ],
  }),
);
