import { Overlay } from 'ol';
import ol_Object from 'ol/Object';
import { Pixel } from 'ol/pixel';

export interface Options {
  overlay?: Overlay;
  pixel?: Pixel;
}

/** Abstract base class; normally only used for creating subclasses.
 * An object with coordinates, draw and update
 * @constructor
 * @extends {ol_Object}
 * @param {*} options
 *  @param {ol.Overlay} options.overlay
 *  @param {ol.pixel} coordinate the position of the particule
 */
export default class Base extends ol_Object {
  constructor(options?: Options);

  /** Set the particule overlay
   * @param {ol.Overlay} overl
   */
  setOverlay(overlay: Overlay): void;
  /** Get the particule overlay
   * @return {ol.Overlay}
   */
  getOverlay(): Overlay;
  /** Draw the particule
   * @param { CanvasRenderingContext2D } ctx
   */
  draw(ctx: CanvasRenderingContext2D): void;
  /** Update the particule
   * @param {number} dt timelapes since last call
   */
  update(dt: number): void;
  /** Update the particule
   * @param {number} dt timelapes since last call
   */
  getRandomCoord(dt: number): any;
}
