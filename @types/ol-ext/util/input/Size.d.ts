import type { EventsKey } from 'ol/events'
import BaseEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Options as ListOptions } from './List'
import List from './List'

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
  size?: number[];
}

/** Checkbox input
 * @constructor
 * @extends {List}

 */
export default class Size extends List {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {Element} [options.input] input element, if non create one
   *  @param {Element} [options.parent] parent element, if create an input
   *  @param {Array<number>} [options.size] a list of size (default 0,2,3,5,8,13,21,34,55)
   */
  constructor(options: any);

  /** Get the current value
   * @returns {number}
   */
  getValue(): number;

  on: SizeOnSignature<EventsKey>

  once: SizeOnSignature<EventsKey>

  un: SizeOnSignature<void>
}

export class SizeEvent extends BaseEvent {
  constructor(type: SizeType, value: number);

  value: number
}
