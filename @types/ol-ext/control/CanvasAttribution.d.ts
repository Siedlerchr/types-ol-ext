import { Map as _ol_Map_ } from 'ol';
import Attribution from 'ol/control/Attribution';
import { Style } from 'ol/style';
import {Options as AttributionOptions} from 'ol/control/Attribution'

export interface Options extends AttributionOptions {
    style?: Style;
    canvas?: boolean
}
/**
 * @classdesc
 *   OpenLayers 3 Attribution Control integrated in the canvas (for jpeg/png export purposes).
 * @see http://www.kreidefossilien.de/webgis/dokumentation/beispiele/export-map-to-png-with-scale
 *
 * @constructor
 * @extends ol_control_Attribution
 * @param {Object=} options extend the ol_control_Attribution options.
 * 	@param {ol_style_Style} options.style  option is usesd to draw the text.
 *  @paream {boolean} [options.canvas=false] draw on canvas
 */
export default class CanvasAttribution extends Attribution {
    constructor(options?: Options);
    /**
     * Draw attribution on canvas
     * @param {boolean} b draw the attribution on canvas.
     */
    setCanvas(b: boolean): void;
    /**
     * Change the control style
     * @param {Style} style
     */
    setStyle(style: Style): void;
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
}
