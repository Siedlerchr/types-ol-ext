import ol_control_Control from 'ol/control/Control';
import { Feature, Map as _ol_Map_ } from 'ol';
import { Coordinate } from 'ol/coordinate';

export interface Options {
  className?: string;
  title?: string
  target?: Element | string;
  label: string;
  placeholder: string;
  inputLabel?: string;
  collapsed?: boolean;
  noCollapse?: boolean;
  typing?: number;
  minLength?: number;
  maxItems?: number;
  maxHistory?: number;
  getTitle?: (f: Feature) => string;
  autocomplete?: (s: String, []: any[]) => any;
  onSelect: (...params: any[]) => any;
  centerOnSelect?: boolean
  zoomOnSelect?: (...params: any[]) => any;
}

/**
 * Search Control.
 * This is the base class for search controls. You can use it for simple custom search or as base to new class.
 * @see ol_control_SearchFeature
 * @see ol_control_SearchPhoton
 *
 * @constructor
 * @extends {ol_control_Control}
 * @fires select
 * @fires change:input
 * @param {Object=} options
 *  @param {string} options.className control class name
 *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {string | undefined} options.title Title to use for the search button tooltip, default "Search"
 *  @param {string | undefined} options.placeholder placeholder, default "Search..."
 *  @param {boolean | undefined} options.reverse enable reverse geocoding, default false
 *  @param {string | undefined} options.inputLabel label for the input, default none
 *  @param {boolean | undefined} options.collapsed search is collapsed on start, default true
 *  @param {boolean | undefined} options.noCollapse prevent collapsing on input blur, default false
 *  @param {number | undefined} options.typing a delay on each typing to start searching (ms) use -1 to prevent autocompletion, default 300.
 *  @param {number | undefined} options.minLength minimum length to start searching, default 1
 *  @param {number | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
 *  @param {number | undefined} options.maxHistory maximum number of items to display in history. Set -1 if you don't want history, default maxItems
 *  @param {function} options.getTitle a function that takes a feature and return the name to display in the index.
 *  @param {function} options.autocomplete a function that take a search string and callback function to send an array
 *  @param {function} options.onselect a function called when a search is selected
 *  @param {boolean} options.centerOnSelect center map on search, default false
 *  @param {number|boolean} options.zoomOnSelect center map on search and zoom to value if zoom < value, default false
 */
export default class Search extends ol_control_Control {
  constructor(options?: Options);
  /**
 * Remove the control from its current map and attach it to the new map.
 * Subclasses may set up event handlers to get notified about changes to
 * the map here.
 * @param {ol.Map} map Map.
 * @api stable
 */
  setMap(map: _ol_Map_): void
  /** Collapse the search
     * @param {boolean} [b=true]
     * @api
     */
  collapse(b: boolean): void
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
  getTitle(f: Feature): string;
  /** Force search to refresh
   */
  /** Returns title as text
 *	@param {any} f feature to be displayed
 *	@return {string}
 *	@api
 */
  _getTitleTxt(f: Feature): string
  search(): void;
  /** Reverse geocode
* @param {ol.coordinate} coord
* @param {function | undefined} cback a callback function, default trigger a select event
* @api
*/
  reverseGeocode(coord: Coordinate, cback: (...params: any[]) => any): void
  /** Set the input value in the form (for initialisation purpose)
  *	@param {string} value
  *	@param {boolean} search to start a search
  *	@api
  */
  setInput(value: string, search: boolean): void;
  /** A line has been clicked in the menu > dispatch event
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
  /** Autocomplete function
    * @param {string} s search string
    * @param {function} cback a callback function that takes an array to display in the autocomplete field (for asynchronous search)
    * @return {Array|false} an array of search solutions or false if the array is send with the cback argument (asnchronous)
    * @api
    */
  autocomplete(s: string, cback: ([]) => any): any[] | false;

  /** Test if 2 features are equal
   * @param {any} f1
   * @param {any} f2
   * @return {boolean}
   */
  equalFeatures(f1: any, f2: any): boolean; //TODO js code returns always false
}
