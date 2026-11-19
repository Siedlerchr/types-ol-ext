import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Gauge from 'ol-ext/control/Gauge';
import GeolocationDraw from 'ol-ext/interaction/GeolocationDraw';

const source = new VectorSource();
const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [261720, 5951081] }),
  layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source })] });
const gauge = new Gauge({ title: 'Accuracy:', max: 200 });
map.addControl(gauge);
const draw = new GeolocationDraw({ source, zoom: 16, minAccuracy: 10000 });
map.addInteraction(draw);
document.querySelectorAll<HTMLInputElement>('input[name=type]').forEach(input => {
  input.addEventListener('change', () => draw.set('type', input.value));
});
draw.on('tracking', event => {
  const location = event.geolocation;
  if (!location) return;
  const accuracy = location.getAccuracy();
  document.getElementById('accuracy')!.style.width = `${accuracy || 0}px`;
  if (accuracy !== undefined) gauge.val(accuracy);
  (document.getElementById('heading') as HTMLInputElement).value = String(location.getHeading() ?? '');
  (document.getElementById('z') as HTMLInputElement).value = String(location.getAltitude() ?? '');
});
document.querySelector<HTMLSelectElement>('.options select')!.onchange = event => {
  const value = (event.target as HTMLSelectElement).value;
  draw.setFollowTrack(value === 'true' ? true : value === 'false' ? false : value as 'auto' | 'position' | 'visible');
};
const follow = document.querySelector<HTMLElement>('.follow')!;
draw.on('follow', event => { follow.style.display = event.following ? 'none' : 'block'; });
draw.on('drawend', () => { follow.style.display = 'none'; });
Object.assign(window, { draw });
