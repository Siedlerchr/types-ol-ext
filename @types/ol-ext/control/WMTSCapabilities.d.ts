import type TileLayer from 'ol/layer/Tile'
import type TileSource from 'ol/source/Tile'
import type WMTSTileGrid from 'ol/tilegrid/WMTS'
import WMSCapabilities from './WMSCapabilities'
import type { Options } from './WMSCapabilities'

/** WMTSCapabilities
 * @constructor
 * @fires load
 * @fires capabilities
 * @extends {WMSCapabilities}

 */
export default class WMTSCapabilities extends WMSCapabilities {
  /**
   * @param {*} options
   *  @param {string|Element} [options.target] the target to set the dialog, use document.body to have fullwindow dialog
   *  @param {string} [options.proxy] proxy to use when requesting Getcapabilites, default none (suppose the service use CORS)
   *  @param {string} [options.placeholder='service url...'] input placeholder, default 'service url...'
   *  @param {string} [options.title=WMTS] dialog title, default 'WMTS'
   *  @param {string} [options.searchLabel='search'] Label for search button, default 'search'
   *  @param {string} [options.loadLabel='load'] Label for load button, default 'load'
   *  @param {Array<string>} [options.srs] an array of supported srs, default map projection code or 'EPSG:3857'
   *  @param {number} [options.timeout=1000] Timeout for getCapabilities request, default 1000
   *  @param {boolean} [options.cors=false] Use CORS, default false
   *  @param {string} [options.optional] a list of optional url properties (when set in the request url), separated with ','
   *  @param {boolean} [options.trace=false] Log layer info, default false
   *  @param {*} [options.services] a key/url object of services for quick access in a menu
   */
  constructor(options?: Options);

  /** Get Capabilities request parameters
   * @param {*} options
   */
  getRequestParam(options?: { version?: string }): {
    SERVICE: 'WMTS';
    REQUEST: 'GetCapabilities';
    VERSION: string;
  };

  /** Get WMTS tile grid (only EPSG:3857)
   * @param {string} tileMatrixSet
   * @param {number} minZoom
   * @param {number} maxZoom
   * @param {boolean} tilePrefix
   * @returns {WMTSTileGrid}
   * @private
   */
  getTileGrid(tileMatrixSet: string, minZoom: number, maxZoom: number, tilePrefix: boolean): WMTSTileGrid

  /** Return a WMTS options for the given capabilities
   * @param {*} caps layer capabilities (read from the capabilities)
   * @param {*} parent capabilities
   * @return {*} options
   */
  getOptionsFromCap(caps: any, parent: any): any;

  /** Create a new layer using options received by getOptionsFromCap method
   * @param {*} options
   */
  getLayerFromOptions(options: any): TileLayer<TileSource>;
}
