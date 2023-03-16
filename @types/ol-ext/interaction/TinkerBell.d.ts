import { Pointer } from 'ol/interaction'
import type { Color } from 'ol/color'
import type { Map as _ol_Map_ } from 'ol'

export interface Options {
  color?: Color;
}

/**
 * @constructor
 * @extends {interaction.Pointer}
 */
export default class TinkerBell extends Pointer {
  /**
   * @param {interaction.TinkerBell.options} options flashlight param
   *    - color {color} color of the sparkles
   */
  constructor(options?: Options);

  /** Set the map > start postcompose
   */
  setMap(map: _ol_Map_): void;

  /** Postcompose function
   */
  postcompose_(): void;
}
