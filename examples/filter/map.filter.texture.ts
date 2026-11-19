import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Texture from 'ol-ext/filter/Texture'

const osm = new TileLayer({ source: new OSM() })
new Map({ target: 'map', view: new View({ zoom: 8, center: [247044, 6549736] }), layers: [osm] })
const filter = new Texture()
osm.addFilter(filter)

function setFilter(): void {
  filter.setActive(document.querySelector<HTMLInputElement>('#active')!.checked)
  filter.setFilter({
    src: document.querySelector<HTMLSelectElement>('#texture')!.value,
    rotateWithView: document.querySelector<HTMLInputElement>('#rotate')!.checked,
    opacity: Number(document.querySelector<HTMLInputElement>('#opacity')!.value),
  })
}
document.querySelectorAll('input').forEach(input => input.addEventListener('change', setFilter))
setFilter()

declare global {
  interface Window { setFilter(): void }
}
window.setFilter = setFilter
