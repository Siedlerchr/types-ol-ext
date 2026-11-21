import { register } from 'ol/proj/proj4';
import type { Coordinate } from 'ol/coordinate';
import * as proj from 'ol/proj';
import Projection from 'ol/proj/Projection';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Graticule from 'ol-ext/control/Graticule';
import proj4 from 'proj4';

// Define UTM zones
const utmProjs: string[] = [];
for (let zone = 1; zone <= 60; zone++) {
  const code = 'EPSG:' + (32600 + zone);
  proj4.defs(
    code,
    '+proj=utm +zone=' + zone + ' +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
  );
  utmProjs[zone] = code;
}
register(proj4);

const llProj = 'EPSG:4326';

const midpointX = 500000;
const width = midpointX * 2;

// Convert UTM coords from lonlat
function ll2utm(ll: Coordinate) {
  const world = Math.floor((ll[0] + 180) / 360);
  const lon = (((ll[0] % 360) + 540) % 360) - 180; // normalise any wrapx
  const lat = ll[1];
  const zone = Math.floor((180 + lon) / 6) + 1;
  const zoneCoord = proj.transform([lon, lat], llProj, utmProjs[zone]);
  const coord = [zoneCoord[0] + (zone - 1) * width, zoneCoord[1]];
  coord[0] += world * 60 * width;
  return coord;
}

// Convert UTM coords to lonlat
function utm2ll(coord: Coordinate) {
  const world = Math.floor(coord[0] / (60 * width));
  const zone = (Math.floor(coord[0] / width) % 60) + 1;
  const c0 = coord[0] % width;
  const c1 = coord[1];
  const ll = proj.transform([c0, c1], utmProjs[zone], llProj);
  if (Math.floor((180 + ll[0]) / 6) + 1 != zone) {
    ll[0] = (zone - (c0 < midpointX ? 1 : 0)) * 6 - 180;
  }
  ll[0] += world * 360;
  return ll;
}

// Define MGRS (UTM) projection / transform
const mgrs = new Projection({
  code: 'MGRS',
  units: 'm',
  extent: [0, -10000000, 60 * width, 10000000],
  global: true,
});
proj.addProjection(mgrs);
proj.addCoordinateTransforms(llProj, mgrs, ll2utm, utm2ll);

// Create map
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  // controls: ol.control.defaults({attribution: false}),
  view: new View({
    center: [259289, 5872518],
    zoom: 6,
  }),
});

// Add transform
const viewProj = map.getView().getProjection();
proj.addCoordinateTransforms(
  viewProj,
  mgrs,
  function (coord) {
    return ll2utm(proj.transform(coord, viewProj, llProj));
  },
  function (coord) {
    return proj.transform(utm2ll(coord), llProj, viewProj);
  },
);

// Create Graticule with intervals / precisions
map.addControl(
  new Graticule({
    projection: 'MGRS',
    step: 1000,
    stepCoord: 1,
    intervals: [
      1000000, 500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000,
    ],
    precision: 50000,
    formatCoord: function (coord, position) {
      if (position === 'left' || position === 'right') {
        const y = coord + 10000000;
        const index = Math.floor(y / 1000000);
        const code = 'CDEFGHJKLMNPQRSTUVWX'.charAt(index);
        const kmy = (1000 + (Math.floor(y / 1000) % 1000)).toString().slice(1);
        return code + (kmy === '000' ? '' : ' ' + kmy);
      } else {
        const zone = (100 + (Math.floor(coord / width) % 60) + 1)
          .toString()
          .slice(1);
        const kmx = (1000 + (Math.floor(coord / 1000) % 1000))
          .toString()
          .slice(1);
        return zone + (kmx === '000' ? '' : ' ' + kmx);
      }
    },
  }),
);
