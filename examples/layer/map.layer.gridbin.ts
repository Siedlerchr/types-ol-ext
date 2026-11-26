import Polygon from 'ol/geom/Polygon';
import { downloadBlob } from '../.shared/download';
import { register } from 'ol/proj/proj4';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Select from 'ol/interaction/Select';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Modify';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import GridBin from 'ol-ext/source/GridBin';
import DropFile from 'ol-ext/interaction/DropFile';
import * as proj from 'ol/proj';
import { ol_coordinate_dist2d } from 'ol-ext/geom/GeomUtils';
import GeoJSON from 'ol/format/GeoJSON';
import proj4 from 'proj4';

declare const $: JQueryStatic;

// Define proj4 projection
proj4.defs(
  'EPSG:2154',
  '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);
proj4.defs(
  'EPSG:3035',
  '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs',
);
proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
);
proj4.defs(
  'EPSG:23032',
  '+proj=utm +zone=32 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs',
);
proj4.defs(
  'EPSG:2163',
  '+proj=laea +lat_0=45 +lon_0=-100 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +units=m +no_defs',
);

// Define projection extent
register(proj4);

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [166326, 5992663],
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

const select = new Select();
map.addInteraction(select);
select.on('select', function (e) {
  if (e.selected.length) {
    const f = e.selected[0].get('features');
    if (f) $('.options .info span').text(e.selected[0].get('features').length);
    else $('.options .info span').text('0');
  } else $('.options .info span').text('0');
});

// Create a set of features on seed points
function addFeatures(nb: number) {
  const ssize = 20; // seed size
  const ext = map.getView().calculateExtent();
  const dx = ext[2] - ext[0];
  const dy = ext[3] - ext[1];
  const dl = Math.min(dx, dy);
  const features = [];
  for (let i = 0; i < nb / ssize; ++i) {
    const seed = [ext[0] + dx * Math.random(), ext[1] + dy * Math.random()];
    for (let j = 0; j < ssize; j++) {
      const f = new Feature(
        new Point([
          seed[0] + (dl / 10) * Math.random(),
          seed[1] + (dl / 10) * Math.random(),
        ]),
      );
      features.push(f);
    }
  }
  source.clear(true);
  source.addFeatures(features);
  reset();
}

// Vector source
var source = new VectorSource();
// Interaction to move the source features
const modify = new Modify({ source: source });
modify.setActive(false);
map.addInteraction(modify);
const layerSource = new VectorLayer({ source: source, visible: false });
map.addLayer(layerSource);

// Style function
let min: number, max: number;
const prop = document.querySelector<HTMLInputElement>('#prop')!;
const styleFn = function (f: import('ol/Feature').FeatureLike) {
  let color;
  if (f.get('features').length > min + (2 * (max - min)) / 3)
    color = [136, 0, 0, 0.5];
  else if (f.get('features').length > min + (max - min) / 3)
    color = [255, 165, 0, 0.5];
  else color = [0, 136, 0, 0.5];
  // Proportional form
  if (prop.checked) {
    return [
      new Style({
        fill: new Fill({ color: color }),
        geometry: (f) => {
          const scale = Math.min(1.2, f.get('features').length / max);
          const polygon = f.getGeometry();
          if (!(polygon instanceof Polygon)) return;
          const geom = polygon.clone();
          geom.scale(scale);
          return geom;
        },
      }),
    ];
  } else {
    return [
      new Style({
        fill: new Fill({ color: color }),
      }),
    ];
  }
};
// The rid layer
const grid = new VectorLayer({
  style: styleFn,
  source: new GridBin({
    source: source,
  }),
});
map.addLayer(grid);

// Add feature on drop
const dd = new DropFile();
map.addInteraction(dd);
dd.on('loadstart', function () {
  $('body').addClass('waiting');
});
dd.on('loadend', function () {
  $('body').removeClass('waiting');
});
dd.on('addfeatures', function (event) {
  const f = event.features;
  if (!document.querySelector<HTMLInputElement>('#add')!.checked)
    source.clear(true);
  source.addFeatures(f);
});

// Create Bin
function calcMinMax() {
  max = 0;
  min = Infinity;
  grid
    .getSource()!
    .getFeatures()
    .forEach(function (f) {
      const nb = f.get('features').length;
      if (nb > max) max = nb;
      if (nb < min) min = nb;
    });
}
function reset() {
  grid
    .getSource()!
    .setSize(Number(document.querySelector<HTMLInputElement>('#size')!.value));
  grid
    .getSource()!
    .setCircle(document.querySelector<HTMLInputElement>('#circle')!.checked);
  calcMinMax();
}
// add 1000 features
addFeatures(1000);

function setProjection(p: string) {
  const p1 = map.getView().getCenter();
  if (!p1) return;
  const p2 = [p1[0], p1[1] + 1];
  const p01 = proj.transform(
    p1,
    map.getView().getProjection(),
    grid.getSource()!.get('gridProjection'),
  );
  const p02 = proj.transform(
    p2,
    map.getView().getProjection(),
    grid.getSource()!.get('gridProjection'),
  );
  grid.getSource()!.set('gridProjection', 'EPSG:' + p);
  const p11 = proj.transform(
    p1,
    map.getView().getProjection(),
    grid.getSource()!.get('gridProjection'),
  );
  const p12 = proj.transform(
    p2,
    map.getView().getProjection(),
    grid.getSource()!.get('gridProjection'),
  );
  const d =
    (Number(document.querySelector<HTMLInputElement>('#size')!.value) *
      ol_coordinate_dist2d(p11, p12)) /
    ol_coordinate_dist2d(p01, p02);
  document.querySelector<HTMLInputElement>('#size')!.value = String(
    Math.max(0.5, Math.round(d)),
  );
  //grid.getSource().setGridProjection('EPSG:'+p);
  //calcMinMax();
  reset();
}

// Save
function save(point = false) {
  const format = new GeoJSON();
  const features = grid.getSource()!.getGridFeatures();
  if (point) {
    features.forEach(function (f) {
      const geometry = f.getGeometry();
      if (geometry instanceof Polygon)
        f.setGeometry(geometry.getInteriorPoint());
    });
  }
  const data = format.writeFeatures(features, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'grid.geojson');
}

/*
  grid.getSource().setFlatAttributesFn(function (bin, features) {
  });
  */

Object.assign(window, {
  map,
  modify,
  layerSource,
  prop,
  reset,
  setProjection,
  save,
});
