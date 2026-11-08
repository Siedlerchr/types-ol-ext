import type { EventsKey } from 'ol/events'
import type { ListEvent } from './List'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Options as ListOptions } from './List'
import List from './List'

type SizeOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'change:value', SizeEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'change:value', Return>;

export type SizeType = 'change:value'

export interface Options extends Omit<ListOptions, 'options'> {
  className?: string;
  input?: Element;
  parent?: Element;
  size?: number[];
}

/** Checkbox input
 * @constructor
 * @extends {List}

 */
export default class Size extends List<number> {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {Element} [options.input] input element, if non create one
   *  @param {Element} [options.parent] parent element, if create an input
   *  @param {Array<number>} [options.size] a list of size (default 0,2,3,5,8,13,21,34,55)
   */
  constructor(options?: Options);

  /** Get the current value
   * @returns {number}
   */
  getValue(): number;

  on: SizeOnSignature<EventsKey>

  once: SizeOnSignature<EventsKey>

  un: SizeOnSignature<void>
}

export type SizeEvent = ListEvent<number>
