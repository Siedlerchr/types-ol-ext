import SVGFilter from '../SVGFilter'

export interface Options {
  grayscale?: boolean;
  alpha?: boolean;
}

/** Apply a Roberts filter on an image
 * @constructor
 * @requires ol.filter
 * @extends {SVGFilter}

 */
export default class Roberts extends SVGFilter {
  /**
   * @param {*} options
   *  @param {boolean} options.grayscale get grayscale image, default false,
   *  @param {boolean} options.alpha get alpha channel, default false
   */
  constructor(options?: Options);
}
