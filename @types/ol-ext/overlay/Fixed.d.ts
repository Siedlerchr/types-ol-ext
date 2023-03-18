import type { Coordinate } from 'ol/coordinate'
import type { Options as OverlayOptions } from 'ol/Overlay'
import Overlay from '../control/Overlay'

/**
 * @classdesc
 * An overlay fixed on the map.
 * Use setPosition(coord, true) to force the overlay position otherwise the position will be ignored.
 *
 * @example
 var popup = new ol_Overlay_Fixed();
 map.addOverlay(popup);
 popup.setposition(position, true);
 *
 * @constructor
 * @extends {ol_Overlay}
 * @api stable
 */
export default class Fixed extends Overlay {
  /**
   * @param {} options Extend Overlay options
   */
  constructor(options?: OverlayOptions);

  /** Prevent modifying position and use a force argument to force positionning.
   * @param {ol.coordinate} position
   * @param {boolean} force true to change the position, default false
   */
  setPosition(position: Coordinate, force?: boolean): void;

  /** Update position according the pixel position
   */
  updatePixelPosition(): void;
}
