import CurrentMap from '../@types/ol-ext/interaction/CurrentMap'
import CopyPaste from '../@types/ol-ext/interaction/CopyPaste'
import ModifyFeature from '../@types/ol-ext/interaction/ModifyFeature'
import Split from '../@types/ol-ext/interaction/Split'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import DropFile from '../@types/ol-ext/interaction/DropFile'
import GPX from 'ol/format/GPX'
import Transform from '../@types/ol-ext/interaction/Transform'
import Feature from 'ol/Feature'

const source = new VectorSource()
const current = new CurrentMap({ condition: () => true })
current.getCurrentMap()?.getView()
const clipboard = new CopyPaste({ mapCondition: () => true, condition: () => false, destination: source })
clipboard.getDestination()?.getFeatures()
clipboard.getSources()?.forEach(item => item.getFeatures())
clipboard.setSources()
clipboard.on('paste', event => { event.features; event.time })
const modify = new ModifyFeature({ sources: [source], cursor: 'pointer' })
modify.setMap(null)
modify.on('modifying', event => { event.coordinate; event.originalEvent; event.features })
const closest = modify.getNearestCoord([0, 0], new Point([0, 0]))
if (closest) closest.coord
const split = new Split({ featureStyle: false })
split.setMap(null)
split.setSources()
split.on('beforesplit', event => { event.original; event.features })
const nearest: number[] | undefined = split.getNearestCoord([0, 0], [])
void nearest
const drop = new DropFile({ zone: document.body, projection: 'EPSG:3857', formatConstructors: [GPX] })
drop.setMap(null)
drop.on('loadstart', event => { event.file; event.filetype; event.isok })
drop.on('addfeatures', event => event.features.forEach(feature => feature.getGeometry()))
drop.on('loadend', event => { event.file; event.result; event.features })
// @ts-expect-error the drop zone is an element or document, not a selector
new DropFile({ zone: '#drop' })

const transform = new Transform({ buffer: 2, layers: [] })
transform.setSelection([new Feature(new Point([0, 0]))])
transform.select(null)
transform.setMap(null)
transform.on('rotatestart', event => {
  event.pixel
  // @ts-expect-error the angle is only provided while rotating
  event.angle
})
transform.on('rotating', event => event.angle.toFixed())
transform.on('scaleend', event => { event.transformed; event.oldgeoms })
transform.on('select', event => { event.feature?.getGeometry(); event.pixel?.slice() })
// @ts-expect-error condition must be a function
new CurrentMap({ condition: true })
