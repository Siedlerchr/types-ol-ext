import type { Options as SearchOptions } from './Search'
import Search from './Search'
import type { Coordinate } from 'ol/coordinate'
import type Geolocation from 'ol/Geolocation'

/** A coordinate search result, in longitude/latitude and the map projection. */
export interface GPSResult {
  gps: Coordinate;
  coordinate: Coordinate;
  name: string;
}

export interface Options extends SearchOptions<GPSResult> {
  className?: string;
  label?: string;
  labelGPS?: string;
  placeholder?: string;
  typing?: number;
  minLength?: number;
  maxItems?: number;
}

/**
 * Search on GPS coordinate.
 *
 * @constructor
 * @extends {ol_control_Search}
 * @fires select

 */
export default class SearchGPS extends Search<GPSResult, Coordinate | undefined> {
  /**
   * @param {Object=} Control options.
   *  @param {string} options.className control class name
   *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {string | undefined} options.label Text label to use for the search button, default "search"
   *  @param {string | undefined} options.placeholder placeholder, default "Search..."
   *  @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 300.
   *  @param {integer | undefined} options.minLength minimum length to start searching, default 1
   *  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
   */
  constructor(options?: Options);

  /** Autocomplete function
   * @param {string} s search string
   * @return {Array<any>|false} an array of search solutions
   * @api
   */
  autocomplete(s: string): GPSResult[];

  /** Get the input field
   *  @return {Element}
   *  @api
   */
  getInputField(): Element;

  /** Set the input value in the form (for initialisation purpose
  * @param {Array<number>} [coord] if none get the map center
  * @api
  */
  setInput(coord?: Coordinate): void;

  geolocation: Geolocation;
}
