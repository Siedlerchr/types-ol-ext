import { FeatureAnimation, FeatureAnimationEvent } from './FeatureAnimation';

export interface Options {
    zoomOut?: boolean;
}

/** Zoom animation: feature zoom out (for points)
 * @constructor
 * @extends {featureAnimation}
 */
export default class ZoomOut extends FeatureAnimation {
    constructor(options?: Options)
    /** Function to perform manipulations onpostcompose.
     * This function is called with an featureAnimationEvent argument.
     * The function will be overridden by the child implementation.
     * Return true to keep this function for the next frame, false to remove it.
     * @param {featureAnimationEvent} e
     * @return {bool} true to continue animation.
     * @api
     */
    animate(e: FeatureAnimationEvent): boolean;
}

