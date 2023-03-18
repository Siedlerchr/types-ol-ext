import SVGFilter from '../SVGFilter'

export interface Options {
  neighbors?: number;
  grayscale?: number;
  alpha?: number;
}

/** A simple filter to detect edges on images
 * @constructor
 * @requires ol.filter
 * @extends {SVGFilter}

 */
export default class Laplacian extends SVGFilter {
  /**
   * @param {*} options
   *  @param {number} options.neighbours nb of neighbour (4 or 8), default 8
   *  @param {boolean} options.grayscale get grayscale image, default false,
   *  @param {boolean} options.alpha get alpha channel, default false
   */
  constructor(options?: Options);
}
