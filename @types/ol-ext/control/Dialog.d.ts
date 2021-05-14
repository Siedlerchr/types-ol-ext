import { Map } from "ol";
import { ControlOptions } from 'ol-ext/control/control';

export interface Options {
    className: string;
    map: Map;
    target: Element;
    zoom: boolean;
    closeBox: boolean;
    max: number;
    hiddenOnClick: boolean;
    closeOnSubmit: boolean
}

export interface ShowOptions {
    content: Element | string;
    title: string;
    buttons: object;
}
export interface ContentOptions {
    content: Element | string;
    title: string
    className: string;
    max: number;
    progress: number;
    buttons: object;
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
 *  @param {boolean} options.hideOnClick close dialog when click the background
 *  @param {boolean} options.closeOnSubmit Prevent closing the dialog on submit
 */
export default class Dialog {

    constructor(options?: Options);

    /** Show a new dialog
      * @param { * | Element | string } options options or a content to show
      *  @param {Element | string} options.content dialog content
      *  @param {string} options.title title of the dialog
      *  @param {Object} options.buttons a key/value list of button to show
      */
    show(options: ShowOptions | Element | string): void
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
       */
    setContent(options?: ContentOptions): void;
    getContentElement(): Element;
    /** Set progress
     * @param {number} val
     * @param {number} max
     */
    setProgress(val: number, max: number): void;

    hide(): void;
    /** The dialog is shown
     * @return {bool} true if a dialog is open
     */
    isOpen(): any;
    /** Close the dialog
     * @method Dialog.close
     * @return {boolean} true if a dialog is closed
     */
    close: boolean
}
