import { FeatureAnimation, Options, FeatureAnimationEvent } from './FeatureAnimation';
/** Show an object for a given duration
 * @constructor
 * @extends {featureAnimation}
 * @param {Options} options
 */
export default class Show extends FeatureAnimation {
    constructor(options?: Options);
    /** Animate: just show the object during the laps time
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

