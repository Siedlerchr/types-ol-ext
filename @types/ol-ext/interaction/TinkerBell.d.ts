import { Pointer } from 'ol/interaction';
import { Color } from 'ol/color';

export interface Options {
    color: Color;
}
/**
 * @constructor
 * @extends {interaction.Pointer}
 *	@param {interaction.TinkerBell.options}  options flashlight param
 *		- color {color} color of the sparkles
 */
export class TinkerBell extends Pointer {
    constructor(options: Options);
    /** Set the map > start postcompose
     */
    setMap(): void;
    /** Postcompose function
     */
    postcompose_(): void;
}
