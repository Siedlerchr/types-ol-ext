import Feature from 'ol/Feature'
import { Fill } from 'ol/style'
import Base from './Base'

export interface Options {
  active?: boolean;
  scale?: number;
}

/** Paper filter
 * @deprecated Use a canvas filter instead.
 * @constructor
 * @extends {ol_filter_Base}

 */
export default class Paper extends Base {
  /**
   * @param {object} options
   *  @param {boolean} [options.active]
   *  @param {number} [options.scale=1]
   */
  constructor(options?: Options);

  /** Set filter light, from 0 (darker) to 100 (lighter). */
  setLight(light: number): void;

  /** Draw the feature into canvas
   */
  drawFeaturePath_(): void;

  /** Activate / deactivate filter
   *  @param {boolean} b
   */
  setActive(b: boolean): void;

  /** Get filter active
   *  @return {boolean}
   */
  getActive(): boolean;

  fillColor_: string
}
