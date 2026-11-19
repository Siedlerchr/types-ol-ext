import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Geoportail from 'ol-ext/layer/Geoportail'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import SearchBAN from 'ol-ext/control/SearchBAN'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [
    new TileLayer({ source: new OSM(), visible: false }),
    new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' }),
    new Geoportail({ layer: 'CADASTRALPARCELS.PARCELLAIRE_EXPRESS', visible: false }),
  ],
})
map.addControl(new LayerSwitcher())

const search = new SearchBAN({ reverse: true, position: true })
map.addControl(search)
search.on('select', event => {
  map.getView().animate({
    center: event.coordinate,
    zoom: Math.max(map.getView().getZoom() ?? 0, 16),
  })
})
