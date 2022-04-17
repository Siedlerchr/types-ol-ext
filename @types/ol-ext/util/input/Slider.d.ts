import { EventsKey } from "ol/events";
import BaseEvent from "ol/events/Event";
import { ObjectEvent } from "ol/Object";
import { Types } from "ol/ObjectEventType";
import { CombinedOnSignature, EventTypes, OnSignature } from "ol/Observable";
import Base, { Options as BaseOptions } from "./Base";

type SliderOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'change:value', SliderEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'change:value', Return>;

export enum SliderType {
  CHANGE_VALUE = 'change:value',
}

export interface Options extends BaseOptions {
    className?: string;
    input?: Element;
    parent?: Element;
    align?: 'left' | 'right' | 'middle';
    type?: string;
    min?: number;
    max?: number;
    step?: number;
    overflow?: boolean;
    before?: string | Element;
    after?: string | Element;
    fixed?: boolean;
}
/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Base}
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {string} [options.align=left] align popup left/right
 *  @param {string} [options.type] a slide type as 'size'
 *  @param {number} [options.min] min value, default use input min
 *  @param {number} [options.max] max value, default use input max
 *  @param {number} [options.step] step value, default use input step
 *  @param {boolean} [options.overflow=false] enable values over min/max
 *  @param {string|Element} [options.before] an element to add before the slider
 *  @param {string|Element} [options.after] an element to add after the slider
 *  @param {boolean} [options.fixed=false] no pupop
 */
export default class Slider extends Base {
    constructor(options: any);
    element: HTMLElement | Text;
    slider: HTMLElement | Text;

    /** Get the current value
     * @returns {number}
     */
    getValue(): number;

    on: SliderOnSignature<EventsKey>;
    once: SliderOnSignature<EventsKey>;
    un: SliderOnSignature<void>;
}

export class SliderEvent extends BaseEvent {
  constructor(type: SliderType, value: number);

  value: number;
}
