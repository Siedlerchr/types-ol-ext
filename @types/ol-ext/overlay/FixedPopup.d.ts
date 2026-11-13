import type { Map as _ol_Map_ } from 'ol'

import type { Pixel } from 'ol/pixel'
import type { Coordinate } from 'ol/coordinate'
import type { Style } from 'ol/style'
import type { Positioning } from 'ol/Overlay'
import type { Options as PopupOptions } from './Popup'
import Popup from './Popup'

export interface Options extends PopupOptions {
  style?: Style;
  minScale?: number;
  maxScale?: number;
  hook?: 'map' | 'viewport'
}

/**
 * A popup element to be displayed over the map and attached to a single map
 * location. The popup are customized using CSS.
 *
 * @constructor
 * @extends {ol_Overlay_Popup}
 * @fires show
 * @fires hide
 * @api stable
 */
export default class FixedPopup extends Popup {
  /**
   * @param {} options Extend Overlay options
   *  @param {String} options.popupClass the a class of the overlay to style the popup.
   *  @param {ol.style.Style} options.style a style to style the link on the map.
   *  @param {number} options.minScale min scale for the popup, default .5
   *  @param {number} options.maxScale max scale for the popup, default 2
   *  @param {bool} options.closeBox popup has a close box, default false.
   *  @param {function|undefined} options.onclose: callback function when popup is closed
   *  @param {function|undefined} options.onshow callback function when popup is shown
   *  @param {Number|Array<number>} options.offsetBox an offset box
   *  @param {ol.OverlayPositioning | string | undefined} options.positioning
   *   the 'auto' positioning var the popup choose its positioning to stay on the map.
   *  @param {string} options.hook popup is hooked on the 'map' (and move with it) or on the 'viewport', default viewport.
   */
  constructor(options?: Options);

  /**
   * Set the map instance the control is associated with
   * and add its controls associated to this map.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_ | null): void;

  /** Set pixel position
   * @param {ol.pixel} pix
   * @param {string} position top/bottom/middle-left/right/center
   */
  setPixelPosition(pix?: Pixel, position?: Positioning): void;

  /** Set pixel position
   * @returns {ol.pixel}
   */
  getPixelPosition(): Pixel | undefined;

  /** Get the popup's map coordinate, if set. */
  getCoordinate(): Coordinate | null | undefined;
  /** Set the popup's map coordinate. */
  setCoordinate(position?: Coordinate): void;
  /** Hook the popup to the map or viewport; defaults to the viewport. */
  setHook(hook?: 'map' | 'viewport'): void;

  /**
   * Set the CSS class of the popup.
   * @param {string} c class name.
   * @api stable
   */
  setPopupClass(c: string): void;

  /** Set poppup rotation
   * @param {number} angle
   * @param {booelan} update update popup, default true
   * @api
   */
  setRotation(angle: number, update?: boolean): void;

  /** Set poppup scale
   * @param {number} scale
   * @param {boolean} update update popup, default true
   * @api
   */
  setScale(scale: number, update?: boolean): void;

  /** Set link style
   * @param {Style} style
   */
  setLinkStyle(style: Style): void;

  /** Get link style
   * @return {Style} style
   */
  getLinkStyle(): Style
}
