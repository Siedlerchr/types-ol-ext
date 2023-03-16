import type { ColorLike } from 'ol/colorlike'
import Base from './Base'

/** @typedef {Object} FilterColorizeOptions
 *  @property {Color} color style to fill with
 *  @property {string} operation 'enhance' or a CanvasRenderingContext2D.globalCompositeOperation
 *  @property {number} value a [0-1] value to modify the effect value
 *  @property {boolean} inner mask inner, default false
 */
export interface FilterColorizeOptions {
  color?: ColorLike;
  operation?: 'enhance' | string;
  value?: number;
  inner?: boolean;
}

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
  constructor(options?: FilterColorizeOptions);

  /** Set options to the filter
   * @param {FilterColorizeOptions} [options]
   */
  setFilter(options?: FilterColorizeOptions): void;

  /** Set the filter value
   *  @param {Color} options.color style to fill with
   */
  setValue(color: ColorLike): void;

  /** Set the color value
   *  @param {number} options.value a [0-1] value to modify the effect value
   */
  setColor(c: number): void;

  /** Activate / deactivate filter
   *  @param {boolean} b
   */
  setActive(b: boolean): void;

  /** Get filter active
   *  @return {boolean}
   */
  getActive(): boolean;
}
