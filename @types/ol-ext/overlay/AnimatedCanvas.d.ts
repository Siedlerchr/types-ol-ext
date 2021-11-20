import { Map as _ol_Map_, Overlay } from 'ol';
import { Options as OverlayOptions } from 'ol/Overlay';
import Base from '../particule/Base';

export interface Options extends OverlayOptions {
  className?: string;
  density?: number;
  speed?: number;
  angle?: number;
  animate?: boolean;
  fps?: number;
  particule?: typeof Base
}

/** An overlay to play animations on top of the map
 * The overlay define a set of particules animated on top of the map.
 * Particules are objects with coordinates.
 * They are dawn in a canvas using the draw particule method.
 * The update particule method updates the particule position according to the timelapse
 *
 * @constructor
 * @extends {ol_Overlay}
 * @param {*} options
 *  @param {String} options.className class of the Overlay
 *  @param {number} option.density particule density, default .5
 *  @param {number} option.speed particule speed, default 4
 *  @param {number} option.angle particule angle in radian, default PI/4
 *  @param {boolean} options.animate start animation, default true
 *  @param {number} options.fps frame per second, default 25
 */
export default class AnimatedCanvas extends Overlay {
  constructor(options?: Options);

  /** Set the visibility
   * @param {boolean} b
   */
  setVisible(b: boolean): void;
  /** Get the visibility
   * @return {boolean} b
   */
  getVisible(): boolean;
  /** No update for this overlay
   */
  updatePixelPosition(): void;
  /**
   * Set the map instance the overlay is associated with
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_): void;
  /** Create particules or return exiting ones
   */
  getParticules(): any[];
  /** Get random coordinates on canvas
   */
  randomCoord(): number[];
  /** Draw canvas overlay (draw each particules)
   * @param {number} dt timelapes since last call
   */
  draw(dt: number): void;

  /** Clear canvas
   */
  clear(): void;

  /** Get overlay canvas
   * @return {CanvasElement}
   */
  getCanvas(): HTMLCanvasElement;
  /** Set canvas animation
   * @param {boolean} anim, default true
   * @api
   */
  setAnimation(anim?: boolean): void;
}
