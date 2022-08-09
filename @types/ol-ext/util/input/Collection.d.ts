import ol_Collection from 'ol/Collection';
export interface Options<T> {
    target?: Element;
    collection?: ol_Collection<T> //todo unsure
    getTitle?: (elt: any) => Element | string

}


/** A list element synchronize with a Collection.
 * Element in the list can be reordered interactively and the associated Collection is kept up to date.
 * @constructor
 * @fires item:select
 * @fires item:dblclick
 * @fires item:order
 * @extends {ol_Object}
 * @param {*} options
 *  @param {Element} [options.target]
 *  @param {Collection} [options.collection]  the collection to display in the list
 *  @param {function} [options.getTitle] a function that takes a collection item and returns an Element or a string
 */
export default class Collection<T>{
    constructor(options?: Options<T>);

    /** Select an item
     * @param {*} item
     */
    select(item: any): void;

    /** Select an item at
     * @param {number} n
     */
    selectAt(n: number): void;
    /** Get current selection
     * @returns {*}
     */
    getSelect(): any;
    /** Get current selection
     * @returns {number}
     */
    getSelectPosition(): number;
    /** Redraw the list
     */
    refresh(): void;

    /** Set the collection
  * @param {ol_Collection} collection
  */
    setCollection(collection: Collection): void

    /** Remove current collection (listeners)
     * /!\ remove collection when input list is removed from the DOM
     */
    removeCollection(): void
}
