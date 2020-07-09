import { Pointer } from 'ol/interaction';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Color } from 'ol/color';
import { Pixel } from 'ol/pixel';

export interface Options {
    color: Color;
}
/**
     * @constructor
     * @extends {interaction.Pointer}
     *	@param {flashlight.options} flashlight options param
     *		- color {Color} light color, default transparent
     *		- fill {Color} fill color, default rgba(0,0,0,0.8)
     *		- radius {number} radius of the flash
     */
export default class Ripple extends Pointer {
    constructor(options: Options);
    /** Set the map > start postcompose
     */
    setMap(): void;
    /** Generate random rain drop
    *	@param {number} interval
     */
    rains(interval: number): void;
    /** Disturb water at specified point
    *	@param {Pixel|MapBrowserEvent}
     */
    rainDrop(e: Pixel | MapBrowserEvent): void;
    /** Postcompose function
     */
    postcompose_(): void;
}
