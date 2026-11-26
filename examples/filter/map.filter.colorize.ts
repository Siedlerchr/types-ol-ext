import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Permalink from 'ol-ext/control/Permalink';
import Colorize from 'ol-ext/filter/Colorize';

const layer = new TileLayer({ source: new OSM() });
const map = new Map({ target: 'map', view: new View({ zoom: 8, center: [247044, 6549736] }), layers: [layer] });
const enhance = new Colorize({ operation: 'enhance', value: 1 });
const filter = new Colorize();
layer.addFilter(enhance);
layer.addFilter(filter);
const input = (id: string) => document.getElementById(id) as HTMLInputElement;
function setFilter() {
  enhance.setActive(input('enhance').checked);
  filter.setActive(input('active').checked);
  const operation = (document.getElementById('filter') as HTMLSelectElement).value;
  if (operation === 'grayscale' || operation === 'invert' || operation === 'sepia') filter.setFilter(operation);
  else filter.setFilter({ operation, red: Number(input('red').value), green: Number(input('green').value),
    blue: Number(input('blue').value), value: Number(input('val').value) });
}
document.querySelectorAll('input').forEach(element => element.addEventListener('change', setFilter));
Object.assign(window, { setFilter });
setFilter();
map.addControl(new Permalink({ visible: false }));
