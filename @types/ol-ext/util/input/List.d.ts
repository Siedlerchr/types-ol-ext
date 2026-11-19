import type { EventsKey } from 'ol/events'
import type BaseEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Options as BaseOptions } from './Base'
import Base from './Base'

type ListOnSignature<Return, Value extends string | number> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'change:value', ListEvent<Value>, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'change:value', Return>;

export type ListType = 'change:value'

export interface ListOption {
  value: string | number;
  html?: string | Element;
  title?: string;
}

export interface Options extends BaseOptions {
  className?: string;
  options: ListOption[];
  input?: Element;
  parent?: Element;
  fixed?: boolean;
  align?: 'left' | 'right' | 'middle';
  hover?: boolean;
  hideOnClick?: boolean;
}

/** Checkbox input
 * @constructor
 * @extends {ol_ext_input_Base}

 */
export default class List<Value extends string | number = string> extends Base {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {Array<Object>} options.options an array of options to place in the popup { html:, title:, value: }
   *  @param {Element} [options.input] input element, if non create one
   *  @param {Element} [options.parent] parent element, if create an input
   *  @param {boolean} [options.fixed=false] don't use a popup, default use a popup
   *  @param {string} [options.align=left] align popup left/right/middle
   */
  constructor(options: Options);

  element: HTMLDivElement

  popup: HTMLUListElement

  /** Get the current value
   * @returns The current input value.
   */
  getValue(): Value;

  on: ListOnSignature<EventsKey, Value>

  once: ListOnSignature<EventsKey, Value>

  un: ListOnSignature<void, Value>
}

export interface ListEvent<Value extends string | number = string> extends BaseEvent {
  type: ListType;
  value: Value;
}
