import ol_control_Control, {Options as ControlOptions} from 'ol/control/Control';

export type position = 'top' | 'left' | 'bottom' | 'right';
export interface Options extends ControlOptions {
    className?: string
    status?: string;
    position?: position
    visible?: boolean
}


/** A control to display status information on top of the map
 * @constructor
 * @extends {ol_control_Control}
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *  @param {string} options.status status, default none
 *  @param {string} options.position position of the status 'top', 'left', 'bottom' or 'right', default top
 *  @param {boolean} options.visible default true
 */
export default class Status extends ol_control_Control{
    constructor(options: any);
    /** Set visiblitity
     * @param {boolean} visible
     */
    setVisible(visible: boolean): void;
    /** Show status on the map
     * @param {string|Element} html status text or DOM element
     */
    status(html: string | Element): void;
    /** Set status position
     * @param {string} position position of the status 'top', 'left', 'bottom' or 'right', default top
     */
    setPosition(position: position): void;
    /** Show the status
     * @param {boolean} show show or hide the control, default true
     */
    show(show: boolean): void;
    /** Hide the status
     */
    hide(): void;
    /** Toggle the status
     */
    toggle(): void;
    /** Is status visible
     */
    isShown(): boolean;
}
