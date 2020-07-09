import { default as featureAnimation, FeatureAnimationEvent } from './FeatureAnimation';

export interface Options {
    side?: 'left' | 'right';
}
/** Slice animation: feature enter from left
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationThrowOptions} options
 *  @param {left|right} options.side side of the animation, default left
 */
declare class Throw extends featureAnimation {
    constructor(options?: Options)
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default Throw;
