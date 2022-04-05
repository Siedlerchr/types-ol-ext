import { Map as _ol_Map_ } from "ol";
import Collection from "ol/Collection";
import Feature from "ol/Feature";
import { Geometry, Point, Polygon } from "ol/geom";
import { Vector as VectorSource } from "ol/source";
import { StyleLike } from "ol/style/Style";
import { Interaction } from "ol/interaction";
import MapBrowserEvent from "ol/MapBrowserEvent";
import { Condition as EventsConditionType } from "ol/events/condition";
import { condition } from "../control/SelectBase";
import { EventsKey } from "ol/events";
import BaseEvent from "ol/events/Event";
import { ObjectEvent } from "ol/Object";
import { Pixel } from "ol/pixel";
import { Coordinate } from "ol/coordinate";
import { CombinedOnSignature, EventTypes, OnSignature } from "ol/Observable";
import { Types } from "ol/ObjectEventType";

type DrawRegularOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'drawabort' | 'drawend' | 'drawstart' | 'drawing', DrawEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'drawabort' | 'drawend' | 'drawstart' | 'drawing', Return>;
export interface Options {
  source?: VectorSource;
  features?: Collection<Feature>;
  style?: StyleLike;
  sides?: number;
  condition?: EventsConditionType;
  squareCondition?: EventsConditionType;
  centerCondition?: EventsConditionType;
  canRotate?: boolean;
  geometryName?: string;
  clickTolerance?: number;
  maxCircleCoordinates?: number;
}
/** Interaction rotate
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires drawstart, drawing, drawend, drawcancel
 * @param {olx.interaction.TransformOptions} options
 *  @param {Array<ol.Layer>} options.source Destination source for the drawn features
 *  @param {ol.Collection<ol.Feature>} options.features Destination collection for the drawn features
 *  @param {ol.style.Style | Array.<ol.style.Style> | ol.style.StyleFunction | undefined} options.style style for the sketch
 *  @param {integer} options.sides number of sides, default 0 = circle
 *  @param { ol.events.ConditionType | undefined } options.condition A function that takes an ol.MapBrowserEvent and returns a boolean that event should be handled. By default module:ol/events/condition.always.
 *  @param { ol.events.ConditionType | undefined } options.squareCondition A function that takes an ol.MapBrowserEvent and returns a boolean to draw square features. Default test shift key
 *  @param { ol.events.ConditionType | undefined } options.centerCondition A function that takes an ol.MapBrowserEvent and returns a boolean to draw centered features. Default check Ctrl key
 *  @param { bool } options.canRotate Allow rotation when centered + square, default: true
 *  @param { string } [options.geometryName=geometry]
 *  @param { number } options.clickTolerance click tolerance on touch devices, default: 6
 *  @param { number } options.maxCircleCoordinates Maximum number of point on a circle, default: 100
 */
export default class DrawRegular extends Interaction {
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
   * Reset the interaction
   * @api stable
   */
  reset(): void;
  /**
   * Set the number of sides.
   * @param {number} number of sides.
   * @api stable
   */
  setSides(number: number): void;
  /**
   * Allow rotation when centered + square
   * @param {bool}
   * @api stable
   */
  canRotate(b: boolean): void;
  /**
   * Get the number of sides.
   * @return {number} number of sides.
   * @api stable
   */
  getSides(): number;
  /** Default start angle array for each sides
   */
  startAngle: {
    default: number;
    3: number;
    4: number;
  };
  /** Get geom of the current drawing
   * @return {Polygon | Point}
   */
  getGeom_(): Polygon | Point;
  /** Draw sketch
   * @return {Feature} The feature being drawn.
   */
  drawSketch_(): Feature;
  /** Draw sketch (Point)
   */
  drawPoint_(): void;
  /**
   * @param {MapBrowserEvent} evt Map browser event.
   */
  handleEvent_(evt: MapBrowserEvent<UIEvent>): void;
  /** Stop drawing.
   */
  finishDrawing(): void;
  /**
   * @param {MapBrowserEvent} evt Event.
   */
  handleMoveEvent_(evt: MapBrowserEvent<UIEvent>): void;
  /** Start an new draw
   * @param {MapBrowserEvent} evt Map browser event.
   * @return {boolean} `false` to stop the drag sequence.
   */
  start_(evt: MapBrowserEvent<UIEvent>): boolean;
  /** End drawing
   * @param {MapBrowserEvent} evt Map browser event.
   * @return {boolean} `false` to stop the drag sequence.
   */
  end_(evt: MapBrowserEvent<UIEvent>): boolean;

  on: DrawRegularOnSignature<EventsKey>;
  once: DrawRegularOnSignature<EventsKey>;
  un: DrawRegularOnSignature<void>;
}
declare enum DrawEventType {
  DRAWSTART = "drawstart",
  DRAWEND = "drawend",
  DRAWCANCEL = "drawcancel",
  DRAWING = "drawing",
}
export class DrawEvent extends BaseEvent {
  constructor(type: DrawEventType, feature: Feature<Geometry>);
  /**
   * The feature being drawn.
   */
  feature: Feature<Geometry>;
  pixel: Pixel;
  coordinate: Coordinate;
  square?: boolean;
  centered?: boolean;
  oldValue?: string;
}
