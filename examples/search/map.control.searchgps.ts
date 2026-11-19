import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import SearchGPS from 'ol-ext/control/SearchGPS'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new TileLayer({ source: new OSM() })],
})
const search = new SearchGPS()
map.addControl(search)
search.on('select', event => {
  map.getView().animate({
    center: event.search.coordinate,
    zoom: Math.max(map.getView().getZoom() ?? 0, 5),
  })
})
