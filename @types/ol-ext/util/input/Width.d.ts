import Slider from "./Slider";

export interface Options {
    className?: string;
    input?: string;
    parent?: string;
    size?: number[];
}
/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Slider}
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {Array<number>} [options.size] a list of size (default 0,1,2,3,5,10,15,20)
 */
export default class Width extends Slider {
    constructor(options?: Options);
    /** Get the current value
     * @returns {number}
     */
    getValue(): number;
}
