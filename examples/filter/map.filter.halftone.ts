import { Map, View } from 'ol';
import Permalink from 'ol-ext/control/Permalink';
import Halftone from 'ol-ext/filter/Halftone';
import Geoportail from 'ol-ext/layer/Geoportail';
import { pixelTransform } from 'ol-ext/util/imagesLoader';

const layers = [
  new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2', visible: false }),
  new Geoportail({ layer: 'TRANSPORTNETWORKS.ROADS', visible: false }),
  new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS', visible: true }),
];
layers[1].getSource()!.setTileLoadFunction(pixelTransform((pixels, index) => {
  pixels[index] = pixels[index + 1] = pixels[index + 2] = 255 - pixels[index + 3] * 1.5;
  pixels[index + 3] = 255;
}));
const map = new Map({ target: 'map', view: new View({ zoom: 6, center: [219733, 5880370] }), layers });
map.addControl(new Permalink({ visible: false }));
const select = document.getElementById('layer') as HTMLSelectElement;
layers.forEach((layer, index) => {
  const option = document.createElement('option');
  option.textContent = layer.get('title');
  option.value = String(index);
  option.selected = layer.getVisible();
  select.append(option);
});
function setLayer() { layers.forEach((layer, index) => layer.setVisible(index === Number(select.value))); }
const filter = new Halftone({ size: Number((document.getElementById('size') as HTMLSelectElement).value) });
layers.forEach(layer => layer.addFilter(filter));
Object.assign(window, { setLayer, filter });
