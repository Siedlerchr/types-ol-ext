import type { FeatureAnimationEvent, Options as FeatureAnimationOptions } from './FeatureAnimation'
import { FeatureAnimation } from './FeatureAnimation'

export interface Options extends FeatureAnimationOptions {
  speed?: number;
  side?: 'top' | 'bottom';
}

/** Drop animation: drop a feature on the map
 * @constructor
 * @extends {featureAnimation}

 */
export default class Drop extends FeatureAnimation {
  /**
   * @param {featureAnimationDropOptions} options
   *  @param {Number} options.speed speed of the feature if 0 the duration parameter will be used instead, default 0
   *  @param {Number} options.side top or bottom, default top
   */
  constructor(options?: Options)

  /** Animate
   * @param {FeatureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}
