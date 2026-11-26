import { Map, View } from 'ol'
import GeoJSON from 'ol/format/GeoJSON'
import WebGLTileLayer from 'ol/layer/WebGLTile'
import VectorImageLayer from 'ol/layer/VectorImage'
import GeoTIFF from 'ol/source/GeoTIFF'
import ImageTile from 'ol/source/ImageTile'
import VectorSource from 'ol/source/Vector'
import { Icon, Style } from 'ol/style'
import Geoportail from 'ol-ext/layer/Geoportail'
import Swipe from 'ol-ext/control/Swipe'

const osm = new WebGLTileLayer({ source: new ImageTile({ url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', attributions: '&copy; OpenStreetMap contributors' }) })
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
const cog = new GeoTIFF({ sources: [{ url: 'https://openlayers.org/data/raster/no-overviews.tif' }] })
const gl = new WebGLTileLayer({ source: cog })
map.addLayer(gl)
map.setView(cog.getView())
ctrl.addLayer(gl, false)
Object.assign(window, { ctrl })
