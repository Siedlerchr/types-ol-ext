import { Feature, Map, View } from 'ol';
import { singleClick } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import SelectInteraction from 'ol/interaction/Select';
import { unByKey } from 'ol/Observable';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';
import SelectCheck from 'ol-ext/control/SelectCheck';
import SelectCondition from 'ol-ext/control/SelectCondition';
import SelectFulltext from 'ol-ext/control/SelectFulltext';
import SelectMulti from 'ol-ext/control/SelectMulti';
import SelectPopup from 'ol-ext/control/SelectPopup';
import Geoportail from 'ol-ext/layer/Geoportail';

const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')] });
const source = new VectorSource<Feature>({ url: '../data/fond_guerre.geojson', format: new GeoJSON<Feature>(),
  attributions: ["&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>"] });
map.addLayer(new VectorLayer({ source, style: new Style({ image: new RegularShape({ radius: 5, points: 4,
  fill: new Fill({ color: [255, 128, 0, 0.5] }), stroke: new Stroke({ color: [255, 128, 0], width: 1 }) }) }) }));
const select = new SelectInteraction({ hitTolerance: 5, condition: singleClick });
map.addInteraction(select);
select.on('select', event => {
  const feature = event.selected[0];
  if (!feature) return;
  const list = document.querySelector('.options ul')!;
  list.replaceChildren();
  Object.entries(feature.getProperties()).forEach(([key, value]) => {
    if (key === 'geometry') return;
    const item = document.createElement('li');
    if (key === 'img') { const img = document.createElement('img'); img.src = String(value); item.append(img); }
    else item.textContent = `${key}: ${value}`;
    list.append(item);
  });
});
const popup = new SelectPopup({ defaultLabel: 'all', label: 'Region:', property: 'region' });
const control = new SelectMulti({ controls: [new SelectFulltext({ label: 'Text:', property: 'text' }), popup,
  new SelectCheck({ label: 'Author:', property: 'author', values: {
    'Opérateur D ; Brissy, Edouard': 'Brissy, Edouard', 'Opérateur D ; Sélince': 'Sélince',
    'Opérateur Théta (code armée, photographe)': 'Théta',
  } }), new SelectCondition({ label: 'before 1918', condition: { attr: 'date', op: '<', val: '1918' } })] });
map.addControl(control);
control.on('select', event => {
  select.getFeatures().clear();
  if ((document.getElementById('select') as HTMLInputElement).checked) event.features.forEach(feature => select.getFeatures().push(feature));
  else {
    source.getFeatures().forEach(feature => feature.setStyle([]));
    event.features.forEach(feature => feature.setStyle(null));
  }
});
function reset() {
  select.getFeatures().clear();
  source.getFeatures().forEach(feature => feature.setStyle(null));
  control.doSelect();
}
Object.assign(window, { reset });
const listener = source.on('change', () => {
  if (source.getState() === 'ready') { unByKey(listener); popup.setValues({ sort: true }); }
});
