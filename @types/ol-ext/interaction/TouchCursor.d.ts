import type { Coordinate } from 'ol/coordinate'
import type { InteractionOptions } from 'ol/interaction/Interaction'
import type { Map as _ol_Map_, Overlay } from 'ol'
import type { Pixel } from 'ol/pixel'
import type Button from '../control/Button'
import DragOverlay from './DragOverlay'

export interface Options extends InteractionOptions {
  className?: string;
  coordinate?: Coordinate;
  buttons?: Button[];
  maxButtons?: number;
}

/** Handle a touch cursor to defer event position on overlay position
 * It can be used as abstract base class used for creating subclasses.
 * The TouchCursor interaction modifies map browser event coordinate and pixel properties to force pointer on the graphic cursor on the screen to any interaction that them.
 * @constructor
 * @extends {ol_interaction_DragOverlay}

 */
export class TouchCursor extends DragOverlay {
  /**
   * @param {olx.interaction.InteractionOptions} options Options
   *  @param {string} options.className cursor class name
   *  @param {ol.coordinate} options.coordinate position of the cursor
   *  @param {Array<*>} options.buttons an array of buttons
   *  @param {number} options.maxButtons maximum number of buttons (default 5)
   */
  constructor(options?: Options);

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {_ol_Map_} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

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
  setPosition(coord: Coordinate): void;

  /** Offset the target position
   * @param {ol.coordinate} coord
   */
  offsetPosition(coord: Coordinate): void;

  /** Get the position of the target
   * @return {ol.coordinate}
   */
  getPosition(): Coordinate;

  /** Get pixel position
   * @return {ol.pixel}
   */
  getPixel(): Pixel;

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
  getButtonElement(button: string | number): Element;

  /** Remove a button element
   * @param {string|number|undefined} button the button className or the button index, if undefined remove all buttons, default remove all
   * @return {Element}
   */
  removeButton(button?: string | number | undefined): Element;

  /** Add a button element
   * @param {*} button
   *  @param {string} options.className button class name
   *  @param {DOMElement|string} options.html button content
   *  @param {function} options.click onclick function
   *  @param {*} options.on an object with
   *  @param {boolean} options.before
   */
  addButton(button: {
    className?: string;
    html?: HTMLElement | string
    click?: () => void;
    on?: any;
    before?: boolean
  }): void;
}
