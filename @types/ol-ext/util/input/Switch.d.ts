import type { Options as CheckBoxOptions } from './Checkbox'
import CheckBox from './Checkbox'

export interface Options extends CheckBoxOptions {
  clasName?: string;
  input?: Element;
  parent?: Element;
}

/** Switch input
 * @constructor
 * @extends {ol_ext_input_Checkbox}
 * @fires check

 */
export default class Switch extends CheckBox {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {Element} [options.input] input element, if non create one
   *  @param {Element} [options.parent] parent element, if create an input
   */
  constructor(options?: Options);
}
