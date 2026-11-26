import type Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Bar from 'ol-ext/control/Bar';
import EditBar from 'ol-ext/control/EditBar';
import Select from 'ol/interaction/Select';
import * as condition from 'ol/events/condition';
import UndoRedo from 'ol-ext/interaction/UndoRedo';
import Button from 'ol-ext/control/Button';
import FillAttribute from 'ol-ext/interaction/FillAttribute';

declare const $: JQueryStatic;

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/departements.geojson',
  format: new GeoJSON<Feature>(),
  attributions: [
    "&copy; <a href='https://www.insee.fr'>INSEE</a>",
    "&copy; <a href='https://www.data.gouv.fr/fr/datasets/geofla-r/'>IGN</a>",
  ],
});
const vector = new VectorLayer({
  source: vectorSource,
  style: function (f) {
    return new Style({
      text: new Text({
        text: f.get('id'),
        font: 'bold 11px sans-serif',
        stroke: new Stroke({ width: 1.5, color: [255, 255, 255] }),
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
    zoom: 6,
    center: [180000, 6060000],
  }),
  layers: [new TileLayer({ source: new OSM() }), vector],
});

// Main control bar
const mainbar = new Bar();
map.addControl(mainbar);

const selection = new Select({
  condition: condition.click,
  style: function (f) {
    return new Style({
      fill: new Fill({
        color: [255, 0, 0, 0.5],
      }),
      text: new Text({
        text: f.get('id'),
        font: 'bold 11px sans-serif',
        stroke: new Stroke({ width: 1.5, color: [255, 255, 255] }),
      }),
    });
  },
});

// Editbar
const editbar = new EditBar({
  source: vectorSource,
  edition: false,
  interactions: {
    Select: selection,
    Info: false,
    Split: false,
    Offset: false,
  },
});
mainbar.addControl(editbar);

// Undo redo interaction
const undoInteraction = new UndoRedo();
map.addInteraction(undoInteraction);
vectorSource.once('featuresloadend', () => undoInteraction.clear());

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

// undo/redo attributes
const fillAttr = new FillAttribute({ active: false });
map.addInteraction(fillAttr);

// Refresh attribute
function refresh() {
  const options = $('.options').html('');
  const selected = selection.getFeatures();
  if (selected.getLength() === 1) {
    const f = selected.item(0);
    const attributes = f.getProperties();
    for (const i in attributes) {
      if (i !== 'geometry') {
        $('<label>').html(i).appendTo(options);
        $('<input>')
          .data('attr', i)
          .val(attributes[i])
          .attr('type', typeof attributes[i])
          .appendTo(options);
        $('<br>').appendTo(options);
      }
    }
    $('<button>')
      .text('Modify')
      .click(function () {
        const attr: Record<string, string | number | string[] | undefined> = {};
        let nb = 0;
        $('input', options).each(function () {
          let val = $(this).val();
          if ($(this).attr('type') === 'number') val = Number(val);
          if (f.get($(this).data('attr')) !== val) {
            attr[String($(this).data('attr'))] = val;
            nb++;
          }
        });
        if (nb) fillAttr.fill([f], attr);
      })
      .appendTo(options);
  }
}

// Edit attributes on select
selection.on('select', refresh);
// Refresh on undo
undoInteraction.on('undo', refresh);
undoInteraction.on('redo', refresh);
