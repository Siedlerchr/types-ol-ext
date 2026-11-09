import type { Map as _ol_Map_ } from 'ol'
import type { Coordinate } from 'ol/coordinate'
import type { Vector as VectorSource } from 'ol/source'
import type { Style } from 'ol/style'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { CursorDrawEvent, CursorDrawEndEvent } from './TouchCursorDraw'
import CenterTouch from './CenterTouch'

export type DrawingType = 'Point' | 'LineString' | 'Polygon' | 'Circle'
type DrawTouchOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'drawstart' | 'drawabort', CursorDrawEvent, Return> &
  OnSignature<'drawend', CursorDrawEndEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'drawstart' | 'drawabort' | 'drawend', Return>

export interface Options {
  source?: VectorSource;
  type?: DrawingType;
  tap?: boolean;
  style?: Style | Style[];
  sketchStyle?: Style | Style[];
  targetStyle?: Style | Style[];
  composite?: string;
  active?: boolean;
}

/** Interaction DrawTouch : pointer is deferred to the center of the viewport and a target is drawn to materialize this point
 * The interaction modifies map browser event coordinate and pixel properties to force pointer on the viewport center to any interaction that them.
 * @constructor
 * @fires drawstart
 * @fires drawend
 * @fires drawabort
 * @extends {ol_interaction_CenterTouch}

 */export default class DrawTouch extends CenterTouch {
  /**
   * @param {olx.interaction.DrawOptions} options
   *  @param {ol.source.Vector | undefined} options.source Destination source for the drawn features.
   *  @param {ol.geom.GeometryType} options.type Drawing type ('Point', 'LineString', 'Polygon') not ('MultiPoint', 'MultiLineString', 'MultiPolygon' or 'Circle'). Required.
   *  @param {boolean} [options.tap=true] enable point insertion on tap, default true
   *  @param {ol.style.Style|Array<ol.style.Style>} [options.style] Drawing style
   *  @param {ol.style.Style|Array<ol.style.Style>} [options.sketchStyle] Sketch style
   *  @param {ol.style.Style|Array<ol.style.Style>} [options.targetStyle] a style to draw the target point, default cross style
   *  @param {string} [options.composite] composite operation : difference|multiply|xor|screen|overlay|darken|lighter|lighten|...
   */
  constructor(options?: Options);

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {Map} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_ | null): void;

  /** Set geometry type
   * @param {ol.geom.GeometryType} type
   */
  /** Get geometry type
   * @return {GeometryType}
   */
  getGeometryType(): DrawingType;

  /** Set geometry type. */
  setGeometryType(type: DrawingType): DrawingType;

  /** Start drawing and add the sketch feature to the target layer.
   * The interaction.Draw.EventType.DRAWEND event is dispatched before inserting the feature.
   */
  finishDrawing(): void;

  /** Add a new Point to the drawing
   */
  addPoint(): void;

  /** Remove last point of the feature currently being drawn.
   */
  removeLastPoint(): void;

  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   */
  setActive(active: boolean): void;

  /** Get the position of the target
   * @return {Coordinate}
   */
  getPosition(): Coordinate;

  on: DrawTouchOnSignature<EventsKey>
  once: DrawTouchOnSignature<EventsKey>
  un: DrawTouchOnSignature<void>
}
