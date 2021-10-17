import { Map as _ol_Map_, MapBrowserEvent } from "ol";
import { Interaction } from "ol/interaction";
import Event from "ol/events/Event";

export interface Options {
  maps: _ol_Map_[];
}
/** Interaction synchronize
 * @constructor
 * @extends {Interaction}
 * @param {*} options
 *  @param {Array<_ol_Map_>} options maps An array of maps to synchronize with the map of the interaction
 */
export default class Synchronize extends Interaction {
  constructor(options?: Options);
  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;
  /** Auto activate/deactivate controls in the bar
   * @param {boolean} b activate/deactivate
   */
  setActive(b: boolean): void;
  /** Synchronize the maps
   */
  syncMaps(e: any): void;
  /** Cursor move > tells other maps to show the cursor
   * @param {event} e "move" event
   */
  handleMove_(e: MapBrowserEvent<UIEvent>): void;
  /** Cursor out of map > tells other maps to hide the cursor
   * @param {event} e "mouseOut" event
   */
  handleMouseOut_(e: Event): void;
}
