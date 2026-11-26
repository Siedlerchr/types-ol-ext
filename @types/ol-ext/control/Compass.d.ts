import type { Map as _ol_Map_ } from 'ol'
import type { Stroke, Style } from 'ol/style'
import type { Options as ControlOptions } from 'ol/control/Control'
import CanvasBase from './CanvasBase'

export interface Options extends ControlOptions {
  className?: string;
  image?: HTMLImageElement | string;
  src?: string;
  rotateWithView?: boolean;
  visible?: boolean;
  style?: Stroke | Style; // incompatible with CanvasBaseOptions, so we extends control options
}

/**
 * Draw a compass on the map. The position/Size of the control is defined in the css.
 *
 * @constructor
 * @extends {contrCanvasBase}
 */
export default class Compass extends CanvasBase {
  /**
   * @param {Object=} options Control options. The style {Stroke} option is usesd to draw the text.
   *  @param {string} options.className class name for the control
   *  @param {Image} options.image an image, default use the src option or a default image
   *  @param {string} options.src image src, default use the image option or a default image
   *  @param {boolean} options.rotateVithView rotate vith view (false to show watermark), default true
   *  @param {style.Stroke} options.style style to draw the lines, default draw no lines
   */
  constructor(options?: Options);

  /**
   * Remove the control from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {_ol_Map_} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_ | null): void;

  /** Get canvas overlay
   */
  getCanvas(map: _ol_Map_ | null): HTMLCanvasElement | null;

  /** Get control visibility. */
  getVisible(): boolean;
  /** Set control visibility. */
  setVisible(visible: boolean): void;

  /** Set compass image
   * @param {Image|string} [img=default] the image or an url or 'compact' or 'default'
   */
  setImage(img?: HTMLImageElement | string): void
}
