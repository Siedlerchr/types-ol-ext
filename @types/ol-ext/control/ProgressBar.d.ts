import Control, { Options as ControlOptions } from "ol/control/Control";
import { Layer } from "ol/layer";

export interface Options extends ControlOptions {
    className?: string;
    label?: string;
    layers?: Layer | Layer[]
}

/** A simple push button control
 * @constructor
 * @extends {ol_control_Control}
 * @param {Object=} options Control options.
 *  @param {String} [options.className] class of the control
 *  @param {String} [options.label] waiting label
 *  @param {ol_layer_Layer} [options.layers] a tile layer with tileload envents
 */
export default class ProgressBar extends Control {
    constructor(options?: Options);
    /** Set the control visibility
     * @param {Number} [n] progress percentage, a number beetween 0,1, default hide progress bar
     */
    setPercent(n?: number): void;
    /** Set waiting text
     * @param {string} label
     */
    setLabel(label: string): void;
    /** Use a list of tile layer to shown tile load
     * @param {ol_layer_Layer|Array<ol_layer_Layer>} layers a layer or a list of layer
     */
    setLayers(layers: Layer | Layer[]): void;
}
