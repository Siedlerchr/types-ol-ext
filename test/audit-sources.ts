import DayNight from '../@types/ol-ext/source/DayNight'
import GridBin from '../@types/ol-ext/source/GridBin'
import Delaunay from '../@types/ol-ext/source/Delaunay'
import Simplificator from '../@types/ol-ext/geom/Simplificator'
import Permalink from '../@types/ol-ext/control/Permalink'
import Storymap from '../@types/ol-ext/control/Storymap'
import Swipe from '../@types/ol-ext/control/Swipe'
import Timeline from '../@types/ol-ext/control/Timeline'
import type Feature from 'ol/Feature'
import VectorSource from 'ol/source/Vector'
import HexBin from '../@types/ol-ext/source/HexBin'
import IDW from '../@types/ol-ext/source/IDW'
import FeatureBin from '../@types/ol-ext/source/FeatureBin'
import InseeBin from '../@types/ol-ext/source/InseeBin'
import Vector3D from '../@types/ol-ext/source/Vector3D'
import Style from 'ol/style/Style'
import { easeOut } from 'ol/easing'
import GeoImage from '../@types/ol-ext/source/GeoImage'
import OilPainting from '../@types/ol-ext/source/OilPainting'
import OSM from 'ol/source/OSM'
import TileWFS from '../@types/ol-ext/source/TileWFS'
import Overpass from '../@types/ol-ext/source/Overpass'
import DBPedia, { ol_style_dbPediaStyleFunction, ol_style_clearDBPediaStyleCache } from '../@types/ol-ext/source/DBPedia'
import WikiCommons from '../@types/ol-ext/source/WikiCommons'
import Mapillary from '../@types/ol-ext/source/Mapillary'
import { ol_coordinate_findSegment, ol_coordinate_getGeomCenter, ol_coordinate_splitH, ol_coordinate_sampleAt, ol_geom_createFromType, extentIntersection } from '../@types/ol-ext/geom/GeomUtils'
import LineString from 'ol/geom/LineString'
import Polygon from 'ol/geom/Polygon'
import Point from 'ol/geom/Point'
import convexHull from '../@types/ol-ext/geom/ConvexHull'
import { getAdjacent } from '../@types/ol-ext/geom/geohash'
import { ol_geom_GPAltiCode, ol_coordinate_GPAltiCode } from '../@types/ol-ext/geom/GPAltiCode'
import scribbleFill from '../@types/ol-ext/geom/Scribble'
import '../@types/ol-ext/geom/LineStringSplitAt'
import Geoportail from '../@types/ol-ext/source/Geoportail'
import GeoRSS from '../@types/ol-ext/source/GeoRSS'

const dayNight = new DayNight()
const separation: number[][] = dayNight.getCoordinates(new Date(), 'line')
const both: number[][][] = dayNight.getCoordinates(undefined, 'daynight')
dayNight.getSunPosition(new Date())
DayNight.getNightLat(0, new Date())
const inputSource = new VectorSource()
convexHull([[0, 0], [1, 1], [1, 0]])[0].slice()
new Point([0, 0]).convexHull()
getAdjacent('u09', 'n')
ol_geom_GPAltiCode(new Point([0, 0]), { success: point => point.getCoordinates() })
ol_coordinate_GPAltiCode([[0, 0], [1, 1]], { success: points => points[0].slice(), sampling: 2 })
// @ts-expect-error point geocoding callbacks receive a point geometry
ol_geom_GPAltiCode(new Point([0, 0]), { success: (line: LineString) => line.getLength() })
const lineGeometry = new LineString([[0, 0], [2, 2]])
lineGeometry.splitAt([1, 1]).forEach(line => line.getCoordinates())
lineGeometry.splitAt()
scribbleFill(new Polygon([]), { interval: 5 })?.getType()
// @ts-expect-error scribble fill requires its line interval
scribbleFill(new Polygon([]), {})
lineGeometry.sampleAt(1).getCoordinates()
ol_coordinate_getGeomCenter(lineGeometry).slice()
ol_coordinate_findSegment([0, 0], lineGeometry.getCoordinates()).segment?.[0].slice()
ol_coordinate_splitH([[0, 0], [1, 2], [2, 0]], 1, 0)[0][0].pt.slice()
ol_coordinate_sampleAt([0, 0], [2, 0], 1).length
ol_geom_createFromType('Point', [0, 0])?.getType()
extentIntersection([0, 0, 1, 1], new Polygon([])).getCoordinates()
const bins = new GridBin({ source: inputSource, circle: true, gridProjection: 'EPSG:3857', geometryFunction: () => [1, 2] })
bins.setCircle(false)
const maybeBin: Feature | null = bins.getBinAt([0, 0])
const featureBins = new FeatureBin({ source: inputSource, geometryFunction: () => [0, 0], listenChange: false })
featureBins.setFeatures([inputSource.getFeatures()[0]])
featureBins.setFeatures()
featureBins.getGridGeomAt([0, 0], {})?.getType()
const inseeBins = new InseeBin({ source: inputSource, geometryFunction: () => [0, 0] })
inseeBins.getGridExtent()
inseeBins.clear(true)
const vector3d = new Vector3D({ source: inputSource, style: new Style() })
vector3d.setStyle()
vector3d.animate({ easing: easeOut })
vector3d.animate()
const geoImage = new GeoImage({ url: 'image.png', imageCenter: [0, 0], imageScale: 1, imageCrop: 10, projection: 'EPSG:3857' })
geoImage.setMask([[0, 0], [1, 0], [1, 1], [0, 0]])
geoImage.getMask()?.forEach(coordinate => coordinate.slice())
geoImage.setCrop()
const crop: number | number[] | undefined = geoImage.getCrop()
const oil = new OilPainting({ sources: [new OSM()], radius: 4 })
oil.set('intensity', 12)
oil.set('custom', 'value')
const wfs = new TileWFS({ url: 'https://example.com/wfs', typeName: 'roads', maxFeatures: 100 })
wfs.on('tileloadstart', event => { event.loading; event.loaded })
wfs.on('tileloaderror', event => { event.error; event.loaded })
wfs.on('overload', event => { event.returned; event.total })
const overpass = new Overpass({ filter: ['building'], attributions: () => 'OpenStreetMap' })
overpass.clear(true)
const dbpedia = new DBPedia({ lang: 'en', limit: 25 })
const query: string = dbpedia.queryFilter()
dbpedia.readFeature(inputSource.getFeatures()[0], { subject: { type: 'uri', value: 'https://example.com' } }, null)
ol_style_dbPediaStyleFunction({ glyph: 'fa-star' })
ol_style_clearDBPediaStyleCache()
const commons = new WikiCommons({ maxResolution: 50 })
commons.readFeature(inputSource.getFeatures()[0], { title: 'File:Example.jpg', url: 'https://example.com/example.jpg' })
new Mapillary({ limit: 10 }).clear(true)
const geoportail = new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS', { maxZoom: 18, key: 'key' })
new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })
geoportail.setGPPKey('key')
geoportail.getFeatureInfoUrl([0, 0], 100)
geoportail.getFeatureInfo([0, 0], 100, { callback: response => { void response } })
Geoportail.getServiceURL()
Geoportail.defaultAttribution.toUpperCase()
new GeoRSS({ url: 'https://example.com/feed.xml' })
// @ts-expect-error Geoportail requires a layer
new Geoportail({})
// @ts-expect-error GeoRSS needs a feed URL
new GeoRSS()
const hexBins = new HexBin({ source: inputSource, layout: 'flat' })
hexBins.setSize(100)
hexBins.setLayout('pointy')
const idw = new IDW({ source: inputSource, maxD: 100, getColor: () => [0, 0, 0, 255] })
idw.setMaxD()
const pixel: Uint8ClampedArray | null = idw.getValue([0, 0])
declare const delaunay: Delaunay
const nodes: Feature[] = delaunay.getNodesAt([0, 0])
const triangles: Feature[] = delaunay.getTrianglesAt([0, 0])
new Simplificator().setFeatures([])
new Simplificator().simplifyVisvalingam({ ratio: 0.5, keepEnds: true })
const simplificator = new Simplificator()
simplificator.setFeatures([]).forEach(edge => edge.getGeometry()?.getCoordinates())
simplificator.getFeatures().forEach(result => { result.feature; result.contour; result.geom })
declare const permalink: Permalink
permalink.getUrlParams().example = 'value'
permalink.getUrlReplace()
permalink.getInitialPosition()
declare const story: Storymap
story.setStory(document.createElement('div'))
story.on('scrollto', event => { event.coordinate; event.lon; event.zoom })
story.on('clickimage', event => { event.img; event.title; event.originalEvent })
declare const swipe: Swipe
swipe.removeLayers()
swipe.setMap(null)
swipe.on('moving', event => { event.position; event.size })
declare const timeline: Timeline
timeline.roundDate(new Date(), 'hour')
timeline.getDate()
timeline.getDate('start', 'day')
timeline.setFeatures([])
timeline.addButton({ title: 'Reset', handleClick: event => { event.preventDefault() } })
timeline.on('select', event => event.feature.getId())
timeline.on('scroll', event => event.dateStart.getTime())
timeline.on('collapse', event => { void event.collapsed })
void separation
void both
void nodes
void triangles
void maybeBin
void pixel
void crop
void query
// @ts-expect-error binning requires a source
new GridBin({})
// @ts-expect-error binning requires a source
new FeatureBin({})
// @ts-expect-error FeatureBin consumes an array, not a single feature
featureBins.setFeatures(inputSource.getFeatures()[0])
// @ts-expect-error INSEE binning requires a source
new InseeBin()
// @ts-expect-error Vector3D accepts a single Style, not a style function
new Vector3D({ source: inputSource, style: () => new Style() })
// @ts-expect-error a georeferenced image requires its center and scale
new GeoImage({ url: 'image.png' })
// @ts-expect-error raster input sources are required
new OilPainting()
// @ts-expect-error TileWFS requires a service URL
new TileWFS({})
// @ts-expect-error the Overpass loader reads the filter array
new Overpass({})
// @ts-expect-error unsupported rounding unit
timeline.roundDate(new Date(), 'year')
