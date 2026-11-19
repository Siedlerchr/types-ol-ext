import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'
import type { Coordinate } from 'ol/coordinate'

export interface Options extends ControlOptions {
  className?: string;
  html?: Element | string;
  target?: HTMLElement;
  minibar?: boolean;
}

export interface StorymapScrollEvent extends BaseEvent {
  type: 'scrollto';
  element: HTMLElement;
  name: string | null;
  coordinate: Coordinate;
  lon: Coordinate;
  zoom: number;
}
export interface StorymapImageEvent extends BaseEvent {
  type: 'clickimage';
  element: HTMLElement;
  name: string | null;
  coordinate: Coordinate | null;
  img: HTMLImageElement;
  title: string;
  originalEvent: MouseEvent;
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
   *  @param {HTMLElement | undefined} [options.target] The target element to place the story. If no html is provided the content of the target will be used.
   *  @param {boolean} [options.minibar=false] add a mini scroll bar
   */
  constructor(options: Options);

  content: HTMLDivElement;

  /** Replace the story content with HTML or an element. */
  setStory(html: string | Element): void;

  /** Scroll to a chapter
   * @param {string} name Name of the chapter to scroll to
   */
  setChapter(name: string): void;

  on: ol_control_Control['on'] & OnSignature<'scrollto', StorymapScrollEvent, EventsKey> & OnSignature<'clickimage', StorymapImageEvent, EventsKey>;
  once: ol_control_Control['once'] & OnSignature<'scrollto', StorymapScrollEvent, EventsKey> & OnSignature<'clickimage', StorymapImageEvent, EventsKey>;
  un: ol_control_Control['un'] & OnSignature<'scrollto', StorymapScrollEvent, void> & OnSignature<'clickimage', StorymapImageEvent, void>;
}
