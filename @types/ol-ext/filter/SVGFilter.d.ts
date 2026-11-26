import Base from './Base'
import type SVGDefinition from '../util/SVGFilter'

/** Add a canvas Context2D SVG filter to a layer
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
 * @constructor
 * @requires ol.filter
 * @extends {ol_filter_Base}
 */
export default class SVGFilter extends Base {
  /**
   * @param {ol_ext_SVGFilter|Array<ol_ext_SVGFilter>} filters
   */
  constructor(filters?: SVGDefinition | SVGDefinition[]);

  /** Add a new svg filter
   * @param {ol.ext.SVGFilter} filter
   */
  addSVGFilter(filter: SVGDefinition): void;

  /** Remove a svg filter
   * @param {ol.ext.SVGFilter} filter
   */
  removeSVGFilter(filter: SVGDefinition): void;
}
