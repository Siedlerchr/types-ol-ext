import {FeatureAnimation, FeatureAnimationEvent, Options as FeatureAnimationOptions  } from './FeatureAnimation';

export interface Options extends FeatureAnimationOptions{
    speed?: number;
    side?: 'top' | 'bottom';
}

/** Drop animation: drop a feature on the map
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationDropOptions} options
 *  @param {Number} options.speed speed of the feature if 0 the duration parameter will be used instead, default 0
 *  @param {Number} options.side top or bottom, default top
 */
export default class Drop extends FeatureAnimation {
    constructor(options?: Options)
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

