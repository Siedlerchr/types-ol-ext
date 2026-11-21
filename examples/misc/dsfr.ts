import Geoportail from 'ol-ext/layer/Geoportail';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Bar from 'ol-ext/control/Bar';
import Toggle from 'ol-ext/control/Toggle';
import Select from 'ol/interaction/Select';
import Draw from 'ol/interaction/Draw';

// Layers
const layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });
//  Vector layer
const source = new VectorSource();
const vector = new VectorLayer({ properties: { title: 'Vector' }, source });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [166326, 5992663],
  }),
  layers: [layer, vector],
});
map.addControl(new LayerSwitcher());

const mainbar = new Bar();
map.addControl(mainbar);

/* Nested toobar with one control activated at once */
const nested = new Bar({ toggleOne: true, group: true });
mainbar.addControl(nested);

// Add selection tool (a toggle control with a select interaction)
const select = new Select();
const selectCtrl = new Toggle({
  classButton: 'fr-btn fr-icon-cursor-line fr-btn--secondary',
  title: 'Select',
  interaction: select,
  active: true,
  onToggle: function (active) {
    console.log(active);
  },
});
nested.addControl(selectCtrl);
select.on('change:active', () => select.getFeatures().clear());

// Add editing tools
const pedit = new Toggle({
  classButton: 'fr-btn fr-icon-pen-nib-line fr-btn--secondary',
  className: 'edit',
  title: 'Point',
  interaction: new Draw({
    type: 'Point',
    source,
  }),
  onToggle: function (active) {
    console.log(active);
  },
});
nested.addControl(pedit);

const position = document.querySelector<HTMLSelectElement>('#select-pos')!;
position.addEventListener('change', () => mainbar.setPosition(position.value));
