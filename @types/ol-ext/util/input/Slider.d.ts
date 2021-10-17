import Base, { Options as BaseOptions } from "./Base";
export interface Options extends BaseOptions {
    className?: string;
    input?: Element;
    parent?: Element;
    align?: 'left' | 'right' | 'middle';
    type?: string;
    min?: number;
    max?: number;
    step?: number;
    overflow?: boolean;
    before?: string | Element;
    after?: string | Element;
    fixed?: boolean;
}
/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Base}
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {string} [options.align=left] align popup left/right
 *  @param {string} [options.type] a slide type as 'size'
 *  @param {number} [options.min] min value, default use input min
 *  @param {number} [options.max] max value, default use input max
 *  @param {number} [options.step] step value, default use input step
 *  @param {boolean} [options.overflow=false] enable values over min/max
 *  @param {string|Element} [options.before] an element to add before the slider
 *  @param {string|Element} [options.after] an element to add after the slider
 *  @param {boolean} [options.fixed=false] no pupop
 */
export default class Slider extends Base {
    constructor(options: any);
    element: HTMLElement | Text;
    slider: HTMLElement | Text;

    /** Get the current value
     * @returns {number}
     */
    getValue(): number;
}
