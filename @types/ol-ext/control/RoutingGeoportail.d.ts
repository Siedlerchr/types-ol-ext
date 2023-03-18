import type { Feature, Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type { Coordinate } from 'ol/coordinate'

export interface Options extends ControlOptions {
  className?: string;
  apiKey?: string;
  authentication?: string;
  label?: string;
  placeholder?: string;
  inputLabel?: string;
  noCollapse?: string;
  typing?: number;
  minLength?: number;
  maxItems?: number;
  maxHistory?: number;
  getTitle?: (f: Feature) => string;
  autocomplete?: (s: string, cback: ([])) => [] | false; // TODO: https://github.com/Viglino/ol-ext/issues/484#issuecomment-721194232
  timeout?: number;
}

/** Geoportail routing Control.
 * @constructor
 * @extends {ol_control_Control}
 * @fires select
 * @fires change:input
 * @fires routing:start
 * @fires routing
 * @fires step:select
 * @fires step:hover
 * @fires error
 * @fires abort
 */
export default class RoutingGeoportail extends ol_control_Control {
  /**
   * @param {Object=} options
   *  @param {string} options.className control class name
   *  @param {string | undefined} [options.apiKey] the service api key.
   *  @param {string | undefined} options.authentication: basic authentication for the service API as btoa("login:pwd")
   *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {string | undefined} options.label Text label to use for the search button, default "search"
   *  @param {string | undefined} options.placeholder placeholder, default "Search..."
   *  @param {string | undefined} options.inputLabel label for the input, default none
   *  @param {string | undefined} options.noCollapse prevent collapsing on input blur, default false
   *  @param {number | undefined} options.typing a delay on each typing to start searching (ms) use -1 to prevent autocompletion, default 300.
   *  @param {integer | undefined} options.minLength minimum length to start searching, default 1
   *  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
   *  @param {integer | undefined} options.maxHistory maximum number of items to display in history. Set -1 if you don't want history, default maxItems
   *  @param {function} options.getTitle a function that takes a feature and return the name to display in the index.
   *  @param {function} options.autocomplete a function that take a search string and callback function to send an array
   *  @param {number} options.timeout default 20s
   */
  constructor(options?: Options);

  /**
   * Set the map instance the control is associated with
   * and add its controls associated to this map.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_): void;

  /** Calculate route
   * @param {Array<ol.coordinate>|undefined} steps an array of steps in EPSG:4326, default use control input values
   * @return {boolean} true is a new request is send (more than 2 points to calculate)
   */
  calculate(steps?: Coordinate[]): boolean;

  /** Send an ajax request (GET)
   * @param {string} url
   * @param {function} onsuccess callback
   * @param {function} onerror callback
   */
  ajax(url: string, onsuccess: (...params: any[]) => void, onerror: (...params: any[]) => void): void;

  /**
   *  Abort request
   */
  abort(): void;
}
