import { Feature, Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import Geoportail from 'ol-ext/layer/Geoportail';
import Popup from 'ol-ext/overlay/Popup';

const popup = new Popup({ popupClass: 'default', closeBox: true, positioning: 'auto', minibar: true,
  autoPan: { animation: { duration: 250 } }, onshow: () => console.log('You opened the box'),
  onclose: () => console.log('You close the box') });
const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })], overlays: [popup] });
const source = new VectorSource<Feature>({ url: '../data/fond_guerre.geojson', format: new GeoJSON<Feature>(),
  attributions: ["&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>"] });
map.addLayer(new VectorLayer({ source, style: new Style({ image: new Icon({ src: '../data/camera.png', scale: 0.8 }) }) }));
const select = new Select();
map.addInteraction(select);
select.getFeatures().on('add', event => {
  const feature = event.element;
  const geometry = feature.getGeometry();
  if (geometry instanceof Point) popup.show(geometry.getCoordinates(), `<img src='//wsrv.nl/?url=${feature.get('img')}'/><a href="https://www.culture.gouv.fr/" target="new">&copy; Ministère de la Culture</a><br/>${feature.get('text')}`);
});
select.getFeatures().on('remove', () => popup.hide());
