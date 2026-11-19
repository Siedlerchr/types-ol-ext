import { Feature, Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol-ext/control/Overlay';
import Geoportail from 'ol-ext/layer/Geoportail';

const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })] });
const animation = document.getElementById('anim') as HTMLSelectElement;
const popup = new Overlay({ hideOnClick: true, className: animation.value });
map.addControl(popup);
popup.on('change:visible', event => {
  const size = map.getSize();
  if (/wipe/.test(animation.value) && size) event.element.style.clip = `rect(0px,${event.visible ? size[0] : 0}px,${size[1]}px,0px)`;
  else event.element.style.clip = '';
});
const source = new VectorSource<Feature>({ url: '../data/fond_guerre.geojson', format: new GeoJSON<Feature>(),
  attributions: ["&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>"] });
map.addLayer(new VectorLayer({ source }));
const select = new Select();
map.addInteraction(select);
popup.on('change:visible', event => { if (!event.visible) select.getFeatures().clear(); });
select.getFeatures().on('add', event => {
  const feature = event.element;
  const geometry = feature.getGeometry();
  popup.showImage(`//wsrv.nl/?url=${String(feature.get('img')).replace('_v.jpg', '_p.jpg')}`, {
    coordinate: /frompoint/.test(animation.value) && geometry instanceof Point ? geometry.getCoordinates() : undefined,
    title: `${feature.get('text')}<br/>${feature.get('commune')} (${feature.get('region')} - ${String(feature.get('date')).replace('.', '/')})<br/>&copy; ${feature.get('copy')} - ${feature.get('author')}`,
  });
});
Object.assign(window, { popup });
