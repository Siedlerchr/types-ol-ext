import BaseObject from 'ol/Object'
import type ol_ext_SVGOperation from './SVGOperation'
import type { OperationAttributes } from './SVGOperation'

export type Operation = ol_ext_SVGOperation | OperationAttributes | string
export type Operations = Operation | Operation[]

export interface Options {
  operation?: Operations;
  id?: string;
  color?: 'linear' | 'sRGB';
}

/** SVG filter

 */
export default class SVGFilter extends BaseObject {
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
  addOperation(operation: Operations): void;

  /** Add a grayscale operation
   * @param {number} value
   */
  grayscale(value?: number): void;

  /** Add a luminanceToAlpha operation
   * @param {*} options
   *  @param {number} options.gamma enhance gamma, default 0
   */
  luminanceToAlpha(options?: { gamma?: number }): void;

  applyTo(img: HTMLImageElement | HTMLCanvasElement | ImageBitmap): HTMLCanvasElement;

  NS: string

  svg: SVGSVGElement

  element: SVGElement
}
