import Popup from './Popup'
import type { Options as PopupOptions } from './Popup'

export interface Options extends PopupOptions {
  color?: string;
  backgroundColor?: string;
  contentColor?: string;
  size?: number;
}

/**
 * @classdesc
 * A placemark element to be displayed over the map and attached to a single map
 * location. The placemarks are customized using CSS.
 *
 * @example
 var popup = new Overlay.Placemark();
 map.addOverlay(popup);
 popup.show(coordinate);
 popup.hide();
 *
 * @constructor
 * @extends {Overlay}

 * @api stable
 */
export default class Placemark extends Popup {
  /**
   * @param {} options Extend ol/Overlay/Popup options
   *  @param {String} options.color placemark color
   *  @param {String} options.backgroundColor placemark color
   *  @param {String} options.contentColor placemark color
   *  @param {Number} options.size placemark radius in pixel
   *  @param {String} options.popupClass the a export class of the overlay to style the popup.
   *  @param {function|undefined} options.onclose: callback function when popup is closed
   *  @param {function|undefined} options.onshow callback function when popup is shown
   */
  constructor(options?: Options);

  /**
   * Set the placemark color.
   * @param {string} color
   */
  setColor(color: string): void;

  /**
   * Set the placemark background color.
   * @param {string} color
   */
  setBackgroundColor(color: string): void;

  /**
   * Set the placemark content color.
   * @param {string} color
   */
  setContentColor(color: string): void;

  /**
   * Set the placemark export class.
   * @param {string} name
   */
  setClassName(name: string): void;

  /**
   * Set the placemark radius.
   * @param {number} Size Size in pixel
   */
  setRadius(Size: number): void;

  hide(): void;
}
