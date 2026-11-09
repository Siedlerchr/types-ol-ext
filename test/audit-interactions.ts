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
import UndoRedo from '../@types/ol-ext/interaction/UndoRedo'
import DrawRegular from '../@types/ol-ext/interaction/DrawRegular'
import DrawHole from '../@types/ol-ext/interaction/DrawHole'
import Hover from '../@types/ol-ext/interaction/Hover'
import LongTouch from '../@types/ol-ext/interaction/LongTouch'
import Clip from '../@types/ol-ext/interaction/Clip'
import Flashlight from '../@types/ol-ext/interaction/Flashlight'
import Ripple from '../@types/ol-ext/interaction/Ripple'
import Delete from '../@types/ol-ext/interaction/Delete'
import DragOverlay from '../@types/ol-ext/interaction/DragOverlay'
import FillAttribute from '../@types/ol-ext/interaction/FillAttribute'
import Blob from '../@types/ol-ext/interaction/Blob'
import Offset from '../@types/ol-ext/interaction/Offset'
import Splitter from '../@types/ol-ext/interaction/Splitter'
import SelectCluster from '../@types/ol-ext/interaction/SelectCluster'
import SnapGuides from '../@types/ol-ext/interaction/SnapGuides'
import SnapLayerPixel from '../@types/ol-ext/interaction/SnapLayerPixel'
import VectorImageLayer from 'ol/layer/VectorImage'
import TouchCursor from '../@types/ol-ext/interaction/TouchCursor'
import TouchCursorDraw from '../@types/ol-ext/interaction/TouchCursorDraw'
import TouchCursorModify from '../@types/ol-ext/interaction/TouchCursorModify'
import TouchCursorSelect from '../@types/ol-ext/interaction/TouchCursorSelect'
import VectorLayer from 'ol/layer/Vector'

const source = new VectorSource()
const hover = new Hover({ layerFilter: layer => layer.getVisible() })
hover.setMap(null)
hover.setFeatureFilter()
hover.on('enter', event => { event.feature.getGeometry(); event.originalEvent.clientX; event.dragging })
hover.on('leave', event => {
  // @ts-expect-error leave events do not carry a feature
  event.feature
})
new LongTouch({ handleLongTouchEvent: event => { event.coordinate.slice(); event.originalEvent.clientX; event.map?.getView() } })
const clipped = new Clip()
const clipPixel: number[] | false = clipped.getPixelPosition()
void clipPixel
const flashlight = new Flashlight({ color: 'red' })
flashlight.setMap(null)
flashlight.setColor({ fill: 'black' })
const ripple = new Ripple({ layer: new VectorLayer({ source }) })
ripple.setMap(null)
ripple.rains()
// @ts-expect-error a ripple needs a layer to register its render handler
new Ripple()
const deletion = new Delete()
deletion.on('deletestart', event => { event.features.forEach(feature => feature.getGeometry()) })
deletion.on('deleteend', event => { event.features.map(feature => feature.getGeometry()) })
const dragOverlay = new DragOverlay({ overlays: [] })
dragOverlay.on('dragging', event => { event.overlay.getPosition(); event.originalEvent.clientX })
// @ts-expect-error the constructor accesses the overlays option
new DragOverlay()
const fill = new FillAttribute({ cursor: false }, { name: 'test' })
fill.on('setattributeend', event => { event.features.forEach(feature => feature.getGeometry()); event.properties.name })
new Blob({ radius: 20 })
const offset = new Offset()
offset.setMap(null)
offset.on('offsetting', event => { event.segment[0].slice(); event.segment[1].slice() })
offset.on('modifystart', event => event.features[0].getGeometry())
const splitter = new Splitter({ source, alignTolerance: 0.1 })
splitter.intersectSegs([[0, 0], [1, 1]], [[0, 1], [1, 0]])
splitter.on('beforesplit', event => event.feaure.getGeometry())
splitter.on('aftersplit', event => event.featureAdded.forEach(feature => feature.getGeometry()))
// @ts-expect-error a source array is not handled by the release implementation
new Splitter({ source: [source] })
const selectCluster = new SelectCluster({ circleMaxObjects: 8, wrapX: false })
selectCluster.setMap(null)
const snapGuides = new SnapGuides({ vectorClass: VectorImageLayer })
snapGuides.setMap(null)
snapGuides.addGuide([[0, 0], [1, 1]]).forEach(feature => feature.getGeometry())
new SnapLayerPixel({ layer: new VectorLayer({ source }) })
// @ts-expect-error a pixel snap interaction requires a layer
new SnapLayerPixel()
const cursor = new TouchCursor({ buttons: [{ html: 'Move', click: event => event.preventDefault() }] })
cursor.setMap(null)
cursor.setPosition()
cursor.getPosition()?.slice()
cursor.getButtonElement(0)?.classList.add('active')
cursor.on('click', event => event.pixel.slice())
cursor.on('dragging', event => {
  if ('pixel' in event) event.pixel.slice()
  else event.overlay.getPosition()
})
const cursorDraw = new TouchCursorDraw({ anchor: 'center' })
cursorDraw.on('drawend', event => { event.feature.getGeometry(); event.valid })
const cursorModify = new TouchCursorModify()
cursorModify.setActive(true)
const cursorSelect = new TouchCursorSelect({ hitTolerance: 3 })
cursorSelect.on('select', event => event.selected.forEach(feature => feature.getGeometry()))
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

declare const undo: UndoRedo
undo.define<{ value: number }>('custom', value => { value.value }, value => { value.value })
undo.push('custom', { value: 1 })
undo.getStack('redo').forEach(action => { action.type; action.feature?.getGeometry() })
undo.on('undo', event => { event.action.type })
undo.on('stack:add', event => { event.action.name })
undo.on('stack:remove', event => { event.shift; event.abort })
undo.on('stack:clear', event => { event.type })
const regular = new DrawRegular({ source })
regular.setMap(null)
regular.on('drawstart', event => { event.feature.getGeometry(); event.pixel.slice() })
regular.on('drawing', event => { event.feature; event.startCoordinate; event.square })
regular.on('drawend', event => { event.feature; event.pixel?.slice() })
regular.on('drawcancel', event => {
  const cancelled: null = event.feature
  void cancelled
})
const hole = new DrawHole()
hole.on('drawstart', event => event.feature.getGeometry())
// @ts-expect-error DrawRegular dispatches drawcancel, not drawabort
regular.on('drawabort', () => {})
// @ts-expect-error condition must be a function
new CurrentMap({ condition: true })
