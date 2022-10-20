import { Map as _ol_Map_ } from 'ol';
import Control from 'ol/control/Control';
import ol_control_Control, {Options as ControlOptions} from 'ol/control/Control';
import Event from 'ol/events/Event';
import { position } from './control';

export interface Options extends ControlOptions {
    className?: string;
    group?: boolean;
    toggleOne?: boolean;
    autoDeactivate?: boolean;
    controls?: ol_control_Control[];
}
/** Control bar for OL3
 * The control bar is a container for other controls. It can be used to create toolbars.
 * Control bars can be nested and combined with contrToggle to handle activate/deactivate.
 *
 * @constructor
 * @extends {contrControl}
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {bool} options.group is a group, default false
 *	@param {bool} options.toggleOne only one toggle control is active at a time, default false
 *	@param {bool} options.autoDeactivate used with subbar to deactivate all control when top level control deactivate, default false
 *	@param {Array<Control>} options.controls a list of control to add to the bar
 */
export default class Bar extends ol_control_Control {
    constructor(options?: Options);
    /** Set the control visibility
    * @param {boolean} b
     */
    setVisible(b: boolean): void;
    /** Get the control visibility
    * @return {boolean} b
     */
    getVisible(): boolean;
    /**
     * Set the map instance the control is associated with
     * and add its controls associated to this map.
     * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;
    /** Get controls in the panel
     *	@return {Array<ol_control_Control>}
     */
    getControls(): ol_control_Control[];
    /** Set tool bar position
    *	@param {top|left|bottom|right} pos
     */
    setPosition(pos: position): void;
    /** Add a control to the bar
    *	@param {_ol_control_} c control to add
     */
    addControl(c: ol_control_Control): void;
    /** Deativate all controls in a bar
    * @param {_ol_control_} except a control
     */
    deactivateControls(except: ol_control_Control): void;
    /** Auto activate/deactivate controls in the bar
    * @param {boolean} b activate/deactivate
     */
    setActive(b: boolean): void;
    /** Post-process an activated/deactivated control
    *	@param {Event} e :an object with a target {ol_control_Control} and active flag {boolean}
     */
    onActivateControl_(e: Event): void;
    /**
     * @param {string} name of the control to search
     * @return {ol_control_Control}
     */
    getControlsByName(name: string): ol_control_Control;
}
