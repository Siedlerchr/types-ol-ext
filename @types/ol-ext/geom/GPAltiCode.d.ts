import { ProjectionLike } from 'ol/proj';
import { Geometry } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';

export interface Options{
    projection?: ProjectionLike;
    apiKey?: string
    sampling?: number;
    samplingDist?: number;
    success?: (result: Geometry ) => void;
    error?: (error: any) => void;
}
/** French Geoportail alti coding
 *
 * @param {ol.geom.Geometry} geom
 * @param {Object} options
 *  @param {ol/proj~ProjectionLike} [options.projection='EPSG:3857'] geometry projection, default 'EPSG:3857'
 *  @param {string} [options.apiKey='choisirgeoportail'] Geoportail API key
 *  @param {number} [options.sampling=0] number of resulting point, max 5000, if none keep input points or use samplingDist
 *  @param {number} [options.samplingDist=0] distance for sampling the line or use sampling if lesser
 *  @param {string} options.success a function that takes the resulting XYZ geometry
 *  @param {string} options.error
 */
export function ol_geom_GPAltiCode(geom: Geometry, options: Options): void;
/** Calculate elevation on coordinates or on a set of coordinates
 * @param {ol.coordinate|Array<ol.coordinate>} coord coordinate or an array of coordinates
 * @param {Object} options
 *  @param {ol/proj~ProjectionLike} [options.projection='EPSG:3857'] geometry projection, default 'EPSG:3857'
 *  @param {string} [options.apiKey='choisirgeoportail'] Geoportail API key
 *  @param {string} options.success a function that takes the resulting XYZ coordinates
 *  @param {string} options.error
 */
export function ol_coordinate_GPAltiCode(coord: Coordinate | Coordinate[], options: {
    projection?: ProjectionLike,
    apiKey?: string,
    success?: (g: Coordinate) => void,
    error?: (e: any) => void
}): void;
