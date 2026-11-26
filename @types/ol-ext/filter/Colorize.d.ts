import type { Color } from 'ol/color'
import Base from './Base'
import type { Options as BaseOptions } from './Base'

/** @typedef {Object} FilterColorizeOptions
 *  @property {Color} color style to fill with
 *  @property {string} operation 'enhance' or a CanvasRenderingContext2D.globalCompositeOperation
 *  @property {number} value a [0-1] value to modify the effect value
 *  @property {boolean} inner mask inner, default false
 */
export interface FilterColorizeOptions extends BaseOptions {
  color?: Color | string;
  operation?: 'enhance' | string;
  value?: number;
  inner?: boolean;
  preserveAlpha?: boolean;
  red?: number;
  green?: number;
  blue?: number;
}

export type ColorizePreset = 'grayscale' | 'invert' | 'sepia'

/** Colorize map or layer
 * @constructor
 * @requires filter
 * @extends {filter.Base}
 * @author Thomas Tilak https://github.com/thhomas
 * @author Jean-Marc Viglino https://github.com/viglino
 */
export default class Colorize extends Base {
  /**
   * @param {FilterColorizeOptions} options
   */
  constructor(options?: FilterColorizeOptions | ColorizePreset);

  /** Set options to the filter
   * @param {FilterColorizeOptions} [options]
   */
  setFilter(options?: FilterColorizeOptions | ColorizePreset): void;

  /** Set the filter value
   *  @param {number} value effect strength from 0 to 1
   */
  setValue(value: number): void;

  /** Set the color value
   *  @param {Color|string} color style to fill with
   */
  setColor(color: Color | string): void;

  /** Activate / deactivate filter
   *  @param {boolean} b
   */
  setActive(b: boolean): void;

  /** Get filter active
   *  @return {boolean}
   */
  getActive(): boolean;
}
