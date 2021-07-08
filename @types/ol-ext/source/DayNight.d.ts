import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector';
import { Point } from 'ol/geom';

export interface Options extends VectorSourceOptions {
    time?: string | Date;
    step?: number;
}

/** DayNight source: a source to display day/night on a map
 * @constructor
 * @extends {ol.source.Vector}
 * @param {any} options Vector source options
 *  @param {string|Date} time source date time
 *  @param {number} step step in degree for coordinate precision
 */
export default class DayNight extends VectorSource {
    constructor(options?: Options);

    /** Set source date time
     * @param {string|Date} time source date time
     */
    setTime(time: string| Date): void
    /** Get night-day separation line
     * @param {string} time DateTime string, default yet
     * @param {string} options use 'line' to get the separation line, 'day' to get the day polygon, 'night' to get the night polygon or 'daynight' to get both polygon, default 'night'
     * @return {Array<ol.Point>|Array<Array<ol.Point>>}
     */
    getCoordinates(time?: string, options?: 'line' | 'day' | 'night' | 'daynight'): Point[] | Point[][]
}
