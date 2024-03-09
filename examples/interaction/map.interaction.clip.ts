import { Map, View } from 'ol'
import { Tile } from 'ol/layer'
import { StadiaMaps } from 'ol/source'
import Clip from 'ol-ext/interaction/Clip'

declare global {
  interface Window {
    $(selector: any, context?: any): any,

    clip: Clip
  }
}
const { $ } = window

// Layers
const mapbox = new Tile({
  source: new StadiaMaps({ layer: 'stamen_terrain' }),
})
mapbox.set('title', 'stamen_terrain-background')
const stamen = new Tile({
  source: new StadiaMaps({ layer: 'stamen_watercolor' }),
})

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: [mapbox, stamen],
})

// Clip interaction
const clip = new Clip({ radius: Number($('#radius').val()), layers: stamen })
map.addInteraction(clip)
window.clip = clip
