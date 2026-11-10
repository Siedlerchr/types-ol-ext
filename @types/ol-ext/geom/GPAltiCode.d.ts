import type { ProjectionLike } from 'ol/proj'
import type { Point, LineString } from 'ol/geom'
import type { Coordinate } from 'ol/coordinate'
import type { AjaxEvent } from '../util/Ajax'

export interface Options<Result = Point | LineString> {
  projection?: ProjectionLike;
  sampling?: number;
  samplingDist?: number;
  minZ?: number;
  success?: (result: Result) => void;
  error?: (error: AjaxEvent) => void;
}

/** French Geoportail alti coding
 *
 * @param {Geometry} geom
 * @param {Object} options
 *  @param {ol/proj~ProjectionLike} [options.projection='EPSG:3857'] geometry projection, default 'EPSG:3857'
 *  @param {number} [options.sampling=0] number of resulting point, max 5000, if none keep input points or use samplingDist
 *  @param {number} [options.samplingDist=0] distance for sampling the line or use sampling if lesser
 *  @param {string} options.success a function that takes the resulting XYZ geometry
 *  @param {string} options.error
 */
export function ol_geom_GPAltiCode(geom: Point, options?: Options<Point>): void;
export function ol_geom_GPAltiCode(geom: LineString, options?: Options<LineString>): void;

/** Calculate elevation on coordinates or on a set of coordinates
 * @param {ol.coordinate|Array<ol.coordinate>} coord coordinate or an array of coordinates
 * @param {Object} options
 *  @param {ol/proj~ProjectionLike} [options.projection='EPSG:3857'] geometry projection, default 'EPSG:3857'
 *  @param {string} options.success a function that takes the resulting XYZ coordinates
 *  @param {string} options.error
 */
export function ol_coordinate_GPAltiCode(coord: Coordinate, options?: Omit<Options<Coordinate>, 'minZ'>): void;
export function ol_coordinate_GPAltiCode(coord: Coordinate[], options?: Omit<Options<Coordinate[]>, 'minZ'>): void;
