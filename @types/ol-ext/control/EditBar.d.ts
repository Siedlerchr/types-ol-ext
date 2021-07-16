import { Collection, Feature, Map as _ol_Map_ } from 'ol';
import ol_control_Control from 'ol/control/Control';
import { Vector as VectorSource } from 'ol/source';
import Event from 'ol/events/Event';
import Bar from './Bar';
import { position } from './control';
import { Interaction, Select, Draw } from 'ol/interaction';
import Delete from '../interaction/Delete';
import ModifyFeature from '../interaction/ModifyFeature';
import DrawRegular from '../interaction/DrawRegular';
import Transform from '../interaction/Transform';
import Split from '../interaction/Split';
import Offset from '../interaction/Offset';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { Geometry } from 'ol/geom';

export enum EditBarEventType {
    INFO = 'info'
}

export interface Interactions {
    Select?: Select | boolean;
    Delete?: Delete | boolean;
    Info?: boolean; // no real interaction
    DrawPoint?: Draw | boolean;
    DrawLine?: Draw | boolean;
    DrawPolygon?: Draw | boolean;
    DrawRegular?: DrawRegular | boolean;
    ModifySelect?: ModifyFeature | boolean;
    Transform: Transform | boolean;
    Split?: Split | boolean;
    Offset?: Offset | boolean;
}

export interface Options {
    className?: string;
    target?: string;
    edition?: boolean;
    interactions?: Interactions //TODO dig deeper into the type system
    source?: VectorSource;
}
/** Control bar for editing in a layer
 * @constructor
 * @extends {contrBar}
 * @fires info
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {String} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 *	@param {boolean} options.edition false to remove the edition tools, default true
 *	@param {Object} options.interactions List of interactions to add to the bar
 *    ie. Select, Delete, Info, DrawPoint, DrawLine, DrawPolygon
 *    Each interaction can be an interaction or true (to get the default one) or false to remove it from bar
 *	@param {VectorSource} options.source Source for the drawn features.
 */
export default class EditBar extends Bar {
    constructor(options?: Options);
    /**
     * Set the map instance the control is associated with
     * and add its controls associated to this map.
     * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;
    /** Get an interaction associated with the bar
     * @param {string} name
     */
    getInteraction(name: string): void;
    /** Get the option title
     */
    _getTitle(): void;
    /** Set the control visibility
    * @param {boolean} b
     */
    setVisible(b: boolean): void;
    /** Get the control visibility
    * @return {boolean} b
     */
    getVisible(): boolean;
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

    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
}
export class InfoEvent extends BaseEvent {
    constructor(
        type: EditBarEventType,
        features: Collection<Feature<Geometry>>
    );
    features: Collection<Feature<Geometry>>;


}
