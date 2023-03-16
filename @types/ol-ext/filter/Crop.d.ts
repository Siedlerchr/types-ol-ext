import type { ColorLike } from 'ol/colorlike'
import type Feature from 'ol/Feature'
import Mask from './Mask'

export interface Options {
  feature?: Feature;
  shadowWidth?: number;
  shadowMapUnits?: boolean;
  shadowColor?: ColorLike;
  inner?: boolean;
  wrapX?: boolean;
}

/** Crop drawing using an ol.Feature
 * @constructor
 * @requires ol.filter
 * @requires ol_filter_Mask
 * @extends {ol_filter_Mask}

 */
export default class Crop extends Mask {
  /**
   * @param {Object} [options]
   *  @param {Feature} [options.feature] feature to crop with
   *  @param {number} [options.shadowWidth=0] shadow width, default no shadow
   *  @param {boolean} [options.shadowMapUnits=false] true if the shadow width is in mapUnits
   *  @param {ol.colorLike} [options.shadowColor='rgba(0,0,0,.5)'] shadow color, default
   *  @param {boolean} [options.inner=false] mask inner, default false
   *  @param {boolean} [options.wrapX=false] wrap around the world, default false
   */
  constructor(options?: Options);

  /** Activate / deactivate filter
   *  @param {boolean} b
   */
  setActive(b: boolean): void;

  /** Get filter active
   *  @return {boolean}
   */
  getActive(): boolean;
}
