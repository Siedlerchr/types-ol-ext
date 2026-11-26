import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Clip from 'ol-ext/filter/Clip';
import 'ol-ext/filter/Base';

const osm = new TileLayer({ source: new OSM() });
const ortho = new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS');

// The map
const map = new Map({
  target: 'map',
  view: new View({ zoom: 8, center: [247044, 6549736] }),
  layers: [osm, ortho],
});

// Clip filter
const clip = new Clip({});
ortho.addFilter(clip);

function setFilter() {
  let c: number[][] = [];
  let unit = '%';
  let extent = [0, 0, 1, 1];
  switch (document.querySelector<HTMLInputElement>('#form')!.value) {
    case 'circle': {
      for (let i = 0; i < 2 * Math.PI; i += 0.1) {
        c.push([0.5 + Math.cos(i) * 0.4, 0.5 + Math.sin(i) * 0.4]);
      }
      break;
    }
    case 'pxcircle': {
      for (let i = 0; i < 2 * Math.PI; i += 0.1) {
        c.push([
          200 * (0.5 + Math.cos(i) / 2) + 10,
          200 * (0.5 + Math.sin(i) / 2) + 10,
        ]);
      }
      extent = [0, 0, 220, 220];
      unit = 'px';
      break;
    }
    case 'square': {
      c = [
        [0.1, 0.1],
        [0.1, 0.9],
        [0.9, 0.9],
        [0.9, 0.1],
      ];
      //c = [ [0.5,0.1],[0.9,0.1],[0.9,0.5],[0.5,0.5]];
      break;
    }
    default:
      c = [
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
      ];
      break;
  }
  clip.set('coords', c);
  clip.set('units', unit);
  clip.set('extent', extent);
  clip.set(
    'keepAspectRatio',
    document.querySelector<HTMLInputElement>('#keep')!.checked,
  );
  clip.set(
    'position',
    document.querySelector<HTMLInputElement>('#position')!.value,
  );
  clip.set('color', document.querySelector<HTMLInputElement>('#color')!.value);
}
setFilter();

Object.assign(window, { setFilter });
