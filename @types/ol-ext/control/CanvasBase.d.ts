import { Map as _ol_Map_ } from 'ol';
import ol_control_Control from 'ol/control/Control';
import { Style, Stroke, Fill } from 'ol/style';
import { Options as ControlOptions } from 'ol/control/Control';

export interface Options extends ControlOptions {
    style?: Style;
}
export default class CanvasBase extends ol_control_Control {
    constructor(options?: Options);
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {_ol_Map_} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Get canvas overlay
     */
    getCanvas(map: _ol_Map_): HTMLCanvasElement;
    /** Set Style
     * @api
     */
    setStyle(style: Style): void;
    /** Get style
     * @api
     */
    getStyle(): Style;
    /** Get stroke
     * @api
     */
    getStroke(): Stroke;
    /** Get fill
     * @api
     */
    getFill(): Fill;
    /** Get stroke
     * @api
     */
    getTextStroke(): Stroke;
    /** Get text fill
     * @api
     */
    getTextFill(): Fill;
    /** Get text font
     * @api
     */
    getTextFont(): string;
}
