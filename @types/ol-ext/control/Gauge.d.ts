import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'

export interface Options extends ControlOptions {
  className?: string;
  title?: string;
  max?: number;
  val?: number;
}

/** A simple gauge control to display level information on the map.
 *
 * @constructor
 * @extends {contrControl}
 */
export default class Gauge extends ol_control_Control {
  /**
   * @param {Object=} options Control options.
   *    @param {String} options.className class of the control
   *    @param {String} options.title title of the control
   *    @param {number} options.max maximum value, default 100;
   *    @param {number} options.val the value, default 0
   */
  constructor(options?: Options);

  /** Set the control title
   * @param {string} title
   */
  setTitle(title: string): void;

  /** Set/get the gauge value
   * @param {number|undefined} v the value or undefined to get it
   * @return {number} the value
   */
  val(v: number | undefined): number;
}
