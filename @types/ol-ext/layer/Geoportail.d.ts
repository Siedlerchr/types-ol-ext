import { Coordinate } from 'ol/coordinate';
import Projection from 'ol/proj/Projection';
import {Options as TileLayerOptions} from 'ol/layer/BaseTile';
import { ProjectionLike } from 'ol/proj';
import {Options as GeoPortailOptions} from '../source/Geoportail'
import Tile from 'ol/layer/Tile';

export interface Options extends TileLayerOptions {
    layer?: string
    gpgKey?: string;
    projection?: ProjectionLike;
}/** IGN's Geoportail WMTS layer definition
 * @constructor
 * @extends {ol.layer.Tile}
 * @param {olx.layer.WMTSOptions=} options WMTS options if not defined default are used
 *  @param {string} options.layer Geoportail layer name
 *  @param {string} options.gppKey Geoportail API key, default use layer registered key
 *  @param {ol.projectionLike} [options.projection=EPSG:3857] projection for the extent, default EPSG:3857
 * @param {olx.source.WMTSOptions=} tileoptions WMTS options if not defined default are used
 */
export default class Geoportail extends Tile {
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
    getFeatureInfoUrl(coord: Coordinate, resolution: number, projection: Projection, options: {
        INFO_FORMAT: string;
    }): string | undefined;
    /** Get feature info
     * @param {Coordinate} coord
     * @param {Number} resolution
     * @param {Projection} projection default the source projection
     * @param {Object} options
     *  @param {string} options.INFO_FORMAT response format text/plain, text/html, application/json, default text/plain
     *  @param {function} options.callback a function that take the response as parameter
     *  @param {function} options.error function called when an error occurred
     */
    getFeatureInfo(coord: Coordinate, resolution: number, projection: Projection, options: {
        INFO_FORMAT: string;
        callback: (...params: any[]) => any;
        error: (...params: any[]) => any;
    }): void;
    /** Get a tile load function to load tiles with basic authentication
     * @param {string} authentication as btoa("login:pwd")
     * @param {string} format mime type
     * @return {function} tile load function to load tiles with basic authentication
     */
    static tileLoadFunctionWithAuthentication(authentication: string, format: string): (...params: any[]) => any;
}
