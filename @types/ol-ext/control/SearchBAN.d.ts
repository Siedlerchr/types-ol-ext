import Feature from 'ol/Feature';
import SearchPhoton, { Options as SearchOptions } from './SearchPhoton';

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
    position?: boolean
    getTitle?: (f: Feature) => string;
    citycode?: string;
    postcode?: string;
    type?: 'housenumber' | 'street'
}
/**
 * Search places using the French National Base Address (BAN) API.
 *
 * @constructor
 * @extends {ol.control.Search}
 * @fires select
 * @param {Object=} Control options.
 *  @param {string} options.className control class name
 *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {string | undefined} options.reverseTitle Title to use for the reverse geocoding button tooltip, default "Click on the map..."
 *  @param {string | undefined} options.label Text label to use for the search button, default "search"
 *  @param {string | undefined} options.placeholder placeholder, default "Search..."
 *  @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 500.
 *  @param {integer | undefined} options.minLength minimum length to start searching, default 3
 *  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
 *
 *  @param {string|undefined} options.url Url to BAN api, default "https://api-adresse.data.gouv.fr/search/"
 *  @param {boolean} options.position Search, with priority to geo position, default false
 *  @param {function} options.getTitle a function that takes a feature and return the text to display in the menu, default return label attribute
 *  @param {string|undefined} options.citycode limit search to an administrative area defined by its city code (code commune insee)
 *  @param {string|undefined} options.postcode limit search to a postal code
 *  @param {string|undefined} options.type type of result: 'housenumber' | 'street'
 * @see {@link https://adresse.data.gouv.fr/api/}
 */
export default class SearchBAN extends SearchPhoton {
    constructor(options?: Options);

}
