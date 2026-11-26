import type Feature from 'ol/Feature';
import type Geometry from 'ol/geom/Geometry';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import { downloadBlob } from '../.shared/download';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import IsochroneGeoportail from 'ol-ext/control/IsochroneGeoportail';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Dialog from 'ol-ext/control/Dialog';
import DropFile from 'ol-ext/interaction/DropFile';

declare const $: JQueryStatic;
interface BufferedGeometry {
  buffer(distance: number): BufferedGeometry;
}
declare const jsts: {
  io: {
    OL3Parser: new () => {
      read(geometry: Geometry): BufferedGeometry;
      write(geometry: BufferedGeometry): Geometry;
    };
  };
  simplify: {
    DouglasPeuckerSimplifier: {
      simplify(geometry: BufferedGeometry, tolerance: number): BufferedGeometry;
    };
  };
};

// Layers
var layers = [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })];

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: layers,
});

// Set the control grid reference
var search = new IsochroneGeoportail({
  // apiKey: apiKey
});
map.addControl(search);

var vector = new VectorLayer({
  source: new VectorSource(),
});
map.addLayer(vector);

search.on('isochrone', function (iso) {
  if (!batch.length && iso.iteration === 0) vector.getSource()!.clear();
  // Simplify using closing operation with jsts
  if (Number($('.simplify').val())) {
    var simpli = Number($('.simplify').val());
    var parser = new jsts.io.OL3Parser();
    var geom = iso.feature.getGeometry();
    if (!geom) return;
    const jstsGeom = parser.read(geom);
    var buffered = jstsGeom.buffer(simpli);
    buffered = buffered.buffer(-1 * simpli);
    buffered = jsts.simplify.DouglasPeuckerSimplifier.simplify(
      buffered,
      Math.min(10, simpli / 10),
    );
    iso.feature.setGeometry(parser.write(buffered));
  }
  // Get fearture attributes
  const owner = currentFeature;
  if (owner) {
    //      console.log(currentFeature)
    Object.keys(owner.getProperties()).forEach(function (k) {
      if (k !== 'iteration' && k !== owner.getGeometryName()) {
        iso.feature.set(k, owner.get(k));
      }
    });
  }
  vector.getSource()!.addFeature(iso.feature);
  setTimeout(function () {
    const extent = vector.getSource()!.getExtent();
    if (extent) map.getView().fit(extent, { duration: 1000 });
  }, 500);
  // Next batch
  if (batch.length) dosearch();
});

function save() {
  var format = new GeoJSON();
  var data = format.writeFeatures(vector.getSource()!.getFeatures(), {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'isochrone.geojson');
}

/* BATCH mode: load a geojson file */
let batch: Feature[] = [];
var current_iteration = 0;
let currentFeature: Feature | null = null;
var dialog = new Dialog();
map.addControl(dialog);

function dosearch() {
  currentFeature = null;
  if (!batch.length) {
    dialog.hide();
    return;
  }
  current_iteration--;
  if (current_iteration <= 0) {
    current_iteration = search.get('iter') + 1;
    batch.shift();
    dosearch();
    return;
  }
  dialog.show('Calculating: ' + batch.length + ' - ' + current_iteration);
  const geometry = batch[0].getGeometry();
  if (!(geometry instanceof SimpleGeometry)) {
    batch.shift();
    dosearch();
    return;
  }
  const pt = geometry.getFirstCoordinate();
  var val =
    search.get('method') === 'distance'
      ? search.get('distance') * 1000
      : (search.get('hour') || 0) * 60 * 60 + (search.get('minute') || 0) * 60;
  if (val) {
    currentFeature = batch[0];
    search.search(pt, val, current_iteration - 1, true);
  } else {
    batch = [];
    dialog.hide();
  }
}

var drop = new DropFile();
map.addInteraction(drop);
drop.on('addfeatures', function (e) {
  //    console.log(e.features);
  vector.getSource()!.clear();
  batch = e.features;
  current_iteration = search.get('iter') + 1;
  dosearch();
});

// Restart after error
function reRun() {
  current_iteration++;
  dosearch();
}

Object.assign(window, { search, save, reRun });
