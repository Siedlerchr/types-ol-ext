import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import ModifyTouch from 'ol-ext/interaction/ModifyTouch';
import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
import TextButton from 'ol-ext/control/TextButton';

// Layers
const layers = [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })];
// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  layers: layers,
});

// New vector layer
const vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source: new VectorSource(),
});
map.addLayer(vector);
vector.getSource()!.addFeature(
  new Feature(
    new Polygon([
      [
        [34243, 6305749],
        [-288626, 6000000],
        [-288626, 5757848],
        [-200000, 5500000],
        [210354, 5576845],
        [210354, 6000000],
        [34243, 6305749],
      ],
    ]),
  ),
);
vector.getSource()!.addFeature(
  new Feature(
    new LineString([
      [400000, 5664901],
      [480000, 5600000],
      [650000, 5718712],
      [700000, 6000000],
      [600000, 6200000],
      [425601, 6183449],
    ]),
  ),
);
vector.getSource()!.addFeature(new Feature(new Point([269914, 6248592])));

const select = new Select({
  layers: [vector],
  hitTolerance: 5,
});
map.addInteraction(select);

// Interaction
const modify = new ModifyTouch({
  // source: vector.getSource(),
  features: select.getFeatures(),
});
map.addInteraction(modify);

//
const bar = new Bar();
map.addControl(bar);
const removeBt = new Toggle({
  html: '<i class="fa fa-trash"></i>',
  onToggle: function (b) {
    // Prevent openning on click
    removeBt.setActive(false);
  },
  bar: new Bar({
    controls: [
      new TextButton({
        html: 'remove&nbsp;point',
        handleClick: function (b) {
          modify.removePoint();
        },
      }),
    ],
  }),
});
bar.addControl(removeBt);

// Handle bar
modify.on('showpopup', function (e) {
  //console.log(e)
  if (!modify.get('usePopup')) removeBt.setActive(true);
});
modify.on('hidepopup', function (e) {
  //console.log(e)
  removeBt.setActive(false);
});

function showmenu() {
  modify.set(
    'usePopup',
    document.querySelector<HTMLInputElement>('#menu')!.checked,
  );
  modify.setActive(true);
}

Object.assign(window, { showmenu });
