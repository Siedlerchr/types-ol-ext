import { featureAnimation, FeatureAnimationEvent } from './FeatureAnimation';

export interface Options{
    speed?: number;
}
/** Slice animation: feature enter from left
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationSlideOptions} options
 *  @param {Number} options.speed speed of the animation, if 0 the duration parameter will be used instead, default 0
 */
export class Slide extends featureAnimation {
    constructor(options: Options)
    /** Animate
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}
