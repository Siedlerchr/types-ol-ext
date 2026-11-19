import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import LineString from 'ol/geom/LineString';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { getDistance } from 'ol/sphere';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { greatCircleBearing, greatCircleTrack } from 'ol-ext/geom/sphere';
import Geoportail from 'ol-ext/layer/Geoportail';

const source = new VectorSource();
const map = new Map({
  target: 'map',
  view: new View({ zoom: 1, center: [0, 3000000] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' }), new VectorLayer({
    source,
    style: new Style({ stroke: new Stroke({ color: 'red', width: 2 }) }),
  })],
});
let origin: number[] | undefined;
map.on('click', (event) => { origin = toLonLat(event.coordinate); });
map.on('pointermove', (event) => {
  if (!origin) return;
  const destination = toLonLat(event.coordinate);
  const line = new LineString(greatCircleTrack(origin, destination));
  line.transform('EPSG:4326', map.getView().getProjection());
  source.clear();
  source.addFeature(new Feature(line));
  document.getElementById('dist')!.textContent = `${(getDistance(origin, destination) / 1000).toFixed(2)} km`;
  document.getElementById('bearing')!.textContent = `${(greatCircleBearing(origin, destination) * 180 / Math.PI).toFixed(2)} deg`;
});
