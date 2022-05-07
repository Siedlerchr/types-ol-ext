import Feature from 'ol/Feature';
import SearchJSON, { Options as SearchOptions } from './SearchJSON';


export interface Options extends SearchOptions {
    className?: string;
    label?: string;
    placeholder?: string;
    typing?: number;
    minLength?: number;
    maxItems?: number;
    handleResponse?: ((response: any) => any[]);
    url?: string;
    lang?: string;
    position?: boolean;
    getTitle?: (f: Feature) => string;
}
/**
 * Search places using the photon API.
 *
 * @constructor
 * @extends {contrSearchJSON}
 * @fires select
 * @param {Object=} Control options.
 *	@param {string} options.className control class name
 *	@param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *	@param {string | undefined} options.label Text label to use for the search button, default "search"
 *	@param {string | undefined} options.placeholder placeholder, default "Search..."
 *	@param {number | undefined} options.typing a delay on each typing to start searching (ms), default 1000.
 *	@param {number | undefined} options.minLength minimum length to start searching, default 3
 *	@param {number | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
 *  @param {function | undefined} options.handleResponse Handle server response to pass the features array to the list
 *
 *	@param {string|undefined} options.url Url to photon api, default "http://photon.komoot.de/api/"
 *	@param {string|undefined} options.lang Force preferred language, default none
 *	@param {boolean} options.position Search, with priority to geo position, default false
 *	@param {function} options.getTitle a function that takes a feature and return the name to display in the index, default return street + name + contry
 */
export default class SearchPhoton extends SearchJSON {
    constructor(options?: Options);
}
