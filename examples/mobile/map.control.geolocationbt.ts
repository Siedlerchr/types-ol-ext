import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import GeolocationButton from 'ol-ext/control/GeolocationButton'
import Popup from 'ol-ext/overlay/Popup'

const map = new Map({
  target: 'map', view: new View({ zoom: 5, center: [261720, 5951081] }),
  layers: [new TileLayer({ source: new OSM() })],
})
const geoloc = new GeolocationButton({ title: 'Where am I?', delay: 2000 })
map.addControl(geoloc)
const here = new Popup({ positioning: 'bottom-center' })
map.addOverlay(here)
geoloc.on('position', event => {
  if (event.coordinate) here.show(event.coordinate, 'You are<br/>here!')
  else here.hide()
})
