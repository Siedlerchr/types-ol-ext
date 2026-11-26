import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TouchCompass from 'ol-ext/interaction/TouchCompass';
import Geoportail from 'ol-ext/layer/Geoportail';

const source = new VectorSource({
  url: '../data/fond_guerre.geojson',
  format: new GeoJSON(),
  attributions: ["&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>"],
});
const map = new Map({
  target: 'map',
  view: new View({ zoom: 6, center: [173664, 6166327] }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' }), new VectorLayer({ source })],
});
const select = new Select();
map.addInteraction(select);
const compass = new TouchCompass({
  onDrag: delta => select.getFeatures().item(0)?.getGeometry()?.translate(delta.traction[0] / 50, delta.traction[1] / 50),
});
map.addInteraction(compass);
compass.setActive(false);
select.getFeatures().on(['add', 'remove'], () => compass.setActive(select.getFeatures().getLength() > 0));
