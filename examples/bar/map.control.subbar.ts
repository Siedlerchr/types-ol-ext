import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Bar from 'ol-ext/control/Bar'
import Toggle from 'ol-ext/control/Toggle'
import TextButton from 'ol-ext/control/TextButton'

const map = new Map({
  target: 'map', view: new View({ zoom: 14, center: [270701, 6247637] }),
  layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source: new VectorSource() })],
})
function info(text = ''): void { document.querySelector<HTMLElement>('#info')!.textContent = text }
const sub2 = new Bar({ toggleOne: true, controls: [
  new TextButton({ html: '2.1', handleClick: () => info('Button 2.1 clicked') }),
  new TextButton({ html: '2.2', handleClick: () => info('Button 2.2 clicked') }),
] })
const sub1 = new Bar({ toggleOne: true, controls: [
  new Toggle({ html: '1', autoActivate: true, onToggle: active => info(`Button 1 ${active ? 'activated' : 'deactivated'}`) }),
  new Toggle({ html: '2', bar: sub2, onToggle: active => info(`Button 2 ${active ? 'activated' : 'deactivated'}`) }),
], attributes: { id: 'sub1' } })
map.addControl(new Bar({ controls: [new Toggle({ html: '0', bar: sub1, onToggle: () => info(), attributes: { 'aria-label': 'more options' } })] }))
