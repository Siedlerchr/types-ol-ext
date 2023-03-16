import type { FeatureAnimationEvent, Options as FeatureAnimationOption } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

export interface Options extends FeatureAnimationOption {
  side?: 'left' | 'right';
}

/** Slice animation: feature enter from left
 * @constructor
 * @extends {featureAnimation}

 */
export default class Throw extends FeatureAnimation {
  /**
   * @param {featureAnimationThrowOptions} options
   *  @param {left|right} options.side side of the animation, default left
   */
  constructor(options?: Options)

  /** Animate
   * @param {FeatureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
