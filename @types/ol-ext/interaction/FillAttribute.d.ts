import Feature from 'ol/Feature';
import { Interaction, Select } from 'ol/interaction';
import { Options as SelectOptions, SelectEvent } from 'ol/interaction/Select'
import { Attributes } from 'ol-ext/interaction/GeolocationDraw';
import BaseEvent from 'ol/events/Event';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';

export enum AttributeEventType {
    SETATTRIBUTESTART = 'setattributestart',
    SETATTRIBUTEEND = 'setattributeend'
}

export interface Options extends SelectOptions {
    active?: boolean;
    name?: string;
    cursor?: boolean | string;
}
/** A Select interaction to fill feature's properties on click.
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires setattributestart
 * @fires setattributeend
 * @param {*} options extentol.interaction.Select options
 *  @param {boolean} options.active activate the interaction on start, default true
 *  @param {string=} options.name
 *  @param {boolean|string} options.cursor interaction cursor if false use default, default use a paint bucket cursor
 * @param {*} properties The properties as key/value
 */
export default class FillAttribute extends Select {
    constructor(options: Options, properties: { [key: string]: any });
    /** Activate the interaction
     * @param {boolean} active
     */
    setActive(active: boolean): void;
    /** Set attributes
     * @param {*} properties The properties as key/value
     */
    setAttributes(properties: { [key: string]: any }): void;
    /** Set an attribute
     * @param {string} key
     * @param {*} val
     */
    setAttribute(key: string, val: any): void;
    /** get attributes
     * @return {*} The properties as key/value
     */
    getAttributes(): any;
    /** Get an attribute
     * @param {string} key
     * @return {*} val
     */
    getAttribute(key: string): any;
    /** Fill feature attributes
     * @param {Array<Feature>} features The features to modify
     * @param {*} properties The properties as key/value
     */
    fill(features: Feature[], properties: { [key: string]: any }): void;

    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:active', listener: (evt: ObjectEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'select', listener: (evt: SelectEvent) => void): EventsKey;
    once(type: 'select', listener: (evt: SelectEvent) => void): EventsKey;
    un(type: 'select', listener: (evt: SelectEvent) => void): void;

    on(type: 'setattributestart', listener: (evt: AttributeEvent) => void): EventsKey;
    once(type: 'setattributestart', listener: (evt: AttributeEvent) => void): EventsKey;
    un(type: 'setattributestart' , listener: (evt: AttributeEvent) => void): void;

    on(type: 'setattributeend', listener: (evt: AttributeEvent) => void): EventsKey;
    once(type: 'setattributeend', listener: (evt: AttributeEvent) => void): EventsKey;
    un(type: 'setattributeend' , listener: (evt: AttributeEvent) => void): void;
}

export class AttributeEvent extends BaseEvent {
    constructor(type: AttributeEventType,
        properties: { [key: string]: any }
    );
    properties: { [key: string]: any };
}
