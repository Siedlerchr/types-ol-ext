import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';
import { ProjectionLike } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';

export interface Options {
    source: VectorSource;
    Size?: number;
}
/** A source for grid binning
 * @constructor
 * @extends {VectorSource}
 * @param {Object} options VectorSourceOptions + grid option
 *  @param {VectorSource} options.source Source
 *  @param {number} [options.Size] Size of the grid in meter, default 200m
 *  @param {(f: Feature) => Point} [options.geometryFunction] Function that takes an Feature as argument and returns an Point as feature's center.
 *  @param {(bin: Feature, features: Array<Feature>)} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
 */
export default class GridBin extends VectorSource {
    constructor(options: Options);
    /** Set grid projection
     * @param {ProjectionLike} proj
     */
    setGridProjection(proj: ProjectionLike): void;
    /** Set grid Size
     * @param {number} Size
     */
    setSize(Size: number): void;
    /** Get the grid geometry at the coord
     * @param {Coordinate} coord
     * @returns {Polygon}
     * @api
     */
    getGridGeomAt(coord: Coordinate): Polygon;
    /** Overwrite Vector clear to fire clearstart / clearend event
     */
    clear(): void;
}
