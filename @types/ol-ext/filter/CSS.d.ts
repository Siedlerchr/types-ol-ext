import { Layer } from 'ol/layer';
import Base from './Base';

export interface Options {
  blend?: string;
  filter?: string;
  display?: boolean;
}

/** Add a mix-blend-mode CSS filter (not working with IE or ol<6).
 * Add a className to the layer to apply the filter to a specific layer.
 * With ol<6 use {@link ol_filter_Composite} instead.
 * Use {@link ol_layer_Base#addFilter}, {@link ol_layer_Base#removeFilter} or {@link ol_layer_Base#getFilters}
 * @constructor
 * @extends {ol.Object}
 * @param {Object} options
 *  @param {string} options.blend mix-blend-mode to apply (as {@link https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode CSS property})
 *  @param {string} options.filter filter to apply (as {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter CSS property})
 *  @param {boolan} options.display show/hide layer from CSS (but keep it in layer list)
 */
export class ol_filter_CSS extends Base {
  constructor(options?: Options);
  /** Modify blend mode
   * @param {string} blend mix-blend-mode to apply (as {@link https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode CSS property})
   */
  setBlend(blend: string): void;
  /** Modify filter mode
   * @param {string} filter filter to apply (as {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter CSS property})
   */
  setFilter(filter: string): void;
  /** Add CSS filter to the layer
   * @param {ol_layer_Base} layer
   */
  addToLayer(layer: Layer): void;
  /** Remove CSS filter from the layer
   * @param {ol_layer_Base} layer
   */
  removeFromLayer(layer: Layer): void;

  /** Modify layer visibility (but keep it in the layer list)
   * @param {boolean} display
   */
  setDisplay(display: boolean): void;
}
