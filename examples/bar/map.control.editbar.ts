import { Map, View } from 'ol';
import { Vector, Tile } from 'ol/layer';
import { Vector as VectorSource, OSM } from 'ol/source';

import EditBar from 'ol-ext/control//EditBar';
import Notification from 'ol-ext/control/Notification';
import { Select } from 'ol/interaction';
import Tooltip from 'ol-ext/overlay/Tooltip';
import { SelectEvent } from 'ol/interaction/Select';

//  Vector layer
const vector = new Vector({ source: new VectorSource() });

// The map
const map = new Map({
  target: 'map',
  view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [new Tile({ source: new OSM() }), vector],
});
const note = new Notification();
map.addControl(note);

// Add the editr
const select = new Select({ title: 'Sélection' });
select.set('title', 'Sélection');
const edit = new EditBar({
  // Translate interaction title / label
  interactions: {
    // Use our own interaction > set the title inside
    Select: select,
    // Define button title
    DrawLine: 'Ligne',
    // Drawregular with label
    DrawRegular: {
      title: 'Forme régullière',
      ptsLabel: 'pts',
      circleLabel: 'cercle',
    },
  },
  source: vector.getSource(),
});
map.addControl(edit);

// Add a tooltip
const tooltip = new Tooltip();
map.addOverlay(tooltip);

edit.getInteraction('Select').on('select', (e: SelectEvent) => {
  if (e.target.getFeatures().getLength()) {
    tooltip.setInfo('Drag points on features to edit...');
  } else tooltip.setInfo();
});
edit.getInteraction('Select').on('change:active', function (e) {
  tooltip.setInfo('');
});
edit.getInteraction('ModifySelect').on('modifystart', function (e) {
  if (e.features.length === 1) tooltip.setFeature(e.features[0]);
});
edit.getInteraction('ModifySelect').on('modifyend', function (e) {
  tooltip.setFeature();
});
edit.getInteraction('DrawPoint').on('change:active', function (e) {
  tooltip.setInfo(e.oldValue ? '' : 'Click map to place a point...');
});
edit.getInteraction('DrawLine').on(['change:active', 'drawend'], function (e) {
  tooltip.setFeature();
  tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing line...');
});
edit.getInteraction('DrawLine').on('drawstart', function (e) {
  tooltip.setFeature(e.feature);
  tooltip.setInfo('Click to continue drawing line...');
});
edit.getInteraction('DrawPolygon').on('drawstart', function (e) {
  tooltip.setFeature(e.feature);
  tooltip.setInfo('Click to continue drawing shape...');
});
edit
  .getInteraction('DrawPolygon')
  .on(['change:active', 'drawend'], function (e) {
    tooltip.setFeature();
    tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing shape...');
  });
edit.getInteraction('DrawHole').on('drawstart', function (e) {
  tooltip.setFeature(e.feature);
  tooltip.setInfo('Click to continue drawing hole...');
});
edit.getInteraction('DrawHole').on(['change:active', 'drawend'], (e) => {
  tooltip.setFeature();
  tooltip.setInfo(e.oldValue ? '' : 'Click polygon to start drawing hole...');
});
edit.getInteraction('DrawRegular').on('drawstart', (e) => {
  tooltip.setFeature(e.feature);
  tooltip.setInfo('Move and click map to finish drawing...');
});
edit.getInteraction('DrawRegular').on(['change:active', 'drawend'], (e) => {
  tooltip.setFeature();
  tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing shape...');
});

edit.on('info', (e) => {
  console.log(e);
  note.show(
    '<i class="fa fa-info-circle"></i> ' +
      e.features.getLength() +
      ' feature(s) selected'
  );
});
