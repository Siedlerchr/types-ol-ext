import type { FeatureAnimationEvent, Options as FeatureAnimationOption } from './FeatureAnimation'
import FeatureAnimation from './FeatureAnimation'

export interface Options extends FeatureAnimationOption {
  zoomOut?: boolean;
}

/** Zoom animation: feature zoom in (for points)
 * @constructor
 * @extends {featureAnimation}

 */
export default class Zoom extends FeatureAnimation {
  /**
   * @param {featureAnimationZoomOptions} options
   *  @param {bool} options.zoomOut to zoom out
   */
  constructor(options?: Options);

  /** Animate
   * @param {featureAnimationEvent} e
   */
  animate(e: FeatureAnimationEvent): boolean;
}

/** Zoom animation that shrinks the feature out. */
export class ol_featureAnimation_ZoomOut extends Zoom {}
export { Zoom as ol_featureAnimation_Zoom }
