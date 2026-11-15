import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Geoportail from 'ol-ext/layer/Geoportail'
import Permalink from 'ol-ext/control/Permalink'

const osm = new TileLayer({ source: new OSM() })
osm.set('permalink', 'O')
const imagery = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })
imagery.set('permalink', 'S')
const map = new Map({
  target: 'map',
  view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [imagery, osm],
})
const ctrl = new Permalink({
  geohash: /gh=/.test(document.location.href),
  localStorage: true,
  onclick: url => { document.location.href = `mailto:?subject=subject&body=${encodeURIComponent(url)}` },
})
map.addControl(ctrl)
document.querySelector<HTMLInputElement>('#geohash')!.checked = /gh=/.test(document.location.href)
const user = document.querySelector<HTMLInputElement>('#user')!
user.value = ctrl.getUrlParam('user') || ''
user.addEventListener('change', () => ctrl.setUrlParam('user', user.value))
document.querySelector<HTMLInputElement>('#opacity')!.value = String(osm.getOpacity())
Object.assign(window, { ctrl, osm })
