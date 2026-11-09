import type { Map as _ol_Map_ } from 'ol'
import type { Coordinate } from 'ol/coordinate'
import { Interaction } from 'ol/interaction'

/** Map methods installed by importing the synchronize interaction. */
export type SynchronizedMap = _ol_Map_ & {
  showTarget(coordinate?: Coordinate): void;
  hideTarget(): void;
}

export interface Options {
  maps?: _ol_Map_[];
  active?: boolean;
}

/** Interaction synchronize
 * @constructor
 * @extends {Interaction}

 */
export default class Synchronize extends Interaction {
  /**
   * @param {*} options
   *  @param {Array<_ol_Map_>} options maps An array of maps to synchronize with the map of the interaction
   */
  constructor(options?: Options);

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_ | null): void;

  /** Auto activate/deactivate controls in the bar
   * @param {boolean} b activate/deactivate
   */
  setActive(b: boolean): void;

  /** Synchronize the maps
   */
  syncMaps(): void;
}
