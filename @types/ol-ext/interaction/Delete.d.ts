import type Collection from 'ol/Collection'
import type { EventsKey } from 'ol/events'
import type Feature from 'ol/Feature'
import { Select } from 'ol/interaction'
import type { ObjectEvent } from 'ol/Object'
import type BaseEvent from 'ol/events/Event'
import type { Geometry } from 'ol/geom'
import type { Options as SelectOptions, SelectEvent } from 'ol/interaction/Select'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'

type DeleteOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'select', SelectEvent, Return> &
  OnSignature<'deletestart', DeleteStartEvent, Return> &
  OnSignature<'deleteend', DeleteEndEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'select' | 'deletestart' | 'deleteend', Return>;

export interface Options extends SelectOptions {}

export type DeleteEventType = 'deletestart' | 'deleteend'

/** A Select interaction to delete features on click.
 * @constructor
 * @extends {Interaction}
 * @fires deletestart
 * @fires deleteend
 */
export default class Delete extends Select {
  /**
   * @param {*} options interaction.Select options
   */
  constructor(options?: Options);

  /** Delete features: remove the features from the map (from all layers in the map)
   * @param {Collection<Feature>|Array<Feature>} features The features to delete
   * @api
   */
  delete(features: Collection<Feature> | Feature[]): void;

  on: DeleteOnSignature<EventsKey>

  once: DeleteOnSignature<EventsKey>

  un: DeleteOnSignature<void>
}

export interface DeleteEvent extends BaseEvent {
  type: DeleteEventType;
  features: Collection<Feature<Geometry>> | Feature<Geometry>[];
}

export interface DeleteStartEvent extends DeleteEvent {
  type: 'deletestart';
}

export interface DeleteEndEvent extends DeleteEvent {
  type: 'deleteend';
  features: Feature<Geometry>[];
}
