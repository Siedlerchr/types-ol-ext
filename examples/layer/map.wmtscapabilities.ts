import { exportWmsCarte } from '../.shared/wms-carte';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Permalink from 'ol-ext/control/Permalink';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import WMTSCapabilities from 'ol-ext/control/WMTSCapabilities';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';
import proj4 from 'proj4';

declare const $: JQueryStatic;

/*
  // Define proj4 2154
  proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  if (ol.proj.proj4 && ol.proj.proj4.register) ol.proj.proj4.register(proj4);
*/
// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [261204.43490751847, 6250258.191535994],
  }),
  layers: [],
});

map.addControl(
  new LayerSwitcher({
    trash: true,
    extent: true,
    collapsed: false,
  }),
);
const plink = new Permalink({ visible: false, localStorage: 'position' });
map.addControl(plink);
map.addControl(new SearchNominatim({ zoomOnSelect: 13 }));

const cap = new WMTSCapabilities({
  // target: $('.options').get(0),
  target: document.body,
  // srs: ['EPSG:2154'],
  // Set optional apikey (for use with IGN's Geoservices)
  optional: 'apikey,key',
  cors: true,
  services: {
    Géoplateforme: 'https://data.geopf.fr/wmts',
    'Géoplateforme + apikey':
      'https://data.geopf.fr/private/wmts?apikey=ign_scan_ws',
  },
  // Show trace in the console
  trace: true,
});
map.addControl(cap);

cap.on('load', function (e) {
  if (!e.layer || !e.options) return;
  map.addLayer(e.layer);
  e.layer.set('legend', e.options.data.legend);
  plink.setUrlParam('url', e.options.source.url);
  plink.setUrlParam('layer', e.options.source.layer);
});

// Permalink
const url = plink.getUrlParam('url');
const layerName = plink.getUrlParam('layer');
if (url) {
  console.log(layerName);
  cap.loadLayer(url, layerName);
} else {
  map.addLayer(new TileLayer({ source: new OSM() }));
}

function exportCarte() {
  exportWmsCarte(map);
}

Object.assign(window, { cap, exportCarte });
