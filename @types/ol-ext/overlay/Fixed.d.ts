import Overlay from '../control/Overlay';
import { Coordinate } from 'ol/coordinate';
import { Options as OverlayOptions } from 'ol/Overlay';


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
* @param {} options Extend Overlay options
* @api stable
*/
export default class Fixed extends Overlay {
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
