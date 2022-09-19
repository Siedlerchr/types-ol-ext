import { Pointer } from 'ol/interaction';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Pixel } from 'ol/pixel';
import { Layer } from 'ol/layer';

export interface Options {
    layer?: Layer;
    radius?: number;
    interval?: number;
}
/**
 * @constructor
 * @extends {ol_interaction_Pointer}
 * @param {*} options
 *  @param {ol/layer/Layer} options.layer layer to animate
 *  @param {number} options.radius raindrop radius
 *  @param {number} options.interval raindrop interval (in ms), default 1000
 */
export default class Ripple extends Pointer {
    constructor(options?: Options);
    /** Set the map > start postcompose
     */
    setMap(): void;
    /** Generate random rain drop
    *	@param {number} interval
     */
    rains(interval: number): void;
    /** Disturb water at specified point
    *	@param {Pixel|MapBrowserEvent<UIEvent>}
     */
    rainDrop(e: Pixel | MapBrowserEvent<UIEvent>): void;

}
