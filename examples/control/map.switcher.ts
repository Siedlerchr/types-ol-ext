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
const nearth = new Geoportail({ layer: 'CARTES.NATURALEARTH', maxZoom: 6 });
const map = new Map({ target: 'map', view: new View({ zoom: 11, center: [260497, 6249720] }), layers: [base, nearth, geology, labels] });
map.addControl(new LayerSwitcher());
const switcher = new LayerSwitcher({ target: document.querySelector<HTMLElement>('.layerSwitcher')!,
  show_progress: true, extent: true, trash: true, oninfo: layer => alert(layer.get('title')) });
switcher.on('drawlist', event => {
  const button = document.createElement('div');
  button.className = 'myInfo';
  button.textContent = '?';
  button.addEventListener('click', () => alert(event.layer.get('title')));
  event.li.querySelector(':scope > .ol-layerswitcher-buttons')?.append(button);
});
const header = document.createElement('div');
const toggle = document.createElement('div');
toggle.className = 'toggleVisibility';
toggle.title = 'show/hide';
toggle.textContent = 'Show/hide all';
toggle.addEventListener('click', () => {
  const layers = map.getLayers().getArray();
  const visible = !layers[0].getVisible();
  toggle.classList.toggle('show', !visible);
  layers.forEach(layer => layer.setVisible(visible));
});
header.append(toggle);
switcher.setHeader(header);
switcher.on('layer:keydown', event => {
  switch (event.key.toLowerCase()) {
    case '?': case 'i': alert(event.layer.get('title')); break;
    case 'e': event.li.querySelector<HTMLElement>('.layerExtent')?.click(); break;
    case 'x': if (event.group instanceof Group) event.group.getLayers().remove(event.layer); else map.removeLayer(event.layer); break;
  }
});
map.addControl(switcher);
function displayInLayerSwitcher(value: boolean) { nearth.set('displayInLayerSwitcher', value); }
Object.assign(window, { displayInLayerSwitcher });
if ((document.getElementById('opb') as HTMLInputElement).checked) document.body.classList.add('hideOpacity');
if ((document.getElementById('percent') as HTMLInputElement).checked) document.body.classList.add('showPercent');
if ((document.getElementById('dils') as HTMLInputElement).checked) displayInLayerSwitcher(true);
