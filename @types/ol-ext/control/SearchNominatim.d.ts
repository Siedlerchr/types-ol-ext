import Search from './Search';
import SearchJSON, { Options as SearchJSONOptions } from 'ol-ext/control/SearchJSON';

export interface Options extends SearchJSONOptions {
    polygon?: boolean;
    viewbox?: number[];
    bounded?: boolean;
}

/**
* Search places using the Nominatim geocoder from the OpenStreetmap project.
*
* @constructor
* @extends {ol.control.Search}
* @fires select
* @param {Object=} Control options.
*  @param {string} options.className control class name
*  @param {boolean | undefined} options.polygon To get output geometry of results (in geojson format), default false.
*  @param {Array<Number> | undefined} options.viewbox The preferred area to find search results. Any two corner points of the box are accepted in any order as long as they span a real box, default none.
*  @param {boolean | undefined} options.bounded Restrict the results to only items contained with the bounding box. Restricting the results to the bounding box also enables searching by amenity only. default false
*  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
*  @param {string | undefined} options.title Title to use for the search button tooltip, default "Search"
*  @param {string | undefined} options.reverseTitle Title to use for the reverse geocoding button tooltip, default "Click on the map..."
*  @param {string | undefined} options.placeholder placeholder, default "Search..."
*  @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 500.
*  @param {integer | undefined} options.minLength minimum length to start searching, default 3
*  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
*
*  @param {string|undefined} options.url URL to Nominatim API, default "https://nominatim.openstreetmap.org/search"
* @see {@link https://wiki.openstreetmap.org/wiki/Nominatim}
*/
export default class SearchNominatim extends SearchJSON {
    constructor(options?: Options);

}
