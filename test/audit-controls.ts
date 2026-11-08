import Select from '../@types/ol-ext/control/Select'
import SearchFeature from '../@types/ol-ext/control/SearchFeature'
import LegendItem from '../@types/ol-ext/legend/Item'
import Legend from '../@types/ol-ext/legend/Legend'
import Magnify from '../@types/ol-ext/overlay/Magnify'
import VectorSource from 'ol/source/Vector'
import Dialog from '../@types/ol-ext/control/Dialog'
import Imageline from '../@types/ol-ext/control/Imageline'
import MapZone from '../@types/ol-ext/control/MapZone'
import Target from '../@types/ol-ext/control/Target'
import VideoRecorder from '../@types/ol-ext/control/VideoRecorder'
import RoutingGeoportail from '../@types/ol-ext/control/RoutingGeoportail'
import SearchCoordinates from '../@types/ol-ext/control/SearchCoordinates'

const source = new VectorSource()
const search = new SearchFeature({ source })
search.setSource(source)
const selection = new Select({ selectLabel: 'Find', source })
selection.addCondition({ attr: 'name', op: '!regexp', val: 'test' })
const conditions = selection.getConditions()
selection.setConditions(conditions)
selection.getConditionsString(conditions)
selection.doSelect({ sources: [source], conditions: conditions.conditions })
new LegendItem({ title: 'Example' }).setWidth(20)
declare const legend: Legend
legend.getTitleStyle()
declare const magnify: Magnify
magnify.refresh()
declare const dialog: Dialog
dialog.getInputs().name.focus()
new Imageline({ source: [source], useExtent: true, getImage: () => false }).setLayers([])
new MapZone().setCollapsed(true)
new Target().setVisible(true)
new VideoRecorder().setTooltip('pause', 'Pause')
declare const routing: RoutingGeoportail
routing.getDistanceString(1000)
routing.getTimeString(120)
const coordinates = new SearchCoordinates()
coordinates.setInput([2, 48])
coordinates.setInput()
// @ts-expect-error unsupported operator
selection.addCondition({ op: '!regexep' })
