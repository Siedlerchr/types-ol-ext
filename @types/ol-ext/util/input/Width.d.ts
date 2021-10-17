import List, { Options as ListOptions } from "./List";

export interface Options extends ListOptions {
    className?: string;
    input?: Element;
    parent?: Element;
    size?: number[];
}

/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_List}
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {Array<number>} [options.size] a list of size (default 0,1,2,3,5,10,15,20)
 */
export default class Width extends List {
    constructor(options?: Options);
    /** Get the current value
     * @returns {number}
     */
    getValue(): number;
}
