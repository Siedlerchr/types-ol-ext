import ProfileStyle from '../@types/ol-ext/style/Profile'
import '../@types/ol-ext/style/SetTextPath'
import { Vector as VectorLayer } from 'ol/layer'
import Style from 'ol/style/Style'
import Photo from '../@types/ol-ext/style/Photo'
import FillPattern from '../@types/ol-ext/style/FillPattern'
import StrokePattern from '../@types/ol-ext/style/StrokePattern'
import { Fill, Stroke } from 'ol/style'
import VisvalingamLineString from '../@types/ol-ext/geom/visvalingam'
import { setMapScale, greatCircleTrack, computeDestinationPoint } from '../@types/ol-ext/geom/sphere'
import GeoRSS from '../@types/ol-ext/format/GeoRSS'
import HexGrid from '../@types/ol-ext/render/HexGrid'
import GeoJSONX from '../@types/ol-ext/format/GeoJSONX'
import GeoJSONP from '../@types/ol-ext/format/GeoJSONP'
import Render3D from '../@types/ol-ext/layer/Render3D'
import Checkbox from '../@types/ol-ext/util/input/Checkbox'
import Paper from '../@types/ol-ext/filter/Paper'
import Feature from 'ol/Feature'
import Dijkstra, { ol_graph_Dijskra } from '../@types/ol-ext/geom/Dijkstra'
import VectorSource from 'ol/source/Vector'

const grid = new HexGrid({ size: 100, layout: 'flat' })
const hex: number[] = grid.coord2hex([1, 2])
const coordinate: number[] = grid.hex2coord(hex)
grid.offset2cube([0, 0])
grid.cube_round([0, 0, 0])
grid.hex_corner(coordinate, 100, 1)
const neighbor: number[] = grid.hex_neighbors(hex, 1)
const neighbors: number[][] = grid.hex_neighbors(hex)
const format = new GeoJSONX({ featureProjection: 'EPSG:3857' })
const encoded: string = format.encodeNumber(42, 2)
const decoded: number = format.decodeNumber(encoded, 2)
const compact = format.writeFeaturesObject([new Feature()])
const featureEncoding = compact.features[0][0]
const propertyNames: string[] = compact.hashProperties
const geometryEncoding = format.writeFeatureObject(new Feature())[0]
void featureEncoding
void propertyNames
void geometryEncoding
const renderer = new Render3D({ active: true, ghost: true, height: 12 })
const height: number = renderer.getFeatureHeight(new Feature())
const routing = new Dijkstra({ source: new VectorSource() })
const route: false | [number[], number[]] = routing.path([0, 0], [1, 1])
routing.on('finish', event => { event.route; event.distance?.toFixed() })
const legacyConstructor: typeof Dijkstra = ol_graph_Dijskra
void route
void legacyConstructor
renderer.getActive()
renderer.animate({ height: 50 })
new Checkbox().isChecked()
new Paper().setLight(50)
void neighbor
void neighbors
void decoded
void height
// @ts-expect-error direction must be numeric
grid.hex_neighbors(hex, 'north')

const polylineFormat = new GeoJSONP({ decimals: 6 })
const polylineEncoded: import('../@types/ol-ext/format/GeoJSONX').EncodedCoordinates = polylineFormat.encodeCoordinates([[1, 2], [3, 4]])
const polylineDecoded: import('../@types/ol-ext/format/GeoJSONX').CoordinateTree | null = polylineFormat.decodeCoordinates(polylineEncoded)
void polylineDecoded

const geoRSS = new GeoRSS({ featureProjection: 'EPSG:3857' })
const rssFeature: Feature | null = geoRSS.readFeature(document.createElement('item'))
const rssFeatures: Feature[] = geoRSS.readFeatures('<rss/>', { dataProjection: 'EPSG:4326' })
// @ts-expect-error readFeature expects an element, not XML text.
geoRSS.readFeature('<item/>')
void [rssFeature, rssFeatures]

const scaleResult: number | undefined = setMapScale(null, 0)
const destinationPoint: [number, number] = computeDestinationPoint([0, 0], 1000, 0)
const greatCircle: number[][] = greatCircleTrack([0, 0], [1, 1])
void [scaleResult, destinationPoint, greatCircle]

const simplifiedLine = new VisvalingamLineString([[0, 0], [1, 1], [2, 0]]).simplifyVisvalingam({ keepEnds: true, ratio: 0.8 })
const lineCoordinates: number[][] = simplifiedLine.getCoordinates()
// @ts-expect-error The implementation reads options without a default.
new VisvalingamLineString([]).simplifyVisvalingam()
void lineCoordinates

FillPattern.addPattern('custom', { repeat: [[1, 2]] })
const fillPattern = new FillPattern()
const strokePattern = new StrokePattern({ opacity: 0.5, width: 3 })
const clonedFill: Fill = fillPattern.clone()
const clonedStroke: Stroke = strokePattern.clone()
// @ts-expect-error A cloned fill is the base style and has no pattern image method.
fillPattern.clone().getImage()
void [clonedFill, clonedStroke]

const photo = new Photo({ radius: 12, fill: new Fill(), opacity: 0.5, rotation: 1, declutterMode: 'declutter' })
const photoImage: HTMLCanvasElement | OffscreenCanvas = photo.getImage()
const photoClone: Photo = photo.clone()
void [photoImage, photoClone]

const textPathLayer = new VectorLayer({ source: new VectorSource() })
textPathLayer.setTextPathStyle([new Style()], 100)
textPathLayer.setTextPathStyle(null)
declare const textPathContext: CanvasRenderingContext2D
textPathContext.textPath('road', [0, 0, 10, 10])

const profileStyle = new ProfileStyle({ zIndex: 2, vertexSize: 3, geometry: 'geometry' })
profileStyle.setStroke()
profileStyle.setFill(null)
profileStyle.setScale()
profileStyle.setVertexSize()
const vertexSize: number = profileStyle.getVertexSize()
void vertexSize
