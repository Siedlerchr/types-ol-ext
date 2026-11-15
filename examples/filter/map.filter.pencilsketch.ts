import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Geoportail from 'ol-ext/layer/Geoportail'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Permalink from 'ol-ext/control/Permalink'
import PencilSketch from 'ol-ext/filter/PencilSketch'

const osm = new TileLayer({ source: new OSM() })
osm.setProperties({ title: 'OSM', baseLayer: true })
const layers = [
  osm,
  new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2', visible: false, baseLayer: true }),
  new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS', visible: false, baseLayer: true }),
]
const map = new Map({ target: 'map', view: new View({ zoom: 8, center: [247044, 6549736] }), layers })
map.addControl(new LayerSwitcher())
const pencil = new PencilSketch()
layers.forEach(layer => layer.addFilter(pencil))
map.addControl(new Permalink({ visible: false }))

declare global {
  interface Window { pencil: PencilSketch }
}
window.pencil = pencil
