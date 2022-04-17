import PopupBase, { Options as PopupBaseOptions } from './PopupBase';
import { ColorLike } from 'ol/colorlike';
import BaseEvent from 'ol/events/Event';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';
import { ObjectEvent } from 'ol/Object';
import { EventsKey } from 'ol/events';

type ColorOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'color', ColorEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change' | 'error' | 'propertychange' | 'color', Return>;

export enum ColorType {
  COLOR = 'color',
}

export interface Options extends PopupBaseOptions {
  className?: string;
  color?: ColorLike;
  input?: Element;
  parent?: Element;
  hastab?: boolean;
  paletteLabel?: string;
  pickerLabel?: string;
  position?: 'popup' | 'fixed' | 'inline';
  opacity?: boolean;
  autoClose?: boolean;
  hidden?: boolean;
}

/** Color picker
 * @constructor
 * @extends {ol_ext_input_PopupBase}
 * @fires change:color
 * @fires color
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {ColorLike} [options.color] default color
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {boolean} [options.hastab=false] use tabs for palette / picker
 *  @param {string} [options.paletteLabel="palette"] label for the palette tab
 *  @param {string} [options.pickerLabel="picker"] label for the picker tab
 *  @param {string} [options.position='popup'] fixed | popup | inline (no popup)
 *  @param {boolean} [options.opacity=true] enable opacity
 *  @param {boolean} [options.autoClose=true] close when click on color
 *  @param {boolean} [options.hidden=true] display the input
 */
export default class Color extends PopupBase {
  constructor(options?: Options);

  /** Add color to palette
   * @param {ColorLike} color
   * @param {string} title
   * @param {boolean} select
   */
  addPaletteColor(color: ColorLike, title: string, select: boolean): void;

  /** Show palette or picker tab
   * @param {string} what palette or picker
   */
  showTab(what?: 'palette' | 'picker'): void;

  /** Show palette or picker tab
   * @returns {string} palette or picker
   */
  getTab(): 'palette' | 'picker';

  /** Set Color
   * @param { Array<number> }
   */
  setColor(color: string | number[]): void;
  /** Get current color
   * @param {boolean} [opacity=true]
   * @return {Array<number>}
   */
  getColor(opacity?: boolean): number[];
  /** show/hide color picker
   * @param {boolean} [b=false]
   */
  collapse(b?: boolean): void;
  /** Is the popup collapsed ?
   * @returns {boolean}
   */
  isCollapsed(): boolean;
  /** Toggle the popup
   */
  toggle(): void;

  clearCustomColor(): void;
  /** Convert color to id
   * @param {ol.colorLike} Color
   * @returns {number}
   */
  getColorID(color: ColorLike): number;
  /** Convert color to id
   * @param {number} id
   * @returns {Array<number>} Color
   */
  getColorFromID(id: number): number[];

  on: ColorOnSignature<EventsKey>;
  once: ColorOnSignature<EventsKey>;
  un: ColorOnSignature<void>;
}

export class ColorEvent extends BaseEvent {
  constructor(type: ColorType, color: string | number[]);

  color: string | number[];
}
