import type { Map as _ol_Map_ } from 'ol'
import { Overlay } from 'ol'
import type { Positioning } from 'ol/Overlay'
import type { MapOptions } from 'ol/Map'
import type { ProjectionLike } from 'ol/proj'

/** Options for the magnifier map and overlay. */
export interface Options {
  /** Position of the magnifier relative to its coordinate. */
  positioning?: Positioning;
  /** External container for the magnifier map. */
  target?: MapOptions['target'];
  /** Layers displayed by the magnifier map. */
  layers?: MapOptions['layers'];
  /** Projection of the magnifier view. */
  projection?: ProjectionLike;
  /** Difference between the magnifier and main map zoom. */
  zoomOffset?: number;
}

/**
 * @classdesc
 *  The Magnify overlay add a "magnifying glass" effect to an OL3 map that displays
 *  a portion of the map in a different zoom (and actually display different content).
 *
 * @constructor
 * @extends {Overlay}
 * @api stable
 */
export default class Magnify extends Overlay {
  /**
   * @param {olx.OverlayOptions} options Overlay options
   */
  constructor(options: Options);

  /**
   * Set the map instance the overlay is associated with.
   * @param {Map} map The map instance.
   */
  setMap(map: _ol_Map_): void;

  /** Get the magnifier map
   *  @return {_ol_Map_}
   */
  getMagMap(): _ol_Map_;

  /** Refresh the magnifier view. */
  refresh(): void;

  /** Magnify is active
   *  @return {boolean}
   */
  getActive(): boolean;

  /** Activate or deactivate
   *  @param {boolean} active
   */
  setActive(active: boolean): boolean;
}
