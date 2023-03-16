import type Feature from 'ol/Feature'
import type { LineString } from 'ol/geom'
import type { FeatureAnimationEvent, Options as FeatureAnimationOptions } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

export interface Options extends FeatureAnimationOptions {
  speed?: number;
  rotate?: number | boolean;
  path?: LineString | Feature;
  duration?: number;
}

/** Path animation: feature follow a path
 * @constructor
 * @extends {featureAnimation}

 */
export default class Path extends FeatureAnimation {
  /**
   * @param {featureAnimationPathOptions} options extend featureAnimation options
   *  @param {Number} options.speed speed of the feature, if 0 the duration parameter will be used instead, default 0
   *  @param {Number|boolean} options.rotate rotate the symbol when following the path, true or the initial rotation, default false
   *  @param {LineString|Feature} options.path the path to follow
   *  @param {Number} options.duration duration of the animation in ms
   */
  constructor(options?: Options)

  /** Animate
   * @param {FeatureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
