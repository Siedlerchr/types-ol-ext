import { Map, View } from 'ol';
import Group from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Geoportail from 'ol-ext/layer/Geoportail';

const osm = new TileLayer({ source: new OSM(), visible: false });
osm.setProperties({ title: 'OSM', baseLayer: true });
const base = new Group({ layers: [new Geoportail({ baseLayer: true, visible: false, layer: 'ORTHOIMAGERY.ORTHOPHOTOS' }),
  new Geoportail({ baseLayer: true, layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' }), osm] });
base.setProperties({ title: 'Base Layers', openInLayerSwitcher: true });
const labels = new Geoportail('GEOGRAPHICALNAMES.NAMES');
const geology = new TileLayer({ extent: [-653182.6969582437, 5037463.842847037, 1233297.5065495989, 6646432.677299531],
  minResolution: 3.527777777777778, maxResolution: 3527.777777777778,
  source: new TileWMS({ url: 'https://geoservices.brgm.fr/geologie', projection: 'EPSG:3857',
    params: { LAYERS: 'GEOLOGIE', FORMAT: 'image/png', VERSION: '1.3.0' },
    attributions: ["<a href='http://www.brgm.fr/'>&copy; Brgm</a>"] }) });
geology.set('title', 'GEOLOGIE');
const map = new Map({ target: 'map', view: new View({ zoom: 11, center: [260497, 6249720] }), layers: [base, geology, labels] });
map.addControl(new LayerSwitcher({ oninfo: layer => {
  const options = document.querySelector<HTMLElement>('.options')!;
  options.replaceChildren(document.createTextNode(String(layer.get('title'))), document.createElement('br'));
  if (layer.get('title') === 'GEOLOGIE') {
    const image = document.createElement('img');
    image.src = 'https://geoservices.brgm.fr/geologie?language=fre&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=GEOSERVICES_GEOLOGIE&format=image/png&STYLE=default';
    options.append(image);
  }
} }));
