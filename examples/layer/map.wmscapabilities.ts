import { exportWmsCarte } from '../.shared/wms-carte';
import { register } from 'ol/proj/proj4';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Permalink from 'ol-ext/control/Permalink';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import WMSCapabilities from 'ol-ext/control/WMSCapabilities';
import * as proj from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import proj4 from 'proj4';

declare const $: JQueryStatic;

// Define proj4 2154
proj4.defs(
  'EPSG:2154',
  '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
);
register(proj4);

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [261204.43490751847, 6250258.191535994],
  }),
  layers: [new TileLayer({ source: new OSM() })],
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
if (plink.hasUrlParam('edugeo')) $('.options button').show();

const cap = new WMSCapabilities({
  // target: $('.options').get(0),
  target: document.body,
  srs: ['EPSG:2154'],
  cors: true,
  optional: 'token,apikey',
  services: {
    BRGM: 'https://geoservices.brgm.fr/geologie',
    OSM: 'https://wms.openstreetmap.fr/wms',
    Sandre: 'https://services.sandre.eaufrance.fr/geo/sandre', //'http://services.sandre.eaufrance.fr/geo/eth_FXX',
    Cartorisque: 'https://mapsref.brgm.fr/wxs/refcom-env/refign',
    'Swiss Topo': 'https://wms.geo.admin.ch/',
    'IFREMER*':
      'http://tds0.ifremer.fr/thredds/wms/CORIOLIS-GLOBAL-NRTOA-OBS_TIME_SERIE?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&LAYERS=PSAL&CRS=EPSG%3A3857',
    Géorisque: 'https://mapsref.brgm.fr/wxs/georisques/risques',
    BDRisques: 'https://mapsref.brgm.fr/wxs/risques/bdrisques',
    Risques: 'https://geoservices.brgm.fr/risques',
    'Natura 2000*':
      'http://ws.carmencarto.fr/WMS/119/fxx_inpn?language=fre&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&LAYERS=Zones_de_protection_speciale&CRS=EPSG%3A3857',
    // https://www.cigalsace.org/portail/fr/page/723/flux-donnees -->
    Cigalsace: 'https://www.cigalsace.org/geoserver/cigal/ows',
    'CG93-raster':
      'https://geoportail93.fr/cgi-bin/mapserv?map=SIGD/raster.map',
    'CG93-fond':
      'https://geoportail93.fr/cgi-bin/mapserv?map=SIGD/fond_SIGD.map',
    'CG94*':
      'https://geo.valdemarne.fr/viewer/index.php?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&LAYERS=parcelles&CRS=EPSG%3A2154',
    GeoFoncier: 'https://api.geofoncier.fr/referentielsoge/ogc/wxs',
    // http://www.geolittoral.equipement.gouv.fr/rubrique.php3?id_rubrique=39 -->
    // 'GeoLittoral*': 'http://geolittoral.application.equipement.gouv.fr/wms/metropole',
    // http://www.sogefi-sig.com/sogefi-diffuse-des-donnees-en-wms/ -->
    SOGEFI: 'http://ws.sogefi-web.com/wms',
    // http://inspire-geoportal.ec.europa.eu/discovery/ -->
    'Photos anciennes litto': 'http://www.ifremer.fr/services/photos_anciennes',
    Geobretagne: 'https://geobretagne.fr/geoserver/dir_ouest/wms',
    'Venise*':
      'http://cigno.atlantedellalaguna.it/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&LAYERS=carta_base',
    // 'Geoportail': 'https://wxs.ign.fr/choisirgeoportail/geoportail/r/wms',
    'Geoplateforme raster': 'https://data.geopf.fr/wms-r/ows',
    'Geoplateforme vecteur': 'https://data.geopf.fr/wms-v/ows',
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
  plink.setUrlParam('layer', e.options.source.params.LAYERS);
});

const url = plink.getUrlParam('url');
const layerName = plink.getUrlParam('layer');
if (url) {
  cap.loadLayer(url, layerName);
}

function exportCarte() {
  exportWmsCarte(map);
}

Object.assign(window, { cap, exportCarte });
