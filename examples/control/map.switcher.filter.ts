import { Map, View } from 'ol';
import BaseLayer from 'ol/layer/Base';
import Group from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import StadiaMaps from 'ol/source/StadiaMaps';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Geoportail from 'ol-ext/layer/Geoportail';

const terrain = new TileLayer({ visible: false, source: new StadiaMaps({ layer: 'stamen_terrain_labels' }) });
terrain.set('title', 'terrain-labels');
const labels = new Group({ layers: [new Geoportail('GEOGRAPHICALNAMES.NAMES'), terrain] });
labels.setProperties({ title: 'labels', openInLayerSwitcher: true });
const layers: BaseLayer[] = [new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2'),
  new Geoportail({ layer: 'ELEVATION.SLOPES', visible: false }), new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'),
  new Geoportail('TRANSPORTNETWORKS.ROADS'), labels];
const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }), layers });
const switcher = new LayerSwitcher({ target: document.querySelector<HTMLElement>('.layerSwitcher')! });
map.addControl(switcher);
const input = document.createElement('input');
input.placeholder = 'filter';
function filterLayers(expression: RegExp, list: BaseLayer[]): boolean {
  let found = false;
  list.forEach(layer => {
    if (layer instanceof Group) {
      const any = filterLayers(expression, layer.getLayers().getArray());
      layer.set('noLayer', !any);
      found ||= any;
    } else {
      const matches = expression.test(String(layer.get('title') || ''));
      layer.setVisible(matches);
      found ||= matches;
    }
  });
  return found;
}
function update() {
  try { filterLayers(new RegExp(input.value, 'i'), layers); switcher.drawPanel(); }
  catch (error) { if (!(error instanceof SyntaxError)) throw error; }
}
input.addEventListener('keyup', update);
input.addEventListener('change', update);
switcher.setHeader(input);
switcher.on('drawlist', event => {
  event.li.style.display = (event.layer instanceof Group ? !event.layer.get('noLayer') : event.layer.getVisible()) ? '' : 'none';
});
