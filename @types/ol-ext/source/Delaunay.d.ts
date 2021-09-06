import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector';
import { Coordinate } from 'ol/coordinate';
import { Feature } from 'ol';
import Polygon from 'ol/geom/Polygon';

export interface Options extends VectorSourceOptions {
    source?: VectorSource
}

export interface CircumCirlce {
    center: number[];
    radius: number;
}
/** Delaunay source
 * Calculate a delaunay triangulation from points in a source
 * @param {*} options extend ol/source/Vector options
 *  @param {ol/source/Vector} options.source the source that contains the points
 */
export default class Delauny extends VectorSource{
    constructor(options?: Options);

    /** Clear source (and points)
     * @param {boolean} opt_fast
     */
    clear(opt_fast: boolean): void;
    /** Add a new triangle in the source
     * @param {Array<ol/coordinates>} pts
     */
    _addTriangle(pts: Coordinate[]): void;
    /** Get nodes
     */
    getNodes(): Feature[];
    /** Get nodes source
     */
    getNodeSource(): VectorSource;

    /** Flipping algorithme: test new inserted triangle and flip
     */
    flipTriangles(): void;
    /** Test intersection beetween 2 segs
     * @param {Array<ol.coordinates>} d1
     * @param {Array<ol.coordinates>} d2
     * @return {bbolean}
     */
    intersectSegs(d1: Coordinate[], d2: Coordinate[]): boolean;
    /** Test pt is a triangle's node
     * @param {ol.coordinate} pt
     * @param {Array<ol.coordinate>} triangle
     * @return {boolean}
     */
    _ptInTriangle(pt: Coordinate, triangle: Coordinate[]): boolean;
    /** List points in a triangle (assume points get an id) for debug purposes
     * @param {Array<ol.coordinate>} pts
     * @return {String} ids list
     */
    listpt(pts: Coordinate[]): string;
    /** Test if coord is within triangle's circumcircle
     * @param {ol.coordinate} coord
     * @param {Array<ol.coordinate>} triangle
     * @return {boolean}
     */
    inCircle(coord: Coordinate, triangle: Coordinate[]): boolean;
    /** Calculate the circumcircle of a triangle
     * @param {Array<ol.coordinate>} triangle
     * @return {*}
     */
    getCircumCircle(triangle: Coordinate[]): CircumCirlce;
    /** Get triangles at a point
     */
    getTrianglesAt(coord: Coordinate): number[];

    /** Get Voronoi
     * @param {boolean} border include border, default false
     * @return { Array< ol.geom.Polygon > }
     */
    calculateVoronoi(border: boolean): Polygon[];
}
