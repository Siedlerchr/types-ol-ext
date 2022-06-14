import SVGFilter from '../SVGFilter';



/** Apply a sobel filter on an image
 * @constructor
 * @requires ol.filter
 * @extends {ol_ext_SVGFilter}
 * @param {object} options
 *  @param {string} [options.id]
 *  @param {number} [options.scale=1]
 *  @param {number} [options.ligth=50] light option. 0: darker, 100: lighter
 */
export default class SVGFilterPaper extends SVGFilter {
    constructor(options: any);
    /** Set filter light
     * @param {number} light light option. 0: darker, 100: lighter
     */
    setLight(light: number): void;
}
