import type { Options as BaseOptions } from './Base'
import Base from './Base'

export interface Options extends BaseOptions {
  className?: string;
  html?: Element | string;
  after?: string;
  input?: Element;
  parent?: Element;
  autoClose?: boolean;
  visible?: boolean;
}

/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Base}
 * @fires check

 */
export default class CheckBox extends Base {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {Element|string} [options.html] label content
   *  @param {string} [options.after] label garnish (placed after)
   *  @param {Element} [options.input] input element, if non create one
   *  @param {Element} [options.parent] parent element, if create an input
   *  @param {boolean} [options.autoClose=true]
   *  @param {boolean} [options.visible=false] display the input
   */
  constructor(options?: Options);
}
