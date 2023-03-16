import { Map, View } from 'ol'
import { Tile, Vector } from 'ol/layer'
import { Stamen, Vector as VectorSource } from 'ol/source'
import { defaults as control_defaults } from 'ol/control'
import DrawRegular from 'ol-ext/interaction/DrawRegular'
import { LinearRing, MultiPolygon, Polygon } from 'ol/geom'

declare global {
  interface Window {
    $(selector: any, context?: any): any;

    interaction: DrawRegular;
  }
}
const { $ } = window

// Layers
const stamen = new Tile({
  source: new Stamen({ layer: 'terrain' }),
})
stamen.set('title', 'terrain-background')
const layers = [stamen]

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  controls: control_defaults({ attribution: false }),
  layers,
})

// New vector layer
const vector = new Vector({
  source: new VectorSource(),
})
vector.set('name', 'Vecteur')
map.addLayer(vector)

const interaction = new DrawRegular({
  source: vector.getSource() as VectorSource,
  // condition: ol.events.condition.altKeyOnly,
  sides: $('#sides').val(),
  canRotate: $('#rotation').prop('checked'),
})
map.addInteraction(interaction)
interaction.on('drawstart', e => {
  // e.feature.on('change', function (){console.log('change');})
})

// Events handlers
interaction.on('drawing', e => {
  if (e.feature.getGeometry() instanceof LinearRing || e.feature.getGeometry() instanceof Polygon || e.feature.getGeometry() instanceof MultiPolygon) {
    const geometry = e.feature.getGeometry() as LinearRing || Polygon || MultiPolygon
    $('#info').html(
      `${(geometry.getArea() / 1000000).toFixed(2)
      } km<sup>2</sup>`,
    )
  }
})
interaction.on('drawend', e => {
  $('#info').text('')
})
window.interaction = interaction
