import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Geometry, LineString, Polygon } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
import { Feature } from 'ol';
import { Style } from 'ol/style';

export interface Options {
    type?: string;
    style: Style | Style[];
    sketchStyle?: Style | Style[];
}

/** A sketch layer used as overlay to handle drawing sketch (helper for drawing tools)
 * @constructor
 * @extends {ol/layer/Vector}
 * @fires drawstart
 * @fires drawend
 * @fires drawabort
 * @param {*} options
 *  @param {string} options.type Geometry type, default LineString
 *  @param {ol_style_Style|Array<ol_style_Style>} options.style Drawing style
 *  @param {ol_style_Style|Array<ol_style_Style>} options.sketchStyle Sketch style
 */
export default class SketchOverlay extends VectorLayer<VectorSource<Geometry>>{
    constructor(options: any);
    /** Set geometry type
     * @param {string} type Geometry type
     * @return {string} the current type
     */
    setGeometryType(type: string): string;
    /** Get geometry type
     * @return {string} Geometry type
     */
    getGeometryType(): string;
    /** Add a new Point to the sketch
     * @param {ol.coordinate} coord
     * @return {boolean} true if point has been added, false if same coord
     */
    addPoint(coord: Coordinate): boolean;

    /** Remove the last Point from the sketch
     */
    removeLastPoint(): void;
    /** Start a new drawing
        * @param {*} options
        *  @param {string} type Geometry type, default the current type
        *  @param {Array<Coordinate>} coordinates a list of coordinates to extend
        *  @param {Feature} feature a feature to extend (LineString or Polygon only)
        *  @param {boolean} atstart extent coordinates or feature at start, default false (extend at end)
        */
    startDrawing(options?: {
        type?: string,
        coordinates?: Coordinate[],
        feature?: Feature<LineString> | Feature<Polygon>,
        atstart?: boolean
    }): void;

    /** Finish drawing
     * @return {Feature} the drawed feature
     */
    finishDrawing(valid?: boolean): Feature;
    /** Abort drawing
     */
    abortDrawing(): void;
    /** Set current position
     * @param {ol.coordinate} coord
     */
    setPosition(coord: Coordinate): void;
    /** Get current position
     * @return {ol.coordinate}
     */
    getPosition(): Coordinate;
    /** Draw/refresh link
     */
    drawLink(): void;
    /** Get current feature
     */
    getFeature(): any;
    /** Draw/refresh sketch
     */
    drawSketch(): void;
}
