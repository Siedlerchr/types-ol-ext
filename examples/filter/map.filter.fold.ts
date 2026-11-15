import { Map, View } from 'ol'
import Geoportail from 'ol-ext/layer/Geoportail'
import Fold from 'ol-ext/filter/Fold'

const imagery = new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')
const labels = new Geoportail('GEOGRAPHICALNAMES.NAMES')
new Map({ target: 'map', view: new View({ zoom: 11, center: [184410, 6483281] }), controls: [], layers: [imagery, labels] })
const filters = [new Fold({ fill: true, shadow: false }), new Fold()]
imagery.addFilter(filters[0])
labels.addFilter(filters[1])

function value(id: string): number {
  return Number.parseInt(document.querySelector<HTMLInputElement>(`#${id}`)!.value, 10)
}
function setFilter(): void {
  filters.forEach(filter => {
    filter.set('fold', [Math.max(1, value('foldx')), Math.max(1, value('foldy'))])
    filter.set('margin', Math.max(0, value('margin')))
    filter.set('padding', Math.max(0, value('padding')))
    filter.set('fsize', [Math.max(0, value('fsizex')), Math.max(0, value('fsizey'))])
  })
}
setFilter()

declare global {
  interface Window { setFilter(): void }
}
window.setFilter = setFilter
