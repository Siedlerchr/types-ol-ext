import type { Coordinate } from 'ol/coordinate'
import type { ProjectionLike } from 'ol/proj'
import type { Extent } from 'ol/extent'
import type Polygon from 'ol/geom/Polygon'
import BaseObject from 'ol/Object'

export interface Options {
  size?: number;
}

/**
 * French INSEE grids
 * @classdesc a class to compute French INSEE grids, ie. fix area (200x200m) square grid,
 * based appon EPSG:3035
 *
 * @requires proj4
 * @constructor
 * @extends {Object}

 */
export default class InseeGrid extends BaseObject {
  /**
   * @param {Object} [options]
   *  @param {number} [options.size] grid size in meter, default 200 (200x200m)
   */
  constructor(options?: Options);

  /** Grid Extent (in EPSG:3035)
   */
  static extent: Extent

  /** Get the grid Extent
   * @param {proj.ProjLike} [proj='EPSG:3857']
   */
  getExtent(proj?: ProjectionLike): Extent;

  /** Get grid geom at coord
   * @param {Coordinate} coord
   * @param {proj.ProjLike} [proj='EPSG:3857']
   */
  getGridAtCoordinate(coord: Coordinate, proj?: ProjectionLike): Polygon;
}
