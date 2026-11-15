import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import Flashlight from 'ol-ext/interaction/Flashlight'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })],
})
const radius = document.querySelector<HTMLInputElement>('#radius')!
const color = document.querySelector<HTMLSelectElement>('#color')!
const fl = new Flashlight({ radius: Number(radius.value), color: color.value })
map.addInteraction(fl)

// The upstream HTML calls the interaction from its controls.
declare global {
  interface Window { fl: Flashlight }
}
window.fl = fl
