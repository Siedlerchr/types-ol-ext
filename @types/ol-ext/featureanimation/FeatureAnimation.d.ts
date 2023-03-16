import type { Style } from 'ol/style'
import type { FeatureLike } from 'ol/Feature'
import type { Geometry } from 'ol/geom'
import type { Extent } from 'ol/extent'
import type { Coordinate } from 'ol/coordinate'
import type VectorContext from 'ol/render/VectorContext'
import type { StyleLike } from 'ol/style/Style'
import { Object as _OL_OBJECT } from 'ol'
import type { Type } from 'ol/geom/Geometry'
import type { FrameState } from 'ol/Map'

export interface FeatureAnimationEvent {
  vectorContext: VectorContext,
  frameState: FrameState,
  start: number,
  time: number,
  elapsed: number,
  extent: boolean,
  // Feature information
  feature: FeatureLike,
  geom: Geometry
  typeGeom: Type,
  bbox: Extent
  coord: Coordinate
  style: StyleLike
}

export interface Options {
  speed?: number;
  duration?: number;
  side?: any;
  revers?: boolean;
  repeat?: number;
  hiddenStyle?: Style;
  horizontal?: boolean;
  fade?: ((p0: number) => number);
  easing?: ((p0: number) => number);
}

/** An animation controler object an object to control animation with start, stop and isPlaying function.
 * To be used with {@link olx.Map#animateFeature} or {@link layer.Vector#animateFeature}
 * @typedef {Object} animationControler
 * @property {function} start - start animation.
 * @property {function} stop - stop animation option arguments can be passed in animationend event.
 * @property {function} isPlaying - return true if animation is playing.
 */
export type animationControler = {
  start: (...params: any[]) => any;
  stop: (...params: any[]) => any;
  isPlaying: (...params: any[]) => any;
};

/** Feature animation base class
 * Use the {@link _ol_Map_#animateFeature} or {@link _ol_layer_Vector_#animateFeature} to animate a feature
 * on postcompose in a map or a layer
 * @constructor
 * @fires animationstart
 * @fires animating
 * @fires animationend

 */
export class FeatureAnimation extends _OL_OBJECT {
  /**
   * @param {featureAnimationOptions} options
   *  @param {Number} options.duration duration of the animation in ms, default 1000
   *  @param {bool} options.revers revers the animation direction
   *  @param {Number} options.repeat number of time to repeat the animation, default 0
   *  @param {oo.Style} options.hiddenStyle a style to display the feature when playing the animation
   *    to be used to make the feature selectable when playing animation
   *    (@see {@link ../examples/map.featureanimation.select.html}), default the feature
   *    will be hidden when playing (and niot selectable)
   *  @param {easing.Function} options.fade an easing function used to fade in the feature, default none
   *  @param {easing.Function} options.easing an easing function for the animation, default easing.linear
   */
  constructor(options?: Options);

  /** Function to perform manipulations onpostcompose.
   * This function is called with an featureAnimationEvent argument.
   * The function will be overridden by the child implementation.
   * Return true to keep this function for the next frame, false to remove it.
   * @param {FeatureAnimationEvent} e
   * @return {bool} true to continue animation.
   * @apis
   */
  animate(e: FeatureAnimationEvent): boolean;
}

export const featureAnimation: { [key: string]: typeof FeatureAnimation }
export default featureAnimation
