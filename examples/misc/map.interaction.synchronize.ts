import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import Synchronize from 'ol-ext/interaction/Synchronize'

const map = new Map({
  target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })],
})
const map2 = new Map({
  target: 'map2', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
})
map.addInteraction(new Synchronize({ maps: [map2] }))
map2.addInteraction(new Synchronize({ maps: [map] }))
