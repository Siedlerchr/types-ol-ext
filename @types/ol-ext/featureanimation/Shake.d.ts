import { default as featureAnimation, FeatureAnimationEvent } from './FeatureAnimation';

export interface Options{
    bounce?: number;
    amplitude?: number;
    horizontal?: boolean;
}
/** Shakee animation:
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationShakeOptions} options
 *	@param {number} options.bounce number o bounds, default 6
 *	@param {number} options.amplitude amplitude of the animation, default 40
 *	@param {bool} options.horizontal shake horizontally default false (vertical)
 */
declare class Shake extends featureAnimation {
    constructor(options?: Options)
    /** Animate
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default Shake;
