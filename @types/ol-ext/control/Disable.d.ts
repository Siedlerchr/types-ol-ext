import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'

export interface Options extends ControlOptions {
  class?: string;
  html?: string;
  on?: boolean;
  toggleFn?: (...params: any[]) => void; // TODO seems not to be used in the original code
}

/** A simple control to disable all actions on the map.
 * The control will create an invisible div over the map.
 * @constructor
 * @extends {ol_control_Control}
 */
export default class Disable extends ol_control_Control {
  /**
   * @param {Object=} options Control options.
   *    @param {String} options.class class of the control
   *    @param {String} options.html html code to insert in the control
   *    @param {bool} options.on the control is on
   *    @param {function} options.toggleFn callback when control is clicked
   */
  constructor(options?: Options);

  /** Test if the control is on
   * @return {boolean}
   * @api stable
   */
  isOn(): boolean;

  /** Disable all action on the map
   * @param {boolean} b, default false
   * @api stable
   */
  disableMap(b: boolean): void;
}
