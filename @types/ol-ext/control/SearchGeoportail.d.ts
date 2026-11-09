import type { Options as SearchJsonOptions } from './SearchJSON'
import SearchJSON from './SearchJSON'
import type { Coordinate } from 'ol/coordinate'
import type { Extent } from 'ol/extent'

export type AddressType = 'StreetAddress' | 'PositionOfInterest' | 'CadastralParcel' | 'Commune'

/** A completion or reverse-geocoding result from Geoportail. */
export interface GeoportailResult {
  fulltext: string;
  x?: string | number;
  y?: string | number;
  insee?: string;
  districtcode?: string;
  city?: string;
  zipcode?: string;
  [key: string]: unknown;
}

export interface GeoportailResponse {
  results: GeoportailResult[];
  [key: string]: unknown;
}

export interface Options extends SearchJsonOptions<GeoportailResult, GeoportailResponse> {
  className?: string;
  apiKey?: string;
  version?: string | number;
  authentication?: string;
  label?: string;
  reverse?: boolean;
  placeholder?: string;
  typing?: number;
  minLength?: number;
  maxItems?: number;
  type?: AddressType;
  terr?: 'METROPOLE' | 'DOMTOM' | string;
  position?: boolean;
  bbox?: Extent;
  useExtent?: boolean;
  timeout?: number;
}

/**
 * Search places using the French National Base Address (BAN) API.
 *
 * @constructor
 * @extends {ol.control.SearchJSON}
 * @fires select

 * @see {@link https://geoservices.ign.fr/documentation/geoservices/geocodage.html}
 */
export default class SearchGeoportail extends SearchJSON<GeoportailResult, GeoportailResponse> {
  /**
   * @param {any} options extend ol.control.SearchJSON options
   *  @param {string} options.className control class name
   *  @param {string | undefined} options.apiKey {string} options.gppKey Geoportail API key or 'gpf' for new Geoplatform services, default use layer registered key
   *  @param {string | undefined} [options.version] API version '2' to use geocodage-beta-2, default v1.
   *  @param {string | undefined} options.authentication: basic authentication for the service API as btoa("login:pwd")
   *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {string | undefined} options.label Text label to use for the search button, default "search"
   *  @param {boolean | undefined} options.reverse enable reverse geocoding, default false
   *  @param {string | undefined} options.placeholder placeholder, default "Search..."
   *  @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 500.
   *  @param {integer | undefined} options.minLength minimum length to start searching, default 3
   *  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
   *  @param {StreetAddress|PositionOfInterest|CadastralParcel|Commune} [options.type] type of search. Using Commune will return the INSEE code, default StreetAddress,PositionOfInterest
   *  @param {string} [options.terr] territory METROPOLE|DOMTOM|dep code
   *  @param {boolean} [options.position] Search, with priority to geo position (map center), default false
   *  @param {ol.extent} [options.bbox] if set search inside the bbox (in map projection)
   *  @param {boolean} [options.useExtent] returns candidates inside the current map extent, default false
   *
 */
  constructor(options?: Options);

  /**
   * @param {string} s the search string
   * @return {Object} request data (as key:value)
   * @api
   */
  requestData(s: string): { text: string; type: string; terr?: string; maximumResponses: number; poiType?: string; lonlat?: string; bbox?: string };

  /**
   * Handle server response to pass the features array to the display list
   * @param {any} response server response
   * @return {Array<any>} an array of feature
   * @api
   */
  handleResponse(response: GeoportailResponse): GeoportailResult[];

  /** Search for the commune associated with a result and optionally receive it. */
  searchCommune(result: GeoportailResult, callback?: (results: GeoportailResult[]) => void): void;

  /** Reverse geocode a coordinate, or pass options through to the select event. */
  reverseGeocode(coord: Coordinate, options?: ((results: GeoportailResult[]) => void) | Record<string, unknown>): void;
}
