import Base, { Options as BaseOptions } from "./Base";
export interface Options extends BaseOptions {
    className?: string;
    options?: any[];
    input?: Element;
    parent?: Element;
    fixed?: boolean;
    align?: 'left' | 'right' | 'middle';
}

/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Base}
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {Array<Object>} options.options an array of options to place in the popup { html:, title:, value: }
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {boolean} [options.fixed=false] don't use a popup, default use a popup
 *  @param {string} [options.align=left] align popup left/right/middle
 */
export default class List extends Base {
    constructor(options: any);
    element: HTMLElement | Text;
    popup: HTMLElement | Text;
}
