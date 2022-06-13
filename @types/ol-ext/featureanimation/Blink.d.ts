import { FeatureAnimation, FeatureAnimationEvent, Options as FeatureAnimationOptions } from './FeatureAnimation';

export interface Options extends FeatureAnimationOptions {
    nb?: number
}


/** Blink a feature
 * @constructor
 * @extends {ol_featureAnimation}
 * @param {ol_featureAnimationOptions} options
 *  @param {Number} options.nb number of blink, default 10
 */
export default class Blink extends FeatureAnimation {
    constructor(options?: Options)
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

