import { Pointer } from 'ol/interaction';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Color } from 'ol/color';
import { Pixel } from 'ol/pixel';
import { Map as _ol_Map_ } from 'ol';

export interface Options {
    color?: Color;
    fill?: Color;
    radius?: number;
}
/**
 * @constructor
 * @extends {ol_interaction_Pointer}
 * @param {ol.flashlight.options} flashlight options param
 *	@param {ol.Color} options.color light color, default transparent
 *  @param {ol.Color} options.fill fill color, default rgba(0,0,0,0.8)
 *  @param {number} options.radius radius of the flash
 */
export default class Flashlight extends Pointer {
    constructor(options?: Options);
    /** Set the map > start postcompose
     */
    setMap(map: _ol_Map_): void;
    /** Set flashlight radius
     *	@param {number} radius
     */
    setRadius(radius: number): void;
    /** Set flashlight color
     *	@param {flashlight.options} flashlight options param
     *		- color {Color} light color, default transparent
     *		- fill {Color} fill color, default rgba(0,0,0,0.8)
     */
    setColor(options?: {
        color?: Color;
        fill?: Color;
    }): void;
    /** Set position of the flashlight
    *	@param {Pixel|MapBrowserEvent<UIEvent>}
     */
    setPosition(e: Pixel | MapBrowserEvent<UIEvent>): void;

}
