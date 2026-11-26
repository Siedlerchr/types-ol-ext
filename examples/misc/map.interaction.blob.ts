import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import Colorize from 'ol-ext/filter/Colorize'
import Blob from 'ol-ext/interaction/Blob'

const ortho = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })
ortho.addFilter(new Colorize({ operation: 'luminosity', value: 0.45 }))
const terrain = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })
const map = new Map({
  target: 'map',
  view: new View({ zoom: 10, center: [256697, 6249708] }),
  layers: [ortho, terrain],
})
const blob = new Blob({ radius: Number(document.querySelector<HTMLInputElement>('#radius')!.value), layers: terrain })
map.addInteraction(blob)

// The upstream controls reference both names directly.
declare global {
  interface Window { blob: Blob; terrain: Geoportail }
}
window.blob = blob
window.terrain = terrain
