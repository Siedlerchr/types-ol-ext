import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import Chart from 'ol-ext/style/Chart';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Feature from 'ol/Feature';
import type { FeatureLike } from 'ol/Feature';
import ordering from 'ol-ext/render/Ordering';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Select from 'ol/interaction/Select';

// Layers
const layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [166326, 5992663],
  }),
  layers: [layer],
});

// Style function
const styleCache: Partial<Record<string, Style[]>> = {};

function getFeatureStyle(feature: FeatureLike, sel = false) {
  const data: number[] = feature.get('data');
  const key = JSON.stringify([sel, data]);
  let style = styleCache[key];
  if (!style) {
    const sum: number = feature.get('sum');
    // area proportional to data size: s=PI*r^2
    const radius = 8 * Math.sqrt(sum / Math.PI) * (sel ? 1.2 : 1);
    // Create chart style
    style = [
      new Style({
        image: new Chart({
          type: 'pie',
          radius: radius,
          data: data,
          rotateWithView: true,
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
        zIndex: sel ? 1 : 0,
      }),
    ];

    // Show values on select
    if (sel && sum > 0) {
      let s = 0;
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const a = ((2 * s + d) / sum) * Math.PI - Math.PI / 2;
        const v = Math.round((d / sum) * 1000);
        if (v > 0) {
          style.push(
            new Style({
              text: new Text({
                text: v / 10 + '%' /* d.toString() */,
                offsetX: Math.cos(a) * (radius + 3),
                offsetY: Math.sin(a) * (radius + 3),
                textAlign: a < Math.PI / 2 ? 'left' : 'right',
                textBaseline: 'middle',
                stroke: new Stroke({ color: '#fff', width: 2.5 }),
                fill: new Fill({ color: '#333' }),
              }),
            }),
          );
        }
        s += d;
      }
    }
  }
  styleCache[key] = style;
  return style;
}

// 30 random features with data: array of 4 values
const ext = map.getView().calculateExtent(map.getSize());
const features = [];
for (let i = 0; i < 30; ++i) {
  let nb = 0;
  const data: number[] = [];
  for (let k = 0; k < 4; k++) {
    const n = Math.round(8 * Math.random());
    data.push(n);
    nb += n;
  }
  features[i] = new Feature({
    geometry: new Point([
      ext[0] + (ext[2] - ext[0]) * Math.random(),
      ext[1] + (ext[3] - ext[1]) * Math.random(),
    ]),
    data: data,
    sum: nb,
  });
}
const vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source: new VectorSource({ features: features }),
  // y ordering
  renderOrder: ordering.yOrdering(),
  style: function (f) {
    return getFeatureStyle(f);
  },
});

map.addLayer(vector);

// Control Select
const select = new Select({
  style: function (f) {
    return getFeatureStyle(f, true);
  },
});
map.addInteraction(select);
