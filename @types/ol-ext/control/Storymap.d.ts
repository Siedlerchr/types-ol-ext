import ol_control_Control from 'ol/control/Control';

export interface Options {
    className?: string;
    html?: Element | string;
    target?: Element| string
}

/** A control with scroll-driven navigation to create narrative maps
 *
 * @constructor
 * @extends {ol.control.Control}
 * @fires scrollto
 * @fires clickimage
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {Element | string | undefined} options.html The storymap content
 *	@param {Element | string | undefined} options.target The target element to place the story. If no html is provided the content of the target will be used.
 */
export class ol_control_Storymap extends ol_control_Control{
    constructor(options: Options);
    /** Scroll to a chapter
     * @param {string} name Name of the chapter to scroll to
     */
    setChapter(name: string): void;
}
