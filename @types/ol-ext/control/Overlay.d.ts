import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type { Coordinate } from 'ol/coordinate'

export interface Options extends ControlOptions {
  className?: string;
  content: string | Element;
  hideOnClick?: boolean;
  closeBox?: boolean;
}

/** Control overlay for OL3
 * The overlay control is a control that display an overlay over the map
 *
 * @constructor
 * @extends {contrControl}
 * @fire change:visible
 */
export default class Overlay extends ol_control_Control {
  /**
   * @param {Object=} options Control options.
   *  @param {String} options.className class of the control
   *  @param {String|Element} options.content
   *  @param {boolean} options.hideOnClick hide the control on click, default false
   *  @param {boolean} options.closeBox add a closeBox to the control, default false
   */
  constructor(options?: Options);

  /** Set the content of the overlay
   * @param {string|Element} html the html to display in the control
   */
  setContent(html: string | Element): void;

  /** Set the control visibility
   * @param {string|Element} html the html to display in the control
   * @param {Coordinate} coord coordinate of the top left corner of the control to start from
   */
  show(html: string | Element, coord: Coordinate): void;

  /** Set the control visibility hidden
   */
  hide(): void;

  /** Toggle control visibility
   */
  toggle(): void;

  /** Get the control visibility
   * @return {boolean} b
   */
  getVisible(): boolean;

  /** Change class name
   * @param {String} className a class name or a list of class names separated by a space
   */
  setClass(className: string): void;
}
