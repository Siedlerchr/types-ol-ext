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
import WMSCapabilities from '../@types/ol-ext/control/WMSCapabilities'
import WMTSCapabilities from '../@types/ol-ext/control/WMTSCapabilities'
import Search from '../@types/ol-ext/control/Search'
import SearchJSON from '../@types/ol-ext/control/SearchJSON'
import SearchNominatim from '../@types/ol-ext/control/SearchNominatim'
import SearchPhoton from '../@types/ol-ext/control/SearchPhoton'
import Popup from '../@types/ol-ext/overlay/Popup'
import FixedPopup from '../@types/ol-ext/overlay/FixedPopup'

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
const wms = new WMSCapabilities({ onselect: layer => layer.getSource() })
wms.getCapabilities('https://example.com/wms', { onload: capabilities => { void capabilities } })
wms.loadLayer('https://example.com/wms', 'roads', result => result.layer.getSource())
wms.showCapabilities({})
wms.getRequestParam({ version: '1.3.0' })
const wmts = new WMTSCapabilities()
wmts.isSupportedSet({ TileMatrixSet: 'PM_0_18' })
wmts.getRequestParam({})
const textSearch = new Search({ autocomplete: (_query, callback) => { callback([{ name: 'Place' }]) } })
textSearch.setInput('Place')
textSearch.select({ name: 'Place' })
const history: any[] = textSearch.getHistory()
const remoteSearch = new SearchJSON({ url: '/search' })
remoteSearch.autocomplete('Place', results => { void results })
remoteSearch.ajax('/search', {}, response => { void response })
remoteSearch.on('select', event => { event.search; event.coordinate?.slice() })
const nominatim = new SearchNominatim()
nominatim.on('select', event => { event.coordinate.slice() })
nominatim.reverseGeocode([0, 0], results => { void results })
const photon = new SearchPhoton({ getTitle: result => result.properties.name })
photon.reverseData([0, 0]).lon
photon.reverseGeocode([0, 0])
const popup = new Popup({ positioning: 'auto', anchor: false, html: 'Hello' })
popup.show(true, 'Updated')
const fixed = new FixedPopup({ positioning: 'top-auto', hook: 'map' })
fixed.setMap(null)
fixed.setPixelPosition([10, 10])
fixed.setCoordinate([1, 2])
fixed.setHook('viewport')
fixed.setRotation(30)
fixed.setScale(1.5)
fixed.getPixelPosition()?.slice()
void history
// @ts-expect-error unsupported operator
selection.addCondition({ op: '!regexep' })
