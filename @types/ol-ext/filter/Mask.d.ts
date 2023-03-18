import type Feature from 'ol/Feature'
import type { Fill } from 'ol/style'
import type { ColorLike } from 'ol/colorlike'
import Base from './Base'

export interface Options {
  feature?: Feature;
  fill?: Fill;
  shadowWidth?: number;
  shadowMapUnits?: boolean;
  shadowColor?: ColorLike;
  inner?: boolean;
  wrapX?: boolean;
}

/** Mask drawing using an ol.Feature
 * @constructor
 * @requires ol_filter
 * @extends {ol_filter_Base}

 */
export default class Mask extends Base {
  /**
   * @param {Object} [options]
   *  @param {ol.Feature} [options.feature] feature to mask with
   *  @param {ol.style.Fill} [options.fill] style to fill with
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

  /** Set filter fill color
   * @param {ColorLike} color
   */
  setFillColor(color: ColorLike): void;

  /** Set filter shadow color
   * @param {ColorLike} color
   */
  setShadowColor(color: ColorLike): void;
}
