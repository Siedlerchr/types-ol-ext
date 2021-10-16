import GeoJSONX,  {Options } from './GeoJSONX';

/** Feature format for reading and writing data in the GeoJSONP format,
 * using Polyline Algorithm to encode geometry.
 * @constructor
 * @extends {ol_format_GeoJSONX}
 * @param {*} options options.
 *  @param {number} options.decimals number of decimals to save, default 6
 *  @param {ol.ProjectionLike} options.dataProjection Projection of the data we are reading. If not provided `EPSG:4326`
 *  @param {ol.ProjectionLike} options.featureProjection Projection of the feature geometries created by the format reader. If not provided, features will be returned in the dataProjection.
 */
export default class GeoJSONP extends GeoJSONX {
    constructor(options?: Options);
}
