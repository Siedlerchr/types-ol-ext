import BaseObject, { ObjectEvent } from 'ol/Object'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'

export interface Options {
  /** Base64-encoded username and password for basic authorization. */
  auth?: string;
  /** Expected response type; defaults to JSON. */
  dataType?: string;
}
export interface SendOptions {
  /** Abort the previous request; defaults to true. */
  abort?: boolean;
  /** Encode the URL and parameter values; defaults to true. */
  encode?: boolean;
  /** Request timeout in milliseconds. */
  timeout?: number;
  [key: string]: unknown;
}
export interface AjaxEvent extends BaseEvent {
  status: number;
  statusText: string;
  jqXHR: XMLHttpRequest;
  options: SendOptions;
  error?: unknown;
}
export interface SuccessEvent extends AjaxEvent { response: any }
export interface GetOptions extends Options {
  url: string;
  data?: Record<string, unknown>;
  options?: SendOptions;
  success?: (response: any, event: SuccessEvent) => void;
  error?: (event: AjaxEvent) => void;
}
type AjaxOnSignature<Return> = OnSignature<EventTypes, BaseEvent, Return> &
  OnSignature<Types | 'propertychange', ObjectEvent, Return> &
  OnSignature<'success', SuccessEvent, Return> & OnSignature<'error', AjaxEvent, Return> &
  OnSignature<'loadstart' | 'loadend', BaseEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'propertychange' | 'success' | 'error' | 'loadstart' | 'loadend', Return>
/** Send AJAX requests and receive success, error, loadstart, and loadend events. */
export default class Ajax extends BaseObject {
  constructor(options?: Options);
  /** Send a GET request with success and error callbacks. */
  static get(options: GetOptions): void;
  /** Read the Access-Control-Allow-Origin response header. */
  static getCORS(url: string, callback: (origin: string | null) => void): void;
  /** Send a GET request with optional query data and request options. */
  send(url: string, data?: Record<string, unknown>, options?: SendOptions): void;
  on: AjaxOnSignature<EventsKey>;
  once: AjaxOnSignature<EventsKey>;
  un: AjaxOnSignature<void>;
}
