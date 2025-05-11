import type { Coordinate } from 'ol/coordinate'
import type { Extent } from 'ol/extent'
import type { Point, Polygon } from 'ol/geom'
import type { ProjectionLike } from 'ol/proj'
import type VectorSource from 'ol/source/Vector'
import { Options as VectorSourceOptions } from 'ol/source/Vector'
import type { Feature } from 'ol'
import { BinBase } from './BinBase'

export interface Options {
  source: VectorSource;
  size?: number;
  geometryFunction?: (f: Feature) => Point;
  flatAttributes?: (bin: Feature, features: Feature[]) => void;
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
   *  @param {(f: Feature) => Point} [options.geometryFunction] Function that takes an Feature as argument and returns an Point as feature's center.
   *  @param {(bin: Feature, features: Array<Feature>)} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
   */
  constructor(options?: Options);

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
  getGridExtent(proj: ProjectionLike): Extent;

  /** Overwrite Vector clear to fire clearstart / clearend event
   */
  clear(): void;
}
