import type { Map as _ol_Map_, MapBrowserEvent } from 'ol'
import { Interaction } from 'ol/interaction'
import type Event from 'ol/events/Event'
import type { FeatureLike } from 'ol/Feature'
import type { Layer } from 'ol/layer'
import type BaseEvent from 'ol/events/Event'
import type { Pixel } from 'ol/pixel'
import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'

type HoverOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'hover' | 'enter', HoverFeatureEvent, Return> &
  OnSignature<'leave', HoverLeaveEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'hover' | 'enter' | 'leave', Return>;

export type HoverEventType = 'hover' | 'enter' | 'leave'

export interface Options {
  cursor?: string;
  featureFilter?: (feature: FeatureLike, layer: Layer | null) => boolean;
  layerFilter?: (layer: Layer) => boolean;
  layers?: Array<Layer>;
  hitTolerance?: number;
  handleEvent?: (event: MapBrowserEvent) => boolean;
}

/** Interaction hover do to something when hovering a feature
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires hover, enter, leave

 */
export default class Hover extends Interaction {
  /**
   * @param {olx.interaction.HoverOptions}
   *  @param { string | undefined } options.cursor css cursor propertie or a function that gets a feature, default: none
   *  @param {function | undefined} options.featureFilter filter a function with two arguments, the feature and the layer of the feature. Return true to select the feature
   *  @param {function | undefined} options.layerFilter filter a function with one argument, the layer to test. Return true to test the layer
   *  @param {Array<ol.layer> | undefined} options.layers a set of layers to test
   *  @param {number | undefined} options.hitTolerance Hit-detection tolerance in pixels.
   *  @param { function | undefined } options.handleEvent Method called by the map to notify the interaction that a browser event was dispatched to the map. The function may return false to prevent the propagation of the event to other interactions in the map's interactions chain.
   */
  constructor(options?: Options);

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_ | null): void;

  /**
   * Set cursor on hover
   * @param { string } cursor css cursor propertie or a function that gets a feature, default: none
   * @api stable
   */
  setCursor(cursor?: string): void;

  /** Feature filter to get only one feature
   * @param {function} filter a function with two arguments, the feature and the layer of the feature. Return true to select the feature
   */
  setFeatureFilter(filter?: (feature: FeatureLike, layer: Layer | null) => boolean): void;

  /** Feature filter to get only one feature
   * @param {function} filter a function with one argument, the layer to test. Return true to test the layer
   */
  setLayerFilter(filter?: (layer: Layer) => boolean): void;

  /** Activate / deactivate interaction
   * @param {boolean} b
   */
  setActive(b: boolean): void

  on: HoverOnSignature<EventsKey>

  once: HoverOnSignature<EventsKey>

  un: HoverOnSignature<void>
}

export interface HoverEvent extends BaseEvent {
  type: HoverEventType;
  coordinate: Coordinate;
  pixel: Pixel;
  map: _ol_Map_;
  originalEvent: PointerEvent;
  dragging: boolean;
}

export interface HoverFeatureEvent extends HoverEvent {
  type: 'hover' | 'enter';
  feature: FeatureLike;
  layer: Layer | null;
}

export interface HoverLeaveEvent extends HoverEvent {
  type: 'leave';
}
