import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import MapZone from 'ol-ext/control/MapZone'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 6, center: [173664, 6166327] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })],
})
const layer = () => new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })
const zone = new MapZone({
  layer,
  zones: [{ title: 'Métropole', extent: [-5.318421740712579, 41.16082274292913, 9.73284186155716, 51.21957336557702] }, ...MapZone.zones.DOM],
})
map.addControl(zone)
zone.on('select', event => { console.log(`click ${event.zone.title} (${event.index})`) })
map.addControl(new MapZone({ layer, zones: MapZone.zones.DOMTOM, target: document.querySelector<HTMLElement>('.zones')! }))
