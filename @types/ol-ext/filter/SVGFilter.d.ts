import Base from './Base';
/** Add a canvas Context2D SVG filter to a layer
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
 * @constructor
 * @requires ol.filter
 * @extends {ol_filter_Base}
 * @param {ol_ext_SVGFilter|Array<ol_ext_SVGFilter>} filters
 */
export class SVGFilter extends Base {
    constructor(filters?: SVGFilter | SVGFilter[]);
    /** Add a new svg filter
     * @param {ol.ext.SVGFilter} filter
     */
    addSVGFilter(filter: SVGFilter): void;
    /** Remove a svg filter
     * @param {ol.ext.SVGFilter} filter
     */
    removeSVGFilter(filter: SVGFilter): void;

}
