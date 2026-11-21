import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import Colorize from 'ol-ext/filter/Colorize';
import Texture from 'ol-ext/filter/Texture';
import Compass from 'ol-ext/control/Compass';
import Stroke from 'ol/style/Stroke';
import Graticule from 'ol-ext/control/Graticule';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Clip from 'ol-ext/filter/Clip';
import 'ol-ext/filter/Base';

if (/MSIE|Trident/.test(navigator.userAgent)) {
  alert(
    'Oops, it seems you use IE!\nsome feature may not work correctly, try to use another navigator!',
  );
  document.querySelector<HTMLInputElement>('#sat')!.value = String(0.2);
  document.querySelector<HTMLInputElement>('#opacity')!.value = String(0.3);
}

const osm = new TileLayer({ source: new OSM() });
// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 14,
    center: [-302537, 6001071],
  }),
  layers: [osm],
});
map
  .getView()
  .fit([-375917, 5976764, -229158, 6025378], { size: map.getSize() });

// Color filter
const color = new Colorize({
  operation: 'color',
  color:
    'rgba(153,102,51,' +
    document.querySelector<HTMLInputElement>('#sat')!.value +
    ')',
  /*
      red: 153,
      green: 102,
      blue: 51,
      */
  value: Number(document.querySelector<HTMLInputElement>('#sat')!.value),
});
osm.addFilter(color);

// Texture filter
const tex = new Texture({
  src: '../data/oldmap.jpg',
  opacity: Number(document.querySelector<HTMLInputElement>('#opacity')!.value),
  rotateWithView: document.querySelector<HTMLInputElement>('#rot')!.checked,
  scale: 3,
});
osm.addFilter(tex);

// Compass
map.addControl(
  new Compass({
    src: '../data/piratecontrol.png',
    style: new Stroke({ color: '#963', width: 1 }),
  }),
);
map.addControl(
  new Compass({
    className: 'right',
    src: '../data/piratecontrol.png',
    style: new Stroke({ color: '#963', width: 1 }),
  }),
);

// Graticule
map.addControl(
  new Graticule({
    step: 0.2,
    stepCoord: 2,
    projection: 'EPSG:4326',
    //step: 1000, stepCoord: 5, projection: 'EPSG:2154',
    margin: 35,
    stroke: true,
    style: new Style({
      stroke: new Stroke({ color: 'rgba(102, 51, 0, 0.8)', width: 1 }),
      fill: new Fill({ color: 'rgba(255,255,255,0.3)' }),
      text: new Text({
        stroke: new Stroke({ color: 'rgba(255,255,255,0.5)', width: 2 }),
        fill: new Fill({ color: 'rgba(102, 51, 0, 1)' }),
      }),
    }),
    formatCoord: function (c) {
      return c.toFixed(1) + '°';
    },
  }),
);
map.addControl(
  new Graticule({
    step: 5000,
    projection: 'EPSG:3857',
    margin: 30,
    stroke: false,
    style: new Style({
      stroke: new Stroke({ color: 'rgba(102, 51, 0, 0.8)', width: 1 }),
      fill: new Fill({ color: 'rgba(255,255,255,0.3)' }),
    }),
  }),
);

// Clip
const clip = new Clip({
  coords: [
    [0.023, 0.957],
    [0, 0.463],
    [0.007, 0.42],
    [0.004, 0.397],
    [0.029, 0.383],
    [0.013, 0.383],
    [0.046, 0.367],
    [0.011, 0.371],
    [0.004, 0.349],
    [0.006, 0.297],
    [0.012, 0.265],
    [0.007, 0.246],
    [0.016, 0.191],
    [0.031, 0.191],
    [0.019, 0.171],
    [0.012, 0.1],
    [0.046, 0.001],
    [0.071, 0.012],
    [0.1, 0],
    [0.186, 0.01],
    [0.228, 0.008],
    [0.239, 0.022],
    [0.25, 0.009],
    [0.304, 0.002],
    [0.311, 0.027],
    [0.313, 0.007],
    [0.322, 0.064],
    [0.311, 0.101],
    [0.329, 0.055],
    [0.321, 0.018],
    [0.334, 0.01],
    [0.496, 0.009],
    [0.53, 0.019],
    [0.553, 0.01],
    [0.615, 0.014],
    [0.683, 0.03],
    [0.697, 0.019],
    [0.728, 0.027],
    [0.732, 0.066],
    [0.735, 0.012],
    [0.752, 0.006],
    [0.795, 0.014],
    [0.85, 0.007],
    [0.929, 0.013],
    [1, 0.204],
    [0.994, 0.324],
    [0.999, 0.393],
    [0.988, 0.464],
    [0.947, 0.46],
    [0.977, 0.47],
    [0.978, 0.479],
    [0.99, 0.489],
    [0.994, 0.572],
    [0.992, 0.669],
    [0.982, 0.673],
    [0.994, 0.689],
    [1, 0.716],
    [0.999, 0.81],
    [0.987, 0.816],
    [0.996, 0.83],
    [0.99, 0.894],
    [0.944, 1],
    [0.848, 0.993],
    [0.841, 0.97],
    [0.837, 0.993],
    [0.798, 0.981],
    [0.697, 0.98],
    [0.653, 0.986],
    [0.606, 0.981],
    [0.598, 0.968],
    [0.598, 0.941],
    [0.592, 0.982],
    [0.558, 0.988],
    [0.507, 0.983],
    [0.485, 0.988],
    [0.418, 0.978],
    [0.4, 0.969],
    [0.393, 0.98],
    [0.338, 0.984],
    [0.304, 0.977],
    [0.251, 0.984],
    [0.238, 0.979],
    [0.252, 0.915],
    [0.239, 0.969],
    [0.233, 0.953],
    [0.23, 0.984],
    [0.155, 0.971],
    [0.147, 0.957],
    [0.142, 0.974],
    [0.095, 0.976],
    [0.066, 0.98],
    [0.023, 0.957],
  ],
  units: '%',
  extent: [0, 0, 1, 1],
});
osm.addFilter(clip);

Object.assign(window, { color, tex });
