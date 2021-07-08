import { FeatureAnimation, FeatureAnimationEvent, Options } from './FeatureAnimation';
/** Fade animation: feature fade in
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationOptions} options
 */
export class Fade extends FeatureAnimation {
    constructor(options?: Options);
    /** Animate
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

