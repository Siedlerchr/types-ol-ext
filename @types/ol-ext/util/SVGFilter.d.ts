import type ol_ext_SVGOperation from './SVGOperation'

export interface Options {
  operation?: ol_ext_SVGOperation;
  id?: string;
  color?: 'linear' | 'sRGB';
}

/** SVG filter

 */
export default class SVGFilter {
  /**
   * @param {*} options
   *  @param {ol_ext_SVGOperation} option.operation
   *  @param {string} option.id filter id, only to use if you want to adress the filter directly or let the lib create one, if none create a unique id
   *  @param {string} option.color color interpolation filters, linear or sRGB
   */
  constructor(options?: Options);

  /** Get filter ID
   * @return {string}
   */
  getId(): string;

  /** Remove from DOM
   */
  remove(): void;

  /** Add a new operation
   * @param {ol_ext_SVGOperation} operation
   */
  addOperation(operation: ol_ext_SVGOperation): void;

  /** Add a grayscale operation
   * @param {number} value
   */
  grayscale(value: number): void;

  /** Add a luminanceToAlpha operation
   * @param {*} options
   *  @param {number} options.gamma enhance gamma, default 0
   */
  luminanceToAlpha(options: any): void;

  applyTo(img: any): HTMLElement;

  NS: string

  svg: any
}
