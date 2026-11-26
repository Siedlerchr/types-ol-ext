import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { unByKey } from 'ol/Observable';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Stroke from 'ol/style/Stroke';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Bar from 'ol-ext/control/Bar';
import EditBar from 'ol-ext/control/EditBar';
import UndoRedo from 'ol-ext/interaction/UndoRedo';
import Button from 'ol-ext/control/Button';
import Fill from 'ol/style/Fill';

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/departements.geojson',
  format: new GeoJSON<Feature>(),
  attributions: [
    "&copy; <a href='https://www.insee.fr'>INSEE</a>",
    "&copy; <a href='https://www.data.gouv.fr/fr/datasets/geofla-r/'>IGN</a>",
  ],
});
const listenerKey = vectorSource.on('change', function (e) {
  if (vectorSource.getState() === 'ready') {
    unByKey(listenerKey);
    // Clear undo/redo on load
    undoInteraction.clear();
  }
});
const vector = new VectorLayer({
  source: vectorSource,
  style: function (f) {
    return [
      ...(style ? [style] : []),
      new Style({
        text: new Text({
          text: f.get('id'),
          font: 'bold 11px sans-serif',
          stroke: new Stroke({ width: 1.5, color: [255, 255, 255] }),
        }),
      }),
    ];
  },
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [180000, 6060000],
  }),
  layers: [new TileLayer({ source: new OSM() }), vector],
});

// Main control bar
const mainbar = new Bar();
map.addControl(mainbar);

// Editbar
const editbar = new EditBar({
  source: vectorSource,
  edition: false,
  interactions: { Select: true, Info: false, Split: false, Offset: false },
});
mainbar.addControl(editbar);

// Undo redo interaction
const undoInteraction = new UndoRedo();
map.addInteraction(undoInteraction);

// Add buttons to the bar
const bar = new Bar({
  group: true,
  controls: [
    new Button({
      html: '<i class="fa fa-undo" ></i>',
      title: 'undo...',
      handleClick: function () {
        undoInteraction.undo();
      },
    }),
    new Button({
      html: '<i class="fa fa-repeat" ></i>',
      title: 'redo...',
      handleClick: function () {
        undoInteraction.redo();
      },
    }),
  ],
});
mainbar.addControl(bar);

/* undo/redo custom */
let style: Style | undefined;
// Define undo redo for the style
undoInteraction.define(
  'style',
  // undo function: set previous style
  function (s) {
    style = s.before;
    vector.changed();
  },
  // redo function: reset the style
  function (s) {
    style = s.after;
    vector.changed();
  },
);
// undo/redo custom
function setStyle() {
  let before;
  if (style) before = style.clone();
  style = new Style({
    stroke: new Stroke({
      width: Number(document.querySelector<HTMLInputElement>('#width')!.value),
      color: '#f00',
    }),
    fill: new Fill({
      color: document.querySelector<HTMLInputElement>('#color')!.value,
    }),
  });
  vector.changed();
  // use blockStart / blockEnd to stack many undo in a same action
  // undoInteraction.blockStart();
  // Add undo style action
  undoInteraction.push('style', { before: before, after: style });
  // undoInteraction.blockEnd();
}
setStyle();

Object.assign(window, { setStyle });
