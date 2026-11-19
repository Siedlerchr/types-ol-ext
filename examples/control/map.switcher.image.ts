import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage';
import Geoportail from 'ol-ext/layer/Geoportail';

const layer = new Geoportail({ baseLayer: true, layer: 'ORTHOIMAGERY.ORTHOPHOTOS' });
const osm = new TileLayer({ source: new OSM(), visible: false });
osm.setProperties({ title: 'OSM', baseLayer: true });
const source = new VectorSource({ url: '../data/fond_guerre.geojson', format: new GeoJSON(),
  attributions: ["&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>"] });
const vector = new VectorLayer({ source });
vector.setProperties({ name: '1914-18', preview: '//wsrv.nl/?url=http://www.culture.gouv.fr/Wave/image/memoire/2445/sap40_z0004141_v.jpg' });
const map = new Map({ target: 'map', view: new View({ zoom: 6, center: [173664, 6166327] }), layers: [layer, osm, vector] });
map.addControl(new LayerSwitcherImage());
window.addEventListener('load', () => vector.changed());
