import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type { Options as SearchOptions, SearchOnSignature } from './Search'
import Search from './Search'

export interface Options<Result = any, Response = any, Title = string> extends SearchOptions<Result, Title> {
  handleResponse?: ((response: Response) => Result[]);
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

 */
export default class SearchJSON<Result = any, Response = any, Title = string, Selection = Result> extends Search<Result, string, Title, Selection> {
  /**
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
  constructor(options?: Options<Result, Response, Title>);

  /** Autocomplete function (ajax request to the server)
   * @param {string} s search string
   * @param {function} cback a callback function that takes an array of {name, feature} to display in the autocomplete field
   */
  autocomplete(s: string, cback: (results: Result[]) => void): void;

  /** Send ajax request
   * @param {string} url
   * @param {*} data
   * @param {function} cback a callback function that takes an array of {name, feature} to display in the autocomplete field
   */
  ajax(url: string, data: any, cback: (response: any, error?: string) => void, options?: any): void;

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
  handleResponse(response: Response): Result[];

  /** Get the input field
   *  @return {Element}
   *  @api
   */
  getInputField(): Element;

  /** Returns the text to be displayed in the menu
   *  @param {any} f feature to be displayed
   *  @return {string} the text to be displayed in the index, default f.name
   *  @api
   */
  getTitle(f: Result): Title;

  /** Force search to refresh
   */
  search(): void;

  /** Set the input value in the form (for initialisation purpose)
   *  @param {string} value
   *  @param {boolean} search to start a search
   *  @api
   */
  setInput(value: string, search?: boolean): void;

  /** A ligne has been clicked in the menu > dispatch event
   * @param {any} f the feature, as passed in the autocomplete
   * @param {boolean} reverse true if reverse geocode
   * @param {ol.coordinate} coord
   * @param {*} options options passed to the event
   *  @api
   */
  select(f: Result, reverse?: boolean, coord?: Coordinate, options?: any): void

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
  getHistory(): Result[];

  /** Test if 2 features are equal
   * @param {any} f1
   * @param {any} f2
   * @return {boolean}
   */
  equalFeatures(f1: Result, f2: Result): boolean;

  on: SearchOnSignature<EventsKey, Selection>

  once: SearchOnSignature<EventsKey, Selection>

  un: SearchOnSignature<void, Selection>
}
