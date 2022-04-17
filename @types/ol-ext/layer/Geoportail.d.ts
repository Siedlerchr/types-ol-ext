import { Coordinate } from "ol/coordinate";
import Projection from "ol/proj/Projection";
import { Options as TileLayerOptions } from "ol/layer/BaseTile";
import { ProjectionLike } from "ol/proj";
import { Options as GeoPortailOptions } from "../source/Geoportail";
import Tile from "ol/layer/Tile";
import TileSource from "ol/source/Tile";

export interface Options extends TileLayerOptions<TileSource> {
  layer?: string;
  gpgKey?: string;
  projection?: ProjectionLike;
}
/** IGN's Geoportail WMTS layer definition
 * @constructor
 * @extends {ol.layer.Tile}
 * @param {olx.layer.WMTSOptions=} options WMTS options if not defined default are used
 *  @param {string} options.layer Geoportail layer name
 *  @param {string} options.gppKey Geoportail API key, default use layer registered key
 *  @param {ol.projectionLike} [options.projection=EPSG:3857] projection for the extent, default EPSG:3857
 * @param {olx.source.WMTSOptions=} tileoptions WMTS options if not defined default are used
 */
export default class Geoportail extends Tile<TileSource> {
  // TODO unsure about the params!
  constructor(layer?: string, options?: Options, tileoptions?: GeoPortailOptions);
  /** Standard IGN-GEOPORTAIL attribution
   */
  attribution: any;
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
}

export const capabilities: {
  "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2": {
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
  "CADASTRALPARCELS.PARCELLAIRE_EXPRESS": {
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
  "ORTHOIMAGERY.ORTHOPHOTOS": {
    key: string;
    server: string;
    layer: string;
    title: string;
    format: string;
    style: string;
    queryable: boolean;
    tilematrix: string;
    minZoom: number;
    bbox: number[];
    desc: string;
    originators: {
      CRCORSE: {
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
      SIGLR: {
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
      "BOURGOGNE-FRANCHE-COMTE": {
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
      FEDER_AUVERGNE: {
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
      FEDER_PAYSDELALOIRE: {
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
      IGN: {
        href: string;
        attribution: string;
        logo: string;
        minZoom: number;
        maxZoom: number;
        constraint: (
          | {
              minZoom: number;
              maxZoom: number;
              bbox: number[];
            }
          | {
              bbox: number[];
              minZoom?: undefined;
              maxZoom?: undefined;
            }
        )[];
      };
      "E-MEGALIS": {
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
      FEDER2: {
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
      PREFECTURE_GUADELOUPE: {
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
      OCCITANIE: {
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
      RGD_SAVOIE: {
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
      CG45: {
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
      CRAIG: {
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
      "e-Megalis": {
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
      PPIGE: {
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
      CG06: {
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
      "MEGALIS-BRETAGNE": {
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
      FEDER: {
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
      "LANGUEDOC-ROUSSILLON": {
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
      GRAND_EST: {
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
      CNES_AUVERGNE: {
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
      HAUTS_DE_FRANCE: {
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
      MPM: {
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
      DITTT: {
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
      CNES_978: {
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
      CNES_ALSACE: {
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
      CNES_974: {
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
      CNES_975: {
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
      CNES_976: {
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
      CNES_977: {
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
      CNES: {
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
      ASTRIUM: {
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
      CNES_971: {
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
      CNES_972: {
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
  "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD": {
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
  "GEOGRAPHICALGRIDSYSTEMS.MAPS": {
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
      DITTT: {
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
  "GEOGRAPHICALGRIDSYSTEMS.SLOPES.MOUNTAIN": {
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
  ADMINEXPRESS_COG_2018: {
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
  "ELEVATION.SLOPES": {
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
  "GEOGRAPHICALGRIDSYSTEMS.MAPS.BDUNI.J1": {
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
  "TRANSPORTNETWORKS.ROADS": {
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
};
