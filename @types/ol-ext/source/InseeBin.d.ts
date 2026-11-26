import type { Coordinate } from 'ol/coordinate'
import type { Extent } from 'ol/extent'
import type { Polygon } from 'ol/geom'
import type { ProjectionLike } from 'ol/proj'
import BinBase from './BinBase'
import type { Options as BinBaseOptions } from './BinBase'

export interface Options extends BinBaseOptions {
  size?: number;
}

/** A source for INSEE grid
 * @constructor
 * @extends {VectorSource}

 */
export default class InseeBin extends BinBase {
  /**
   * @param {Object} options VectorSourceOptions + grid option
   *  @param {VectorSource} options.source Source
   *  @param {number} [options.size] size of the grid in meter, default 200m
   *  @param {function} [options.geometryFunction] Function that returns the feature's center coordinate.
   *  @param {(bin: Feature, features: Array<Feature>)} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
   */
  constructor(options: Options);

  /** Set grid size
   * @param {number} size
   */
  setSize(size: number): void;

  /** Get grid size
   * @return {number} size
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
  getGridExtent(proj?: ProjectionLike): Extent;
}
