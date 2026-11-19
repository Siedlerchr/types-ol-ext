import type { Map as _ol_Map_ } from 'ol'
import type Feature from 'ol/Feature'
import type { Layer } from 'ol/layer'
import type { StyleLike } from 'ol/style/Style'
import type { Options as DrawOptions, DrawEvent } from 'ol/interaction/Draw'
import Draw from 'ol/interaction/Draw'
import type Collection from 'ol/Collection'
import type { EventsKey } from 'ol/events'
import type BaseEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import type VectorLayer from 'ol/layer/Vector'
import type VectorSource from 'ol/source/Vector'
import type { Geometry, Polygon } from 'ol/geom'

type DrawHoleOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'drawabort' | 'drawstart', DrawEvent, Return> &
  OnSignature<'drawend', DrawHoleEndEvent, Return> &
  OnSignature<'modifyend' | 'modifystart', DrawHoleModifyEvent, Return> &
  OnSignature<'drawabort' | 'drawend' | 'drawstart', DrawEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'drawabort' | 'drawend' | 'drawstart' | 'modifyend' | 'modifystart', Return>;

export interface Options extends Omit<DrawOptions, 'type'> {
  layers?: VectorLayer<VectorSource<Feature<Geometry>>>[] | ((l: Layer) => boolean);
  featureFilter?: Feature[] | Collection<Feature> | ((feature: Feature, layer: Layer) => boolean);
  style?: StyleLike;
}

/** Interaction to draw holes in a polygon.
 * It fires a drawstart, drawend event when drawing the hole
 * and a modifystart, modifyend event before and after inserting the hole in the feature geometry.
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires drawstart
 * @fires drawend
 * @fires modifystart
 * @fires modifyend

 */
export default class DrawHole extends Draw {
  /**
   * @param {Options} options extend olx.interaction.DrawOptions
   *  @param {Array<VectorLayer> | function | undefined} options.layers A list of layers from which polygons should be selected. Alternatively, a filter function can be provided. default: all visible layers
   *  @param {Array<Feature> | Collection<Feature> | function | undefined} options.featureFilter An array or a collection of features the interaction applies on or a function that takes a feature and a layer and returns true if the feature is a candidate
   *  @param { Style | Array<Style> | StyleFunction | undefined }  Style for the selected features, default: default edit style
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
   * Activate/deactivate the interaction
   * @param {boolean}
   * @api stable
   */
  setActive(b: boolean): void;

  /**
   * Remove last point of the feature currently being drawn
   * (test if points to remove before).
   */
  removeLastPoint(): void;

  /**
   * Get the current polygon to hole
   * @return {Polygon}
   */
  getPolygon(): Polygon | undefined;

  on: DrawHoleOnSignature<EventsKey>

  once: DrawHoleOnSignature<EventsKey>

  un: DrawHoleOnSignature<void>
}

/** The selected polygon feature and the drawn hole. */
export interface DrawHoleEndEvent extends DrawEvent {
  hole: Feature<Polygon>;
}

/** Modification events are plain objects with the affected feature array. */
export interface DrawHoleModifyEvent extends BaseEvent {
  type: 'modifystart' | 'modifyend';
  features: Feature[];
}
