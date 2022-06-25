import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import Search, { Options as SearchOptions, SearchEvent, SearchOnSignature } from './Search';
import { Geometry } from 'ol/geom';

export interface Options extends SearchOptions {
    handleResponse?: ((response: any) => any[]);
    url?: string;
    authentication?: string;
}

/**
 * This is the base class for search controls that use a json service to search features.
 * You can use it for simple custom search or as base to new class.
 *
 * @constructor
 * @extends {ol.control.Search}
 * @fires select
 * @param {any} options extend ol.control.Search options
 *  @param {string} options.className control class name
 *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {string | undefined} options.title Title to use for the search button tooltip, default "Search"
 *  @param {string | undefined} options.reverseTitle Title to use for the reverse geocoding button tooltip, default "Click on the map..."
 *  @param {string | undefined} options.placeholder placeholder, default "Search..."
 *  @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 1000.
 *  @param {integer | undefined} options.minLength minimum length to start searching, default 3
 *  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
 *  @param {function | undefined} options.handleResponse Handle server response to pass the features array to the list
 *
 *  @param {string|undefined} options.url Url of the search api
 *  @param {string | undefined} options.authentication: basic authentication for the search API as btoa("login:pwd")
 */
export default class SearchJSON extends Search {
    constructor(options?: Options);

    /** Autocomplete function (ajax request to the server)
    * @param {string} s search string
    * @param {function} cback a callback function that takes an array of {name, feature} to display in the autocomplete field
     */
    autocomplete(s: string, cback: ([]) => any): any[] | false;
    /** Send ajax request
     * @param {string} url
     * @param {*} data
     * @param {function} cback a callback function that takes an array of {name, feature} to display in the autocomplete field
     */
    ajax(url: string, data: any, cback: ([]) => any, options: any): void;
    /**
     * @param {string} s the search string
     * @return {Object} request data (as key:value)
     * @api
     */
    requestData(s: string): { [key: string]: any };
    /**
     * Handle server response to pass the features array to the display list
     * @param {any} response server response
     * @return {Array<any>} an array of feature
     * @api
     */
    handleResponse(response: any): any[];
    /** Get the input field
    *	@return {Element}
    *	@api
     */
    getInputField(): Element;
    /** Returns the text to be displayed in the menu
    *	@param {any} f feature to be displayed
    *	@return {string} the text to be displayed in the index, default f.name
    *	@api
     */
    getTitle(f: Feature<Geometry>): string;
    /** Force search to refresh
     */
    search(): void;
    /** Set the input value in the form (for initialisation purpose)
    *	@param {string} value
    *	@param {boolean} search to start a search
    *	@api
     */
    setInput(value: string, search: boolean): void;
    /** A ligne has been clicked in the menu > dispatch event
   * @param {any} f the feature, as passed in the autocomplete
   * @param {boolean} reverse true if reverse geocode
   * @param {ol.coordinate} coord
   * @param {*} options options passed to the event
   *	@api
   */
    select(f: Feature, reverse: boolean, coord: Coordinate, options?: any): void
    /** Save history (in the localstorage)
     */
    saveHistory(): void;
    /** Restore history (from the localstorage)
     */
    restoreHistory(): void;
    /**
     * Remove previous history
     */
    clearHistory(): void;
    /**
     * Get history table
     */
    getHistory(): void;
    /** Test if 2 features are equal
     * @param {any} f1
     * @param {any} f2
     * @return {boolean}
     */
    equalFeatures(f1: any, f2: any): boolean;

    on: SearchOnSignature<EventsKey>;
    once: SearchOnSignature<EventsKey>;
    un: SearchOnSignature<void>;
}

