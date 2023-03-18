import Base from './Base'

export interface Options {
  img?: string;
  size?: number;
  crossOrigin?: null | string | undefined;
}

/** Make a map or layer look like made of a set of Lego bricks.
 *  @constructor
 * @requires ol_filter
 * @extends {ol_filter_Base}

 */
export default class Halftone extends Base {
  /**
   * @param {Object} [options]
   *  @param {string} [options.img]
   *  @param {number} [options.size] point size, default 30
   *  @param {null | string | undefined} [options.crossOrigin] crossOrigin attribute for loaded images.
   */
  constructor(options?: Options);

  /** Set the current size
   *  @param {number} width the pattern width, default 30
   */
  setSize(size: number): void;

  /** Postcompose operation
   */
  postcompose(e: any): void;
}
