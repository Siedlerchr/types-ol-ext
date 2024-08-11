import type { Collection, Feature } from 'ol'
import Control from 'ol/control/Control'
import type { Options as ControlOptions } from 'ol/control/Control'
import type VectorSource from 'ol/source/Vector'

export interface Options extends ControlOptions {
   title?: string
   className?: string
   collapsed?: boolean
   features?: Feature[] | Collection<Feature> | VectorSource<Feature>
   pageLength?: number
}

export interface ButtonOptions {
  className?: string,
  title?: string,
  html?: string
  click?: () => void
}

/** Feature list control
 *
 * @constructor
 * @extends {Control}
 * @fires select
 * @fires dblclick
 * @fires collapse
 * @fires resize
 * @fires sort
 * @param {Object=} options
 *  @param {string} [options.title] table title
 *  @param {Element} [options.target] to display the control outside the map
 *  @param {string} [options.className] use `ol-bottom` to scroll at bottom (default top)
 *  @param {boolean} [options.collapsed=true] collapse the list on start, default true
 *  @param {Array<ol_Feature>|ol_Collection<ol_Feature>|ol_source_Vector} [features] a set of feature to display. If provided as Source or Collection the features will stay in sync.
 *  @param {number} [options.pageLength=100] number of row to display in the table (page optimzation)
 */
export default class FeatureList extends Control {
  constructor(options?: Options);

  /** Scroll resize at botton
     * @param {boolean} b
     */
  setBottomScroll(b: boolean): void;

  /** Scroll to an element / feature
           * @param {Feature|'select'} feature a featue or `select` to scroll at the selected row
           */
  scrollTo(feature: Feature | 'select'): any;

  /** Collapse the table
  * @param {boolean} [b] if no parameters toggle it
  */
  collapse(b?: boolean): void;

  /** Is the control collapsed */
  isCollapsed(): boolean;

  /** Set the features list
     * @param {ol_source_Vector|ol_Collection<ol_Feature>|Array<ol_Feature>} source a vector source or a collection of features to list
     */
  setFeatures(
      source: ol_source_Vector | ol_Collection<ol_Feature> | Array<ol_Feature>
   ): void;

  /** Sort list by properties
  * @param {string} prop property name
  * @param {string} [sort] 'up' or 'down', default remove sort
  */
  sortBy(prop: string, sort?: 'up' | 'down'): void;

  /** Get sorted properties list
  * @return Object
  */
  getSort(): object

  /** Reset all sorts */
  resetSort(): void;

  /** Enable sort list by properties in the header
  * @param {...string} propName
  */
  enableSort(...args: string[]): void;

  /** Update a feature line in the table (attribute changed)
     * @param {Feature} feature
     * @returns {boolean}
     */
  updateFeature(feature: Feature): boolean;

  /** Sort features in the table
  * @param {boolean} [silent] sort without triggering an event
  */
  sort(silent?: boolean): void;

  /** Refresh the list draw + resize use update if features have changed
           * @param {boolean} [force]
           */
  refresh(force?: boolean): void;

  /** Update the list (when features have changed without dispatching event).  */
  update(): void;

  /** Get height of a row
  * @return {number}
  */
  getRowHeight(): number;

  /** A sort function to compare 2 properties
 * @param {Feature} f1
 * @param {Feature} f2
 * @param {string} prop property name to sort at
 * @return number -1: v1 < v2, 1: v1 > v2, 0: v1 = v2
 * @api
 */
  sortFn(f1: Feature, f2: Feature, p: string): 0 | 1 | -1;

  /** Format feature property
     * @param {ol_Feature} feature,
     * @param {string} prop property name
     * @api
     */
  formatProperty(
      feature: ol_Feature,
      prop: string
   ): {
      val: '-' | any;
      type:
      | 'string'
      | 'number'
      | 'bigint'
      | 'boolean'
      | 'symbol'
      | 'undefined'
      | 'object'
      | 'function';
   };

  /** Get the list of columns
        * @param {Array<ol_Feature>} [features] a list of features to retrieve columns (if none, returns columns defined by setColumns)
        */
  getColumns(features?: Array<ol_Feature>): any[];

  /** Set the list of columns to display
           * @param {Array<string>} columns
           */
  setColumns(columns: Array<string>): void;

  /** Resize the control to the map
           * @param {number} [height] the table height (if in a map sticks to the viewport height)
           */
  resize(height?: number): void;

  /** Get the current selection in the list
           * @returns {Feature}
           */
  getSelection(): Feature;

  /** Select a feature in the list
           * @param {Feature} [feature] if none remove selection
           * @param {boolean} [noScroll=false] prevent scrolling to the selected row
           */
  select(feature?: Feature, noScroll?: boolean): void;

  /** Add a button to the list header menu
           * @param {Object} options
           *  @param {string} className
           *  @param {string} [title]
           *  @param {string} [html]
           *  @param {function} click on click function
           * @returns {Element}
           */
  addButton(options?: ButtonOptions): Element;
}
