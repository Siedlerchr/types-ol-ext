import { Style, Stroke, Fill } from 'ol/style';
import { Geometry } from 'ol/geom';

export interface Options {
    stroke?: Stroke;
    fill?: Fill;
    scale?: number;
    geometry?: Geometry
}
/** Profile style
 * Draw a profile on the map
 * @extends {ol_style_Style}
 * @constructor
 * @param {Object} options
 *  @param {ol.style.Stroke} options.stroke
 *  @param {ol.style.Fill} options.fill
 *  @param {number} options.scale z scale
 *  @param {number} options.zIndex
 *  @param {ol.geom.Geometry} options.geometry
 */
export default class Profile extends Style {
    constructor(options?: Options);
    /** Set style stroke
     * @param {ol.style.Stroke}
     */
    setStroke(stroke: Stroke): void;
    /** Get style stroke
     * @return {ol.style.Stroke}
     */
    getStroke(): Stroke;
    /** Set style stroke
     * @param {ol.style.Fill}
     */
    setFill(fill: Fill): void;
    /** Get style stroke
     * @return {ol.style.Fill}
     */
    getFill(): Fill;
    /** Set z scale
     * @param {number}
     */
    setScale(sc: number): void;
    /** Get z scale
     * @return {number}
     */
    getScale(): number;

}
