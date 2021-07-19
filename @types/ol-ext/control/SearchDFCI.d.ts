import Search, {Options as SearchOptions} from './Search';
import Feature from 'ol/Feature';
export interface Options extends SearchOptions {
    className?: string;
    title?: string
    label?: string;
    placeholder?: string;
    typing?: number;
    minLength?: number;
    maxLength?: number;
    maxItems?: number
    url?: string;
    position?: boolean;
    getTitle?: (f: Feature) => string;
    getSearchString?: (f: Feature) => string;
}
/**
 * Search on DFCI grid.
 *
 * @constructor
 * @extends {ol_control_Search}
 * @fires select
 * @param {Object=} Control options.
 *	@param {string} options.className control class name
 *	@param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *	@param {string | undefined} options.label Text label to use for the search button, default "search"
 *	@param {string | undefined} options.placeholder placeholder, default "Search..."
 *	@param {number | undefined} options.typing a delay on each typing to start searching (ms), default 300.
 *	@param {integer | undefined} options.minLength minimum length to start searching, default 1
 *	@param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
 *
 *	@param {string | undefined} options.property a property to display in the index, default 'name'.
 *	@param {function} options.getTitle a function that takes a feature and return the name to display in the index, default return the property
 *	@param {function | undefined} options.getSearchString a function that take a feature and return a text to be used as search string, default geTitle() is used as search string
 */
export default class SearchDFCI extends Search {
    constructor(options?: Options);

}
