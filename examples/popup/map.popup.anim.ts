import { Feature, Map, View } from 'ol';
import type { Options as PopupOptions } from 'ol-ext/overlay/Popup';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import { unByKey } from 'ol/Observable';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Geoportail from 'ol-ext/layer/Geoportail';
import Popup from 'ol-ext/overlay/Popup';

const positioning = (document.getElementById('positioning') as HTMLSelectElement).value as PopupOptions['positioning'];
const popup = new Popup({ popupClass: 'default anim', closeBox: true, positioning,
  autoPan: { animation: { duration: 100 } }, onclose: () => console.log('You close the box') });
const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })], overlays: [popup] });
const source = new VectorSource<Feature>({ url: '../data/fond_guerre.geojson', format: new GeoJSON<Feature>(),
  attributions: ["&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>"] });
const listener = source.on('change', () => {
  if (source.getState() === 'ready') {
    unByKey(listener);
    source.getFeatures().forEach(feature => { const image = new Image(); image.src = feature.get('img'); });
  }
});
map.addLayer(new VectorLayer({ source }));
const select = new Select();
map.addInteraction(select);
select.getFeatures().on('add', event => {
  const feature = event.element;
  const geometry = feature.getGeometry();
  if (geometry instanceof Point) popup.show(geometry.getCoordinates(), `<img src='//wsrv.nl/?url=${feature.get('img')}'/>${feature.get('text')}`);
});
select.getFeatures().on('remove', () => popup.hide());
Object.assign(window, { popup, map });
