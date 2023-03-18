import type { FeatureAnimationEvent, Options as FeatureAnimationOptions } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

export interface Options extends FeatureAnimationOptions {
  nb?: number;
}

/** Blink a feature
 * @constructor
 * @extends {ol_featureAnimation}

 */
export default class Blink extends FeatureAnimation {
  /**
   * @param {ol_featureAnimationOptions} options
   *  @param {Number} options.nb number of blink, default 10
   */
  constructor(options?: Options)

  /** Animate
   * @param {FeatureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
