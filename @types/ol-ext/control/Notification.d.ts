import ol_control_Control, {Options as ControlOptions} from 'ol/control/Control';

export interface Options extends ControlOptions {
    className?: string;
    closeBox?: boolean;
    hideOnClick?: boolean;
}
/** Control overlay for OL3
 * The overlay control is a control that display an overlay over the map
 *
 * @constructor
 * @extends {ol_control_Control}
 * @fire change:visible
 * @param {Object=} options Control options.
 *  @param {string} className class of the control
 *  @param {boolean} options.closeBox add a close button
 *  @param {boolean} options.hideOnClick close dialog when click
 */
export default class Notification extends ol_control_Control {
    constructor(options?: Options);
    /**
     * Display a notification on the map
     * @param what the notification to show, default get the last one
     * @param  [duration=3000] duration in ms, if -1 never hide
     */
    show(what?: string | Node, duration?: number): void;
    /**
     * Remove a notification on the map
     */
    hide(): void;
    /**
     * Toggle a notification on the map
     * @param {number} [duration=3000] duration in ms
     */
    toggle(duration?: number): void;
}
