import type { InteractionOptions } from 'ol/interaction/Interaction'
import type { Coordinate } from 'ol/coordinate'
import type { Map as _ol_Map_, Feature } from 'ol'
import DragOverlay from './DragOverlay'

export interface Options extends InteractionOptions {
  className?: string;
  coordinate?: Coordinate;
}

/** A TouchCursor to select objects on hovering the cursor
 * @constructor
 * @extends {ol_interaction_DragOverlay}

 */
export default class TouchCursorSelect extends DragOverlay {
  /**
   * @param {olx.interaction.InteractionOptions} options Options
   *  @param {string} options.className cursor class name
   *  @param {ol.coordinate} options.coordinate position of the cursor
   */
  constructor(options?: Options);

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {_ol_Map_} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

  /** Get current selection
   * @return {ol.Feature|null}
   */
  getSelection(): Feature | null;

  /** Set position
   * @param {ol.coordinate} coord
   */
  setPosition(coord: Coordinate): void;

  /** Select feature
   * @param {ol.Feature|undefined} f a feature to select or select at the cursor position
   */
  select(f?: Feature | undefined): void;
}
