import { Feature, Map, View } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import GeoJSON from 'ol/format/GeoJSON';
import { LineString, Polygon } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Bar from 'ol-ext/control/Bar';
import Button from 'ol-ext/control/Button';
import TextButton from 'ol-ext/control/TextButton';
import Toggle from 'ol-ext/control/Toggle';

const source = new VectorSource<Feature>();
const map = new Map({ target: 'map', view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source })] });
const mainbar = new Bar();
map.addControl(mainbar);
const editbar = new Bar({ toggleOne: true, group: false });
mainbar.addControl(editbar);
const select = new Select({ hitTolerance: 2 });
const info = (text: string) => { document.getElementById('info')!.innerHTML = text; };
const selectionBar = new Bar({ controls: [
  new Button({ html: '<i class="fa fa-times"></i>', title: 'Delete', handleClick: () => {
    const features = select.getFeatures();
    info(features.getLength() ? `${features.getLength()} object(s) deleted.` : 'Select an object first...');
    features.forEach(feature => source.removeFeature(feature));
    features.clear();
  } }),
  new Button({ html: '<i class="fa fa-info"></i>', title: 'Show informations', handleClick: () => {
    const features = select.getFeatures();
    info(features.getLength() === 0 ? 'Select an object first...' : features.getLength() === 1
      ? `Selection is a ${features.item(0).getGeometry()?.getType()}` : `${features.getLength()} objects selected.`);
  } }),
] });
editbar.addControl(new Toggle({ html: '<i class="fa fa-hand-pointer-o"></i>', title: 'Select', interaction: select,
  bar: selectionBar, autoActivate: true, active: true }));
editbar.addControl(new Toggle({ html: '<i class="fa fa-map-marker"></i>', title: 'Point', interaction: new Draw({ type: 'Point', source }) }));
let linePoints = 0;
const line = new Draw({ type: 'LineString', source, geometryFunction: (coordinates, geometry) => {
  const coords = coordinates as Coordinate[];
  linePoints = coords.length;
  const result = geometry instanceof LineString ? geometry : new LineString(coords);
  result.setCoordinates(coords);
  return result;
} });
let polygonPoints = 0;
const polygon = new Draw({ type: 'Polygon', source, geometryFunction: (coordinates, geometry) => {
  const coords = coordinates as Coordinate[][];
  polygonPoints = coords[0].length;
  const result = geometry instanceof Polygon ? geometry : new Polygon(coords);
  result.setCoordinates([coords[0].concat([coords[0][0]])]);
  return result;
} });
function drawingBar(draw: Draw, count: () => number, finishMinimum: number) {
  return new Bar({ controls: [new TextButton({ html: 'undo', title: 'Delete last point', handleClick: () => {
    if (count() > 1) draw.removeLastPoint();
  } }), new TextButton({ html: 'finish', title: 'Finish', handleClick: () => {
    if (count() > finishMinimum) draw.finishDrawing();
  } })] });
}
editbar.addControl(new Toggle({ html: '<i class="fa fa-share-alt"></i>', title: 'LineString', interaction: line,
  bar: drawingBar(line, () => linePoints, 2) }));
editbar.addControl(new Toggle({ html: '<i class="fa fa-bookmark-o fa-rotate-270"></i>', title: 'Polygon', interaction: polygon,
  bar: drawingBar(polygon, () => polygonPoints, 3) }));
mainbar.addControl(new Button({ html: '<i class="fa fa-download"></i>', title: 'Save',
  handleClick: () => info(new GeoJSON().writeFeatures(source.getFeatures())) }));
