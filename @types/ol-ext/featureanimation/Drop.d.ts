import { default as featureAnimation, FeatureAnimationEvent } from './FeatureAnimation';

export interface Options{
    speed?: number;
    side?: number;
}

/** Drop animation: drop a feature on the map
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationDropOptions} options
 *  @param {Number} options.speed speed of the feature if 0 the duration parameter will be used instead, default 0
 *  @param {Number} options.side top or bottom, default top
 */
declare class Drop extends featureAnimation {
    constructor(options?: Options)
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default Drop;
