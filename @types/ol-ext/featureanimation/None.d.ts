import {FeatureAnimation, FeatureAnimationEvent, Options } from './FeatureAnimation';
/** Do nothing for a given duration
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationShowOptions} options
 *
 */
export default class None extends FeatureAnimation {
    constructor(options?: Options);
    /** Animate: do nothing during the laps time
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

