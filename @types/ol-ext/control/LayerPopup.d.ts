import { Map as _ol_Map_ } from 'ol';
import { Layer } from 'ol/layer';
import LayerSwitcher from './LayerSwitcher';
import { Options, Tip } from 'ol-ext/control/LayerSwitcher';

/**
 * OpenLayers Layer Switcher Contr
 *
 * @constructor
 * @extends {contrLayerSwitcher}
 * @param {Object=} options Control options.
 */
export default class LayerPopup extends LayerSwitcher {
    constructor(options?: Options);

    /** Render a list of layer
     * @param {Element} element to render
     * @layers {Array<layer>} list of layer to show
     * @api stable
     */
    drawList(ul: Element, layers: Layer[]): void;

}
