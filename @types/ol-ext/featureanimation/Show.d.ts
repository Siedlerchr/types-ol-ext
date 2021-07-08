import {  Options, FeatureAnimationEvent, FeatureAnimation } from './FeatureAnimation';
/** Show an object for a given duration
 * @constructor
 * @extends {featureAnimation}
 * @param {Options} options
 */
declare class Show extends FeatureAnimation {
    constructor(options?: Options);
    /** Animate: just show the object during the laps time
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default Show;
