import { Map as _ol_Map_ } from 'ol';
import { Stroke, Style, Fill } from 'ol/style';
import CanvasBase from './CanvasBase';
import { Options as ControlOptions } from 'ol/control/Control';
export interface Options extends ControlOptions {
    className?: string;
    image?: HTMLImageElement | string;
    src?: string;
    rotateVithView?: boolean;
    style?: Stroke | Style; //incompatible with CanvasBaseOptions, so we extends control options
}
/**
 * Draw a compass on the map. The position/Size of the control is defined in the css.
 *
 * @constructor
 * @extends {contrCanvasBase}
 * @param {Object=} options Control options. The style {Stroke} option is usesd to draw the text.
 *  @param {string} options.className class name for the control
 *  @param {Image} options.image an image, default use the src option or a default image
 *  @param {string} options.src image src, default use the image option or a default image
 *  @param {boolean} options.rotateVithView rotate vith view (false to show watermark), default true
 *  @param {style.Stroke} options.style style to draw the lines, default draw no lines
 */
export default class Compass extends CanvasBase {
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
    getCanvas(): HTMLCanvasElement;
    /** Set Style
     * @api
     */
    setStyle(): void;
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
    /** Set compass image
     * @param {Image|string} [img=default] the image or an url or 'compact' or 'default'
     */
    setImage(img: HTMLImageElement | string | 'compact' | 'default'): void
}
