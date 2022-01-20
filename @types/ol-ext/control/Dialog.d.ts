import { Map } from "ol";
import ol_control_Control, { Options as ControlOptions } from 'ol/control/Control';

export interface Options extends ControlOptions {
    className?: string;
    map?: Map;
    zoom?: boolean;
    fullscreen?: boolean;
    closeBox?: boolean;
    max?: number;
    hideOnClick?: boolean;
    hideOnBack?: boolean
    closeOnSubmit?: boolean
}

export interface ShowOptions {
    content?: Element | string;
    title?: string;
    buttons?: { [key: string]: any };
    onButton?: (button: string, inputs: { [key: string]: any }) => void
}
export interface ContentOptions {
    content?: Element | string;
    title?: string
    className?: string;
    max?: number;
    progress?: number;
    buttons?: { [key: string]: any };
    onButton?: (button: string, inputs: { [key: string]: any }) => void
}

/**
 * @classdesc
 * Application dialog
 * @extends {ol_control_Control}
 * @constructor
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
export default class Dialog extends ol_control_Control {

    constructor(options?: Options);
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
    setContent(options?: ContentOptions): void;
    getContentElement(): Element;

    /** Set progress
     * @param {number|boolean} val the progress value or false to hide the progressBar
     * @param {number} max
     * @param {string|Element} message
     */
    setProgress(val: number, max: number, message: string | Element): void;

    /** Set the dialog title
     * @param {Element | String} content dialog content
     */
    setTitle(title: Element | string): void
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
    close(): boolean
}
