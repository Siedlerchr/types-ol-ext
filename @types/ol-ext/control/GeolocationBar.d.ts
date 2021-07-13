import { Map as _ol_Map_ } from 'ol';
import ol_control_Control from 'ol/control/Control';
import Event from 'ol/events/Event';
import GeolocationDraw from '../interaction/GeolocationDraw';
import Bar, {Options as BarOptions} from './Bar';
import { position } from './control';

export interface Options extends BarOptions {
    className?: string;
    centerLabel?: string;
    position?: position
}
/** Geolocation bar
 * The control bar is a container for other controls. It can be used to create toolbars.
 * Control bars can be nested and combined with ol.control.Toggle to handle activate/deactivate.
 *
 * @constructor
 * @extends {ol_control_Bar}
 * @param {Object=} options Control bar options.
 *  @param {String} options.className class of the control
 *  @param {String} options.centerLabel label for center button, default center
 *  @param {String} options.position position of the control, default bottom-right
 */
export default class GeolocationBar extends Bar {
    constructor(options?: Options);
    /** Get the GeolocationDraw associatedwith the bar
     * @return {GeolocationDraw}
     */
    getInteraction(): GeolocationDraw;
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
    *	@param {Array<_ol_control_>}
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
    *	@param {event} e :an object with a target {_ol_control_} and active flag {bool}
     */
    onActivateControl_(e: Event): void;
    /**
     * @param {string} name of the control to search
     * @return {contrControl}
     */
    getControlsByName(name: string): ol_control_Control;
}
