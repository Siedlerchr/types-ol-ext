import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { Point, Polygon } from 'ol/geom';
import { ProjectionLike } from 'ol/proj';
import {BinBase} from './BinBase';
import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector';
import { Feature } from 'ol';

export interface Options {
    source: VectorSource;
    Size?: number;
    geometryFunction?: (f: Feature) => Point;
    flatAttributes?: (bin: Feature, features: Feature[]) => void;
}
/** A source for INSEE grid
 * @constructor
 * @extends {VectorSource}
 * @param {Object} options VectorSourceOptions + grid option
 *  @param {VectorSource} options.source Source
 *  @param {number} [options.Size] Size of the grid in meter, default 200m
 *  @param {(f: Feature) => Point} [options.geometryFunction] Function that takes an Feature as argument and returns an Point as feature's center.
 *  @param {(bin: Feature, features: Array<Feature>)} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
 */
export default class InseeBin extends BinBase {
    constructor(options?: Options);
    /** Set grid Size
     * @param {number} size
     */
    setSize(size: number): void;
    /** Get grid Size
     * @return {number} Size
     */
    getSize(): number;
    /** Get the grid geometry at the coord
     * @param {Coordinate} coord
     * @returns {Polygon}
     * @api
     */
    getGridGeomAt(coord: Coordinate): Polygon;
    /** Get grid Extent
     * @param {ProjectionLike} proj
     * @return {Extent}
     */
    getGridExtent(proj: ProjectionLike): Extent;
    /** Overwrite Vector clear to fire clearstart / clearend event
     */
    clear(): void;
}
