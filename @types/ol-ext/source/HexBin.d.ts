import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Point, Polygon } from 'ol/geom';
import HexagonLayout from '../render/HexGrid';
import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector';
import {BinBase} from './BinBase';

export interface Options extends VectorSourceOptions {
    source?: VectorSource;
    size?: number;
    origin?: Coordinate;
    layout?: HexagonLayout
    geometryFunction?: (f: Feature) => Point;
    flatAttributes?: (bin: Feature, features: Feature[]) => void;
}
/** A source for hexagonal binning
 * @constructor
 * @extends {ol.source.Vector}
 * @param {Object} options ol_source_VectorOptions + ol.HexGridOptions
 *  @param {ol.source.Vector} options.source Source
 *  @param {number} [options.size] size of the hexagon in map units, default 80000
 *  @param {ol.coordinate} [options.origin] origin of the grid, default [0,0]
 *  @param {HexagonLayout} [options.layout] grid layout, default pointy
 *  @param {function} [options.geometryFunction] Function that takes an ol.Feature as argument and returns an ol.geom.Point as feature's center.
 *  @param {function} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
 */
export default class HexBin extends BinBase {
    constructor(options?: Options);

    /** Get the hexagon geometry at the coord
     * @param {Coordinate} coord
     * @returns {Polygon}
     * @api
     */
    getGridGeomAt(coord: Coordinate): Polygon;
    /**	Set the inner HexGrid Size.
     * 	@param {number} newSize
     * 	@param {boolean} noreset If true, reset will not be called (It need to be called through)
     */
    setSize(newSize: number, noreset: boolean): void;
    /**	Get the inner HexGrid Size.
     * 	@return {number}
     */
    getSize(): number;
    /**	Set the inner HexGrid layout.
     * 	@param {import('../render/HexGrid').HexagonLayout} newLayout
     * 	@param {boolean} noreset If true, reset will not be called (It need to be called through)
     */
    setLayout(newLayout: HexagonLayout, noreset: boolean): void;
    /**	Get the inner HexGrid layout.
     */
    getLayout(): HexagonLayout;
    /**	Set the inner HexGrid origin.
     * 	@param {Coordinate} newLayout
     * 	@param {boolean} noreset If true, reset will not be called (It need to be called through)
     */
    setOrigin(newLayout: Coordinate, noreset: boolean): void;
    /**	Get the inner HexGrid origin.
     * 	@return {Coordinate}
     */
    getOrigin(): Coordinate;
    /**
     * Get hexagons without circular dependencies (vs. getFeatures)
     * @return {Array<Feature>}
     */
    getHexFeatures(): Feature[];

    /** Overwrite Vector clear to fire clearstart / clearend event
     */
    clear(): void;
}
