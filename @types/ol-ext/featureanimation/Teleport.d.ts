import {  Options, FeatureAnimationEvent, FeatureAnimation } from './FeatureAnimation';
/** Teleport a feature at a given place
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationOptions} options
 */
declare class Teleport extends FeatureAnimation {
    constructor(options?: Options);
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default Teleport;
