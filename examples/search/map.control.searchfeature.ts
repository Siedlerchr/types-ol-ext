import { Feature, Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import SearchFeature from 'ol-ext/control/SearchFeature';

const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new TileLayer({ source: new OSM() })] });
const source = new VectorSource<Feature>({ url: '../data/fond_guerre.geojson', format: new GeoJSON<Feature>(),
  attributions: ["&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>"] });
map.addLayer(new VectorLayer({ source, style: new Style({ image: new Icon({ src: '../data/camera.png', scale: 0.8 }) }) }));
const select = new Select();
map.addInteraction(select);
const search: SearchFeature = new SearchFeature({ source, property: document.querySelector<HTMLSelectElement>('.options select')!.value,
  sort: (a, b) => (search.getSearchString(a) || '').localeCompare(search.getSearchString(b) || '') });
map.addControl(search);
search.on('select', event => {
  select.getFeatures().clear();
  select.getFeatures().push(event.search);
  const geometry = event.search.getGeometry();
  if (geometry instanceof Point) map.getView().animate({ center: geometry.getCoordinates() });
});
Object.assign(window, { search });
