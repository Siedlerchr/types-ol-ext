import type { Options as BaseOptions } from './Base'
import Base from './Base'

/** Rain particules to display clouds over the map
 * @constructor
 * @extends {ol_particule_Base}

 */
export default class Snow extends Base {
  /**
   * @param {*} options
   *  @param {ol.Overlay} options.overlay
   *  @param {ol.pixel} coordinate the position of the particule
   */
  constructor(options?: BaseOptions);

  /** Draw the particule
   * @param {CanvasRenderingContext2D } ctx
   */
  draw(ctx: CanvasRenderingContext2D): void;

  /** Update the particule
   * @param {number} dt timelapes since last call
   */
  update(dt: number): void;
}
