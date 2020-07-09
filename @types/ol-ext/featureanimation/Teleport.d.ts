import { default as featureAnimation, Options, FeatureAnimationEvent } from './FeatureAnimation';
/** Teleport a feature at a given place
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationOptions} options
 */
declare class Teleport extends featureAnimation {
    constructor(options?: Options);
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default Teleport;
