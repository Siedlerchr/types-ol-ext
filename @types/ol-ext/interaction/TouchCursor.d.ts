import type { Coordinate } from 'ol/coordinate'
import type { InteractionOptions } from 'ol/interaction/Interaction'
import type { Map as _ol_Map_, Overlay } from 'ol'
import type { Pixel } from 'ol/pixel'
import type { FrameState } from 'ol/Map'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature, CombinedOnSignature } from 'ol/Observable'
import type { DragEvent, DragOverlayOnSignature } from './DragOverlay'
import DragOverlay from './DragOverlay'

export interface CursorEvent extends BaseEvent {
  type: 'click' | 'dragstart' | 'dragging' | 'dragend';
  dragging: boolean;
  originalEvent: PointerEvent;
  frameState: FrameState;
  pixel: Pixel;
  coordinate: Coordinate;
}

export type TouchCursorOnSignature<Return> = DragOverlayOnSignature<Return, DragEvent | CursorEvent> &
  OnSignature<'click', CursorEvent, Return> & CombinedOnSignature<'click', Return>

export interface CursorButton {
  className?: string;
  html?: HTMLElement | string;
  click?: (event: MouseEvent) => void;
  on?: Record<string, EventListener>;
  before?: boolean;
}

export interface Options extends InteractionOptions {
  className?: string;
  coordinate?: Coordinate;
  anchor?: 'left' | 'center' | 'right';
  buttons?: CursorButton[];
  maxButtons?: number;
}

/** Handle a touch cursor to defer event position on overlay position
 * It can be used as abstract base class used for creating subclasses.
 * The TouchCursor interaction modifies map browser event coordinate and pixel properties to force pointer on the graphic cursor on the screen to any interaction that them.
 * @constructor
 * @extends {ol_interaction_DragOverlay}
 * @param {Options} options Options
 *  @param {string} [options.className] cursor class name
 *  @param {Coordinate} [options.coordinate] position of the cursor
 *  @param {string} [options.anchor="left"] anchor position (left, center or right)
 *  @param {Array<*>} [options.buttons] an array of buttons
 *  @param {number} [options.maxButtons=5] maximum number of buttons (default 5)
 */
export default class TouchCursor extends DragOverlay<DragEvent | CursorEvent> {
  constructor(options?: Options);

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {_ol_Map_} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_ | null): void;

  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @param {ol.coordinate|null} position position of the cursor (when activating), default viewport center.
   * @observable
   * @api
   */
  setActive(b: boolean, position?: Coordinate | null): void;

  /** Set the position of the target
   * @param {ol.coordinate} coord
   */
  setPosition(coord?: Coordinate): void;

  /** Offset the target position
   * @param {ol.coordinate} coord
   */
  offsetPosition(coord: Coordinate): void;

  /** Set anchor position
   * @param {string} pos "left", "center" or "right"
   * @api
   */
  setAnchor(pos: 'left' | 'center' | 'right'): void;

  /** Get the position of the target
   * @return {ol.coordinate}
   */
  getPosition(): Coordinate | undefined;

  /** Get pixel position
   * @return {ol.pixel}
   */
  getPixel(): Pixel | undefined;

  /** Get cursor overlay
   * @return {ol.Overlay}
   */
  getOverlay(): Overlay;

  /** Get cursor overlay element
   * @return {Element}
   */
  getOverlayElement(): Element;

  /** Get cursor button element
   * @param {string|number} button the button className or the button index
   * @return {Element}
   */
  getButtonElement(button: string | number): Element | undefined;

  /** Remove a button element
   * @param {string|number|undefined} button the button className or the button index, if undefined remove all buttons, default remove all
   */
  removeButton(button?: string | number): void;

  /** Add a button element
   * @param {*} button
   *  @param {string} options.className button class name
   *  @param {DOMElement|string} options.html button content
   *  @param {function} options.click onclick function
   *  @param {*} options.on an object with
   *  @param {boolean} options.before
   */
  addButton(button: CursorButton): void;

  on: TouchCursorOnSignature<EventsKey>
  once: TouchCursorOnSignature<EventsKey>
  un: TouchCursorOnSignature<void>
}
