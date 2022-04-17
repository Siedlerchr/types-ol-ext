import { Interaction } from 'ol/interaction';
import { Condition as EventsConditionType } from 'ol/events/condition';
import { Map as _ol_Map_ } from 'ol';
import BaseEvent from 'ol/events/Event';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';

type CurrentMapOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'focus', FocusEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'focus', Return>;

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

    on: CurrentMapOnSignature<EventsKey>;
    once: CurrentMapOnSignature<EventsKey>;
    un: CurrentMapOnSignature<void>;
}

export class FocusEvent extends BaseEvent {
    constructor(
        type: 'focus',
        map: _ol_Map_
    );
    map: _ol_Map_
}
