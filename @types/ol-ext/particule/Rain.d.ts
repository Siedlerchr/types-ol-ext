import Base from './Base';
import { Options as BaseOptions } from './Base';
/** Rain particules to display clouds over the map
 * @constructor
 * @extends {ol_particule_Base}
 * @param {*} options
 *  @param {ol.Overlay} options.overlay
 *  @param {ol.pixel} coordinate the position of the particule
 */
export default class Rain extends Base {
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
