import type Collection from 'ol/Collection'
import type { Coordinate } from 'ol/coordinate'
import type Feature from 'ol/Feature'
import type VectorSource from 'ol/source/Vector'
import { Interaction } from 'ol/interaction'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'

type SplitterOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'beforesplit', BeforeSplitEvent, Return> &
  OnSignature<'aftersplit', AfterSplitEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'beforesplit' | 'aftersplit', Return>

export interface Options {
  /** Target source with spatial indexing enabled. */
  source?: VectorSource;
  /** Documented upstream, but ignored by the 4.0.39 constructor. */
  triggerSource?: VectorSource;
  /** Features to split, used instead of the target source. */
  features?: Collection<Feature>;
  /** Features whose additions and changes trigger splits. */
  triggerFeatures?: Collection<Feature>;
  /** Documented upstream, but not applied by the 4.0.39 split implementation. */
  filter?: (feature: Feature) => boolean;
  tolerance?: number;
  alignTolerance?: number;
}

/** Interaction that splits line features while editing. */
export default class Splitter extends Interaction {
  constructor(options?: Options);

  /** Calculate the intersection of two segments, or false when they do not intersect. */
  intersectSegs(first: [Coordinate, Coordinate], second: [Coordinate, Coordinate]): Coordinate | false;

  on: SplitterOnSignature<EventsKey>
  once: SplitterOnSignature<EventsKey>
  un: SplitterOnSignature<void>
}

/** The upstream payload spells the feature field `feaure`. */
export interface BeforeSplitEvent extends BaseEvent {
  type: 'beforesplit';
  feaure: Feature;
  source: VectorSource;
}

export interface AfterSplitEvent extends BaseEvent {
  type: 'aftersplit';
  featureAdded: Feature[];
  featureRemoved: Feature[];
  source: VectorSource;
}
