import type { Map as _ol_Map_ } from 'ol'
import type Collection from 'ol/Collection'
import type Feature from 'ol/Feature'
import type { Layer } from 'ol/layer'
import type { Fill, Stroke, Style } from 'ol/style'
import { Pointer } from 'ol/interaction'
import type MapBrowserEvent from 'ol/MapBrowserEvent'
import type { Condition as EventsConditionType } from 'ol/events/condition'
import type { Coordinate } from 'ol/coordinate'
import BaseEvent from 'ol/events/Event'
import type { Geometry } from 'ol/geom'
import type { Pixel } from 'ol/pixel'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'

type TransformOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'rotatestart' | 'rotating' | 'rotateend', RotateEvent, Return> &
  OnSignature<Types | 'scalestart' | 'scaling' | 'scaleend', ScaleEvent, Return> &
  OnSignature<Types | 'translatestart' | 'translating' | 'translateend', TranslateEvent, Return> &
  OnSignature<Types | 'select', SelectEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'rotatestart' | 'rotating' | 'rotateend' | 'scalestart' | 'scaling' | 'scaleend' | 'translatestart' | 'translating' | 'translateend' | 'select', Return>

export interface Options {
  filter?: (f: Feature, l: Layer) => boolean;
  layers?: Layer[];
  features?: Collection<Feature>;
  addCondition?: EventsConditionType;
  hitTolerance?: number;
  translateFeature?: boolean;
  translate?: boolean;
  translateBBox?: boolean;
  stretch?: boolean;
  scale?: boolean;
  rotate?: boolean;
  noFlip?: boolean;
  selection?: boolean;
  keepAspectRatio?: EventsConditionType;
  modifyCenter?: EventsConditionType;
  enableRotatedTransform?: boolean;
  keepRectangle?: boolean;
  style?: any;
  pointRadius?: number | number[] | ((f: Feature) => number | number[]);
}

export enum RotateEventType {
  ROTATESTART = 'rotatestart',
  ROTATING = 'rotating',
  ROTATEEND = 'rotateend',
}

export enum ScaleEventType {
  SCALESTART = 'scalestart',
  SCALING = 'scaling',
  SCALEEND = 'scaleend',
}

export enum TranslateEventType {
  TRANSLATESTART = 'translatestart',
  TRANSLATING = 'translating',
  TRANSLATEEND = 'translateend',
}

export type SelectEventType = 'select';
/**
 * Interaction transform
 *
 * @fires select | rotatestart | rotating | rotateend | translatestart | translating | translateend | scalestart | scaling | scaleend
 *

 */

export type olExtStyle =
  'default'
  | 'translate'
  | 'rotate'
  | 'rotate0'
  | 'scale'
  | 'scale1'
  | 'scale2'
  | 'scale3'
  | 'scalev'
  | 'scaleh1'
  | 'scalev2'
  | 'scaleh3'

export interface OlExtTransformDefaultStyle {
  stroke?: Stroke;
  fill?: Fill;
  pointStroke?: Stroke;
  pointFill?: Fill
}

export default class Transform extends Pointer {
  /**
   * @param options
   * @param options.filter A function that takes a Feature and a Layer and returns true if the feature may be transformed or false otherwise.
   * @param options.layers array of layers to transform,
   * @param options.features collection of feature to transform,
   * @param options.addCondition A function that takes an MapBrowserEvent and returns a boolean to indicate whether that event should be handled. default: events.condition.never.
   * @param options.hitTolerance Tolerance to select feature in pixel, default 0
   * @param options.translateFeature Translate when click on feature
   * @param options.translateBBox Enable translate when the user drags inside the bounding box
   * @param options.translate Can translate the feature
   * @param options.stretch can stretch the feature
   * @param options.scale can scale the feature
   * @param options.rotate can rotate the feature
   * @param options.noFlip prevent the feature geometry to flip, default false
   * @param options.selection the intraction handle selection/deselection, if not use the select prototype to add features to transform, default true
   * @param options.keepAspectRatio A function that takes an MapBrowserEvent and returns a boolean to keep aspect ratio, default events.condition.shiftKeyOnly.
   * @param options.modifyCenter A function that takes an MapBrowserEvent and returns a boolean to apply scale & strech from the center, default events.condition.metaKey or events.condition.ctrlKey.
   * @param options.enableRotatedTransform Enable transform when map is rotated
   * @param options.style list of style for handles
   * @param {number|Array<number>|function} [options.pointRadius=0] radius for points or a function that takes a feature and returns the radius (or [radiusX, radiusY]). If not null show handles to transform the points
   */
  constructor(options?: Options);

  /**
   * Cursors for transform
   */
  Cursors: {
    default: string;
    select: string;
    translate: string;
    rotate: string;
    rotate0: string;
    scale: string;
    scale1: string;
    scale2: string;
    scale3: string;
    scalev: string;
    scaleh1: string;
    scalev2: string;
    scaleh3: string;
  }

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

  /**
   * Activate/deactivate interaction
   * @param
   * @api stable
   */
  setActive(b: boolean): void;

  /**
   * Set default sketch style
   * @param {OlExtTransformDefaultStyle} options Style options for the default style
   * @param {Stroke} options.stroke Stroke style for selection rectangle
   * @param {Fill} options.fill Fill style for selection rectangle
   * @param {Stroke} options.pointStroke Stroke style for handles
   * @param {Fill} options.pointFill Fill style for handles
   */
  setDefaultStyle(options?: OlExtTransformDefaultStyle): void;

  /**
   * Style for handles
   */
  style: any

  /**
   * Set sketch style.
   * @param style Style name: 'default','translate','rotate','rotate0','scale','scale1','scale2','scale3','scalev','scaleh1','scalev2','scaleh3'
   * @param olstyle
   * @api stable
   */
  setStyle(style: olExtStyle, olstyle: Style | Style[]): void;

  /**
   * Draw transform sketch
   * @param draw only the center
   */
  drawSketch_(draw: boolean): void;

  /**
   * Select a feature to transform
   * @param feature the feature to transform
   * @param add true to add the feature to the selection, default false
   */
  select(feature: Feature | undefined, add: boolean): void;

  /** Update the selection collection.
  * @param {Collection<Feature>} features the features to transform
  */
  setSelection(features: Collection<Feature>): void

  /**
   * @param evt Map browser event.
   * @return `true` to start the drag sequence.
   */
  handleDownEvent_(evt: MapBrowserEvent<UIEvent>): boolean;

  /**
   * Get features to transform
   * @return
   */
  getFeatures(): Collection<Feature>;

  /**
   * Get the rotation center
   * @return
   */
  getCenter(): Coordinate | undefined;

  /**
   * Set the rotation center
   * @param c the center point, default center on the objet
   */
  setCenter(c: Coordinate | undefined): void;

  /**
   * @param evt Map browser event.
   */
  handleDragEvent_(evt: MapBrowserEvent<UIEvent>): void;

  /**
   * @param evt Event.
   */
  handleMoveEvent_(evt: MapBrowserEvent<UIEvent>): void;

  /**
   * @param evt Map browser event.
   * @return `false` to stop the drag sequence.
   */
  handleUpEvent_(evt: MapBrowserEvent<UIEvent>): boolean;

  on: TransformOnSignature<EventsKey>

  once: TransformOnSignature<EventsKey>

  un: TransformOnSignature<void>
}

export class RotateEvent extends BaseEvent {
  constructor(
    type: RotateEventType,
    feature: Feature<Geometry>,
    features: Collection<Feature<Geometry>>,
    angle: number,
    pixel: Pixel,
    coordinate: Coordinate
  );

  feature: Feature<Geometry>

  features: Collection<Feature<Geometry>>

  angle: number

  pixel: Pixel

  coordinate: Coordinate
}

export class ScaleEvent extends BaseEvent {
  constructor(
    type: ScaleEventType,
    feature: Feature<Geometry>,
    features: Collection<Feature<Geometry>>,
    scale: [number, number],
    pixel: Pixel,
    coordinate: Coordinate
  );

  feature: Feature<Geometry>

  features: Collection<Feature<Geometry>>

  scale: [number, number]

  pixel: Pixel

  coordinate: Coordinate
}

export class TranslateEvent extends BaseEvent {
  constructor(
    type: string,
    feature: Feature<Geometry>,
    features: Collection<Feature<Geometry>>,
    delta: [number, number],
    pixel: Pixel,
    coordinate: Coordinate
  );

  feature: Feature<Geometry>

  features: Collection<Feature<Geometry>>

  delta: [number, number]

  pixel: Pixel

  coordinate: Coordinate
}

export class SelectEvent extends BaseEvent {
  constructor(
    type: SelectEventType,
    feature: Feature<Geometry>,
    features: Collection<Feature<Geometry>>
  )

  feature: Feature<Geometry>

  features: Collection<Feature<Geometry>>

  pixel: Pixel

  coordinate: Coordinate
}
