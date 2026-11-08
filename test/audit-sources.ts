import DayNight from '../@types/ol-ext/source/DayNight'
import GridBin from '../@types/ol-ext/source/GridBin'
import Delaunay from '../@types/ol-ext/source/Delaunay'
import Simplificator from '../@types/ol-ext/geom/Simplificator'
import Permalink from '../@types/ol-ext/control/Permalink'
import Storymap from '../@types/ol-ext/control/Storymap'
import Swipe from '../@types/ol-ext/control/Swipe'
import Timeline from '../@types/ol-ext/control/Timeline'
import type Feature from 'ol/Feature'

const dayNight = new DayNight()
const separation: number[][] = dayNight.getCoordinates(new Date(), 'line')
const both: number[][][] = dayNight.getCoordinates(undefined, 'daynight')
dayNight.getSunPosition(new Date())
DayNight.getNightLat(0, new Date())
new GridBin({ circle: true, gridProjection: 'EPSG:3857' }).setCircle(false)
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
declare const swipe: Swipe
swipe.removeLayers()
declare const timeline: Timeline
timeline.roundDate(new Date(), 'hour')
void separation
void both
void nodes
void triangles
// @ts-expect-error unsupported rounding unit
timeline.roundDate(new Date(), 'year')
