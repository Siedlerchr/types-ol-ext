import { Interaction } from 'ol/interaction';
import { Condition as EventsConditionType } from 'ol/events/condition';
import { Map as _ol_Map_ } from 'ol';
import BaseEvent from 'ol/events/Event';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';

export interface KeyEvent {
    type: string;
    map: _ol_Map_;
    originalEvent: KeyboardEvent;
}

export interface Options {
    conditon?: EventsConditionType;
    onKeyDown?: (e: KeyEvent) => void;
    onKeyPress?: (e: KeyEvent) => void;
    onKeyUp?: (e: KeyEvent) => void;
}

/** An interaction to check the current map and add key events listeners.
 * It will fire a 'focus' event on the map when map is focused (use mapCondition option to handle the condition when the map is focused).
 * @constructor
 * @fires focus
 * @param {*} options
 *  @param {function} condition a function that takes a mapBrowserEvent and returns true if the map must be activated, default always true
 *  @param {function} onKeyDown a function that takes a keydown event is fired on the active map
 *  @param {function} onKeyPress a function that takes a keypress event is fired on the active map
 *  @param {function} onKeyUp a function that takes a keyup event is fired on the active map
 * @extends {ol_interaction_Interaction}
 */
declare class CurrentMap extends Interaction {
    constructor(options?: Options);
    /** Check if is the current map
     * @return {boolean}
     */
    isCurrentMap(): boolean;
    /** Get the current map
     * @return {ol.Map}
     */
    getCurrentMap(): any;
    /** Set the current map
     * @param {ol.Map} map
     */
    setCurrentMap(map: _ol_Map_): void;
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
    on(type: 'focus', listener: (p0: FocusEvent) => void): EventsKey | EventsKey[];
    once(type: 'focus', listener: (p0: FocusEvent) => void): EventsKey | EventsKey[];
    un(type: 'focus', listener: (p0: FocusEvent) => void): void;
}

export class FocusEvent extends BaseEvent {
    constructor(
        type: 'focus',
        map: _ol_Map_
    );
    map: _ol_Map_
}
