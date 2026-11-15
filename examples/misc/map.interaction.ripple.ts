import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import Ripple from 'ol-ext/interaction/Ripple'

const layer = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })
const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [layer],
})
map.addInteraction(new Ripple({ layer }))
