import { Feature, Map, View } from 'ol';
import LineString from 'ol/geom/LineString';
import Snap from 'ol/interaction/Snap';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import type TouchCursor from 'ol-ext/interaction/TouchCursor';
import TouchCursorDraw from 'ol-ext/interaction/TouchCursorDraw';
import TouchCursorModify from 'ol-ext/interaction/TouchCursorModify';
import TouchCursorSelect from 'ol-ext/interaction/TouchCursorSelect';

const source = new VectorSource();
const map = new Map({
  target: 'map',
  view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source })],
});
source.addFeature(new Feature(new LineString([[270318, 6247293], [271226, 6247178], [271799, 6247933], [271083, 6248945], [271952, 6249108]])));
const select = new TouchCursorSelect();
select.addButton({ className: 'delete', click: () => {
  const feature = select.getSelection();
  if (feature) source.removeFeature(feature);
} });
const draw = new TouchCursorDraw({ className: 'draw', coordinate: map.getView().getCenter(),
  type: 'Point', types: ['Point', 'LineString', 'Polygon', 'Circle'], source });
draw.on('drawend', event => {
  draw.removeButton('del');
  draw.addButton({ className: 'del', click: () => {
    source.removeFeature(event.feature);
    draw.removeButton('del');
  } });
});
const modify = new TouchCursorModify({ className: 'Modify', coordinate: map.getView().getCenter(), source });
const cursors = { Select: select, Draw: draw, Modify: modify };
Object.values(cursors).forEach(cursor => map.addInteraction(cursor));
document.getElementById('anchor')!.addEventListener('change', event => {
  const anchor = (event.target as HTMLSelectElement).value as 'left' | 'center' | 'right';
  Object.values(cursors).forEach(cursor => cursor.setAnchor(anchor));
});
let active: TouchCursor | undefined;
function setActive(mode: keyof typeof cursors) {
  const coordinate = active?.getPosition();
  if (active) active.setActive(false);
  else Object.values(cursors).forEach(cursor => cursor.setActive(false));
  active = cursors[mode];
  active.setActive(true, coordinate);
  Object.assign(window, { active });
}
Object.assign(window, { setActive });
setActive('Select');
map.addInteraction(new Snap({ source, pixelTolerance: 10 }));
