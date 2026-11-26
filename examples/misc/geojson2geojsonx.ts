import { downloadBlob } from '../.shared/download';
import type { FeatureCollection } from 'geojson';
import { createTopology } from '../.shared/topology';
import TopoJSON from 'ol/format/TopoJSON';
import GeoJSON from 'ol/format/GeoJSON';
import GeoJSONX from 'ol-ext/format/GeoJSONX';
import GeoJSONP from 'ol-ext/format/GeoJSONP';
import DropFile from 'ol-ext/interaction/DropFile';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Permalink from 'ol-ext/control/Permalink';
import VectorImage from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import defaultStyle from 'ol-ext/style/defaultStyle';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Select from 'ol/interaction/Select';
import PopupFeature from 'ol-ext/overlay/PopupFeature';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { Projection } from 'ol/proj';

declare const $: JQueryStatic;

let name = '';
let fileSize = 0;
let features: Feature[] | undefined;
let result = '';
let format: GeoJSON<Feature> | GeoJSONX | GeoJSONP | TopoJSON;

function setFormat() {
  const v = document.querySelector<HTMLInputElement>('#format')!.value;
  document.body.className = v;
  if (Number(document.querySelector<HTMLInputElement>('#decimals')!.value) < 6)
    $('.geojsonp .warning').hide();
  else $('.geojsonp .warning').show();
  switch (v) {
    case 'topojson': {
      format = new TopoJSON();
      break;
    }
    case 'geojsonx': {
      format = new GeoJSONX({
        deleteNullProperties:
          document.querySelector<HTMLInputElement>('#nonull')!.checked,
        layout: document.querySelector<HTMLInputElement>('#layout')!.checked
          ? 'XYZM'
          : undefined,
        decimals: Number(
          document.querySelector<HTMLInputElement>('#decimals')!.value,
        ),
        extended:
          document.querySelector<HTMLInputElement>('#extended')!.checked,
        whiteList: document.querySelector<HTMLInputElement>('#whitel')!.value
          ? document
              .querySelector<HTMLInputElement>('#whitel')!
              .value.split(',')
          : undefined,
        blackList: document.querySelector<HTMLInputElement>('#blackl')!.value
          ? document
              .querySelector<HTMLInputElement>('#blackl')!
              .value.split(',')
          : undefined,
      });
      break;
    }
    case 'geojsonp': {
      format = new GeoJSONP({
        deleteNullProperties:
          document.querySelector<HTMLInputElement>('#nonull')!.checked,
        decimals: Number(
          document.querySelector<HTMLInputElement>('#decimals')!.value,
        ),
        extended:
          document.querySelector<HTMLInputElement>('#extended')!.checked,
        whiteList: document.querySelector<HTMLInputElement>('#whitel')!.value
          ? document
              .querySelector<HTMLInputElement>('#whitel')!
              .value.split(',')
          : undefined,
        blackList: document.querySelector<HTMLInputElement>('#blackl')!.value
          ? document
              .querySelector<HTMLInputElement>('#blackl')!
              .value.split(',')
          : undefined,
      });
      break;
    }
    default: {
      format = new GeoJSON<Feature>();
      break;
    }
  }
  encode();
}
setFormat();

/** Save file */
function download() {
  const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
  downloadBlob(
    blob,
    name + '.' + document.querySelector<HTMLInputElement>('#format')!.value,
  );
}

// Add feature on drop
const dd = new DropFile(); // { projection: 'EPSG:4326' });
dd.on('loadstart', function () {
  $('#dropfile').removeClass('hover');
  $('body').addClass('isloading');
  $('.loading').html(' loading...');
});
dd.on('loadend', function (e) {
  if (!e.features) {
    $('.loading').html('<span class="warn">No valid file...</span>');
    return;
  } else {
    features = e.features;
    showFeatures(origin, features);
    name = e.file.name.replace(/\..+$/, '');
    fileSize = e.file.size;
    encode();
  }
});

function showFeatures(
  layer: VectorImage<VectorSource<Feature>>,
  features: Feature[],
) {
  layer.getSource()!.clear();
  features.forEach(function (f) {
    f = f.clone();
    f.getGeometry()?.transform('EPSG:4326', map.getView().getProjection());
    layer.getSource()!.addFeature(f);
  });
}

function encode() {
  if (!features) return;
  if (!$('body').hasClass('isloading')) {
    $('body').addClass('isloading');
    $('.loading').html(' loading...');
    setTimeout(encode, 100);
    return;
  }
  const decimals = Number(
    document.querySelector<HTMLInputElement>('#decimals')!.value,
  );
  const geojson =
    format instanceof TopoJSON
      ? createTopology(
          new GeoJSON<Feature>().writeFeaturesObject(features, {
            decimals,
          }) as FeatureCollection,
        )
      : format.writeFeaturesObject(features, { decimals });
  showFeatures(encoded, format.readFeatures(geojson));
  result = JSON.stringify(geojson);
  document.querySelector<HTMLInputElement>('#result')!.value = String(
    JSON.stringify(geojson, null, ' ').substr(0, 50000) +
      (result.length > 50000 ? '\n...' : ''),
  );
  let size;
  if (result.length > 1024 * 1024) {
    size =
      (result.length / 1024 / 1024).toFixed(2) +
      ' Mo / ' +
      (fileSize / 1024 / 1024).toFixed(2) +
      ' Mo';
  } else {
    size =
      (result.length / 1024).toFixed(0) +
      ' Ko / ' +
      (fileSize / 1024).toFixed(0) +
      ' Ko';
  }
  $('.loading').html(
    '<div class="saved">' +
      ((100 * (fileSize - result.length)) / fileSize).toFixed(0) +
      '% saved</div>' +
      features.length +
      ' feature(s) loaded.' +
      '<br/>' +
      size,
  );
  $('body').removeClass('isloading');
  if (fileSize < result.length) $('body').addClass('nosave');
  $('button').show();
}

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
  layers: [new TileLayer({ properties: { title: 'OSM' }, source: new OSM() })],
});
map.addControl(new Permalink({ visible: false, geohash: true }));

const origin = new VectorImage({
  properties: { title: 'Origin' },
  source: new VectorSource(),
  style: defaultStyle({ color: [255, 0, 0] }),
});
map.addLayer(origin);
const encoded = new VectorImage({
  properties: { title: 'Encoded' },
  source: new VectorSource(),
  // style: ol.style.Style.defaultStyle({color:[0,255,0]})
});
map.addLayer(encoded);
map.addControl(new LayerSwitcher());

const select = new Select();
map.addInteraction(select);
const popup = new PopupFeature({
  className: 'default anim',
  canFix: true,
  select: select,
});
map.addOverlay(popup);

Object.assign(window, { setFormat, download });
