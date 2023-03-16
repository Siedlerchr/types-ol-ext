import type { Feature } from 'ol'
import type { Coordinate } from 'ol/coordinate'
import type { Point, Polygon } from 'ol/geom'
import type { ProjectionLike } from 'ol/proj'
import type { Options as VectorSourceOptions } from 'ol/source/Vector'
import type VectorSource from 'ol/source/Vector'
import { BinBase } from './BinBase'

export interface Options extends VectorSourceOptions {
  source?: VectorSource;
  size?: number;
  geometryFunction?: (f: Feature) => Point;
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
   *  @param {function} [options.geometryFunction] Function that takes an ol.Feature as argument and returns an ol.geom.Point as feature's center.
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
