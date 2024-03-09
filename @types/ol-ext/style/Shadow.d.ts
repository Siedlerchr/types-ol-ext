import type { Fill } from 'ol/style'
import { RegularShape } from 'ol/style'

export interface Options {
  fill?: Fill;
  radius?: number;
  blur?: number;
  declutterMode?: 'obstacle' | 'none' | undefined
  displacement?: number[];
  offsetX?: number;
  offsetY?: number;
}

/**
 * @classdesc
 * Set Shadow style for point vector features.
 *
 * @constructor

 * @extends {style.RegularShape}
 * @api
 */
export default class Shadow extends RegularShape {
  /**
   * @param {Options=} options Options.
   *   @param {Fill | undefined} options.fill fill style, default rgba(0,0,0,0.5)
   *   @param {number} options.radius point radius
   *   @param {number} options.blur lur radius, default radius/3
   *   @param {string} [options.declutterMode] Declutter mode "declutter" | "obstacle" | "none" | undefined
   *   @param {Array<number>} [options.displacement] to use with ol > 6
   *     @param {number} options.offsetX x offset, default 0
   *     @param {number} options.offsetY y offset, default 0
   */
  constructor(options?: Options);

  /**
   * Clones the style.
   * @return {style.Shadow}
   */
  clone(): Shadow;

  /**
   * @inheritDoc
   */
  getChecksum(): string;
}
