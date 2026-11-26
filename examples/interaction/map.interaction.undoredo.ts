import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Bar from 'ol-ext/control/Bar';
import EditBar from 'ol-ext/control/EditBar';
import FillAttribute from 'ol-ext/interaction/FillAttribute';
import Toggle from 'ol-ext/control/Toggle';
import Button from 'ol-ext/control/Button';
import UndoRedo from 'ol-ext/interaction/UndoRedo';
import Snap from 'ol/interaction/Snap';
import Select from 'ol/interaction/Select';
import Transform from 'ol-ext/interaction/Transform';
import type { UndoRedoAction } from 'ol-ext/interaction/UndoRedo';

declare const $: JQueryStatic;

//  Vector layer
const vector = new VectorLayer({
  source: new VectorSource(),
  style: function (f) {
    return new Style({
      image: new Circle({
        radius: 5,
        stroke: new Stroke({
          width: 1.5,
          color: f.get('color') || [255, 128, 0],
        }),
        fill: new Fill({
          color: (f.get('color') || [255, 128, 0]).concat([0.3]),
        }),
      }),
      stroke: new Stroke({
        width: 2.5,
        color: f.get('color') || [255, 128, 0],
      }),
      fill: new Fill({
        color: (f.get('color') || [255, 128, 0]).concat([0.3]),
      }),
    });
  },
});

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 14,
    center: [270701, 6247637],
  }),
  layers: [new TileLayer({ source: new OSM() }), vector],
});

// Main control bar
const mainbar = new Bar();
map.addControl(mainbar);

// Editbar
const editbar = new EditBar({
  source: vector.getSource()!,
  interactions: { Info: false },
});
mainbar.addControl(editbar);

// Add a fill interaction to set color attribute
const fill = new FillAttribute({ name: 'fill color' }, { color: [255, 0, 0] });
editbar.addControl(
  new Toggle({
    html: '<i class="fa fa-paint-brush"></i>',
    title: 'fill color attribut',
    interaction: fill,
    bar: new Bar({
      controls: [
        new Button({
          className: 'red',
          handleClick: function () {
            fill.setAttribute('color', [255, 0, 0]);
          },
        }),
        new Button({
          className: 'green',
          handleClick: function () {
            fill.setAttribute('color', [0, 255, 0]);
          },
        }),
        new Button({
          className: 'blue',
          handleClick: function () {
            fill.setAttribute('color', [0, 0, 255]);
          },
        }),
      ],
    }),
  }),
);

// Undo redo interaction
const undoInteraction = new UndoRedo();
map.addInteraction(undoInteraction);
// Prevent selection of a deleted feature
undoInteraction.on('undo', function (e) {
  if (e.action.type === 'addfeature') {
    const select = editbar.getInteraction('Select');
    if (select instanceof Select) select.getFeatures().clear();
    const transform = editbar.getInteraction('Transform');
    if (transform instanceof Transform) transform.select();
  }
});

const rows = new WeakMap<UndoRedoAction, JQuery<HTMLLIElement>>();
// Handle undo/redo stack
undoInteraction.on('stack:add', function (e) {
  // New action element
  let elt = rows.get(e.action);
  if (!elt) {
    const row = $('<li>') as JQuery<HTMLLIElement>;
    elt = row.text(e.action.name || e.action.type);
    rows.set(e.action, elt);
    elt.addClass(e.action.name || e.action.type);
    elt.click(function () {
      // undo or redo stack
      if (row.parent().hasClass('undo')) {
        undoInteraction.undo();
      } else {
        undoInteraction.redo();
      }
    });
  }
  // Append to undo stack
  $('.options .undo').append(elt);
  elt.attr('title', 'undo');
  if (!undoInteraction.hasRedo()) $('.options .redo').html('');
  console.log(
    undoInteraction.length() +
      ' undo | ' +
      undoInteraction.length('redo') +
      ' redo',
  );
});
// Append to redo stack
undoInteraction.on('stack:remove', function (e) {
  if (e.shift) {
    $('.options .undo li').first().remove();
  } else if (e.abort) {
    $('.options .undo li').last().remove();
  } else {
    $('.options .redo').prepend($('.options .undo li').last());
  }
  rows.get(e.action)?.attr('title', 'redo');
  console.log(
    undoInteraction.length() +
      ' undo | ' +
      undoInteraction.length('redo') +
      ' redo',
  );
});
// Clear stack
undoInteraction.on('stack:clear', function (e) {
  $('.options .undo').html('');
  $('.options .redo').html('');
  console.log(
    undoInteraction.length() +
      ' undo | ' +
      undoInteraction.length('redo') +
      ' redo',
  );
});

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

// Add a snap
map.addInteraction(
  new Snap({
    source: vector.getSource()!,
  }),
);

Object.assign(window, { undoInteraction });
