import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import IDW from 'ol-ext/source/IDW';
import VectorSource from 'ol/source/Vector';
import Image from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Stroke from 'ol/style/Stroke';
import Draw from 'ol/interaction/Draw';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 3,
    center: [261204.43490751847, 6250258.191535994],
  }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
});

map.addControl(new LayerSwitcher());

// IDW source
const idw = new IDW({
  /* Use workers * /
    useWorker: true,
    lib: {
      // A set of function accessible in the worker
      hue2rgb: function(h) {
        h = (h + 6) % 6;
        if (h < 1) return Math.round(h * 255);
        if (h < 3) return 255;
        if (h < 4) return Math.round((4 - h) * 255);
        return 0;
      }
    },
    getColor: function(v) {
      // Get hue
      var h = 4 - (0.04 * v);
      // Convert to RGB
      return [
        hue2rgb(h + 2),
        hue2rgb(h),
        hue2rgb(h - 2),
        255
      ];
    },
    /**/
  // scale: 8,
  // maxD: 1000000,
  // Source that contains the data
  source: new VectorSource(),
  // Use val as weight property
  weight: 'val',
});
map.addLayer(
  new Image({
    properties: { title: 'IDW' },
    source: idw,
    opacity: 0.5,
  }),
);

map.addLayer(
  new VectorLayer({
    properties: { title: 'source' },
    source: idw.getSource(),
    style: function (f) {
      return new Style({
        // image: new ol.style.Circle({ radius: 2, fill: new ol.style.Fill({ color: '#000' }) }),
        text: new Text({
          text: f.get('val').toString(),
          stroke: new Stroke({ color: [255, 255, 255, 128], width: 1.25 }),
        }),
      });
    },
  }),
);

const draw = new Draw({ type: 'Point', source: idw.getSource() });
draw.on('drawend', function (e) {
  e.feature.set(
    'val',
    parseInt(document.querySelector<HTMLInputElement>('#value')!.value),
  );
  if (document.querySelector<HTMLInputElement>('#random')!.checked)
    document.querySelector<HTMLInputElement>('#value')!.value = String(
      Math.round(Math.random() * 100),
    );
});
map.addInteraction(draw);

// Add a set of features
function addFeatures(size = 100) {
  const ext = map.getView().calculateExtent();
  const dx = ext[2] - ext[0];
  const dy = ext[3] - ext[1];
  const features = [];
  for (let i = 0; i < size; ++i) {
    const f = new Feature(
      new Point([ext[0] + dx * Math.random(), ext[1] + dy * Math.random()]),
    );
    f.set('val', Math.round(Math.random() * 100));
    features.push(f);
  }
  idw.getSource().addFeatures(features);
}

Object.assign(window, { idw, map });
