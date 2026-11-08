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

const dayNight = new DayNight()
const separation: number[][] = dayNight.getCoordinates(new Date(), 'line')
const both: number[][][] = dayNight.getCoordinates(undefined, 'daynight')
dayNight.getSunPosition(new Date())
DayNight.getNightLat(0, new Date())
const inputSource = new VectorSource()
const bins = new GridBin({ source: inputSource, circle: true, gridProjection: 'EPSG:3857', geometryFunction: () => [1, 2] })
bins.setCircle(false)
const maybeBin: Feature | null = bins.getBinAt([0, 0])
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
void separation
void both
void nodes
void triangles
void maybeBin
void pixel
// @ts-expect-error binning requires a source
new GridBin({})
// @ts-expect-error unsupported rounding unit
timeline.roundDate(new Date(), 'year')
