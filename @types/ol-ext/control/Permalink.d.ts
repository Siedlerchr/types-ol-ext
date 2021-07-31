import { Map as _ol_Map_ } from 'ol';
import ol_control_Control, { Options as ControlOptions } from 'ol/control/Control';
import { Layer } from 'ol/layer';

export interface Options extends ControlOptions {
    urlReplace?: boolean;
    localStorage?: boolean | 'position';
    geohash?: boolean
    fixed?: number;
    anchor?: boolean;
    visible?: boolean
    hidden?: boolean;
    onclick: (link: string) => any;
}
/**
 * Set an hyperlink that will return the user to the current map view.
 * Just add a `permalink`property to layers to be handled by the control (and added in the url).
 * The layer's permalink property is used to name the layer in the url.
 * The control must be added after all layer are inserted in the map to take them into acount.
 *
 * @constructor
 * @extends {ol_control_Control}
 * @param {Object=} options
 *  @param {boolean} options.urlReplace replace url or not, default true
 *  @param {boolean|string} [options.localStorage=false] save current map view in localStorage, if 'position' only store map position
 *  @param {boolean} options.geohash use geohash instead of lonlat, default false
 *  @param {integer} options.fixed number of digit in coords, default 6
 *  @param {boolean} options.anchor use "#" instead of "?" in href
 *  @param {boolean} options.visible hide the button on the map, default true
 *  @param {boolean} options.hidden hide the button on the map, default false DEPRECATED: use visible instead
 *  @param {function} options.onclick a function called when control is clicked
*/
export default class Permalink extends ol_control_Control {
    constructor(options?: Options);
    /**
     * Set the map instance the control associated with.
     * @param {Map} map The map instance.
     */
    setMap(map: _ol_Map_): void;
    /** Get layer given a permalink name (permalink propertie in the layer)
    *	@param {string} the permalink to search for
    *	@param {Array<Layer>|undefined} an array of layer to search in
    *	@return {layer|false}
     */
    getLayerByLink(id: string, layers?: Layer[]): Layer | false;
    /** Set coordinates as geohash
     * @param {boolean}
     */
    setGeohash(b: boolean): void;
    /** Set map position according to the current link
     * @param {boolean} [force=false] if true set the position even if urlReplace is disabled
     */
    setPosition(force?: boolean): void;
    /**
     * Set a parameter to the url.
     * @param {string} key the key parameter
     * @param {string|undefined} value the parameter's value, if undefined or empty string remove the parameter
     * @api stable
     */
    setUrlParam(key: string, value?: string): void;
    /**
     * Get a parameter url.
     * @param {string} key the key parameter
     * @return {string} the parameter's value or empty string if not set
     * @api stable
     */
    getUrlParam(key: string): string;
    /**
     * Has a parameter url.
     * @param {string} key the key parameter
     * @return {boolean}
     * @api stable
     */
    hasUrlParam(key: string): boolean;
    /** Get the permalink
     * @param {boolean|string} [search=false] false: return full link | true: return the search string only | 'position': return position string
     * @return {permalink}
     */
    getLink(search?: boolean | 'position'): string;
    /**
     * Enable / disable url replacement (replaceSate)
     *	@param {bool}
     */
    setUrlReplace(replace: boolean): void;

}
