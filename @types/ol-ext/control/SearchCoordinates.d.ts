import type { ProjectionLike } from 'ol/proj'
import type { Options as SearchOptions } from './Search'
import Search from './Search'

export interface Options extends SearchOptions {
    projection?: ProjectionLike;
    className?: string;
    target?: Element | string;
    label?: string;
    labelGps?: string;
    labelCenter?: string;
    typing?: number;
    minLength?: number;
    maxItems?: number;
    digit?: number;
}

/**
 * Search on GPS coordinate.
 *
 * @constructor
 * @extends {ol_control_Search}
 * @fires select
 * @param {Object=} Control options.
 *  @param {ol/proj/ProjectionLike} [options.projection="EPSG:3857"] control projection
 *  @param {string} [options.className] control class name
 *  @param {Element | string } [options.target] Specify a target if you want the control to be rendered outside of the map's viewport.
 *  @param {string} [options.label="search"] Text label to use for the search button, default "search"
 *  @param {string} [options.labelGPS="Locate with GPS"] placeholder
 *  @param {string} [options.labelCenter="Map center"] placeholder
 *  @param {number} [options.typing=300] a delay on each typing to start searching (ms), default 300.
 *  @param {integer} [options.minLength=1] minimum length to start searching, default 1
 *  @param {integer} [options.maxItems=10] maximum number of items to display in the autocomplete list, default 10
 *  @param {integer} [options.digit=3] number of digit in coords
 */
export default class SearchCoordinates extends Search {
  constructor(options?: Options);

  /** Set the input value in the form (for initialisation purpose)
    * @param {Array<number>} [coord] if none get the map center
    * @api
    */
  setInput(coord: number[]): void;

  /** Get the control projection
   * @returns {ProjectionLike}
   */
  getProjection(): ProjectionLike

  /** Set the projection
     * @param {ProjectionLike} proj
     */
  setProjection(proj: ProjectionLike): void
}
