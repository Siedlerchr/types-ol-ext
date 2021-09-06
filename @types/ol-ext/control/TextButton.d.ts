import Button, {Options as ButtonOptions} from './Button'

export interface Options extends ButtonOptions{
    className?: string;
    title?: string;
    html?: string;
    handleClick?: (e: Event) => void;
}
/** A simple push button control drawn as text
 * @constructor
 * @extends {contrButton}
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {String} options.title title of the control
 *	@param {String} options.html html to insert in the control
 *	@param {function} options.handleClick callback when control is clicked (or use change:active event)
 */
export default class TextButton extends Button {
    constructor(options?: Options);
    /** Set the control visibility
    * @param {boolean} b
     */
    setVisible(b: boolean): void;
    /**
     * Set the button title
     * @param {string} title
     * @returns {undefined}
     */
    setTitle(title: string): undefined;
    /**
     * Set the button html
     * @param {string} html
     * @returns {undefined}
     */
    setHtml(html: string): undefined;
}
