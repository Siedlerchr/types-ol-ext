import type { chartType } from 'ol-ext/style/Chart';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import Chart from 'ol-ext/style/Chart';
import Stroke from 'ol/style/Stroke';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ordering from 'ol-ext/render/Ordering';
import Select from 'ol/interaction/Select';
import { unByKey } from 'ol/Observable';
import * as easing from 'ol/easing';
import { EventsKey } from 'ol/events';

// Layers
const layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
const map = new Map({
  target: 'map',
  view: new View({ zoom: 6, center: [166326, 5992663] }),
  layers: [layer],
});

// ol.style.Chart
let animation = 1;
const styleCache: Partial<Record<string, Style[]>> = {};

function getFeatureStyle(feature: FeatureLike, sel = false) {
  const key =
    document.querySelector<HTMLInputElement>('#graph')!.value +
    '-' +
    document.querySelector<HTMLInputElement>('#color')!.value +
    '-' +
    (sel ? 'sel' : 'nsel') +
    '-' +
    feature.get('data').join('-');
  let style = styleCache[key];
  if (!style) {
    let radius = 15;
    // area proportional to data size: s=PI*r^2
    if (document.querySelector<HTMLInputElement>('#graph')!.value != 'bar') {
      radius = 8 * Math.sqrt(feature.get('size') / Math.PI);
    }
    // Create chart style
    const c = document.querySelector<HTMLInputElement>('#color')!.value;
    styleCache[key] = style = [
      new Style({
        image: new Chart({
          type: document.querySelector<HTMLSelectElement>('#graph')!
            .value as chartType,
          radius: (sel ? 1.2 : 1) * radius,
          displacement: [
            0,
            document.querySelector<HTMLInputElement>('#graph')!.value === 'bar'
              ? (sel ? 1.2 : 1) * radius
              : 0,
          ],
          data: feature.get('data') || [10, 30, 20],
          colors: /,/.test(c) ? c.split(',') : c,
          rotateWithView: true,
          animation: animation,
          stroke: new Stroke({
            color:
              document.querySelector<HTMLInputElement>('#color')!.value !=
              'neon'
                ? '#fff'
                : '#000',
            width: 2,
          }),
        }),
      }),
      /*
        new ol.style.Style({
          text: new ol.style.Text({
            text: key,//feature.get("data").join('-'),
            fill: new ol.style.Fill({
              color: '#000'
            })
          })
        }),
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            stroke: new ol.style.Stroke({ color: '#fff', width: 1.5 }),
            fill: new ol.style.Fill({ color: '#f00' })
          })
        })
        /**/
    ];
  }
  const image = style[0].getImage();
  if (image instanceof Chart) image.setAnimation(animation);
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
    size: nb,
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

const info = document.querySelector('#select')!;
select.getFeatures().on('add', (event) => {
  info.textContent = 'Selection data: ' + event.element.get('data');
});
select.getFeatures().on('remove', () => {
  info.textContent = 'No selection';
});

// Animate function
let listenerKey: EventsKey | EventsKey[] | null;
function doAnimate() {
  if (listenerKey) return;
  const start = new Date().getTime();
  const duration = 1000;
  animation = 0;
  listenerKey = vector.on('prerender', function (event) {
    const frameState = event.frameState;
    if (!frameState) return;
    const elapsed = frameState.time - start;
    if (elapsed > duration && listenerKey) {
      unByKey(listenerKey);
      listenerKey = null;
      animation = 1;
    } else {
      animation = easing.easeOut(elapsed / duration);
      frameState.animate = true;
    }
    vector.changed();
  });
  // Force redraw
  vector.changed();
  //map.renderSync();
}

// doAnimate();

Object.assign(window, { vector, doAnimate });
