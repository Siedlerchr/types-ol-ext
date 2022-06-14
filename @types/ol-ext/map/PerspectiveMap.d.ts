import Map, { Options as MapOptions } from 'ol/Map';
import { Condition } from 'ol/events/condition';

export interface Options extends MapOptions {
    tiltCondition?: Condition
}

/** A map with a perspective
 * @constructor
 * @extends {ol.Map}
 * @fires change:perspective
 * @param {olx.MapOptions=} options
 *  @param {ol.events.condition} tiltCondition , default altKeyOnly
 */
export class PerspectiveMap extends Map {
    constructor(options?: MapOptions);
    /** Get pixel ratio for the map
     */
    getPixelRatio(): number;
    /** Set perspective angle
     * @param {number} angle the perspective angle 0 (vertical) - 30 (max), default 0
     * @param {*} options
     *  @param {number} options.duration The duration of the animation in milliseconds, default 500
     *  @param {function} options.easing The easing function used during the animation, defaults to ol.easing.inAndOut).
     */
    setPerspective(angle?: number, options?: {
        duration?: number;
        easing?: ((p0: number) => number);
    }): void;


    /** Get map full teansform matrix3D
     * @return {Array<Array<number>>}
     */
    getMatrix3D(compute: any): number[][];
    /** Get pixel at screen from coordinate.
     * The default getPixelFromCoordinate get pixel in the perspective.
     * @param {ol.coordinate} coord
     * @param {ol.pixel}
     */
    getPixelScreenFromCoordinate(coord: any): number[];
    /** Not working...
     *
     */
    getPixelFromPixelScreen(px: any): number[];
}
