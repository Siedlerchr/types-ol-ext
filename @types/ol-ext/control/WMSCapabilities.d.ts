import { Map as _ol_Map_ } from 'ol';
import TileLayer from 'ol/layer/Tile';
import Button from './Button';
import { Options as ControlOptions } from 'ol/control/Control';
import Dialog from './Dialog';
import Layer from '../filter/Base';
import { Extent } from 'ol/extent';
import TileSource from 'ol/source/Tile';

export interface Capabilities {
  map?: string;
  version?: string;
  timeout?: number;
  onLoad?: () => void;
}

export interface ReturnCapabilitiesOptions {
  layer: {
    title: string;
    extent: Extent;
    queryable: any;
    abstract: any;
    minResolution: number;
    maxResolution: number;
  };
  source: {
    url: string;
    srs: string;
    attribution: string[];
    crossOrigin: string | null;
    params: {
      LAYERS: string;
      FORMAT: string;
      VERSION: string;
    };
  };
  data: {
    title: string;
    abstract: any;
    logo: string | undefined;
    keyword: any;
    legend: string;
    opaque: boolean;
    queryable: boolean;
  };
}

export interface Options extends ControlOptions {
  proxy?: string;
  placeholder?: string;
  title?: string;
  searchLabel?: string;
  loadLabel?: string;
  srs?: string[];
  timeout?: number;
  cors?: boolean;
  optional?: string;
  trace?: boolean;
  services?: { [key: string]: string };
}
/** WMSCapabilities
 * @constructor
 * @fires load
 * @fires capabilities
 * @extends {ol_control_Button}
 * @param {*} options
 *  @param {string|Element} [options.target] the target to set the dialog, use document.body to have fullwindow dialog
 *  @param {string} [options.proxy] proxy to use when requesting Getcapabilites, default none (suppose the service use CORS)
 *  @param {string} [options.placeholder='service url...'] input placeholder, default 'service url...'
 *  @param {string} [options.title=WMS] dialog title, default 'WMS'
 *  @param {string} [options.searchLabel='search'] Label for search button, default 'search'
 *  @param {string} [options.loadLabel='load'] Label for load button, default 'load'
 *  @param {Array<string>} [options.srs] an array of supported srs, default map projection code or 'EPSG:3857'
 *  @param {number} [options.timeout=1000] Timeout for getCapabilities request, default 1000
 *  @param {boolean} [options.cors=false] Use CORS, default false
 *  @param {string} [options.optional] a list of optional url properties (when set in the request url), separated with ','
 *  @param {boolean} [options.trace=false] Log layer info, default false
 *  @param {*} [options.services] a key/url object of services for quick access in a menu
 */
export default class WMSCapabilities extends Button {
  constructor(options?: Options);

  /** Create a new layer using options received by getOptionsFromCap method
   * @param {*} options
   */
  getLayerFromOptions(options: ReturnCapabilitiesOptions): TileLayer<TileSource>;
  /**
   * Set the map instance the control is associated with
   * and add its controls associated to this map.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_): void;
  /** Get the dialog
   * @returns {ol_control_Dialog}
   */
  getDialog(): Dialog;
  /** Show dialog for url
   * @param {string} [url] service url, default ask for an url
   * @param {*} options capabilities options
   *  @param {string} options.map WMS map or get map in url?map=xxx
   *  @param {string} options.version WMS version (yet only 1.3.0 is implemented), default 1.3.0
   *  @param {number} options.timeout timout to get the capabilities, default 10000
   */
  showDialog(url?: string, options?: Capabilities): void;
  /** Get WMS capabilities for a server
   * @fire load
   * @param {string} url service url
   * @param {*} options
   *  @param {string} options.map WMS map or get map in url?map=xxx
   *  @param {string} [options.version=1.3.0] WMS version (yet only 1.3.0 is implemented), default 1.3.0
   *  @param {number} [options.timeout=10000] timout to get the capabilities, default 10000
   *  @param {function} [options.onload] callback function
   */
  getCapabilities(url: string, options?: Capabilities): void;

  /** Load a layer using service
   * @param {string} url service url
   * @param {string} layername
   * @param {function} [onload] callback function (or listen to 'load' event)
   */
  loadLayer(url: string, layerName: string, onload: () => void): void;

  /** Clear form
   */
  clearForm(): void;
  /** Display capabilities in the dialog
   * @param {*} caps JSON capabilities
   */
  showCapabilitis(caps: any): void;

  /** Test url and return true if it is a valid url string
   * @param {string} url
   * @return {bolean}
   * @api
   */
  testUrl(url: string): boolean;
  /** Return a WMS ol.layer.Tile for the given capabilities
   * @param {*} caps layer capabilities (read from the capabilities)
   * @param {*} parent capabilities
   * @return {*} options
   */
  getOptionsFromCap(caps: any, parent: any): ReturnCapabilitiesOptions;
  /** Error list: a key/value list of error to display in the dialog
   * Overwrite it to handle internationalization
   */
  error: {
    load: string;
    badUrl: string;
    TileMatrix: string;
    srs: string;
  };
  /** Form labels: a key/value list of form labels to display in the dialog
   * Overwrite it to handle internationalization
   */
  labels: {
    formTitle: string;
    formLayer: string;
    formMap: string;
    formStyle: string;
    formFormat: string;
    formMinZoom: string;
    formMaxZoom: string;
    formExtent: string;
    mapExtent: string;
    formProjection: string;
    formCrossOrigin: string;
    formVersion: string;
    formAttribution: string;
  };
}
