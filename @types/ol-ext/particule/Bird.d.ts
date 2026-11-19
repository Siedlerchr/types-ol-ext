import type { Options as BaseOptions } from './Base'
import Base from './Base'

export interface Options extends BaseOptions {
  src?: string;
}

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
  constructor(options?: Options);

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
