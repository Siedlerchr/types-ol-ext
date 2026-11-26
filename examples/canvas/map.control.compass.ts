import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Stroke from 'ol/style/Stroke'
import Compass from 'ol-ext/control/Compass'

const osm = new TileLayer({ source: new OSM(), visible: true })
osm.set('name', 'OSM')
const map = new Map({ target: 'map', view: new View({ zoom: 14, center: [270148, 6247782] }), layers: [osm] })
let top: Compass | undefined
let bottom: Compass | undefined
function setCompass(): void {
  if (top) map.removeControl(top)
  if (bottom) map.removeControl(bottom)
  const src = document.querySelector<HTMLSelectElement>('#image')!.value
  const color = document.querySelector<HTMLSelectElement>('#color')!.value
  const width = document.querySelector<HTMLInputElement>('#line')!.checked ? 1 : 0
  top = undefined
  if (document.querySelector<HTMLInputElement>('#top')!.checked) {
    top = new Compass({ className: 'top', src, style: new Stroke({ color, width }) })
    map.addControl(top)
  }
  bottom = new Compass({ className: 'bottom', src, rotateWithView: document.querySelector<HTMLInputElement>('#rotate')!.checked, style: new Stroke({ color, width }) })
  map.addControl(bottom)
}
setCompass()
Object.assign(window, { setCompass })
