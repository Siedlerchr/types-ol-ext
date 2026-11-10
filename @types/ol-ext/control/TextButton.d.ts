import type { Options as ButtonOptions } from './Button'
import Button from './Button'

export interface Options extends ButtonOptions {
  className?: string;
  title?: string;
  html?: string | Element;
  handleClick?: (e: Event) => void;
}

/** A simple push button control drawn as text
 * @constructor
 * @extends {contrButton}

 */
export default class TextButton extends Button {
  /**
   * @param {Object=} options Control options.
   *  @param {String} options.className class of the control
   *  @param {String} options.title title of the control
   *  @param {String} options.html html to insert in the control
   *  @param {function} options.handleClick callback when control is clicked (or use change:active event)
   */
  constructor(options?: Options);

}
