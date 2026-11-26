import { Feature, Map, View } from 'ol'
import type { Coordinate } from 'ol/coordinate'
import { Point, Polygon } from 'ol/geom'
import Draw from 'ol/interaction/Draw'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Geoportail from 'ol-ext/layer/Geoportail'
import convexHull from 'ol-ext/geom/ConvexHull'

const source = new VectorSource()
const vector = new VectorLayer({ source })
const map = new Map({
  target: 'map',
  view: new View({ zoom: 4, center: [205461, 5867916] }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' }), vector],
})
const draw = new Draw({ source, type: 'Point' })
map.addInteraction(draw)
let hull: Feature<Polygon>
let points: Coordinate[] = []
draw.on('drawend', event => {
  if (!source.getFeatures().length) {
    hull = new Feature(new Polygon([[]]))
    source.addFeature(hull)
    points = []
  }
  points.push((event.feature.getGeometry() as Point).getCoordinates())
  hull.setGeometry(new Polygon([convexHull(points)]))
})

declare global {
  interface Window { vector: VectorLayer<VectorSource> }
}
window.vector = vector
