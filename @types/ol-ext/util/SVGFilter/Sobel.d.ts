import SVGFilter from '../SVGFilter'

export interface Options {
  grayscale?: boolean;
  alpha?: boolean;
}

/** Apply a sobel filter on an image
 * @constructor
 * @requires ol.filter
 * @extends {SVGFilter}

 */
export default class Sobel extends SVGFilter {
  /**
   * @param {*} options
   *  @param {boolean} options.grayscale get grayscale image, default false,
   *  @param {boolean} options.alpha get alpha channel, default false
   */
  constructor(options?: Options);
}
