import { Object } from "ol";

export interface Options {
    input?: Element;
    type?: string;
    min?: number;
    max?: number;
    step?: number;
    val?: string | number;
    checked?: boolean;
    hidden?: boolean
    disabled?: boolean;
    parent?: Element
}

/** Abstract base class; normally only used for creating subclasses and not instantiated in apps.
 * @constructor
 * @extends {ol_Object}
 * @param {*} options
 *  @param {Element} [options.input] input element, if non create one
 *  @param {string} [options.type] input type, if no input
 *  @param {number} [options.min] input min, if no input
 *  @param {number} [options.max] input max, if no input
 *  @param {number} [options.step] input step, if no input
 *  @param {string|number} [options.val] input value
 *  @param {boolean} [options.checked] check input
 *  @param {boolean} [options.hidden] the input is display:none
 *  @param {boolean} [options.disabled] disable input
 *  @param {Element} [options.parent] parent element, if no input
 */
export default class Base extends Object {
    constructor(options?: Options);
    /** Set the current value
        */
    setValue(v: any): void;
    /** Get the current getValue
     * @returns {string}
     */
    getValue(): string | number;
    /** Get the input element
     * @returns {Element}
     */
    getInputElement(): Element;
}
