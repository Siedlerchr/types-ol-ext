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
    borderWidth?: number;
    margin?: number;
    formatCoord?: (coordinate: Coordinate, position: position) => string;
}

/**
 * Draw a graticule on the map.
 *
 * @constructor
 * @extends {contrCanvasBase}
 * @param {Object=} _ol_control_ options.
 *  @param {projectionLike} options.projection projection to use for the graticule, default EPSG:4326
 *  @param {number} options.maxResolution max resolution to display the graticule
 *  @param {Style} options.style Style to use for drawing the graticule, default black.
 *  @param {number} options.step step beetween lines (in proj units), default 1
 *  @param {number} options.stepCoord show a coord every stepCoord, default 1
 *  @param {number} options.spacing spacing beetween lines (in px), default 40px
 *  @param {number} options.borderWidth width of the border (in px), default 5px
 *  @param {number} options.margin margin of the border (in px), default 0px
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
