import type { Coordinate } from 'ol/coordinate'
import type Feature from 'ol/Feature'
import type { Geometry } from 'ol/geom'
import type VectorSource from 'ol/source/Vector'
import BinBase from './BinBase'
import type { Options as BinBaseOptions } from './BinBase'

export interface Options extends BinBaseOptions {
  binSource?: VectorSource;
  size?: number;
}

/** A source that use a set of feature to collect data on it.
 * If a binSource is provided the bin is recalculated when features change.
 * @constructor
 * @extends {ol_source_BinBase}

 *
 */
export default class FeatureBin extends BinBase {
  /**
   * @param {Object} options ol_source_VectorOptions + grid option
   *  @param {ol.source.Vector} options.source source to collect in the bin
   *  @param {ol.source.Vector} options.binSource a source to use as bin collector, default none
   *  @param {Array<ol.Feature>} options.features the features, ignored if binSource is provided, default none
   *  @param {number} [options.size] size of the grid in meter, default 200m
   *  @param {function} [options.geometryFunction] Function that returns the feature's center coordinate.
   *  @param {function} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
   */
  constructor(options: Options);

  /** Set features to use as bin collector
   * @param features Features to use as bin collectors. Omit to clear them.
   */
  setFeatures(features?: Feature[]): void;

  /** Get the grid geometry at the coord
   * @param {Coordinate} coord
   * @param attributes Receives the properties of the matching collector.
   * @returns The matching collector's geometry, or null if no feature matches.
   * @api
   */
  getGridGeomAt(coord: Coordinate, attributes: { [key: string]: any }): Geometry | null | undefined;
}
