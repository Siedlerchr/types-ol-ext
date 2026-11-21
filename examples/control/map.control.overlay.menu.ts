import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol-ext/control/Overlay';
import Toggle from 'ol-ext/control/Toggle';
import Geoportail from 'ol-ext/layer/Geoportail';

const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')] });
const menu = new Overlay({ closeBox: true, className: 'slide-left menu', content: document.getElementById('menu')! });
map.addControl(menu);
map.addControl(new Toggle({ html: '<i class="fa fa-bars"></i>', className: 'menu', title: 'Menu', onToggle: () => menu.toggle() }));
const source = new VectorSource({ url: '../data/fond_guerre.geojson', format: new GeoJSON(),
  attributions: ["&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>"] });
map.addLayer(new VectorLayer({ source }));
const select = new Select();
map.addInteraction(select);
const data = document.querySelector<HTMLElement>('.data')!;
select.getFeatures().on('add', event => {
  const img = document.createElement('img');
  img.src = `//wsrv.nl/?url=${event.element.get('img')}`;
  const info = document.createElement('div');
  const paragraph = document.createElement('p');
  paragraph.textContent = event.element.get('text');
  info.append(paragraph);
  const content = document.createElement('div');
  content.append(img, info);
  data.replaceChildren(content);
});
select.getFeatures().on('remove', () => data.replaceChildren());
