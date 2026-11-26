import { downloadBlob } from '../.shared/download';
import DropFile from 'ol-ext/interaction/DropFile';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';

import type { FeatureCollection } from 'geojson';
import type { Objects, Topology } from 'topojson-specification';
declare const $: JQueryStatic;
declare const topojson: {
  topology(collections: Record<string, FeatureCollection>): Topology<Objects>;
};

let name = '';
let result = '';
function download() {
  const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, name + '.topojson');
}

// Add feature on drop
const dd = new DropFile({ projection: 'EPSG:4326' });
dd.on('loadstart', function () {
  $('#dropfile').removeClass('hover');
  $('body').addClass('isloading');
  $('.loading').html(' loading...');
});
dd.on('loadend', function (e) {
  const features = e.features;
  if (!features) {
    $('.loading').html('<span class="warn">No valid file...</span>');
    return;
  }
  name = e.file.name.replace(/\..+$/, '');
  const format = new GeoJSON();
  const geojson = format.writeFeaturesObject(features) as FeatureCollection;
  const topo = topojson.topology({ layer: geojson });
  result = JSON.stringify(topo);
  document.querySelector<HTMLInputElement>('#result')!.value = String(
    result.slice(0, 50000) + (result.length > 50000 ? '\n...' : ''),
  );
  $('.loading').html(' ' + features.length + ' feature(s) loaded.');
  $('body').removeClass('isloading');
  $('button').show();
});

$(document).on('dragover dragleave', function (e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.type == 'dragover') $('#dropfile').addClass('hover');
  else $('#dropfile').removeClass('hover');
  return false;
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 1,
    center: [270055, 3528229],
  }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
});

const vector = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    image: new Circle({
      fill: new Fill({ color: 'rgba(102, 68, 68, 0.6)' }),
      radius: 5,
    }),
  }),
});
map.addLayer(vector);

Object.assign(window, { download });
