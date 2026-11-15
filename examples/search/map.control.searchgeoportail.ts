import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import SearchGeoportail from 'ol-ext/control/SearchGeoportail'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [
    new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' }),
    new Geoportail({ layer: 'CADASTRALPARCELS.PARCELLAIRE_EXPRESS', visible: false }),
  ],
})
map.addControl(new LayerSwitcher())
const search = new SearchGeoportail({ reverse: true })
map.addControl(search)
search.on('select', event => {
  map.getView().animate({ center: event.coordinate, zoom: Math.max(map.getView().getZoom() ?? 0, 16) })
})
const position = document.querySelector<HTMLInputElement>('input.position')!
const bbox = document.querySelector<HTMLInputElement>('input.bbox')!
position.addEventListener('change', () => { search.set('position', position.checked); search.search() })
bbox.addEventListener('change', () => { search.set('useExtent', bbox.checked); search.search() })
