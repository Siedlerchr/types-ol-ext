import { Map, View } from 'ol';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import CSS from 'ol-ext/filter/CSS';
import Geoportail from 'ol-ext/layer/Geoportail';

Geoportail.register('LANDCOVER.CLC18', {
  layer: 'LANDCOVER.CLC18', theme: 'clc', server: 'https://data.geopf.fr/wmts',
  bbox: [-63.3725, -21.4756, 55.9259, 51.4428], format: 'image/png', minZoom: 0, maxZoom: 16,
  originators: { Geoservices: { attribution: 'Géoservices', href: 'https://geoservices.ign.fr/' } },
  queryable: false, style: 'CORINE Land Cover', tilematrix: 'PM', title: 'CORINE Land Cover - 2018',
});
const plan = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });
const clc = new Geoportail({ layer: 'LANDCOVER.CLC18', className: 'clc' });
const map = new Map({ target: 'map', view: new View({ zoom: 10, center: [259580, 6250255] }), layers: [plan, clc] });
map.addControl(new LayerSwitcher());
let filter: CSS | undefined;
function setOperation(value: string) {
  if (filter) clc.removeFilter(filter);
  filter = new CSS({ blend: value });
  clc.addFilter(filter);
}
Object.assign(window, { setOperation });
