import FeatureAnimation, { Options, FeatureAnimationEvent } from './FeatureAnimation';
/** Teleport a feature at a given place
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationOptions} options
 */
export default class Teleport extends FeatureAnimation {
    constructor(options?: Options);
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

