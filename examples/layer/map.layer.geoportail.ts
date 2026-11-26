import type { Capabilities } from 'ol-ext/layer/Geoportail';
import { downloadBlob } from '../.shared/download';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Permalink from 'ol-ext/control/Permalink';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ScaleLine from 'ol/control/ScaleLine';
import Popup from 'ol-ext/overlay/Popup';
import GeoJSON from 'ol/format/GeoJSON';
import BaseLayer from 'ol/layer/Base';

declare const $: JQueryStatic;

// Key Capabilities
Geoportail.register('INSEE.FILOSOFI.NIVEAU.DE.VIE.SECRET', {
  layer: 'INSEE.FILOSOFI.NIVEAU.DE.VIE.SECRET',
  theme: 'economie',
  desc: 'Niveau de vie des individus, retraité des valeurs extrêmes (les cases hachurées correspondent aux données secrétisées)',
  server: 'https://data.geopf.fr/wmts',
  bbox: [-63.3725, -21.4756, 55.9259, 51.3121],
  format: 'image/png',
  minZoom: 6,
  maxZoom: 16,
  originators: {
    Geoservices: {
      attribution: 'Géoservices',
      href: 'https://geoservices.ign.fr/',
    },
  },
  queryable: true,
  style: 'INSEE',
  tilematrix: 'PM',
  title: 'Niveau de vie winsorisé des individus (secret signalé)',
});
Geoportail.register('INSEE.FILOSOFI.ENFANTS.0.17.ANS.SECRET', {
  layer: 'INSEE.FILOSOFI.ENFANTS.0.17.ANS.SECRET',
  theme: 'economie',
  desc: 'Nombre d’individus âgés de 0 à 17 ans dans la population (les cases hachurées correspondent aux données secrétisées)',
  server: 'https://data.geopf.fr/wmts',
  bbox: [-63.3725, -21.4756, 55.9259, 51.3121],
  format: 'image/png',
  minZoom: 6,
  maxZoom: 16,
  originators: {
    Geoservices: {
      attribution: 'Géoservices',
      href: 'https://geoservices.ign.fr/',
    },
  },
  queryable: true,
  style: 'INSEE',
  tilematrix: 'PM',
  title: '% des 0-17 ans (secret signalé)',
});
Geoportail.register('INSEE.FILOSOFI.PART.PLUS.65.ANS.SECRET', {
  layer: 'INSEE.FILOSOFI.PART.PLUS.65.ANS.SECRET',
  theme: 'economie',
  desc: 'Nombre d’individus âgés de plus de 65 ans dans la population (les cases hachurées correspondent aux données secrétisées)',
  server: 'https://data.geopf.fr/wmts',
  bbox: [-63.3725, -21.4756, 55.9259, 51.3121],
  format: 'image/png',
  minZoom: 6,
  maxZoom: 16,
  originators: {
    Geoservices: {
      attribution: 'Géoservices',
      href: 'https://geoservices.ign.fr/',
    },
  },
  queryable: true,
  style: 'INSEE',
  tilematrix: 'PM',
  title: '% des plus de 65 ans (secret signalé)',
});
Geoportail.register('INSEE.FILOSOFI.POPULATION', {
  layer: 'INSEE.FILOSOFI.POPULATION',
  theme: 'economie',
  desc: "Nombre d'individus par km²",
  server: 'https://data.geopf.fr/wmts',
  bbox: [-63.3725, -21.4756, 55.9259, 51.3121],
  format: 'image/png',
  minZoom: 6,
  maxZoom: 16,
  originators: {
    Geoservices: {
      attribution: 'Géoservices',
      href: 'https://geoservices.ign.fr/',
    },
  },
  queryable: true,
  style: 'INSEE',
  tilematrix: 'PM',
  title: 'Densité de population',
});
Geoportail.register('Aire-Parcellaire', {
  layer: 'Aire-Parcellaire',
  theme: 'parcellaire',
  desc: "Selon les règlements européens n°110/2008 du 15 janvier 2008, n°1151/2012 du 21 novembre 2012 et n°1308/2013 de l’OCM , le cahier des charges des appellations définit l’aire géographique. Le terme de « délimitation parcellaire » désigne une aire qui repose sur les limites administratives du cadastre (les parcelles) et dont le maillage suffisamment fin permet de tenir compte de variations très localisées des éléments du milieu physique. Elle correspond à l'aire de production de la matière première. Elle est incluse dans l'aire géographique. Données produites par l'Institut National des Origines et la Qualité (INAO)",
  server: 'https://data.geopf.fr/wmts',
  bbox: [-5.15047, 41.3252, 9.57054, 51.0991],
  format: 'image/png',
  minZoom: 0,
  maxZoom: 18,
  originators: {
    Geoservices: {
      attribution: 'Géoservices',
      href: 'https://geoservices.ign.fr/',
    },
  },
  queryable: true,
  style: 'normal',
  tilematrix: 'PM',
  title: 'Délimitation parcellaire AOC viticole',
});
// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [261204.43490751847, 6250258.191535994],
    /*
      center: [9.48, 42.738038240088095],
      projection: 'EPSG:4326'
      */
  }),
});

map.addControl(new LayerSwitcher({ trash: true, extent: true }));

map.addLayer(
  new Geoportail({
    layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
    properties: { permalink: 'ortho' },
    className: 'photo',
  }),
);

map.addLayer(
  new Geoportail({
    layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
    key: 'ign_scan_ws',
    visible: false,
  }),
);

map.addLayer(
  new Geoportail({
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
    properties: { permalink: 'plan' },
    className: 'plan',
    visible: true,
    opacity: 0.5,
  }),
);
map.addLayer(
  new Geoportail('CADASTRALPARCELS.PARCELLAIRE_EXPRESS', {
    properties: { permalink: 'parcel' },
    className: 'parcel',
    visible: false,
  }),
);
map.addLayer(
  new Geoportail({
    layer: 'INSEE.FILOSOFI.POPULATION',
    properties: { permalink: 'insee' },
    className: 'insee',
    visible: false,
  }),
);
map.addLayer(
  new Geoportail({
    layer: 'Aire-Parcellaire',
    properties: { permalink: 'AOC' },
    className: 'AOC',
    title: 'Délimitation AOC viticole',
    opacity: 0.5,
    visible: false,
  }),
);
map.addControl(new Permalink());

var vector = new VectorLayer({
  properties: { title: 'vector' },
  className: 'vector',
  source: new VectorSource(),
});
map.addLayer(vector);

map.addControl(new ScaleLine());

// Show information on click (getFeatureInfo)
var popup = new Popup();
map.addOverlay(popup);
map.on('click', (event) => {
  popup.hide();
  const resolution = map.getView().getResolution();
  if (resolution === undefined) return;
  for (const layer of map.getLayers().getArray().slice().reverse()) {
    if (
      !(layer instanceof Geoportail) ||
      !layer.get('queryable') ||
      !layer.getVisible()
    )
      continue;
    const pixel = layer.getData(event.pixel);
    const source = layer.getSource();
    if (!pixel || pixel instanceof DataView || !pixel[3] || !source) continue;
    vector.getSource()!.clear();
    const html = /INSEE|ORTHOIMAGERY|GEOGRAPHICALGRIDSYSTEMS|PARCELLE/.test(
      layer.get('name'),
    );
    source.getFeatureInfo(event.coordinate, resolution, {
      INFO_FORMAT: html ? 'text/html' : 'application/json',
      callback: (response) => {
        if (typeof response !== 'string' || !response) return;
        if (html) {
          const text = document.createElement('div');
          text.textContent = new DOMParser().parseFromString(
            response,
            'text/html',
          ).body.textContent;
          popup.show(event.coordinate, text);
        } else {
          try {
            vector
              .getSource()!
              .addFeatures(new GeoJSON().readFeatures(response));
          } catch (error) {
            console.warn('Unable to read Geoportail feature info', error);
          }
        }
      },
    });
    break;
  }
});

let currentLayer: Geoportail | undefined;
let currentCap: Capabilities = {};
function addLayer() {
  if (currentLayer) map.addLayer(currentLayer);
}

// Save capabilities
function saveCapabilities() {
  var k = document.querySelector<HTMLInputElement>('#key')!.value;
  // Export JS
  var js =
    '// Define global\n' +
    'if (!window.geoportailConfig) window.geoportailConfig = { capabilities: {} };\n' +
    "window.geoportailConfig.capabilities['default'] = " +
    (k ? "window.geoportailConfig.capabilities['" + k + "'] = " : '') +
    '{';
  for (var c in currentCap) {
    if (k !== currentCap[c].key) {
      k = currentCap[c].key ?? '';
      js += '\n// --- ' + k + '----';
    }
    js += '\n  "' + c + '": ' + JSON.stringify(currentCap[c]) + ',';
  }
  js += '\n};';
  // console.log(currentCap); return;
  var blob = new Blob([js], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'capabilities.js');
}

// Get capapbilities
function loadCapabilities(k?: string, add = false) {
  $('#result').hide();
  $('#layer').hide();
  $('#code').text('');
  $('#result label span').text('');
  if (!k) {
    k = document.querySelector<HTMLInputElement>('#key')!.value;
  }
  $('#keys').val('');
  if (k) {
    if (k === 'gpf') k = '';
    Geoportail.getCapabilities(k)
      .then(function (cap) {
        $('#result').show();
        var ul = $('.options ul');
        if (!add) {
          ul.html('');
          currentCap = {};
        }
        Object.keys(cap).forEach(function (l) {
          currentCap[l] = cap[l];
          var ck = cap[l];
          $('<li>')
            .text(l)
            .click(function () {
              $('#code').text(
                'ol.layer.Geoportail.register(' +
                  '"' +
                  l +
                  '", ' +
                  JSON.stringify(ck) +
                  ');\n' +
                  "var layer = new ol.layer.Geoportail({ layer: '" +
                  l +
                  "' });",
              );
              $('#layer').show();
              $('#result label span').text(l);
              Geoportail.register(l, ck);
              currentLayer = new Geoportail({
                layer: l,
                projection: map.getView().getProjection(),
              });
            })
            .appendTo(ul);
        });
      })
      .catch(function (e) {
        alert('Error while loading capabilities for key "' + k + '".');
      });
  }
}

// Load js register
function loadRegister() {
  var register = '';
  var k = document.querySelector<HTMLInputElement>('#key')!.value;
  Object.keys(currentCap).forEach(function (l) {
    var ck = currentCap[l];
    if (k !== ck.key) {
      k = ck.key ?? '';
      register += '// --- ' + k + ' ----\n';
    }
    register +=
      'ol.layer.Geoportail.register(' +
      '"' +
      l +
      '", ' +
      JSON.stringify(ck) +
      ');\n';
  });
  // console.log(register); return;
  var blob = new Blob([register], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'register.js');
}

// Save Vector layer
function save() {
  var format = new GeoJSON();
  var features = vector.getSource()!.getFeatures();
  var data = format.writeFeatures(features, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'map.geojson');
}

Object.assign(window, {
  addLayer,
  saveCapabilities,
  loadCapabilities,
  loadRegister,
});
