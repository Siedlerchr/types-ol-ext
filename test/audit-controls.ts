import Status from '../@types/ol-ext/control/Status'
import Notification from '../@types/ol-ext/control/Notification'
import Gauge from '../@types/ol-ext/control/Gauge'
import ProgressBar from '../@types/ol-ext/control/ProgressBar'
import GridReference from '../@types/ol-ext/control/GridReference'
import Graticule from '../@types/ol-ext/control/Graticule'
import Compass from '../@types/ol-ext/control/Compass'
import CenterPosition from '../@types/ol-ext/control/CenterPosition'
import Style from 'ol/style/Style'
import CanvasTitle from '../@types/ol-ext/control/CanvasTitle'
import CanvasAttribution from '../@types/ol-ext/control/CanvasAttribution'
import CanvasScaleLine from '../@types/ol-ext/control/CanvasScaleLine'
import TextButton from '../@types/ol-ext/control/TextButton'
import GeolocationButton from '../@types/ol-ext/control/GeolocationButton'
import Button from '../@types/ol-ext/control/Button'
import Toggle from '../@types/ol-ext/control/Toggle'
import Bar from '../@types/ol-ext/control/Bar'
import EditBar from '../@types/ol-ext/control/EditBar'
import GeolocationBar from '../@types/ol-ext/control/GeolocationBar'
import Select from '../@types/ol-ext/control/Select'
import SearchFeature from '../@types/ol-ext/control/SearchFeature'
import LegendItem from '../@types/ol-ext/legend/Item'
import Legend from '../@types/ol-ext/legend/Legend'
import LegendImage from '../@types/ol-ext/legend/Image'
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
import SearchWikipedia from '../@types/ol-ext/control/SearchWikipedia'
import SearchNominatim from '../@types/ol-ext/control/SearchNominatim'
import SearchPhoton from '../@types/ol-ext/control/SearchPhoton'
import SearchGPS from '../@types/ol-ext/control/SearchGPS'
import SearchDFCI from '../@types/ol-ext/control/SearchDFCI'
import { ol_coordinate_toDFCI, ol_coordinate_fromDFCI, ol_coordinate_validDFCICoord } from '../@types/ol-ext/geom/DFCI'
import SearchGeoportailParcelle from '../@types/ol-ext/control/SearchGeoportailParcelle'
import SearchGeoportail from '../@types/ol-ext/control/SearchGeoportail'
import Popup from '../@types/ol-ext/overlay/Popup'
import FixedPopup from '../@types/ol-ext/overlay/FixedPopup'
import PopupFeature from '../@types/ol-ext/overlay/PopupFeature'
import Feature from 'ol/Feature'
import Tooltip from '../@types/ol-ext/overlay/Tooltip'
import Placemark from '../@types/ol-ext/overlay/Placemark'
import Fixed from '../@types/ol-ext/overlay/Fixed'
import Slider from '../@types/ol-ext/util/input/Slider'
import Range from '../@types/ol-ext/util/input/Range'
import List from '../@types/ol-ext/util/input/List'
import Width from '../@types/ol-ext/util/input/Width'
import Size from '../@types/ol-ext/util/input/Size'
import Checkbox from '../@types/ol-ext/util/input/Checkbox'
import Switch from '../@types/ol-ext/util/input/Switch'
import ColorInput from '../@types/ol-ext/util/input/Color'
import CollectionInput from '../@types/ol-ext/util/input/Collection'
import Collection from 'ol/Collection'

const source = new VectorSource()
type Place = { name: string; id: number }
const places = new Search<Place>({ getTitle: place => place.name, autocomplete: () => [{ name: 'Paris', id: 1 }] })
places.on('select', event => { const id: number = event.search.id; void id })
places.getHistory().forEach(place => place.name.toUpperCase())
// @ts-expect-error search results must match the declared shape
places.select({ name: 'Paris' })
const jsonPlaces = new SearchJSON<Place, { places: Place[] }>({ handleResponse: response => response.places })
jsonPlaces.handleResponse({ places: [{ name: 'Paris', id: 1 }] })[0].id
// @ts-expect-error the response must have the declared shape
jsonPlaces.handleResponse({ results: [] })
const search = new SearchFeature({ source })
search.on('select', event => event.search.getGeometry())
search.getHistory().forEach(feature => feature.getGeometry())
// @ts-expect-error feature search selects OpenLayers features
search.select({ name: 'not a feature' })
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
const sublegend = new Legend({ title: 'Nested' })
const imageItem = new LegendImage({ src: '/legend.png' })
const mixedLegend = new Legend({ items: [sublegend, imageItem, { title: 'Feature' }] })
mixedLegend.getItems().push(imageItem)
mixedLegend.removeItem(sublegend)
mixedLegend.on('select', event => { event.item; event.index; event.symbol })
mixedLegend.on('refresh', event => { event.width; event.height })
mixedLegend.on('items', event => { event.nb })
mixedLegend.setLayer(null)
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
const coordinates = new SearchCoordinates({ labelGPS: 'Locate' })
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
nominatim.on('select', event => { event.coordinate.slice(); event.search.display_name.toUpperCase() })
nominatim.reverseGeocode([0, 0], results => { results.forEach(result => { if ('error' in result) void result.error }) })
nominatim.select({ display_name: 'Paris', lon: '2.35', lat: '48.86' })
// @ts-expect-error a Nominatim result needs coordinates
nominatim.select({ display_name: 'Paris' })
const photon = new SearchPhoton({ getTitle: result => result.properties.name || '' })
const photonResult = { type: 'Feature' as const, geometry: { type: 'Point' as const, coordinates: [2, 48] }, properties: { name: 'Paris' } }
photon.equalFeatures(photonResult, photonResult)
// @ts-expect-error Photon compares GeoJSON results, not OpenLayers features
photon.equalFeatures(new Feature(), new Feature())
photon.reverseData([0, 0]).lon
photon.reverseGeocode([0, 0])
const gps = new SearchGPS({ labelGPS: 'Locate' })
coordinates.on('select', event => event.search.coordinate.slice())
coordinates.autocomplete('2,48')[0].gps.slice()
coordinates.setInput()
const dfci = new SearchDFCI({ getTitle: result => result.name })
dfci.on('select', event => event.search.coordinate.slice())
dfci.autocomplete('AB')[0].name.toUpperCase()
ol_coordinate_toDFCI([0, 1600000])
ol_coordinate_fromDFCI('AB')
ol_coordinate_validDFCICoord([0, 1600000])
// @ts-expect-error coordinate searches return coordinate objects
dfci.select(new Feature())
const wikipedia = new SearchWikipedia({ getTitle: result => result.title })
wikipedia.setLang('de')
wikipedia.handleResponse(['Paris', ['Paris'], ['City'], ['https://en.wikipedia.org/wiki/Paris']])[0].uri
wikipedia.on('select', event => { event.search.url; event.coordinate?.slice() })
// @ts-expect-error autocomplete entries require a URI
wikipedia.select({ title: 'Paris', desc: 'City' })
gps.setInput([2, 48])
gps.setInput()
gps.autocomplete('2,48')[0].gps.slice()
gps.on('select', event => event.search.coordinate.slice())
const parcelSearch = new SearchGeoportailParcelle({ prefixLabel: 'Prefix' })
const geoportailSearch = new SearchGeoportail({ version: 2, position: true, bbox: [0, 0, 1, 1] })
geoportailSearch.on('select', event => event.search.fulltext.toUpperCase())
geoportailSearch.searchCommune({ fulltext: 'Paris', x: 2, y: 48 }, results => results[0].fulltext)
geoportailSearch.handleResponse({ results: [{ fulltext: 'Paris' }] })[0].fulltext
// @ts-expect-error Geoportail completion results contain display text
geoportailSearch.select({ x: 2, y: 48 })
parcelSearch.setParcelle({ Section: 'AB', Numero: '12' })
parcelSearch.getInputField('numero').value = '12'
parcelSearch.searchParcelle('75056', '', '000', 'AB', '12', parcels => parcels.forEach(parcel => parcel.lon.toFixed()))
parcelSearch.on('parcelle', event => { event.search.lat; event.coordinate.slice() })
parcelSearch.on('commune', event => { void event.search })
// @ts-expect-error parcel fields require an object
parcelSearch.setParcelle()
// @ts-expect-error GPS search input is a coordinate
gps.setInput('2,48')
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
const featurePopup = new PopupFeature({ template: (feature, index, count) => ({
  title: `${feature.get('name')} ${index}/${count}`,
  attributes: ['name'],
}) })
featurePopup.setTemplate({ attributes: { name: { format: (value, feature) => `${feature.getId()}: ${value}` } } })
featurePopup.show(new Feature())
featurePopup.on('attribute', event => { event.feature; event.attribute; event.originalEvent })
featurePopup.on('select', event => { event.feature; event.index })
const tooltip = new Tooltip({ positioning: 'auto', getHTML: (feature, info) => feature ? String(feature.getId()) : info || '' })
const tooltipText: string = tooltip.getHTML()
tooltip.setFeature({ feature: new Feature() })
tooltip.setInfo(null)
tooltip.setMap(null)
new Placemark({ size: 20 }).show(true, 'Here')
new Fixed().setPosition(undefined, true)
void tooltipText
const slider = new Slider({ min: 0, max: 100, hover: false })
const sliderValue: string = slider.getValue()
slider.on('change:value', event => event.value.toFixed())
const range = new Range({ className: 'range', input2: document.createElement('input') })
const rangeValue: string | null = range.getValue2()
range.setValue2(20)
range.on('change:value', event => event.value.toFixed())
void sliderValue
void rangeValue
const list = new List({ options: [{ value: 'round', html: 'Round' }] })
const listValue: string = list.getValue()
list.on('change:value', event => event.value.toUpperCase())
const width = new Width()
width.on('change:value', event => event.value.toFixed())
new Size().getValue().toFixed()
new Checkbox().on('check', event => { event.checked; event.value })
new Switch({ className: 'toggle' }).on('check', event => { event.checked })
const colorInput = new ColorInput({ position: 'static', ariaLabel: 'Color' })
const colorId: string = colorInput.getColorID('#ff0000')
colorInput.getColorFromID(colorId)
colorInput.addPaletteColor('#ff0000')
colorInput.on('color', event => event.color.slice())
colorInput.on('collapse', event => { void event.visible })
const items = new Collection([{ title: 'One' }])
const collectionInput = new CollectionInput({ collection: items, getTitle: item => item.title })
collectionInput.setCollection(items)
collectionInput.on('item:select', event => event.item?.title)
collectionInput.getSelect()?.title
collectionInput.setCollection(null)
// @ts-expect-error this input needs an OpenLayers collection, not another input widget
collectionInput.setCollection(collectionInput)
void listValue
// @ts-expect-error a list requires its options array
new List({})
void history
// @ts-expect-error unsupported operator
selection.addCondition({ op: '!regexep' })

const wikipediaExample = new SearchWikipedia({ lang: 'de' })
wikipediaExample.setLang('en')
const wikiResults = wikipediaExample.handleResponse(['map', ['Map'], ['Description'], ['https://en.wikipediaExample.org/wiki/Map']])
const wikiTitle: string | HTMLElement = wikipediaExample.getTitle(wikiResults[0])
wikipediaExample.select(wikiResults[0])
wikipediaExample.on('select', event => { event.search.url; event.search.img; event.search.lon })
// @ts-expect-error autocomplete results contain a uri, not the selected page URL
wikipediaExample.select({ title: 'Map', desc: '', url: 'https://example.org' })
void wikiTitle

const auditBar = new Bar({ id: 'tools' })
auditBar.setMap(null)
auditBar.setPosition('left-top')
auditBar.deactivateControls()
const namedControls: import('ol/control/Control').default[] = auditBar.getControlsByName('draw')
auditBar.on('control:active', event => {
  const active: boolean = event.active
  const control: import('ol/control/Control').default = event.control
  void [active, control]
})
void namedControls

declare const editBar: EditBar
declare const geolocationBar: GeolocationBar
const inheritedControls: import('ol/control/Control').default[][] = [editBar.getControlsByName('draw'), geolocationBar.getControlsByName('draw')]
editBar.on('control:add', event => { void event.control })
// @ts-expect-error Lookup returns an array, not a control.
const singleControl: import('ol/control/Control').default = auditBar.getControlsByName('draw')
void [inheritedControls, singleControl]

const auditButton = new Button({ id: 'button', html: document.createElement('span') })
auditButton.setHtml(document.createElement('span'))
const disabled: boolean | null = auditButton.getDisable()
const auditToggle = new Toggle({ id: 'toggle', autoActivate: true, html: document.createElement('span'), toggleFn: active => { void active } })
auditToggle.setMap(null)
auditToggle.setSubBar()
const subBar: Bar | undefined = auditToggle.getSubBar()
const interaction: import('ol/interaction/Interaction').default | undefined = auditToggle.getInteraction()
auditToggle.on('change:active', event => { const active: boolean = event.active; void active })
auditToggle.on('change:disable', event => { const value: boolean = event.disable; void value })
void [disabled, subBar, interaction]
// @ts-expect-error A toggle may not have a subbar.
const requiredSubBar: Bar = auditToggle.getSubBar()
// @ts-expect-error A toggle may not have an interaction.
const requiredInteraction: import('ol/interaction/Interaction').default = auditToggle.getInteraction()
void [requiredSubBar, requiredInteraction]

const geoBar = new GeolocationBar({ source: new VectorSource(), zoom: 15, minZoom: 10, tolerance: 5, followTrack: 'auto', minAccuracy: 100, position: 'left-top' })
geoBar.setMap(null)
geoBar.deactivateControls()
const geoButton = new GeolocationButton({ delay: 1000 })
geoButton.on('position', event => { const coordinate: import('ol/coordinate').Coordinate | undefined = event.coordinate; void coordinate })
geoButton.on('change:active', event => { void event.active })

const textButton = new TextButton({ html: document.createElement('span') })
textButton.setHtml(document.createElement('span'))
const textDisabled: boolean | null = textButton.getDisable()
void textDisabled

const canvasTitle = new CanvasTitle({ title: 'Map', visible: false, className: 'title' })
const canvasTitleText: string = canvasTitle.getTitle()
canvasTitle.setStyle()
canvasTitle.setMap(null)
const canvasOverlay: HTMLCanvasElement | null = canvasTitle.getCanvas(null)
new CanvasAttribution().setMap(null)
new CanvasScaleLine().setMap(null)
void [canvasTitleText, canvasOverlay]
// @ts-expect-error The title getter does not take an argument.
canvasTitle.getTitle('unexpected')
// @ts-expect-error A canvas may be absent.
const requiredCanvas: HTMLCanvasElement = canvasTitle.getCanvas(null)
void requiredCanvas

const compass = new Compass({ rotateWithView: false, visible: true })
compass.setImage()
compass.setStyle(new Style())
const targetStyles: Array<Style | undefined> = new Target().getStyle()
new CenterPosition().setStyle()
void targetStyles

const graticule = new Graticule({ precision: 0.1, stroke: false, formatCoord: (coordinate, position) => `${position}: ${coordinate.toFixed(1)}` })
const formattedCoordinate: string | number = graticule.formatCoord(1, 'top')
// @ts-expect-error The formatter receives a scalar, not a coordinate array.
graticule.formatCoord([1, 2], 'top')
void formattedCoordinate

const gridReference = new GridReference({ extent: [0, 0, 10, 10], size: [2, 2], source: new VectorSource(), className: 'grid' })
const gridReferenceValue: string | undefined = gridReference.getReference([1, 1])
const verticalIndex: number = gridReference.getVIndex(0)
gridReference.setStyle(new Style())
gridReference.on('select', event => { const feature: Feature = event.feature; void feature })
// @ts-expect-error An unattached grid may not have a reference.
const requiredReference: string = gridReference.getReference([1, 1])
void [gridReferenceValue, verticalIndex, requiredReference]

const gauge = new Gauge()
gauge.setTitle()
const gaugeValue: number | undefined = gauge.val()
const setGaugeValue: number = gauge.val(42)
// @ts-expect-error A gauge can have no initial value.
const requiredGaugeValue: number = gauge.val()
new ProgressBar().setLayers()
void [gaugeValue, setGaugeValue, requiredGaugeValue]

const statusControl = new Status({ status: { count: 1 }, position: 'center' })
statusControl.status()
statusControl.show()
statusControl.setPosition('center')
new Notification().show(null, 500)
// @ts-expect-error Status visibility must be boolean.
new Status({ visible: 'yes' })
