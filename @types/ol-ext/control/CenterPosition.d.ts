import type { Map as _ol_Map_ } from 'ol'
import type { CoordinateFormat } from 'ol/coordinate'
import type { ProjectionLike } from 'ol/proj'
import type { Fill, Stroke, Style } from 'ol/style'
import type { Options as CanvasOptions } from './CanvasBase'
import CanvasBase from './CanvasBase'

export interface Options extends CanvasOptions {
  className?: string;
  style?: Style;
  projection?: ProjectionLike;
  coordinateFormat?: CoordinateFormat;
  canvas?: boolean;
}

/**
 * A title Control integrated in the canvas (for jpeg/png
 *
 * @constructor
 * @extends {contrCanvasBase}
 */
export default class CenterPosition extends CanvasBase {
  /**
   * @param {Object=} options extend the control options.
   *  @param {string} options.className CSS class name
   *  @param {Style} options.style style used to draw in the canvas
   *  @param {ProjectionLike} options.projection  Projection. Default is the view projection.
   *  @param {Coordinate.CoordinateFormat} options.coordinateFormat A function that takes a Coordinate and transforms it into a string.
   *  @param {boolean} options.canvas true to draw in the canvas
   */
  constructor(options?: Options);

  /**
   * Change the control style
   * @param {Style} style
   */
  setStyle(style: Style): void;

  /**
   * Draw on canvas
   * @param {boolean} b draw the attribution on canvas.
   */
  setCanvas(b: boolean): void;

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
