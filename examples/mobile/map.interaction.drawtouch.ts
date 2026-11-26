import { Map, View } from 'ol';
import Snap from 'ol/interaction/Snap';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Bar from 'ol-ext/control/Bar';
import Button from 'ol-ext/control/Button';
import Toggle from 'ol-ext/control/Toggle';
import DrawTouch from 'ol-ext/interaction/DrawTouch';
import type { DrawingType } from 'ol-ext/interaction/DrawTouch';

const source = new VectorSource();
const map = new Map({
  target: 'map',
  view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source })],
});
const bar = new Bar({ toggleOne: true });
map.addControl(bar);
const types: DrawingType[] = ['Point', 'LineString', 'Polygon', 'Circle'];
const icons = ['fa-map-marker', 'fa-share-alt', 'fa-bookmark-o fa-rotate-270', 'fa-circle-o'];
const interactions = types.map((type, index) => {
  const interaction = new DrawTouch({ source, type });
  const subbar = new Bar();
  subbar.addControl(new Button({
    html: type === 'Point' ? '<i class="fa fa-check"></i>' : '+',
    title: 'Add a point', handleClick: () => interaction.addPoint(),
  }));
  if (type !== 'Point' && type !== 'Circle') {
    subbar.addControl(new Button({ html: '−', title: 'Remove last point', handleClick: () => interaction.removeLastPoint() }));
  }
  if (type !== 'Point') {
    subbar.addControl(new Button({ html: '<i class="fa fa-check"></i>', title: 'Create...', handleClick: () => {
      if (type === 'Circle') interaction.addPoint();
      interaction.finishDrawing();
    } }));
  }
  bar.addControl(new Toggle({ html: `<i class="fa ${icons[index]}"></i>`, interaction, bar: subbar }));
  return interaction;
});
map.addInteraction(new Snap({ source, pixelTolerance: 15 }));
function setTap() {
  const checked = (document.getElementById('tap') as HTMLInputElement).checked;
  interactions.forEach(interaction => interaction.set('tap', checked));
}
Object.assign(window, { setTap });
setTap();
