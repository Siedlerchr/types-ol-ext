import { Feature } from 'ol';
import { Options as ControlOptons } from 'ol/control/Control';
import RoutingGeoportail from './RoutingGeoportail';

export interface Options extends ControlOptons {
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
    autocomplete?: (s: String, callback: ([])) => any; //TODO not sure
    timeout?: number
}
/**
 * Geoportail routing Control.
 * @constructor
 * @extends {ol_control_Control}
 * @fires select
 * @fires change:input
 * @param {Object=} options
 *	@param {string} options.className control class name
 *	@param {string | undefined} options.apiKey the service api key.
 *	@param {string | undefined} options.authentication: basic authentication for the service API as btoa("login:pwd")
 *	@param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *	@param {string | undefined} options.label Text label to use for the search button, default "search"
 *	@param {string | undefined} options.placeholder placeholder, default "Search..."
 *	@param {string | undefined} options.inputLabel label for the input, default none
 *	@param {string | undefined} options.noCollapse prevent collapsing on input blur, default false
 *	@param {number | undefined} options.typing a delay on each typing to start searching (ms) use -1 to prevent autocompletion, default 300.
 *	@param {number | undefined} options.minLength minimum length to start searching, default 1
 *	@param {number | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
 *	@param {number | undefined} options.maxHistory maximum number of items to display in history. Set -1 if you don't want history, default maxItems
 *	@param {function} options.getTitle a function that takes a feature and return the name to display in the index.
 *	@param {function} options.autocomplete a function that take a searcsh string and callback function to send an array
 *	@param {number} options.timeout default 10s
 */
export default class ol_control_RoutingDSR extends RoutingGeoportail {
    constructor(options?: Options);
}
