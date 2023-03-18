import { Map as _ol_Map_ } from 'ol'
import type { Layer } from 'ol/layer'
import type { Options } from './LayerSwitcher'
import LayerSwitcher from './LayerSwitcher'

/**
 * OpenLayers Layer Switcher Contr
 *
 * @constructor
 * @extends {LayerSwitcher}
 */
export default class LayerPopup extends LayerSwitcher {
  /**
   * @param {Object=} options Control options.
   */
  constructor(options?: Options);

  /** Render a list of layer
   * @param {Element} element to render
   * @layers {Array<layer>} list of layer to show
   * @api stable
   */
  drawList(ul: Element, layers: Layer[]): void;
}
