import { Map as _ol_Map_ } from 'ol';
import { Layer } from 'ol/layer';
import LayerSwitcher, {Options} from './LayerSwitcher';
/**
 * @classdesc OpenLayers Layer Switcher Control.
 * @require Layer.getPreview
 *
 * @constructor
 * @extends {LayerSwitcher}
 * @param {Object=} options Control options.
 */
export default class LayerSwitcherImage extends LayerSwitcher {
    constructor(options?: Options);
    /** Render a list of layer
     * @param {Element} element to render
     * @layers {Array<Layer>} list of layer to show
     * @api stable
     */
    drawList(element: Element, layers: Layer[]): void;

}
