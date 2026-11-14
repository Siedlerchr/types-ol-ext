import BaseObject from 'ol/Object'

export interface OperationAttributes {
  feoperation: string;
  operations?: Array<SVGOperation | OperationAttributes | string>;
  [attribute: string]: unknown;
}

/** SVG filter
 * @param {string | *} attributes a list of attributes or fe operation
 *  @param {string} attributes.feoperation filter primitive tag name
 */
export default class SVGOperation extends BaseObject {
  constructor(attributes: string | OperationAttributes);

  /** Get filter name
   * @return {string}
   */
  getName(): string;

  /** Set Filter attribute
   * @param {*} attributes
   */
  set(k: any, val: any): void;

  /** Set Filter attributes
   * @param {*} attributes
   */
  setProperties(attributes: any): void;

  /** Get SVG  element
   * @return {Element}
   */
  geElement(): Element;

  /** Append a new operation
   * @param {SVGOperation} operation
   */
  appendChild(operation: SVGOperation | OperationAttributes | string | Array<SVGOperation | OperationAttributes | string>): void;

  static NS: string | undefined
}
