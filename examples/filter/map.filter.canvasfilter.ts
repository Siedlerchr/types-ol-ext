import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Permalink from 'ol-ext/control/Permalink';
import CanvasFilter from 'ol-ext/filter/CanvasFilter';
import SVGFilter from 'ol-ext/util/SVGFilter';
import SVGOperation from 'ol-ext/util/SVGOperation';
import Paper from 'ol-ext/util/SVGFilter/Paper';

const layer = new TileLayer({ source: new OSM() });
const map = new Map({ target: 'map', view: new View({ zoom: 13, center: [340705, 6556400] }), layers: [layer] });
const filter = new CanvasFilter();
layer.addFilter(filter);
const emboss = new SVGOperation('feConvolveMatrix');
const embossFilter = new SVGFilter({ operation: emboss });
const erode = new SVGOperation({ feoperation: 'feMorphology', operator: 'erode', radius: 1 });
const erodeFilter = new SVGFilter({ operation: erode });
const paper = new Paper({ scale: 2, light: 100 });
filter.addSVGFilter(paper);
function setEmboss(value: string) {
  const v = Number(value);
  if (!v) filter.removeSVGFilter(embossFilter);
  else {
    emboss.set('kernelMatrix', [v, v, -v, v, 1, -v, v, -v, -v]);
    filter.addSVGFilter(embossFilter);
  }
}
function setErode(value: string) {
  if (!Number(value)) filter.removeSVGFilter(erodeFilter);
  else { erode.set('radius', value); filter.addSVGFilter(erodeFilter); }
}
function setPaper(value: string) {
  paper.setLight(100 - Number(value));
  filter.dispatchEvent('propertychange');
}
document.querySelectorAll<HTMLInputElement>('.options input').forEach(input => {
  const span = document.createElement('span');
  span.textContent = input.value;
  input.after(span);
  input.addEventListener('change', () => { span.textContent = input.value; });
});
Object.assign(window, { filter, setEmboss, setErode, setPaper });
map.addControl(new Permalink({ visible: false }));
