import { Map as _ol_Map_ } from 'ol';
import Feature from 'ol/Feature';
import { Layer, Vector } from 'ol/layer';
import { StyleLike } from 'ol/style/Style';
import { Draw, Options as DrawOptions, Interaction } from 'ol/interaction';
import Collection from 'ol/Collection';
import { EventsKey } from 'ol/events';
import { ModifyEvent } from 'ol/interaction/Modify';
import BaseEvent from 'ol/events/Event';
import { DrawEvent } from './DrawRegular';
import { ObjectEvent } from 'ol/Object';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';
import VectorSource from 'ol/source/Vector';
import { Geometry } from 'ol/geom';

type DrawHoleOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'drawabort' | 'drawend' | 'drawstart', DrawEvent, Return> &
  OnSignature<Types | 'modifyend' | 'modifystart', ModifyEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'drawabort' | 'drawend' | 'drawstart' | 'modifyend' | 'modifystart', Return>;

export interface Options extends DrawOptions {
  layers?: Vector<VectorSource<Geometry>>[] | ((l: Layer) => boolean);
  featureFilter?: Feature[] | Collection<Feature> | ((feature: Feature, layer: Layer) => boolean)
  style?: StyleLike
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
 * @param {Options} options extend olx.interaction.DrawOptions
 * 	@param {Array<VectorLayer> | function | undefined} options.layers A list of layers from which polygons should be selected. Alternatively, a filter function can be provided. default: all visible layers
 * 	@param {Array<Feature> | Collection<Feature> | function | undefined} options.featureFilter An array or a collection of features the interaction applies on or a function that takes a feature and a layer and returns true if the feature is a candidate
 * 	@param { Style | Array<Style> | StyleFunction | undefined }	Style for the selected features, default: default edit style
 */
export default class DrawHole extends Draw {
  constructor(options?: Options);
  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;
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
   * @return {Feature}
   */
  getPolygon(): Feature;

  on: DrawHoleOnSignature<EventsKey>;
  once: DrawHoleOnSignature<EventsKey>;
  un: DrawHoleOnSignature<void>;
}
