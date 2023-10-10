import type { Options as SearchJsonOptions } from './SearchJSON'
import SearchJSON from './SearchJSON'

export type AddressType = 'StreetAddress' | 'PositionOfInterest' | 'CadastralParcel' | 'Commune';

export interface Options extends SearchJsonOptions {
  className?: string;
  apiKey?: string;
  version?: string;
  authentication?: string;
  label?: string;
  reverse?: boolean;
  placeholder?: string;
  typing?: number;
  minLength?: number;
  maxItems?: number;
  type?: AddressType;
  terr?: 'METROPOLE'|'DOMTOM'| string;
}

/**
 * Search places using the French National Base Address (BAN) API.
 *
 * @constructor
 * @extends {ol.control.SearchJSON}
 * @fires select

 * @see {@link https://geoservices.ign.fr/documentation/geoservices/geocodage.html}
 */
export default class SearchGeoportail extends SearchJSON {
  /**
   * @param {any} options extend ol.control.SearchJSON options
   *  @param {string} options.className control class name
   *  @param {string | undefined} options.apiKey the service api key.
   *  @param {string | undefined} [options.version] API version '2' to use geocodage-beta-2, default v1.
   *  @param {string | undefined} options.authentication: basic authentication for the service API as btoa("login:pwd")
   *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {string | undefined} options.label Text label to use for the search button, default "search"
   *  @param {boolean | undefined} options.reverse enable reverse geocoding, default false
   *  @param {string | undefined} options.placeholder placeholder, default "Search..."
   *  @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 500.
   *  @param {integer | undefined} options.minLength minimum length to start searching, default 3
   *  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
   *
   *  @param {StreetAddress|PositionOfInterest|CadastralParcel|Commune} options.type type of search. Using Commune will return the INSEE code, default StreetAddress,PositionOfInterest
   *  @param {string} options.terr territory METROPOLE|DOMTOM|dep code
   */
  constructor(options?: Options);

  /** Send an ajax request (GET)
   * @param {string} url
   * @param {function} onsuccess callback
   * @param {function} onerror callback
   */
  ajax(url: string, onsuccess: (...params: any[]) => any, onerror: (...params: any[]) => any): void;

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
}
