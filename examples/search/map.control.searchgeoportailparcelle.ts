import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import SearchGeoportailParcelle from 'ol-ext/control/SearchGeoportailParcelle'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [
    new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' }),
    new Geoportail({ layer: 'CADASTRALPARCELS.PARCELLAIRE_EXPRESS', visible: true }),
  ],
})
const search = new SearchGeoportailParcelle({ position: true })
map.addControl(search)
search.on('parcelle', event => {
  map.getView().animate({ center: event.coordinate, zoom: Math.max(map.getView().getZoom() ?? 0, 16) })
})
