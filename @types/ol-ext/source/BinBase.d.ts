import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Polygon, Point } from 'ol/geom';
import VectorSource, { Options as VectorOptions } from 'ol/source/Vector';

export interface Options extends VectorOptions {
    source?: VectorSource;
    listenChange?: boolean;
    geometryFunction?: (f: Feature) => Point;
    flatAttributes?: (bin: Feature, features: Feature[]) => void;
}
/** Abstract base class; normally only used for creating subclasses. Bin collector for data
/** Abstract base class; normally only used for creating subclasses. Bin collector for data
 * @constructor
 * @extends {ol.source.Vector}
 * @param {Object} options ol_source_VectorOptions + grid option
 *  @param {ol.source.Vector} options.source Source
 *  @param {boolean} options.listenChange listen changes (move) on source features to recalculate the bin, default true
 *  @param {fucntion} [options.geometryFunction] Function that takes an ol.Feature as argument and returns an ol.geom.Point as feature's center.
 *  @param {function} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
 */
export class BinBase extends VectorSource {
    constructor(options?: Options);
    /**
     * Get the bin that contains a feature
     * @param {Feature} f the feature
     * @return {Feature} the bin or null it doesn't exit
     */
    getBin(f: Feature | null): Feature;
    /** Get the grid geometry at the coord
     * @param {Coordinate} coord
     * @param {Object} attributes add key/value to this object to add properties to the grid feature
     * @returns {Polygon}
     * @api
     */
    getGridGeomAt(coord: Coordinate, attributes: { [key: string]: any }): Polygon;
    /** Get the bean at a coord
     * @param {Coordinate} coord
     * @param {boolean} create true to create if doesn't exit
     * @return {Feature} the bin or null it doesn't exit
     */
    getBinAt(coord: Coordinate, create: boolean): Feature;
    /** Clear all bins and generate a new one.
     */
    reset(): void;
    /**
     * Get features without circular dependencies (vs. getFeatures)
     * @return {Array<Feature>}
     */
    getGridFeatures(): Feature[];
    /** Set the flatAttribute function
    * @param {function} fn Function that takes a bin and the features it contains and aggragate the features in the bin attributes when saving
    */
    setFlatAttributesFn(fn: (bin: Feature, features: Feature[]) => void): void
    /**
     * Get the orginal source
     * @return {VectorSource}
     */
    getSource(): VectorSource;
    /** Overwrite Vector clear to fire clearstart / clearend event
     */
    clear(): void;
}
export default BinBase;
