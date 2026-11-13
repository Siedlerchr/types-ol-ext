import type ol_format_GeoJSON from 'ol/format/GeoJSON'
import type { ProjectionLike } from 'ol/proj'
import type { Coordinate } from 'ol/coordinate'
import type { Feature } from 'ol'
import type { WriteOptions } from 'ol/format/Feature'
import type { Geometry } from 'ol/geom'

export declare type GeoJSONWithoutWriteGeometryObject = new (entries?: ReadonlyArray<ol_format_GeoJSON> | null)
  => { [P in Exclude<keyof ol_format_GeoJSON, 'writeGeometryObject' | 'writeFeatureObject' | 'writeFeaturesObject'>]: ol_format_GeoJSON[P] };

// TODO fix redeclare
// eslint-disable-next-line no-redeclare
declare const GeoJSONWithoutWriteGeometryObject: GeoJSONWithoutWriteGeometryObject

/** A compact coordinate string or nested array of coordinate strings. */
export type EncodedCoordinates = string | EncodedCoordinates[]
export type CoordinateTree = Coordinate | CoordinateTree[]
/** A compact geometry, with a numeric geometry type for non-points. */
export type GeoJSONXGeometry = string | [number, EncodedCoordinates]
/** A compact feature: geometry, property index/value pairs, and optional foreign members. */
export type GeoJSONXFeature = [GeoJSONXGeometry, unknown[]?, Record<string, unknown>?]

export interface GeoJSONXFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONXFeature[];
  decimals: number;
  hashProperties: string[];
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
  featureProjection?: ProjectionLike;
}

/** Feature format for reading and writing data in the GeoJSONX format.
 * @constructor
 * @extends {ol_format_GeoJSON}

 */
export default class GeoJSONX extends GeoJSONWithoutWriteGeometryObject {
  /**
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
  constructor(options?: Options);

  setLayout(layout: SupportedLayouts): void;

  getLayout(): SupportedLayouts

  /** Encode a number with the given number of decimal places. */
  encodeNumber(value: number, decimals?: number): string;
  /** Decode a number with the given number of decimal places. */
  decodeNumber(value: string, decimals?: number): number;

  /** Encode coordinates
   * @param {ol.coordinate|Array<ol.coordinate>} v
   * @return {string|Array<string>}
   * @api
   */
  encodeCoordinates(v: CoordinateTree, decimal?: number): EncodedCoordinates;

  /** Decode coordinates
   * @param {string|Array<string>}
   * @return {ol.coordinate|Array<ol.coordinate>} v
   * @api
   */
  decodeCoordinates(v: EncodedCoordinates, decimal?: number): CoordinateTree | null;

  /**
   * Encode a feature as a GeoJSONX Feature object.
   */
  readonly writeFeatureObject: ((feature: Feature, options?: WriteOptions) => GeoJSONXFeature)

  /**
   * Encode an array of features as a GeoJSONX object.
   * Hacky workaround for https://github.com/microsoft/TypeScript/issues/38496
   */
  readonly writeFeaturesObject: (features: Feature[], options?: WriteOptions) => GeoJSONXFeatureCollection

  /** s
   * Encode a geometry as a GeoJSONX object.
   *
   */
  writeGeometryObject(geometry: Geometry, opt_options?: WriteOptions): GeoJSONXGeometry
}
