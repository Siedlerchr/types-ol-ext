import { featureAnimation, FeatureAnimationEvent } from './FeatureAnimation';

export interface Options {
    side?: 'left' | 'right';
}
/** Slice animation: feature enter from left
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationThrowOptions} options
 *  @param {left|right} options.side side of the animation, default left
 */
export class Throw extends featureAnimation {
    constructor(options?: Options)
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}
