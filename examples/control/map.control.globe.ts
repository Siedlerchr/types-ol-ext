import { Map, View } from 'ol'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Fill, Style } from 'ol/style'
import Geoportail from 'ol-ext/layer/Geoportail'
import Globe from 'ol-ext/control/Globe'

const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [270148, 6247782] }), layers: [new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2')] })
const vector = new VectorLayer({
  source: new VectorSource({ url: '../data/worldpt.json', format: new GeoJSON() }),
  style: feature => [new Style({ fill: new Fill({ color: feature.get('iso') === 'US' ? 'red' : '#369' }) })],
})
const layers = [vector, new TileLayer({ source: new OSM() }), new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'),
  new TileLayer({ source: new XYZ({ url: 'https://{a-d}.tiles.mapbox.com/v3/mapbox.natural-earth-2/{z}/{x}/{y}.png' }) })]
const ov = new Globe({ layers, follow: document.querySelector<HTMLInputElement>('#follow')!.checked })
map.addControl(ov)
function setOVLayer(element: HTMLSelectElement): void {
  const selected = Number(element.value)
  ov.getGlobe().getLayers().getArray().forEach((layer, index) => { layer.setVisible(index === selected) })
}
setOVLayer(document.querySelector<HTMLSelectElement>('.options > select')!)
Object.assign(window, { ov, setOVLayer })
