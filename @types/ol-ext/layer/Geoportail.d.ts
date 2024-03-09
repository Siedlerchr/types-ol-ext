import type { Coordinate } from 'ol/coordinate'
import type Projection from 'ol/proj/Projection'
import type { Options as TileLayerOptions } from 'ol/layer/BaseTile'
import type { ProjectionLike } from 'ol/proj'
import Tile from 'ol/layer/Tile'
import type TileSource from 'ol/source/Tile'
import type { Options as GeoPortailOptions } from '../source/Geoportail'

export interface Options extends TileLayerOptions<TileSource> {
  baseLayer?: boolean,
  layer?: string;
  gpgKey?: string;
  projection?: ProjectionLike;
}

/** IGN's Geoportail WMTS layer definition
 * @constructor
 * @extends {ol.layer.Tile}
 */
export default class Geoportail extends Tile<TileSource> {
  // TODO unsure about the params!
  /**
   * @param {olx.layer.WMTSOptions=} options WMTS options if not defined default are used
   *  @param {string} options.layer Geoportail layer name
   *  @param {string} options.gppKey Geoportail API key or 'gpf' for new Geoplatform services, default use layer registered key
   *  @param {ol.projectionLike} [options.projection=EPSG:3857] projection for the extent, default EPSG:3857
   * @param {olx.source.WMTSOptions=} tileoptions WMTS options if not defined default are used
   */
  constructor(layer?: string | Options, options?: Options, tileoptions?: GeoPortailOptions);

  /** Standard IGN-GEOPORTAIL attribution
   */
  attribution: any

  /** Get service URL according to server url or standard url
   */
  serviceURL(): void;

  /**
   * Return the associated API key of the Map.
   * @function
   * @return the API key.
   * @api stable
   */
  getGPPKey(): any;

  /**
   * Set the associated API key to the Map.
   * @param {String} key the API key.
   * @param {String} authentication as btoa("login:pwd")
   * @api stable
   */
  setGPPKey(key: string, authentication: string): void;

  /** Return the GetFeatureInfo URL for the passed coordinate, resolution, and
   * projection. Return `undefined` if the GetFeatureInfo URL cannot be
   * constructed.
   * @param {Coordinate} coord
   * @param {Number} resolution
   * @param {Projection} projection default the source projection
   * @param {Object} options
   *  @param {string} options.INFO_FORMAT response format text/plain, text/html, application/json, default text/plain
   * @return {String|undefined} GetFeatureInfo URL.
   */
  getFeatureInfoUrl(
    coord: Coordinate,
    resolution: number,
    projection: Projection,
    options: {
      INFO_FORMAT: string;
    }
  ): string | undefined;

  /** Get feature info
   * @param {Coordinate} coord
   * @param {Number} resolution
   * @param {Projection} projection default the source projection
   * @param {Object} options
   *  @param {string} options.INFO_FORMAT response format text/plain, text/html, application/json, default text/plain
   *  @param {function} options.callback a function that take the response as parameter
   *  @param {function} options.error function called when an error occurred
   */
  getFeatureInfo(
    coord: Coordinate,
    resolution: number,
    projection: Projection,
    options: {
      INFO_FORMAT: string;
      callback: (...params: any[]) => any;
      error: (...params: any[]) => any;
    }
  ): void;

  /** Register new layer capability
   * @param {string} layer layer name
   * @param {*} capability
   */
  static register(layer: string, capability: any): void;

  /** Check if a layer registered with a key?
   * @param {string} layer layer name
   * @returns {boolean}
   */
  static isRegistered(layer: string): boolean;

  /** Load capabilities from the service
   * @param {string} gppKey the API key to get capabilities for
   * @return {*} Promise-like response
   */
  static loadCapabilities(gppKey: string, all: any): Promise<any>;

  /** Get Key capabilities
   * @param {string} gppKey the API key to get capabilities for
   * @return {*} Promise-like response
   */
  static getCapabilities(gppKey: string): Promise<any>;

  static themes: {
    theme: string;
    rex: RegExp;
  }[]
}

export const capabilities: {
  'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
  };
  'CADASTRALPARCELS.PARCELLAIRE_EXPRESS': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
  };
  'ORTHOIMAGERY.ORTHOPHOTOS': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
  };
  'GEOGRAPHICALGRIDSYSTEMS.MAPS': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
  };
  'ADMINEXPRESS-COG-CARTO.LATEST': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
  };
  'GEOGRAPHICALGRIDSYSTEMS.SLOPES.MOUNTAIN': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
  };
  'ELEVATION.SLOPES': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
  };
  'GEOGRAPHICALGRIDSYSTEMS.MAPS.BDUNI.J1': {
    key: string;
    server: string;
    layer: string;
    title: string;
    format: string;
    style: string;
    queryable: boolean;
    tilematrix: string;
    minZoom: number;
    maxZoom: number;
    bbox: number[];
    desc: string;
    originators: {
      IGN: {
        href: string;
        attribution: string;
        logo: string;
        minZoom: number;
        maxZoom: number;
        constraint: {
          minZoom: number;
          maxZoom: number;
          bbox: number[];
        }[];
      };
    };
  };
  'TRANSPORTNETWORKS.ROADS': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
  };
  'GEOGRAPHICALNAMES.NAMES': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
    legend: string[];
  };
  'CARTES.NATURALEARTH': {
    layer: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
    legend: string[];
  };
  'GEOGRAPHICALGRIDSYSTEMS.MAPS.OVERVIEW': {
    layer: string;
    key: string;
    theme: string;
    desc: string;
    server: string;
    bbox: number[];
    format: string;
    minZoom: number;
    maxZoom: number;
    originators: {
      Geoservices: {
        attribution: string;
        href: string;
      };
    };
    queryable: boolean;
    style: string;
    tilematrix: string;
    title: string;
    legend: string[];
  };
}
