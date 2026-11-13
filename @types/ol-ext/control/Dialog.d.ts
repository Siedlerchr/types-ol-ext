import type { Map } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'

export type DialogInputs = Record<string, HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
export interface DialogButtonEvent extends BaseEvent { type: 'button'; button: string; inputs: DialogInputs }
export type DialogOnSignature<Return> = OnSignature<EventTypes, BaseEvent, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'button', DialogButtonEvent, Return> & OnSignature<'show' | 'hide' | 'cancel', BaseEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'error' | 'propertychange' | 'button' | 'show' | 'hide' | 'cancel', Return>

export interface Options extends ControlOptions {
  className?: string;
  map?: Map;
  zoom?: boolean;
  fullscreen?: boolean;
  closeBox?: boolean;
  max?: number;
  hideOnClick?: boolean;
  hideOnBack?: boolean;
  closeOnSubmit?: boolean;
  buttons?: Record<string, string>;
}

export interface ContentOptions {
  content?: Element | string;
  title?: string;
  className?: string;
  closeBox?: boolean;
  max?: number;
  progress?: number | false;
  buttons?: Record<string, string>;
  onButton?: (button: string, inputs: DialogInputs) => void;
}
export interface ShowOptions extends ContentOptions { autoclose?: number; hideOnBack?: boolean }

/**
 * @classdesc
 * Application dialog
 * @extends {ol_control_Control}
 * @constructor
 */
export default class Dialog extends ol_control_Control {
  /**
   * @param {*} options
   *  @param {string} options.className
   *  @param {ol.Map} options.map the map to place the dialog inside
   *  @param {Element} options.target target to place the dialog
   *  @param {boolean} options.zoom add a zoom effect
   *  @param {boolean} options.closeBox add a close button
   *  @param {number} options.max if not null add a progress bar to the dialog, default null
   *  @param {boolean} options.hideOnClick close dialog when click
   *  @param {boolean} options.hideOnBack close dialog when click the background
   *  @param {boolean} options.closeOnSubmit Prevent closing the dialog on submit
   */
  constructor(options?: Options);

  on: DialogOnSignature<EventsKey>;
  once: DialogOnSignature<EventsKey>;
  un: DialogOnSignature<void>;

  /** Show a new dialog
   * @param { * | Element | string } options options or a content to show
   *  @param {Element | String} options.content dialog content
   *  @param {string} options.title title of the dialog
   *  @param {string} options.className dialog class name
   *  @param {number} options.max if not null add a progress bar to the dialog
   *  @param {number} options.progress set the progress bar value
   *  @param {Object} options.buttons a key/value list of button to show
   *  @param {function} [options.onButton] a function that takes the button id and a list of input by className
   */
  show(options?: ShowOptions | Element | string): void

  /**
   * Open the dialog
   */
  open(): void;

  /** Set the dialog content
   * @param {*} options
   *  @param {Element | String} options.content dialog content
   *  @param {string} options.title title of the dialog
   *  @param {string} options.className dialog class name
   *  @param {number} options.max if not null add a progress bar to the dialog
   *  @param {number} options.progress set the progress bar value
   *  @param {Object} options.buttons a key/value list of button to show
   *  @param {function} [options.onButton] a function that takes the button id and a list of input by className
   */
  setContent(options?: ContentOptions | string): void;

  getContentElement(): Element;

  /** Get form inputs, textareas, and selects keyed by their class names. */
  getInputs(): DialogInputs;

  /** Set progress
   * @param {number|boolean} val the progress value or false to hide the progressBar
   * @param {number} max
   * @param {string|Element} message
   */
  setProgress(val: number | false, max?: number, message?: string | Element): void;

  /** Set the dialog title
   * @param {Element | String} content dialog content
   */
  setTitle(title?: string): void

  /** Set the dialog content
   * @param {Element | String} content dialog content
   */
  setContentMessage(content: Element | string): void

  hide(): void;

  /** The dialog is shown
   * @return {boolean} true if a dialog is open
   */
  isOpen(): boolean;

  /** Close the dialog
   * @method Dialog.close
   * @return {boolean} true if a dialog is closed
   */
  close(): void
}
