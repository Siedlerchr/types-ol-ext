import { Map, View } from 'ol'
import { singleClick } from 'ol/events/condition'
import Select from 'ol/interaction/Select'
import TileLayer from 'ol/layer/Tile'
import VectorImageLayer from 'ol/layer/VectorImage'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Permalink from 'ol-ext/control/Permalink'
import DropFile from 'ol-ext/interaction/DropFile'
import PopupFeature from 'ol-ext/overlay/PopupFeature'

const base = new TileLayer({ source: new OSM() })
base.set('name', 'OSM')
const map = new Map({ target: 'map', view: new View({ zoom: 6, center: [413609, 5881092] }), layers: [base] })
map.addControl(new LayerSwitcher())
map.addControl(new Permalink({ visible: false }))
const select = new Select({ hitTolerance: 3, condition: singleClick })
map.addInteraction(select)
map.addOverlay(new PopupFeature({ className: 'default anim', select }))
const drop = new DropFile()
map.addInteraction(drop)
drop.on('loadstart', () => { document.body.classList.add('isloading') })
drop.on('loadend', event => {
  const source = new VectorSource({ features: event.features || [] })
  const layer = new VectorImageLayer({ source })
  layer.set('title', event.file.name)
  map.addLayer(layer)
  document.body.classList.remove('isloading')
  Object.assign(window, { feat: event.features, layer })
})
