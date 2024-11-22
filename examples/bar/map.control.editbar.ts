import { Map, View } from 'ol'
import { Vector, Tile } from 'ol/layer'
import { Vector as VectorSource, OSM } from 'ol/source'
import type Draw from 'ol/interaction/Draw'

import EditBar from 'ol-ext/control//EditBar'
import Notification from 'ol-ext/control/Notification'
import { Select } from 'ol/interaction'
import Tooltip from 'ol-ext/overlay/Tooltip'
import type { SelectEvent } from 'ol/interaction/Select'
import type ModifyFeature from 'ol-ext/interaction/ModifyFeature'
import type DrawRegular from 'ol-ext/interaction/DrawRegular'
import type DrawHole from 'ol-ext/interaction/DrawHole'

//  Vector layer
const vector = new Vector({ source: new VectorSource() })

// The map
const map = new Map({
  target: 'map',
  view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [new Tile({ source: new OSM() }), vector],
})
const note = new Notification()
map.addControl(note)

// Add the editr
const select = new Select(/* { title: 'Sélection' } */)
select.set('title', 'Sélection')
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
})
map.addControl(edit)

// Add a tooltip
const tooltip = new Tooltip()
map.addOverlay(tooltip);

(edit.getInteraction('Select') as Select).on('select', (e: SelectEvent) => {
  if (e.target.getFeatures().getLength()) {
    tooltip.setInfo('Drag points on features to edit...')
  } else tooltip.setInfo()
})
edit.getInteraction('Select').on('change:active', () => {
  tooltip.setInfo('')
});
(edit.getInteraction('ModifySelect') as ModifyFeature).on('modifystart', e => {
  if (e.features.length === 1) tooltip.setFeature(e.features[0])
});
(edit.getInteraction('ModifySelect') as ModifyFeature).on('modifyend', () => {
  tooltip.setFeature()
})
edit.getInteraction('DrawPoint').on('change:active', e => {
  tooltip.setInfo(e.oldValue ? '' : 'Click map to place a point...')
});
(edit.getInteraction('DrawLine') as Draw).on('change:active', e => {
  tooltip.setFeature()
  tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing line...')
});
(edit.getInteraction('DrawLine') as Draw).on('drawend', () => {
  tooltip.setFeature()
  // oldValue doesn't exist in DrawEvent
  // tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing line...');
});
(edit.getInteraction('DrawLine') as Draw).on('drawstart', e => {
  tooltip.setFeature(e.feature)
  tooltip.setInfo('Click to continue drawing line...')
});
(edit.getInteraction('DrawPolygon') as Draw).on('drawstart', e => {
  tooltip.setFeature(e.feature)
  tooltip.setInfo('Click to continue drawing shape...')
});
(edit.getInteraction('DrawPolygon') as Draw).on('change:active', e => {
  tooltip.setFeature()
  tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing shape...')
});
(edit.getInteraction('DrawPolygon') as Draw).on('drawend', () => {
  tooltip.setFeature()
  // tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing shape...');
});
(edit.getInteraction('DrawHole') as DrawHole).on('drawstart', e => {
  tooltip.setFeature(e.feature)
  tooltip.setInfo('Click to continue drawing hole...')
});
(edit.getInteraction('DrawHole') as DrawHole).on('change:active', e => {
  tooltip.setFeature()
  tooltip.setInfo(e.oldValue ? '' : 'Click polygon to start drawing hole...')
});
(edit.getInteraction('DrawHole') as DrawHole).on('drawend', e => {
  tooltip.setFeature()
  tooltip.setInfo(e.oldValue ? '' : 'Click polygon to start drawing hole...')
});
(edit.getInteraction('DrawRegular') as DrawRegular).on('drawstart', e => {
  tooltip.setFeature(e.feature)
  tooltip.setInfo('Move and click map to finish drawing...')
});
(edit.getInteraction('DrawRegular') as DrawRegular).on('change:active', e => {
  tooltip.setFeature()
  tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing shape...')
});
(edit.getInteraction('DrawRegular') as DrawRegular).on('drawend', e => {
  tooltip.setFeature()
  tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing shape...')
})

edit.on('info', e => {
  console.log(e)
  note.show(
    `<i class="fa fa-info-circle"></i> ${e.features.getLength()
    } feature(s) selected`,
  )
})
