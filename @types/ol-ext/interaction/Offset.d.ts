import type { Map as _ol_Map_ } from 'ol'
import type Collection from 'ol/Collection'
import type Feature from 'ol/Feature'
import type { Layer, Vector } from 'ol/layer'
import type { Vector as VectorSource } from 'ol/source'
import { Pointer } from 'ol/interaction'
import type { StyleLike } from 'ol/style/Style'
import BaseEvent from 'ol/events/Event'
import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import type { Geometry } from 'ol/geom'

type OffsetOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'offsetstart', OffsetStartEvent, Return> &
  OnSignature<Types | 'offsetting', OffsettingEvent, Return> &
  OnSignature<Types | 'offsetend', OffsetEndEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'change:active' | 'error' | 'propertychange' | 'offsetstart' | 'offsetting' | 'offsetend', Return>

export interface Options {
  filter?: (f: Feature, l: Layer) => boolean;
  layers?: Vector<VectorSource<Geometry>> | Vector<VectorSource<Geometry>>[];
  features?: Collection<Feature>;
  source?: VectorSource;
  duplicate?: boolean;
  style?: StyleLike;
}

/** Offset interaction for offseting feature geometry
 * @constructor
 * @extends {Pointer}
 * @fires offsetstart
 * @fires offsetting
 * @fires offsetend
 * @param {Options} options
 *  @param {Function} [options.filter] a function that takes a feature and a layer and return true if the feature can be modified
 *  @param {Vector | Array<Vector>} options.layers list of feature to transform
 *  @param {Collection<Feature>} options.features collection of feature to transform
 *  @param {VectorSource | undefined} options.source source to duplicate feature when ctrl key is down
 *  @param {boolean} options.duplicate force feature to duplicate (source must be set)
 *  @param {Style | Array<Style> | StyleFunction | undefined} style style for the sketch
 */
export default class Offset extends Pointer {
  constructor(option?: Options);

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

  on: OffsetOnSignature<EventsKey>

  once: OffsetOnSignature<EventsKey>

  un: OffsetOnSignature<void>
}

export class OffsetStartEvent extends BaseEvent {
  constructor(type: 'offsetstart',
              feature: Feature,
              offset: number
  );

  feature: Feature

  offset: number
}

export class OffsettingEvent extends BaseEvent {
  constructor(type: 'offsetting',
              feature: Feature,
              offset: number,
              segment: number[],
              coordinate: Coordinate
  );

  feature: Feature

  offset: number

  segment: number[]

  coordinate: Coordinate
}

export class OffsetEndEvent extends BaseEvent {
  constructor(type: 'offsetend',
              feature: Feature,
              coordinate: Coordinate
  );

  feature: Feature

  coordinate: Coordinate
}
