import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import FeatureAnimation from '../@types/ol-ext/featureanimation/FeatureAnimation'
import Blink from '../@types/ol-ext/featureanimation/Blink'
import Fade from '../@types/ol-ext/featureanimation/Fade'
import Throw from '../@types/ol-ext/featureanimation/Throw'
import Null from '../@types/ol-ext/featureanimation/Null'
import type { AnimatedMap } from '../@types/ol-ext/featureanimation/FeatureAnimation'
import Bounce from '../@types/ol-ext/featureanimation/Bounce'
import Path from '../@types/ol-ext/featureanimation/Path'
import Zoom, { ol_featureAnimation_Zoom, ol_featureAnimation_ZoomOut } from '../@types/ol-ext/featureanimation/Zoom'
// @ts-expect-error the base module exports the class as default only
import { FeatureAnimation as NamedAnimation } from '../@types/ol-ext/featureanimation/FeatureAnimation'

const feature = new Feature(new Point([0, 0]))
const animation = new Bounce({ duration: 500 })
new Blink({ nb: 3 })
new Fade({ speed: 2 })
new Throw({ speed: 2, side: 'left' })
new Null()
// @ts-expect-error Blink reads its options immediately
new Blink()
animation.on('animating', event => { event.feature; event.elapsed; event.style })
animation.on('drawing', event => { event.style; event.time })
animation.on('animationend', event => { event.feature })
const layer = new VectorLayer({ source: new VectorSource() })
const controller = layer.animateFeature(feature, [animation, new Zoom()])
const playing: boolean = controller.isPlaying()
controller.stop({ reason: 'cancelled' })
declare const map: AnimatedMap
map.animateFeature(feature, new ol_featureAnimation_ZoomOut())
const base: FeatureAnimation = new ol_featureAnimation_Zoom()
void playing
void base
void NamedAnimation
// @ts-expect-error a path is required by the implementation
new Path({})
// @ts-expect-error the map implementation expects one animation object
map.animateFeature(feature, [animation])
