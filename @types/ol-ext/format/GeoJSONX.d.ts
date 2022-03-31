import ol_format_GeoJSON, { GeoJSONGeometry } from 'ol/format/GeoJSON';
import { ProjectionLike } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Feature } from 'ol';
import { WriteOptions } from 'ol/format/Feature';
import { Geometry } from 'ol/geom';
import { Feature as geojson_Feature, FeatureCollection } from 'geojson';


export declare type GeoJSONWithoutWriteGeometryObject = new (entries?: ReadonlyArray<ol_format_GeoJSON> | null)
    => { [P in Exclude<keyof ol_format_GeoJSON, 'writeGeometryObject'>]: ol_format_GeoJSON[P] };

declare const GeoJSONWithoutWriteGeometryObject: GeoJSONWithoutWriteGeometryObject;
export interface GeoJSONXFeature extends geojson_Feature {
    decimals: number;
    hashProperties: any[];
}
export interface GeoJSONXFeatureCollection extends FeatureCollection {
    decimals: number;
    hashProperties: any[];
}


export type SupportedLayouts = 'XY' | 'XYZ' | 'XYZM';
export interface Options {
    decimals?: number;
    deleteNullProperties?: boolean | any[];
    extended?: boolean;
    whiteList?: string[] | ((k: any) => boolean);
    blackList?: string[] | ((k: any) => boolean);
    layout?: SupportedLayouts;
    dataProjection?: ProjectionLike;
    featureProjeciton?: ProjectionLike;
}


/** Feature format for reading and writing data in the GeoJSONX format.
 * @constructor
 * @extends {ol_format_GeoJSON}
 * @param {*} options options.
 *  @param {number} options.decimals number of decimals to save, default 7 for EPSG:4326, 2 for other projections
 *  @param {boolean|Array<*>} options.deleteNullProperties An array of property values to remove, if false, keep all properties, default [null,undefined,""]
 *  @param {boolean|Array<*>} options.extended Decode/encode extended GeoJSON with foreign members (id, bbox, title, etc.), default false
 *  @param {Array<string>|function} options.whiteList A list of properties to keep on features when encoding or a function that takes a property name and retrun true if the property is whitelisted
 *  @param {Array<string>|function} options.blackList A list of properties to remove from features when encoding or a function that takes a property name and retrun true if the property is blacklisted
 *  @param {string} [options.layout='XY'] layout layout (XY or XYZ or XYZM)
 *  @param {ol.ProjectionLike} options.dataProjection Projection of the data we are reading. If not provided `EPSG:4326`
 *  @param {ol.ProjectionLike} options.featureProjection Projection of the feature geometries created by the format reader. If not provided, features will be returned in the dataProjection.
 */
export default class GeoJSONX extends GeoJSONWithoutWriteGeometryObject {
    constructor(options?: Options);

    setLayout(layout: SupportedLayouts): void;

    getLayout(): SupportedLayouts

    /** Encode coordinates
     * @param {ol.coordinate|Array<ol.coordinate>} v
     * @return {string|Array<string>}
     * @api
     */
    encodeCoordinates(v: Coordinate | Coordinate[], decimal?: number): string | string[];
    /** Decode coordinates
     * @param {string|Array<string>}
     * @return {ol.coordinate|Array<ol.coordinate>} v
     * @api
     */
    decodeCoordinates(v: string | string[], decimal?: number): Coordinate | Coordinate[];

    /**
   * Encode a feature as a GeoJSONX Feature object.
   */
    readonly writeFeatureObject: ((feature: Feature, options?: WriteOptions) => GeoJSONXFeature)
    /**
     * Encode an array of features as a GeoJSONX object.
     * Hacky workaround for https://github.com/microsoft/TypeScript/issues/38496
     */
    readonly writeFeaturesObject: (features: Feature[], options?: WriteOptions) => GeoJSONXFeatureCollection
    /**s
     * Encode a geometry as a GeoJSONX object.
     *
     */
    writeGeometryObject(geometry: Geometry, opt_options?: WriteOptions): string | string[]
}
