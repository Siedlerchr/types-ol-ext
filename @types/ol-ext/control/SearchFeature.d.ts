import type Feature from 'ol/Feature'
import type { Options as SearchOptions } from './Search'
import Search from './Search'

export interface Options extends SearchOptions {
  className?: string;
  title?: string;
  label: string;
  placeholder?: string;
  typing?: number;
  minLength?: number;
  maxItems?: number;
  property?: string;
  getTitle?: (f: Feature) => string;
  getSearchString?: (f: Feature) => string;
}

/**
 * Search features.
 *
 * @constructor
 * @extends {ol_control_Search}
 * @fires select

 */
export default class SearchFeature extends Search {
  /**
   * @param {Object=} Control options.
   *  @param {string} options.className control class name
   *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {string | undefined} options.label Text label to use for the search button, default "search"
   *  @param {string | undefined} options.placeholder placeholder, default "Search..."
   *  @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 300.
   *  @param {integer | undefined} options.minLength minimum length to start searching, default 1
   *  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
   *
   *  @param {string | undefined} options.property a property to display in the index, default 'name'.
   *  @param {function} options.getTitle a function that takes a feature and return the name to display in the index, default return the property
   *  @param {function | undefined} options.getSearchString a function that take a feature and return a text to be used as search string, default geTitle() is used as search string
   */
  constructor(options: Options);
}
