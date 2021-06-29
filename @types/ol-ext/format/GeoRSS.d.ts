import { Object, Feature } from 'ol';
import { ProjectionLike } from 'ol/proj';
export interface Options {
    dataProjection?: ProjectionLike;
    featureProjetion?: ProjectionLike;
}
/** Feature format for reading data in the GeoRSS format.
 * @constructor GeoRSS
 * @extends {Object}
 * @param {*} options options.
 *  @param {ol.ProjectionLike} options.dataProjection Projection of the data we are reading. If not provided `EPSG:4326`
 *  @param {ol.ProjectionLike} options.featureProjection Projection of the feature geometries created by the format reader. If not provided, features will be returned in the dataProjection.
 */
export class GeoRSS extends Object {

    constructor(options?: Options);
    /**
     * Read a feature.  Only works for a single feature. Use `readFeatures` to
     * read a feature collection.
    *
    * @param {Node|string} source Source.
    * @param {*} options Read options.
    *  @param {ol.ProjectionLike} options.dataProjection Projection of the data we are reading. If not provided `EPSG:4326`
    *  @param {ol.ProjectionLike} options.featureProjection Projection of the feature geometries created by the format reader. If not provided, features will be returned in the dataProjection.
    * @return {ol.Feature} Feature or null if no feature read
    * @api
    */
    readFeature(source: Node | string, options?: Options): Feature | null;
    /**
     * Read all features.  Works with both a single feature and a feature
     * collection.
     *
     * @param {Document|Node|string} source Source.
     * @param {*} options Read options.
     *  @param {ol.ProjectionLike} options.dataProjection Projection of the data we are reading. If not provided `EPSG:4326`
     *  @param {ol.ProjectionLike} options.featureProjection Projection of the feature geometries created by the format reader. If not provided, features will be returned in the dataProjection.
     * @return {Array<ol.Feature>} Features.
     * @api
     */
    readFeatures(source: Document | Node | string, options?: Options): Feature[];
}


