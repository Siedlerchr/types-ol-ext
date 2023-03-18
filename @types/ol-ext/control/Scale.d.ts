import type { Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'

export interface Options extends ControlOptions {
  className?: string;
  ppi?: number;
  editable?: boolean;
}

/**
 * Scale Control
 * A control to display the scale of the center on the map
 *
 * @constructor
 * @extends {ol_control_Control}
 * @fires select
 * @fires change:input
 */
export default class Scale extends ol_control_Control {
  /**
   * @param {Object=} options
   *  @param {string} options.className control class name
   *  @param {number} options.ppi screen ppi, default 96
   *  @param {boolean} options.editable make the control editable, default true
   */
  constructor(options?: Options);

  /**
   * Remove the control from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

  /** Display the scale
   */
  getScale(): number

  /** Format the scale 1/d
   * @param {Number} d
   * @return {string} formated string
   */
  formatScale(d: number): string;

  /** Set the current scale (will change the scale of the map)
   * @param {Number} value the scale factor
   */
  setScale(value: number): void
}
