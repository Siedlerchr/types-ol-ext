import type { Image, Fill } from 'ol/style'
import { Stroke } from 'ol/style'
import type { ColorLike } from 'ol/colorlike'

export interface Options {
  image?: Image;
  opactiy?: number;
  pattern?: string;
  color?: ColorLike;
  fill?: Fill;
  offset?: number;
  Size?: number;
  spacing?: number;
  angle?: number | boolean;
  scale?: number;
}

/**
 * @classdesc
 * Stroke style with named pattern
 *
 * @constructor

 * @extends {Stroke}
 * @api
 */
export default class StrokePattern extends Stroke {
  /**
   * @param {any}  options
   *  @param {Image|undefined} options.image an image pattern, image must be preloaded to draw on first call
   *  @param {number|undefined} options.opacity opacity with image pattern, default:1
   *  @param {string} options.pattern pattern name (override by image option)
   *  @param {ColorLike} options.color pattern color
   *  @param {Fill} options.fill fill color (background)
   *  @param {number} options.offset pattern offset for hash/dot/circle/cross pattern
   *  @param {number} options.size line size for hash/dot/circle/cross pattern
   *  @param {number} options.spacing spacing for hash/dot/circle/cross pattern
   *  @param {number|boolean} options.angle angle for hash pattern / true for 45deg dot/circle/cross
   *  @param {number} options.scale pattern scale
   */
  constructor(options?: Options);

  /**
   * Clones the style.
   * @return {style.StrokePattern}
   */
  clone(): StrokePattern;

  /** Get canvas used as pattern
   *  @return {canvas}
   */
  getImage(): HTMLCanvasElement;
}
