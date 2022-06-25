import SVGFilter from '../SVGFilter';


export interface Options {
    id?: string;
    scale?: number;
    light?: number
}

/** Apply a paper filter on an image
 * @constructor
 * @requires ol.filter
 * @extends {ol_ext_SVGFilter}
 * @param {object} options
 *  @param {string} [options.id]
 *  @param {number} [options.scale=1]
 *  @param {number} [options.light=50] light option. 0: darker, 100: lighter
 */
export default class Paper extends SVGFilter {
    constructor(options?: Options);
    /** Set filter light
     * @param {number} light light option. 0: darker, 100: lighter
     */
    setLight(light: number): void;
}
