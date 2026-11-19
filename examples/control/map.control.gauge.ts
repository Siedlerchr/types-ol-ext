import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import Gauge from 'ol-ext/control/Gauge'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 13, center: [649083, 5408224] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')],
})
const gauge = new Gauge({ title: 'Gauge' })
gauge.val(50)
map.addControl(gauge)

// The upstream HTML calls this control from its range input.
declare global {
  interface Window { gauge: Gauge }
}
window.gauge = gauge
