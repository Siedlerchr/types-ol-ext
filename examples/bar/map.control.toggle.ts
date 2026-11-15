import { Map, View } from 'ol'
import { Draw, Select } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Toggle from 'ol-ext/control/Toggle'

const source = new VectorSource()
const map = new Map({
  target: 'map',
  view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source })],
})
const info = document.querySelector<HTMLElement>('#info')!
const selectCtrl = new Toggle({
  html: '<i class="fa fa-hand-pointer-o"></i>', className: 'select', title: 'Select',
  interaction: new Select(), active: true,
  onToggle: active => { info.textContent = `Select is ${active ? 'activated' : 'deactivated'}` },
})
map.addControl(selectCtrl)
const pedit = new Toggle({
  html: '<i class="fa fa-map-marker"></i>', className: 'edit', title: 'Point',
  interaction: new Draw({ type: 'Point', source }),
  onToggle: active => { info.textContent = `Edition is ${active ? 'activated' : 'deactivated'}` },
})
map.addControl(pedit)
pedit.on('change:disable', event => { info.textContent = `Edition is ${event.disable ? 'disabled' : 'enabled'}` })
Object.assign(window, { pedit })
