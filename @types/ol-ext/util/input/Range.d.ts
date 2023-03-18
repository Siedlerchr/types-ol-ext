import type { Options as BaseOptions } from './Base'
import Base from './Base'

export interface Options extends BaseOptions {
  clasName?: string;
  input?: Element;
  input2?: Element;
  input3?: Element;
  min?: number;
  max?: number;
  step?: number;
  overflow?: boolean;
}

/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Base}

 */
export default class Range extends Base {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {Element} [options.input] input element, if non create one (use parent to tell where)
   *  @param {Element} [options.input2] input element
   *  @param {Element} [options.parent] element to use as parent if no input option
   *  @param {number} [options.min] min value, default use input min
   *  @param {number} [options.max] max value, default use input max
   *  @param {number} [options.step] step value, default use input step
   *  @param {boolean} [options.overflow=false] enable values over min/max
   */
  constructor(options?: Options);

  /** Set the current value (second input)
   */
  setValue2(v: any): void;

  /** Get the current value (second input)
   */
  getValue2(): any;

  /** Get the current min value
   * @return {number}
   */
  getMin(): number;

  /** Get the current max value
   * @return {number}
   */
  getMax(): number;
}
