import { Map as _ol_Map_ } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Vector as VectorSource } from 'ol/source';
import { Style } from 'ol/style';
import GeometryType from 'ol/geom/GeometryType';
import CenterTouch from './CenterTouch';

export interface Options {
    source?: VectorSource;
    type: typeof GeometryType.POINT | typeof GeometryType.LINE_STRING | typeof GeometryType.POLYGON;
    tap?: boolean;
    style?: Style | Style[];
    sketchStyle?: Style | Style[];
    targetStyle?: Style | Style[];
    composite?: string;
}
/** Interaction DrawTouch : pointer is deferred to the center of the viewport and a target is drawn to materialize this point
 * The interaction modifies map browser event coordinate and pixel properties to force pointer on the viewport center to any interaction that them.
 * @constructor
 * @fires drawstart
 * @fires drawend
 * @fires drawabort
 * @extends {ol_interaction_CenterTouch}
 * @param {olx.interaction.DrawOptions} options
 *  @param {ol.source.Vector | undefined} options.source Destination source for the drawn features.
 *  @param {ol.geom.GeometryType} options.type Drawing type ('Point', 'LineString', 'Polygon') not ('MultiPoint', 'MultiLineString', 'MultiPolygon' or 'Circle'). Required.
 *	@param {boolean} [options.tap=true] enable point insertion on tap, default true
 *  @param {ol.style.Style|Array<ol.style.Style>} [options.style] Drawing style
 *  @param {ol.style.Style|Array<ol.style.Style>} [options.sketchStyle] Sketch style
 *  @param {ol.style.Style|Array<ol.style.Style>} [options.targetStyle] a style to draw the target point, default cross style
 *  @param {string} [options.composite] composite operation : difference|multiply|xor|screen|overlay|darken|lighter|lighten|...
 */export default class DrawTouch extends CenterTouch {
    constructor(options?: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Start drawing and add the sketch feature to the target layer.
    * The interaction.Draw.EventType.DRAWSTART event is dispatched before inserting the feature.
     */
    startDrawing(): void;
      /** Set geometry type
     * @param {ol.geom.GeometryType} type
     */
    /** Get geometry type
    * @return {GeometryType}
     */
    getGeometryType(): typeof GeometryType;
    /** Start drawing and add the sketch feature to the target layer.
    * The interaction.Draw.EventType.DRAWEND event is dispatched before inserting the feature.
     */
    finishDrawing(): void;
    /** Add a new Point to the drawing
     */
    addPoint(): void;
    /** Remove last point of the feature currently being drawn.
     */
    removeLastPoint(): void;
    /**
     * Activate or deactivate the interaction.
     * @param {boolean} active Active.
     * @observable
     * @api
     */
    setActive(active: boolean): void;
    /** Get the position of the target
     * @return {Coordinate}
     */
    getPosition(): Coordinate;
}
