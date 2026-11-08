import type { Feature } from 'ol'
import type { Coordinate } from 'ol/coordinate'
import type { Polygon } from 'ol/geom'
import type { ProjectionLike } from 'ol/proj'
import type { Options as VectorSourceOptions } from 'ol/source/Vector'
import type VectorSource from 'ol/source/Vector'
import BinBase from './BinBase'

export interface Options extends VectorSourceOptions<Feature> {
  source: VectorSource;
  size?: number;
  circle?: boolean;
  gridProjection?: ProjectionLike;
  listenChange?: boolean;
  geometryFunction?: (f: Feature) => Coordinate;
  flatAttributes?: (bin: Feature, features: Feature[]) => void;
}

/** A source for grid binning
 * @constructor
 * @extends {ol.source.Vector}

 */
export default class GridBin extends BinBase {
  /**
   * @param {Object} options ol_source_VectorOptions + grid option
   *  @param {ol.source.Vector} options.source Source
   *  @param {number} [options.size] size of the grid in meter, default 200m
   *  @param {function} [options.geometryFunction] Function that returns the feature's center coordinate.
   *  @param {function} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
   */
  constructor(options: Options);

  /** Set grid projection
   * @param {ProjectionLike} proj
   */
  setGridProjection(proj: ProjectionLike): void;

  /** Set grid size
   * @param {number} size
   */
  setSize(siue: number): void;

  /** Set whether grid bins use a circle shape. */
  setCircle(circle: boolean): void;

  /** Get the grid geometry at the coord
   * @param {Coordinate} coord
   * @returns {Polygon}
   * @api
   */
  getGridGeomAt(coord: Coordinate): Polygon;

}
