import Polygon from 'ol/geom/Polygon';
import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Select from 'ol/interaction/Select';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Modify from 'ol/interaction/Modify';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import FeatureBin from 'ol-ext/source/FeatureBin';
import DropFile from 'ol-ext/interaction/DropFile';
import * as proj from 'ol/proj';

declare const $: JQueryStatic;

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

const select = new Select();
map.addInteraction(select);
select.on('select', function (e) {
  if (e.selected.length) {
    const f = e.selected[0].get('features');
    if (f)
      $('.options .info span').text(
        e.selected[0].get('features').length +
          ' / ' +
          e.selected[0].get('pop') +
          ' hab.',
      );
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
  source.clear();
  source.addFeatures(features);
  reset();
}

// Vector source with features to collect
var source = new VectorSource();
// Vector source with features collector
const binSource = new VectorSource({
  /**/
  url: '../data/departements.geojson',
  format: new GeoJSON<Feature>(),
  /*/
    url: 'https://macarte.ign.fr/edition/statistique/data/geometry/communes.geojsonx',
    format: new ol.format.GeoJSONX()
    /**/
});
// Force source to load
binSource.loadFeatures(
  map.getView().calculateExtent(),
  map.getView().getResolution()!,
  map.getView().getProjection(),
);

// Interaction to move the source features
const modify = new Modify({ source: source });
modify.setActive(false);
map.addInteraction(modify);
const layerSource = new VectorLayer({ source: source, visible: false });
map.addLayer(layerSource);

// Style function
let min: number, max: number;
const styleFn = function (f: import('ol/Feature').FeatureLike) {
  let color;
  if (f.get('features').length > min + (2 * (max - min)) / 3)
    color = [136, 0, 0, 0.5];
  else if (f.get('features').length > min + (max - min) / 3)
    color = [255, 165, 0, 0.5];
  else color = [0, 136, 0, 0.5];
  return [new Style({ fill: new Fill({ color: color }) })];
};
// Feature collector layer
const collector = new VectorLayer({
  style: styleFn,
  source: new FeatureBin({
    // Features to collect
    source: source,
    // Feature to use as collector
    binSource: binSource,
  }),
});
map.addLayer(collector);
// When features are loaded
collector.getSource()!.on('change', function () {
  reset();
});

// add 1000 features
addFeatures(1000);

// Add feature on drop
const dd = new DropFile({ zone: document.querySelector('#map')! });
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
  reset();
});

// Change bin
const binFile = document.querySelector<HTMLInputElement>('#binfile')!;
binFile.addEventListener('change', async () => {
  const file = binFile.files?.[0];
  if (!file) return;
  try {
    const features = new GeoJSON<Feature>().readFeatures(await file.text(), {
      featureProjection: map.getView().getProjection(),
    });
    binSource.clear();
    binSource.addFeatures(features);
  } catch (error) {
    console.error('Unable to load bin features', error);
  }
});

// Create Bin
function reset() {
  max = 0;
  min = Infinity;
  collector
    .getSource()!
    .getFeatures()
    .forEach(function (f) {
      const nb = f.get('features').length;
      if (nb > max) max = nb;
      if (nb < min) min = nb;
    });
  collector.changed();
}

// Save
function save(point = false) {
  const format = new GeoJSON();
  const features = collector.getSource()!.getGridFeatures();
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
  downloadBlob(blob, 'collector.geojson');
}

// Add population to the collector
function addPop1km() {
  $('body').addClass('waiting');
  $.ajax('../data/insee_1km.csv', {
    success: function (res) {
      const rows = String(res).split('\n').slice(1);
      collector
        .getSource()!
        .getFeatures()
        .forEach(function (b) {
          b.set('pop', 0);
        });
      rows.forEach(function (row) {
        const source = collector.getSource()!;
        const data = row.split(',').map(Number);
        if (data.length < 3 || !data.every(Number.isFinite)) return;
        let coord = [
          Number(data[0] * 1000) + 500,
          Number(data[1] * 1000) + 500,
        ];
        coord = proj.transform(
          coord,
          'EPSG:3035',
          map.getView().getProjection(),
        );
        const bin = source.getBinAt(coord);
        if (bin) {
          bin.set('pop', (bin.get('pop') || 0) + Number(data[2]));
        }
      });
      $('body').removeClass('waiting');
    },
  });
}
collector.getSource()!.setFlatAttributesFn(function (bin, features) {
  const pc = Number(
    document.querySelector<HTMLInputElement>('#percent')!.value,
  );
  if (bin.get('pop')) {
    bin.set('nb_pop', (pc * bin.get('nb')) / bin.get('pop'));
  }
});

Object.assign(window, { map, modify, layerSource, reset, save });
