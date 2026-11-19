import { Map, View } from 'ol';
import { singleClick } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import SelectInteraction from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
import SelectControl from 'ol-ext/control/Select';
import GeoJSONX from 'ol-ext/format/GeoJSONX';
import Geoportail from 'ol-ext/layer/Geoportail';

const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')] });
const source = new VectorSource({ url: '../data/departements.geojsonx', format: new GeoJSONX() as unknown as GeoJSON,
  attributions: ["&copy; <a href='https://www.insee.fr'>INSEE</a>", "&copy; <a href='https://www.data.gouv.fr/fr/datasets/geofla-r/'>IGN</a>"] });
map.addLayer(new VectorLayer({ source, style: feature => new Style({
  image: new RegularShape({ radius: 5, radius2: 0, points: 4, stroke: new Stroke({ color: '#000', width: 1 }) }),
  text: new Text({ text: String(feature.get('id')), font: 'bold 11px sans-serif' }),
  stroke: new Stroke({ width: 1, color: [255, 128, 0] }), fill: new Fill({ color: [255, 128, 0, 0.2] }),
}) }));
const select = new SelectInteraction({ hitTolerance: 5, condition: singleClick });
map.addInteraction(select);
select.on('select', event => {
  const feature = event.selected[0];
  if (!feature) return;
  const list = document.querySelector('.options ul')!;
  list.replaceChildren();
  Object.entries(feature.getProperties()).forEach(([key, value]) => {
    if (key !== 'geometry') {
      const item = document.createElement('li');
      item.textContent = `${key}: ${value}`;
      list.append(item);
    }
  });
});
const control = new SelectControl({ source });
map.addControl(control);
control.on('select', event => {
  select.getFeatures().clear();
  event.features.forEach(feature => select.getFeatures().push(feature));
});
