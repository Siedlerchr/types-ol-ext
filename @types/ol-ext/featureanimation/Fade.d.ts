import type { FeatureAnimationEvent, Options as FeatureAnimationOptions } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

export interface Options extends FeatureAnimationOptions {
  speed?: number;
}

/** Fade animation: feature fade in
 * @constructor
 * @extends {ol_featureAnimation}
 */
export default class Fade extends FeatureAnimation {
  /**
   * @param {ol_featureAnimationOptions} options
   */
  constructor(options?: FeatureAnimationOptions);

  /** Animate
   * @param {featureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
