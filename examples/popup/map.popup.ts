import type { Feature } from 'ol'
import { Map, View } from 'ol'
import { Tile, Vector } from 'ol/layer'
import { StadiaMaps, Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { Style, Icon } from 'ol/style'
import { Select } from 'ol/interaction'

import Popup from 'ol-ext/overlay/Popup'
import type { Polygon } from 'ol/geom'

// Layers
const stamen = new Tile({
  source: new StadiaMaps({ layer: 'stamen_terrain' }),
})
stamen.set('title', 'stamen_terrain-background')

const layers = [stamen]

// Popup overlay
const popup = new Popup(
  {
    popupClass: 'default', // "tooltips", "warning" "black" "default", "tips", "shadow",
    closeBox: true,
    onshow() {
      console.log('You opened the box')
    },
    onclose() {
      console.log('You close the box')
    },
    positioning: 'auto',
    anim: true,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
    // autoPanAnimation: { duration: 250 }
  },
)

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers,
  overlays: [popup],
})

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/fond_guerre.geojson',
  format: new GeoJSON({
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857',
  }),
  attributions: ['&copy; <a href=\'https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire\'>'
  + '<img src=\'https://data.culture.gouv.fr/assets/logo\' height=\'12px\'>data.culture.gouv.fr</a>'],
})

const vector = new Vector({
  source: vectorSource,
  style: new Style({ image: new Icon({ src: '../data/camera.png', scale: 0.8 }) }),
})
vector.set('name', 'Fonds de guerre 14-18')
map.addLayer(vector)

// Control Select
const select = new Select({})
map.addInteraction(select)

// On selected => show/hide popup
select.getFeatures().on('add', e => {
  const feature = e.element
  let content = ''
  content += `<img src='${feature.get('img')}'/>`
  content += feature.get('text')

  const f = feature as Feature<Polygon>
  popup.show(f.getGeometry()?.getFirstCoordinate(), content)
})
select.getFeatures().on('remove', e => {
  popup.hide()
})

declare global {
  interface Window {
    popup: Popup,
    map: Map
  }
}
window.popup = popup
window.map = map
