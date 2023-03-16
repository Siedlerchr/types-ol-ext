import type { FeatureAnimationEvent } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

/** Do nothing
 * @constructor
 * @extends {featureAnimation}
 */
export default class Null extends FeatureAnimation {
  /** Function to perform manipulations onpostcompose.
   * This function is called with an featureAnimationEvent argument.
   * The function will be overridden by the child implementation.
   * Return true to keep this function for the next frame, false to remove it.
   * @param {featureAnimationEvent} e
   * @return {bool} true to continue animation.
   * @api
   */
  animate(e: FeatureAnimationEvent): boolean;
}
