import WMSCapabilities, { Options } from "./WMSCapabilities";
import TileLayer from "ol/layer/Tile";

/** WMTSCapabilities
 * @constructor
 * @fires load
 * @fires capabilities
 * @extends {ol_control_WMSCapabilities}
 * @param {*} options
 *  @param {string|Element} options.target the target to set the dialog, use document.body to have fullwindow dialog
 *  @param {string} options.proxy proxy to use when requesting Getcapabilites, default none (suppose the service use CORS)
 *  @param {string} options.placeholder input placeholder, default 'service url...'
 *  @param {string} options.title dialog title, default 'WMS'
 *  @param {string} options.searchLabel Label for search button, default 'search'
 *  @param {string} options.loadLabel Label for load button, default 'load'
 *  @param {boolean} options.popupLayer Use a popup for the layers, default false
 *  @param {*} options.services a key/url object of services for quick access in a menu
 *  @param {Array<string>} options.srs an array of supported srs, default map projection code or 'EPSG:3857'
 *  @param {number} options.timeout Timeout for getCapabilities request, default 1000
 *  @param {boolean} options.cors Use CORS, default false
 *  @param {boolean} options.trace Log layer info, default false
 */
export default class WMTSCapabilities extends WMSCapabilities {
  constructor(options?: Options);

  /** Get Capabilities request parameters
   * @param {*} options
   */
  getRequestParam(options?: { version?: string }): {
    SERVICE: "WMTS";
    REQUEST: "GetCapabilities";
    VERSION: string;
  };

  /** Return a WMTS options for the given capabilities
   * @param {*} caps layer capabilities (read from the capabilities)
   * @param {*} parent capabilities
   * @return {*} options
   */
  getOptionsFromCap(caps: any, parent: any): any;

  /** Create a new layer using options received by getOptionsFromCap method
   * @param {*} options
   */
  getLayerFromOptions(options: any): TileLayer;
}
