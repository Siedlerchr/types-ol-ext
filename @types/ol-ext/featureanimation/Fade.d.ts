import { featureAnimation, FeatureAnimationEvent, Options } from './FeatureAnimation';
/** Fade animation: feature fade in
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationOptions} options
 */
export class Fade extends featureAnimation {
    constructor(options?: Options);
    /** Animate
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}
