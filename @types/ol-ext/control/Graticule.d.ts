import { Map } from 'ol';
import CanvasBase from './CanvasBase';
import { Fill, Stroke, Style } from 'ol/style';
import { Options as ControlOptions } from 'ol/control/Control';
import { ProjectionLike } from 'ol/proj';
import { position } from './control'
import { Coordinate } from 'ol/coordinate';
export interface Options extends ControlOptions {
    projection?: ProjectionLike;
    maxResolution?: number;
    style?: Style;
    step?: number;
    stepCoord?: number;
    spacing?: number;
    intervals?: number[];
    precison?: number;
    borderWidth?: number;
    margin?: number;
    formatCoord?: (coordinate: Coordinate, position: position) => string;
}

/** Draw a graticule on the map.
 * @constructor
 * @author mike-000 https://github.com/mike-000
 * @author Jean-Marc Viglino https://github.com/viglino
 * @extends {ol_control_CanvasBase}
 * @param {Object=} _ol_control_ options.
 *  @param {ol.projectionLike} options.projection projection to use for the graticule, default EPSG:4326
 *  @param {number} options.maxResolution max resolution to display the graticule
 *  @param {ol_style_Style} options.style Style to use for drawing the graticule, default black.
 *  @param {number} options.step step between lines (in proj units), default 1
 *  @param {number} options.stepCoord show a coord every stepCoord, default 1
 *  @param {number} options.spacing spacing between lines (in px), default 40px
 *  @param {Array<number>} options.intervals array (in desending order) of intervals (in proj units) constraining which lines will be displayed, default is no contraint (any multiple of step can be used)
 *  @param {number} options.precision precision interval (in proj units) of displayed lines, if the line interval exceeds this more calculations will be used to display curved lines more accurately
 *  @param {number} options.borderWidth width of the border (in px), default 5px
 *  @param {number} options.margin margin of the border (in px), default 0px
 *  @param {number} options.formatCoord a function that takes a coordinate and a position and return the formated coordinate
 */
export default class Graticule extends CanvasBase {
    constructor(options?: Options);
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {_ol_Map_} map Map.
     * @api stable
     */
    setMap(map: Map): void;
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
}
