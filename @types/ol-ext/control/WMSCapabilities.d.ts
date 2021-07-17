import ol_layer_Tile from 'ol/layer/Tile';
import { Map as _ol_Map_ } from 'ol';
import Layer from 'ol-ext/filter/Base';
import TileLayer from 'ol/layer/Tile';
import Button from './Button';
import ol_control_Control, {Options as ControlOptions} from 'ol/control/Control';


export interface Capabilities {
    map?: string;
    version?: string,
    timeout?: number
}

export interface Options extends ControlOptions {
    proxy?: string
    placeholder?: string;
    title?: string;
    searchLabel?: string
    loadLabel?: string;
    popupLayer?: boolean;
    services?: { [key: string]: string };
    srs?: string[];
    timeout?: number;
    cors?: boolean;
    trace?: boolean;
}

/** WMSCapabilities
 * @constructor
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
export class WMSCapabilities extends Button {
    constructor(options?: Options);

    /** Create a new layer using options received by getOptionsFromCap method
     * @param {*} options
     */
    getLayerFromOptions(options: any): ol_layer_Tile;
    /**
     * Set the map instance the control is associated with
     * and add its controls associated to this map.
     * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;

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
     *  @param {string} options.version WMS version (yet only 1.3.0 is implemented), default 1.3.0
     *  @param {number} options.timeout timout to get the capabilities, default 10000
     */
    getCapabilities(url: string, options: Capabilities): void;

    /** Clear form
     */
    clearForm(): void;
    /** Display capabilities in the dialog
     * @param {*} caps JSON capabilities
     */
    showCapabilitis(caps: any): void;

    getLayerFromOptions(options: any): TileLayer

    /** Test url and return true if it is a valid url string
     * @param {string} url
     * @return {bolean}
     * @api
     */
    testUrl(url: string): boolean
    /** Return a WMS ol.layer.Tile for the given capabilities
     * @param {*} caps layer capabilities (read from the capabilities)
     * @param {*} parent capabilities
     * @return {*} options
     */
    getOptionsFromCap(caps: TileLayer, parent: any): TileLayer;
    /** Error list: a key/value list of error to display in the dialog
     * Overwrite it to handle internationalization
     */
    error: {
        load: string;
        badUrl: string;
        srs: string;
    };
    /** Form labels: a key/value list of form labels to display in the dialog
     * Overwrite it to handle internationalization
     */
    labels: {
        formTitle: string;
        formLayer: string;
        formMap: string;
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

