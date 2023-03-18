import { Map as _ol_Map_ } from 'ol'
import type { Layer } from 'ol/layer'
import type { Options } from './LayerSwitcher'
import LayerSwitcher from './LayerSwitcher'

/**
 * @classdesc OpenLayers Layer Switcher Control.
 * @require Layer.getPreview
 *
 * @constructor
 * @extends {LayerSwitcher}
 */
export default class LayerSwitcherImage extends LayerSwitcher {
  /**
   * @param {Object=} options Control options.
   */
  constructor(options?: Options);

  /** Render a list of layer
   * @param {Element} element to render
   * @layers {Array<Layer>} list of layer to show
   * @api stable
   */
  drawList(element: Element, layers: Layer[]): void;
}
