import { default as featureAnimation, FeatureAnimationEvent, Options } from './FeatureAnimation';
/** Do nothing for a given duration
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationShowOptions} options
 *
 */
declare class None extends featureAnimation {
    constructor(options?: Options);
    /** Animate: do nothing during the laps time
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default None;
