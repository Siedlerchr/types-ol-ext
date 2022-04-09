import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { Types } from 'ol/ObjectEventType';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import List, { Options as ListOptions } from './List';

type SizeOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'change:value', SizeEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'change:value', Return>;

export enum SizeType {
  CHANGE_VALUE = 'change:value',
}

export interface Options extends ListOptions {
    className?: string;
    input?: Element;
    parent?: Element;
    size?: number[]
}

/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_List}
 * @param {*} options
 *  @param {string} [options.className]
 *  @param {Element} [options.input] input element, if non create one
 *  @param {Element} [options.parent] parent element, if create an input
 *  @param {Array<number>} [options.size] a list of size (default 0,2,3,5,8,13,21,34,55)
 */
export default class Size extends List {
    constructor(options: any);
    /** Get the current value
     * @returns {number}
     */
    getValue(): number;

    on: SizeOnSignature<EventsKey>;
    once: SizeOnSignature<EventsKey>;
    un: SizeOnSignature<void>;
}

export class SizeEvent extends BaseEvent {
  constructor(type: SizeType, value: number);

  value: number;
}
