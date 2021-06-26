import ol_control_Control from 'ol/control/Control';

export interface Options {
    className?: string;
    title?: string;
    name?: string;
    html?: string;
    handleClick?: (...params: any[]) => any;
}

/** A simple push button control
* @constructor
* @extends {contrControl}
* @param {Object=} options Control options.
*	@param {String} options.className class of the control
*	@param {String} options.title title of the control
*	@param {String} options.name an optional name, default none
*	@param {String} options.html html to insert in the control
*	@param {function} options.handleClick callback when control is clicked (or use change:active event)
 */
export default class Button extends ol_control_Control {
    constructor(options?: Options);
    /** Set the control visibility
    * @param {boolean} b
     */
    setVisible(b: boolean): void;
    /**
     * Set the button title
     * @param {string} title
     */
    setTitle(title: string): void;
    /**
     * Set the button html
     * @param {string} html
     */
    setHtml(html: string): void;

    /**
     * Get the button element
     * @returns {Element}
     */
    getButtonElement(): Element
}
