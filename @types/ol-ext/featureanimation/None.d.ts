import type { FeatureAnimationEvent, Options } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

/** Do nothing for a given duration
 * @constructor
 * @extends {featureAnimation}
 *
 */
export default class None extends FeatureAnimation {
  /**
   * @param {featureAnimationShowOptions} options
   */
  constructor(options?: Options);

  /** Animate: do nothing during the laps time
   * @param {featureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
