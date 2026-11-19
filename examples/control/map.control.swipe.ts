import { Map, View } from 'ol'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorImageLayer from 'ol/layer/VectorImage'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Icon, Style } from 'ol/style'
import Geoportail from 'ol-ext/layer/Geoportail'
import Swipe from 'ol-ext/control/Swipe'

const osm = new TileLayer({ source: new OSM() })
const plan = new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2')
const label = new Geoportail('GEOGRAPHICALNAMES.NAMES')
const source = new VectorSource({ url: '../data/fond_guerre.geojson', format: new GeoJSON(), attributions: ['&copy; data.culture.gouv.fr'] })
const vector = new VectorImageLayer({ source, style: new Style({ image: new Icon({ src: '../data/camera.png', scale: 2 }) }) })
const map = new Map({ target: 'map', view: new View({ zoom: 13, center: [270701, 6247637] }), layers: [plan, osm, label, vector] })
const ctrl = new Swipe()
map.addControl(ctrl)
ctrl.addLayer(plan)
ctrl.addLayer(osm, true)
ctrl.addLayer(vector, true)
Object.assign(window, { ctrl })
