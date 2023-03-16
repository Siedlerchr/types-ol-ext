import type { Options as BaseOptions } from './Base'
import Base from './Base'

/** A cloud particule to display clouds over the map
 * @constructor
 * @extends {Base}

 */
export default class Bird extends Base {
  /**
   * @param {*} options
   *  @param {Overlay} options.overlay
   *  @param {Pixel} coordinate the position of the particule
   */
  constructor(options?: BaseOptions);

  bird: HTMLImageElement

  /** Draw the particule
   * @param {CanvasRenderingContext2D } ctx
   */
  draw(ctx: CanvasRenderingContext2D): void;

  /** Update the particule
   * @param {number} dt timelapes since last call
   */
  update(dt: number): void;
}
