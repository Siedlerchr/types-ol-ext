import type { EventsKey } from 'ol/events'
import BaseEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Options as BaseOptions } from './Base'
import Base from './Base'

type ListOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'change:value', ListEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'change:value', Return>;

export enum ListType {
  CHANGE_VALUE = 'change:value',
}

export interface Options extends BaseOptions {
  className?: string;
  options?: any[];
  input?: Element;
  parent?: Element;
  fixed?: boolean;
  align?: 'left' | 'right' | 'middle';
}

/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Base}

 */
export default class List extends Base {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {Array<Object>} options.options an array of options to place in the popup { html:, title:, value: }
   *  @param {Element} [options.input] input element, if non create one
   *  @param {Element} [options.parent] parent element, if create an input
   *  @param {boolean} [options.fixed=false] don't use a popup, default use a popup
   *  @param {string} [options.align=left] align popup left/right/middle
   */
  constructor(options: any);

  element: HTMLElement | Text

  popup: HTMLElement | Text

  /** Get the current value
   * @returns {number}
   */
  getValue(): number;

  on: ListOnSignature<EventsKey>

  once: ListOnSignature<EventsKey>

  un: ListOnSignature<void>
}

export class ListEvent extends BaseEvent {
  constructor(type: ListType, value: number);

  value: number
}
