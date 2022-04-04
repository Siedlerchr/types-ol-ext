import { Interaction } from 'ol/interaction';
import { Map as _ol_Map_ } from 'ol';
import BaseEvent from 'ol/events/Event';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';

type FocusMapOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'focus', FocusEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'focus', Return>;

/** An interaction to focus on the map on click. Usefull when using keyboard event on the map.
 * @constructor
 * @fires focus
 * @extends {Interaction}
 */
export default class FocusMap extends Interaction {
    /** Set the map > add the focus button and focus on the map when pointerdown to enable keyboard events.
     */
    setMap(map: _ol_Map_): void;

    on: FocusMapOnSignature<EventsKey>;
    once: FocusMapOnSignature<EventsKey>;
    un: FocusMapOnSignature<void>;
}
export class FocusEvent extends BaseEvent {
    constructor(type: 'focus');
}
