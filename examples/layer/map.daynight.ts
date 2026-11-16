import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import { Circle, Fill, Style } from 'ol/style'
import DayNight from 'ol-ext/source/DayNight'

const osm = new TileLayer({ source: new OSM() })
osm.set('name', 'OSM')
const map = new Map({ target: 'map', view: new View({ zoom: 0, center: [0, 0], projection: 'EPSG:4326' }), layers: [osm] })
const vectorSource = new DayNight()
map.addLayer(new VectorLayer({ source: vectorSource, style: new Style({
  image: new Circle({ radius: 5, fill: new Fill({ color: 'red' }) }),
  fill: new Fill({ color: [0, 0, 50, 0.5] }),
}) }))
function setProjection(projection: string): void {
  map.setView(new View({ zoom: 0, center: [0, 0], projection }))
  vectorSource.refresh()
}
const date = document.querySelector<HTMLInputElement>('#date')!
date.addEventListener('change', () => vectorSource.setTime(date.value))
date.value = new Date(vectorSource.get('time')).toISOString().substring(0, 16)
Object.assign(window, { setProjection })
