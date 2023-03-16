import type { Options, FeatureAnimationEvent } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

/** Show an object for a given duration
 * @constructor
 * @extends {featureAnimation}
 */
export default class Show extends FeatureAnimation {
  /**
   * @param {Options} options
   */
  constructor(options?: Options);

  /** Animate: just show the object during the laps time
   * @param {FeatureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
