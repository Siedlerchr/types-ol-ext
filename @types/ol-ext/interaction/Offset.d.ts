import type { Map as _ol_Map_ } from 'ol'
import type Collection from 'ol/Collection'
import type Feature from 'ol/Feature'
import type { Layer } from 'ol/layer'
import type VectorLayer from 'ol/layer/Vector'
import type { Vector as VectorSource } from 'ol/source'
import { Pointer } from 'ol/interaction'
import type { StyleLike } from 'ol/style/Style'
import type BaseEvent from 'ol/events/Event'
import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import type { Geometry } from 'ol/geom'

type OffsetOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'offsetstart', OffsetStartEvent, Return> &
  OnSignature<'offsetting', OffsettingEvent, Return> &
  OnSignature<'offsetend', OffsetEndEvent, Return> &
  OnSignature<'modifystart', OffsetModifyStartEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'change:active' | 'error' | 'propertychange' | 'offsetstart' | 'offsetting' | 'offsetend' | 'modifystart', Return>

export interface Options {
  filter?: (f: Feature, l: Layer) => boolean;
  layers?: VectorLayer<VectorSource<Feature<Geometry>>> | VectorLayer<VectorSource<Feature<Geometry>>>[];
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
  setMap(map: _ol_Map_ | null): void;

  on: OffsetOnSignature<EventsKey>

  once: OffsetOnSignature<EventsKey>

  un: OffsetOnSignature<void>
}

export interface OffsetStartEvent extends BaseEvent {
  type: 'offsetstart';
  feature: Feature

  offset: number
}

export interface OffsettingEvent extends BaseEvent {
  type: 'offsetting';
  feature: Feature

  offset: number

  segment: [Coordinate, Coordinate]

  coordinate: Coordinate
}

export interface OffsetEndEvent extends BaseEvent {
  type: 'offsetend';
  feature: Feature

  coordinate: Coordinate
}

export interface OffsetModifyStartEvent extends BaseEvent {
  type: 'modifystart';
  features: Feature[];
}
