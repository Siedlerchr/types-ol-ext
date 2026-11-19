import type { FeatureAnimationEvent, Options as FeatureAnimationOptions } from './FeatureAnimation'
import FeatureAnimation from './FeatureAnimation'

/** Options for the shake animation. */
export interface Options extends FeatureAnimationOptions {
  /** Number of oscillations. */
  bounce?: number;
  /** Displacement amplitude. */
  amplitude?: number;
  /** Shake horizontally instead of vertically. */
  horizontal?: boolean;
}

/** Shakee animation:
 * @constructor
 * @extends {featureAnimation}

 */
export default class Shake extends FeatureAnimation {
  /**
   * @param {featureAnimationShakeOptions} options
   *  @param {number} options.bounce number o bounds, default 6
   *  @param {number} options.amplitude amplitude of the animation, default 40
   *  @param {bool} options.horizontal shake horizontally default false (vertical)
   */
  constructor(options?: Options)

  /** Animate
   * @param {featureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
