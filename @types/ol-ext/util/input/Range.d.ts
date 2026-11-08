import type { Options as BaseOptions } from './Base'
import Base from './Base'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'
import type { SliderEvent } from './Slider'

export interface Options extends BaseOptions {
  className?: string;
  input?: HTMLInputElement;
  input2?: HTMLInputElement;
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
  setValue2(v?: string | number): void;

  /** Get the current value (second input)
   */
  getValue2(): string | null;

  /** Get the current min value
   * @return {number}
   */
  getMin(): number;

  /** Get the current max value
   * @return {number}
   */
  getMax(): number;

  on: Base['on'] & OnSignature<'change:value', SliderEvent, EventsKey>;
  once: Base['once'] & OnSignature<'change:value', SliderEvent, EventsKey>;
  un: Base['un'] & OnSignature<'change:value', SliderEvent, void>;
}
