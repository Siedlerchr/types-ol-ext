import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import Placemark from 'ol-ext/overlay/Placemark'

const placemark = new Placemark({
  contentColor: '#000',
  onshow: () => { console.log('You opened a placemark') },
  autoPan: { animation: { duration: 250 } },
})
const map = new Map({
  target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })],
  overlays: [placemark],
})
map.on('click', event => { placemark.show(event.coordinate) })
Object.assign(window, { placemark })
