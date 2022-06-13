import { FeatureAnimation, FeatureAnimationEvent, Options as FeatureAnimationOption } from './FeatureAnimation';

export interface Options extends FeatureAnimationOption{
    zoomOut?: boolean;
}

/** Zoom animation: feature zoom in (for points)
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationZoomOptions} options
 *  @param {bool} options.zoomOut to zoom out
 */
export default class Zoom extends FeatureAnimation {
    constructor(options?: Options);
    /** Animate
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

