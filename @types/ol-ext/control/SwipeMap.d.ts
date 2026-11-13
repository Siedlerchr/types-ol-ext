import type { Map as _ol_Map_ } from 'ol'
import type { Extent } from 'ol/extent'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { Size } from 'ol/size'

export interface SwipeMapMovingEvent extends BaseEvent {
  type: 'moving';
  size: Size;
  position: number[];
}
export type SwipeMapOnSignature<Return> = OnSignature<EventTypes, BaseEvent, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'moving', SwipeMapMovingEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'error' | 'propertychange' | 'moving', Return>

export interface Options extends ControlOptions {
  className?: string;
  position?: number,
  orientation?: 'vertical' | 'horizontal',
  right?: boolean;
}

/** A control that use a CSS clip rect to swipe the map
 * @classdesc Swipe Control.
 * @fires moving
 * @constructor
 * @extends {ol_control_Control}

 */
export default class SwipeMap extends ol_control_Control {
  /**
   * @param {Object=} Control options.
   *  @param {string} options.className control class name
   *  @param {number} options.position position property of the swipe [0,1], default 0.5
   *  @param {string} options.orientation orientation property (vertical|horizontal), default vertical
   *  @param {boolean} options.right true to position map on right side (resp. bottom for horizontal orientation), default false
   */
  constructor(options?: Options);

  on: SwipeMapOnSignature<EventsKey>;
  once: SwipeMapOnSignature<EventsKey>;
  un: SwipeMapOnSignature<void>;

  /** Set the map instance the control associated with.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_ | null): void;

  /** Get visible rectangle
   * @returns {ol.extent}
   */
  getRectangle(): Extent | undefined;
}
