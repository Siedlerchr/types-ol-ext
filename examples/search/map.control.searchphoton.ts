import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import SearchPhoton from 'ol-ext/control/SearchPhoton'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new TileLayer({ source: new OSM() })],
})
const search = new SearchPhoton({ lang: 'fr', reverse: true, position: true })
map.addControl(search)
search.on('select', event => {
  map.getView().animate({
    center: event.coordinate,
    zoom: Math.max(map.getView().getZoom() ?? 0, 16),
  })
})
