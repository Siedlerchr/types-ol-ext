import type { Map as _ol_Map_ } from 'ol'
import type { Style, Stroke, Fill } from 'ol/style'
import type { Options as CanvasOptions } from './CanvasBase'
import CanvasBase from './CanvasBase'

export interface Options extends CanvasOptions {
  title?: string;
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
  setStyle(style: Style): void;

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
  getTitle(map: string): void;

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

  /**
   * Remove the control from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {_ol_Map_} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

  /** Get canvas overlay
   */
  getCanvas(): HTMLCanvasElement;

  /** Get style
   * @api
   */
  getStyle(): Style;

  /** Get stroke
   * @api
   */
  getStroke(): Stroke;

  /** Get fill
   * @api
   */
  getFill(): Fill;

  /** Get stroke
   * @api
   */
  getTextStroke(): Stroke;

  /** Get text fill
   * @api
   */
  getTextFill(): Fill;

  /** Get text font
   * @api
   */
  getTextFont(): string;
}
