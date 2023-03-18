import type { Map as _ol_Map_ } from 'ol'
import type Collection from 'ol/Collection'
import type { Coordinate } from 'ol/coordinate'
import type Feature from 'ol/Feature'
import type { Style, Stroke, Fill } from 'ol/style'
import type { Extent } from 'ol/extent'
import type { Size } from 'ol/size'
import type { Vector as VectorSource } from 'ol/source'
import type { EventsKey } from 'ol/events'
import BaseEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import CanvasBase from './CanvasBase'
import type { Options as CanvasOptions } from './CanvasBase'

type GridReferenceOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'select', GridReferenceSelectEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'select', Return>;

export enum GridReferenceEventType {
  SELECT = 'select',
}

export interface Options extends CanvasOptions {
  style?: Style;
  maxResolution?: number;
  extent?: Extent;
  size?: Size;
  margin?: number;
  source?: VectorSource;
  property?: string | ((feature: Feature) => string);
  sortFeatures?: (a: Feature, b: Feature) => number;
  indexTitle?: (feature: Feature) => string;
  filterLabel?: string;
}

/**
 * Draw a grid reference on the map and add an index.
 *
 * @constructor
 * @extends {contrCanvasBase}
 * @fires select
 */
export default class GridReference extends CanvasBase {
  /**
   * @param {Object=} options
   *  @param {Style} options.style Style to use for drawing the grid (stroke and text), default black.
   *  @param {number} options.maxResolution max resolution to display the graticule
   *  @param {Extent} options.Extent Extent of the grid, required
   *  @param {Size} options.Size number of lines and cols, required
   *  @param {number} options.margin margin to display text (in px), default 0px
   *  @param {VectorSource} options.source source to use for the index, default none (use setIndex to reset the index)
   *  @param {string | function} options.property a property to display in the index or a function that takes a feature and return the name to display in the index, default 'name'.
   *  @param {function|undefined} options.sortFeatures sort function to sort 2 features in the index, default sort on property option
   *  @param {function|undefined} options.indexTitle a function that takes a feature and return the title to display in the index, default the first letter of property option
   *  @param {string} options.filterLabel label to display in the search bar, default 'filter'
   */
  constructor(Control?: Options);

  /** Returns the text to be displayed in the index
   * @param {Feature} f the feature
   * @return {string} the text to be displayed in the index
   * @api
   */
  getFeatureName(f: Feature): string;

  /** Sort function
   * @param {Feature} a first feature
   * @param {Feature} b second feature
   * @return {Number} 0 if a==b, -1 if a<b, 1 if a>b
   * @api
   */
  sortFeatures(a: Feature, b: Feature): number;

  /** Get the feature title
   * @param {Feature} f
   * @return the first letter of the feature name (getFeatureName)
   * @api
   */
  indexTitle(f: Feature): string;

  /** Display features in the index
   * @param { Array<Feature> | Collection<Feature> } features
   */
  setIndex(features: Feature[] | Collection<Feature>): void;

  /** Get reference for a coord
   *  @param {Coordinate} coords
   *  @return {string} the reference
   */

  /** Get vertical index (0,1,2,3...)
   * @param {number} index
   * @returns {string}
   * @api
   */
  getVIndex(index: number): string;

  /** Get horizontal index (A,B,C...)
   * @param {number} index
   * @returns {string}
   * @api
   */
  getHIndex(index: number): string;

  getReference(coords: Coordinate): string;

  /**
   * Remove the control from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {_ol_Map_} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

  /** Get canvas overlay
   */
  getCanvas(): HTMLCanvasElement;

  /** Set Style
   * @api
   */
  setStyle(): void;

  /** Get style
   * @api
   */
  getStyle(): Style;

  /** Get stroke
   * @api
   */
  getStroke(): Stroke;

  /** Get fill
   * @api
   */
  getFill(): Fill;

  /** Get stroke
   * @api
   */
  getTextStroke(): Stroke;

  /** Get text fill
   * @api
   */
  getTextFill(): Fill;

  /** Get text font
   * @api
   */
  getTextFont(): string;

  on: GridReferenceOnSignature<EventsKey>

  once: GridReferenceOnSignature<EventsKey>

  un: GridReferenceOnSignature<void>
}

export class GridReferenceSelectEvent extends BaseEvent {
  constructor(type: GridReferenceEventType, feature: Feature);

  feature: Feature
}
