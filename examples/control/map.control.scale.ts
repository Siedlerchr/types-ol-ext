import { Map, View } from 'ol'
import ScaleLine from 'ol/control/ScaleLine'
import Geoportail from 'ol-ext/layer/Geoportail'
import Scale from 'ol-ext/control/Scale'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')],
})
const ctrl = new Scale()
map.addControl(ctrl)
map.addControl(new ScaleLine())

function setDiagonal(value: string): void {
  const ppi = Math.round(Math.hypot(window.screen.width, window.screen.height) / Number(value))
  document.querySelector<HTMLInputElement>('#ppi')!.value = String(ppi)
  ctrl.set('ppi', ppi)
  ctrl.setScale()
}

declare global {
  interface Window { ctrl: Scale; setDiagonal(value: string): void }
}
window.ctrl = ctrl
window.setDiagonal = setDiagonal
