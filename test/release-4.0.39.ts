import Contour from '../@types/ol-ext/source/Contour'
import { contours } from 'd3-contour'
import StrokeImage from '../@types/ol-ext/style/StrokeImage'
import Icon from 'ol/style/Icon'
import VectorLayer from 'ol/layer/Vector'
import defaultStyle from '../@types/ol-ext/style/defaultStyle'
import Modify from '../@types/ol-ext/interaction/Modify'
import '../@types/ol-ext/source/Vector'
import '../@types/ol-ext/style/FontMaki2Def'
import FontSymbol from '../@types/ol-ext/style/FontAwesomeDef'

// d3.contours can be supplied explicitly instead of relying on the global d3.
const source = new Contour({
  factory: contours,
  data: { x: [[0, 1], [0, 1]], y: [[0, 0], [1, 1]], z: [[null, 2], [3, 4]] },
  thresholds: 6,
})
source.thresholds = 4
source.setData({ x: [[0, 1], [0, 1]], y: [[0, 0], [1, 1]], z: [[1, 2], [3, 4]] })
source.calculateContours()
const style = new StrokeImage({ icon: new Icon({ src: 'stroke.png' }), fallbackColor: '#c844c5' })
new VectorLayer({ source, style })
defaultStyle({ color: '#3399cc', fillColor: [255, 255, 255, 0.4] })
declare const modify: Modify
modify.getModifiedFeatures()
void FontSymbol
// @ts-expect-error an image icon is required
new StrokeImage({})
// @ts-expect-error thresholds are a number of levels
source.thresholds = 'six'
