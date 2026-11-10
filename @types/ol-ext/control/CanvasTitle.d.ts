import type { Style } from 'ol/style'
import type { Options as CanvasOptions } from './CanvasBase'
import CanvasBase from './CanvasBase'

export interface Options extends CanvasOptions {
  title?: string;
  className?: string;
  visible?: boolean;
}

/**
 * A title Control integrated in the canvas (for jpeg/png
 *
 * @constructor
 * @extends {contrCanvasBase}
 */
export default class CanvasTitle extends CanvasBase {
  /**
   * @param {Object=} options extend the control options.
   *  @param {string} options.title the title, default 'Title'
   *  @param {Style} options.style style used to draw the title.
   */
  constructor(options?: Options);

  /**
   * Change the control style
   * @param {Style} style
   */
  setStyle(style?: Style): void;

  /**
   * Set the map title
   * @param {string} map title.
   * @api stable
   */
  setTitle(map: string): void;

  /**
   * Get the map title
   * @param {string} map title.
   * @api stable
   */
  getTitle(): string;

  /**
   * Set control visibility
   * @param {bool} b
   * @api stable
   */
  setVisible(b: boolean): void;

  /**
   * Get control visibility
   * @return {bool}
   * @api stable
   */
  getVisible(): boolean;

}
