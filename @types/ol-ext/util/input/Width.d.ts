import type { EventsKey } from 'ol/events'
import BaseEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Options as ListOptions } from './List'
import List from './List'

type WidthOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'change:value', WidthEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'change:value', Return>;

export enum WidthType {
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
 * @extends {ol_ext_input_List}

 */
export default class Width extends List {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {Element} [options.input] input element, if non create one
   *  @param {Element} [options.parent] parent element, if create an input
   *  @param {Array<number>} [options.size] a list of size (default 0,1,2,3,5,10,15,20)
   */
  constructor(options?: Options);

  /** Get the current value
   * @returns {number}
   */
  getValue(): number;

  on: WidthOnSignature<EventsKey>

  once: WidthOnSignature<EventsKey>

  un: WidthOnSignature<void>
}

export class WidthEvent extends BaseEvent {
  constructor(type: WidthType, value: number);

  value: number
}
