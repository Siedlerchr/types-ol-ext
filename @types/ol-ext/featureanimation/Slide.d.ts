import type { FeatureAnimationEvent, Options as FeatureAnimationOptions } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

export interface Options extends FeatureAnimationOptions {
  speed?: number;
}

/** Slice animation: feature enter from left
 * @constructor
 * @extends {featureAnimation}

 */
export default class Slide extends FeatureAnimation {
  /**
   * @param {featureAnimationSlideOptions} options
   *  @param {Number} options.speed speed of the animation, if 0 the duration parameter will be used instead, default 0
   */
  constructor(options?: Options)

  /** Animate
   * @param {featureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
