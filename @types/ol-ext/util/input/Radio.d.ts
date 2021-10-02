import CheckBox from './Checkbox';

export interface Options {
    className?: string;
    input?: Element;
    parent?: Element;
}

/** Switch input
 * @constructor
 * @extends {ol_ext_input_Checkbox}
 * @fires check
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 */
export default class Radio extends CheckBox {
    constructor(options?: Options);

}
