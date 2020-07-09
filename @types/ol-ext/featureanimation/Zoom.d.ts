import { default as featureAnimation, FeatureAnimationEvent } from './FeatureAnimation';

export interface Options {
    zoomOut?: boolean;
}

/** Zoom animation: feature zoom in (for points)
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationZoomOptions} options
 *  @param {bool} options.zoomOut to zoom out
 */
declare class Zoom extends featureAnimation {
    constructor(options?: Options);
    /** Animate
    * @param {featureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default Zoom;
