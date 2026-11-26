import type Feature from 'ol/Feature'
import type { FeatureLike } from 'ol/Feature'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'
import type VectorSource from 'ol/source/Vector'

/** Event dispatched immediately before or after clearing a vector source. */
export interface VectorClearEvent extends BaseEvent {
  type: 'clearstart' | 'clearend';
}

/**
 * Vector source with the clear events installed by importing this module.
 * Use this type for event listeners because OpenLayers' `on` property cannot be augmented.
 */
export type ClearEventVectorSource<F extends FeatureLike = Feature> = VectorSource<F> & {
  on: OnSignature<'clearstart' | 'clearend', VectorClearEvent, EventsKey>;
  once: OnSignature<'clearstart' | 'clearend', VectorClearEvent, EventsKey>;
  un: OnSignature<'clearstart' | 'clearend', VectorClearEvent, void>;
}
