import type { Options, FeatureAnimationEvent } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

/** Teleport a feature at a given place
 * @constructor
 * @extends {featureAnimation}
 */
export default class Teleport extends FeatureAnimation {
  /**
   * @param {featureAnimationOptions} options
   */
  constructor(options?: Options);

  /** Animate
   * @param {FeatureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
