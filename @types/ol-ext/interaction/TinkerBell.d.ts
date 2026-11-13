import { Pointer } from 'ol/interaction'
import type { Color } from 'ol/color'
import type { Map as _ol_Map_ } from 'ol'
import type MapBrowserEvent from 'ol/MapBrowserEvent'

export interface Options {
  color?: Color | string;
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
  setMap(map: _ol_Map_ | null): void;

  /** Update the sparkle position from a map browser event. */
  onMove(event: MapBrowserEvent): void;
}
