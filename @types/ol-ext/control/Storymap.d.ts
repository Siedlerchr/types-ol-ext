import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'

export interface Options extends ControlOptions {
  className?: string;
  html?: Element | string;
  target?: HTMLElement | string;
  minibar?: boolean;
}

/** A control with scroll-driven navigation to create narrative maps
 *
 * @constructor
 * @extends {ol.control.Control}
 * @fires scrollto
 * @fires clickimage

 */
export default class Storymap extends ol_control_Control {
  /**
   * @param {Object=} options Control options.
   *  @param {String} options.className class of the control
   *  @param {Element | string | undefined} [options.html] The storymap content
   *  @param {Element | string | undefined} [options.target] The target element to place the story. If no html is provided the content of the target will be used.
   *  @param {boolean} [options.minibar=false] add a mini scroll bar
   */
  constructor(options?: Options);

  /** Scroll to a chapter
   * @param {string} name Name of the chapter to scroll to
   */
  setChapter(name: string): void;
}
