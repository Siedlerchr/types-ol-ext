import { featureAnimation, FeatureAnimationEvent, FeatureAnimationOptions } from './FeatureAnimation';
/** Fade animation: feature fade in
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationOptions} options
 */
export class Fade extends featureAnimation {
    constructor(options?: FeatureAnimationOptions);
    /** Animate
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}
