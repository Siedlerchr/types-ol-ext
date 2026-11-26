import { Map, View } from 'ol';
import { altKeyOnly, noModifierKeys } from 'ol/events/condition';
import Draw from 'ol/interaction/Draw';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Permalink from 'ol-ext/control/Permalink';
import SearchBAN from 'ol-ext/control/SearchBAN';
import SVGFilter from 'ol-ext/filter/SVGFilter';
import SnapLayerPixel from 'ol-ext/interaction/SnapLayerPixel';
import Geoportail from 'ol-ext/layer/Geoportail';
import Laplacian from 'ol-ext/util/SVGFilter/Laplacian';
import Prewitt from 'ol-ext/util/SVGFilter/Prewitt';
import Roberts from 'ol-ext/util/SVGFilter/Roberts';
import Sobel from 'ol-ext/util/SVGFilter/Sobel';

const photo = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS', className: 'photo', opacity: 0.4 });
const layer = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS', className: 'edge', title: 'Edges' });
layer.setSource(photo.getSource());
const map = new Map({ target: 'map', view: new View({ zoom: 18, maxZoom: 19, center: [343183, 6554838] }), layers: [photo, layer] });
map.addControl(new LayerSwitcher());
map.addControl(new Permalink({ visible: false }));
map.addControl(new SearchBAN({ centerOnSelect: true }));
const filters: Record<string, SVGFilter> = {
  'laplacian-8': new SVGFilter(new Laplacian({ alpha: true })),
  'laplacian-4': new SVGFilter(new Laplacian({ neighbours: 4, alpha: true, gamma: 2 })),
  prewitt: new SVGFilter(new Prewitt({ alpha: true })),
  roberts: new SVGFilter(new Roberts({ alpha: true })),
  sobel: new SVGFilter(new Sobel({ alpha: true })),
};
let current: SVGFilter | undefined;
function setFilter(name: string) {
  document.querySelectorAll<HTMLElement>('.info li').forEach(element => { element.style.display = element.classList.contains(name) ? '' : 'none'; });
  if (current) layer.removeFilter(current);
  current = filters[name];
  if (current) layer.addFilter(current);
}
Object.assign(window, { setFilter });
setFilter('laplacian-8');
map.addInteraction(new Draw({ type: 'LineString', condition: event => noModifierKeys(event) || altKeyOnly(event) }));
map.addInteraction(new SnapLayerPixel({ layer }));
