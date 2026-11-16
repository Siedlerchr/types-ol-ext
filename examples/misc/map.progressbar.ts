import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import ProgressBar from 'ol-ext/control/ProgressBar'

const layers = [
  new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' }),
  new Geoportail({ layer: 'TRANSPORTNETWORKS.ROADS' }),
  new Geoportail({ layer: 'GEOGRAPHICALNAMES.NAMES' }),
]
const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }), layers })
const progress = new ProgressBar({ label: 'Loading...', layers })
map.addControl(progress)
Object.assign(window, { progress })
