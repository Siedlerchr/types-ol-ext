import type Feature from 'ol/Feature'
import { Select } from 'ol/interaction'
import type { Options as SelectOptions, SelectEvent } from 'ol/interaction/Select'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'

type FillAttributeOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'select', SelectEvent, Return> &
  OnSignature<Types | 'setattributestart' | 'setattributeend', AttributeEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'select' | 'setattributestart' | 'setattributeend', Return>;

export type AttributeEventType = 'setattributestart' | 'setattributeend'

export interface Options extends SelectOptions {
  active?: boolean;
  name?: string;
  cursor?: boolean | string;
}

/** A Select interaction to fill feature's properties on click.
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires setattributestart
 * @fires setattributeend

 */
export default class FillAttribute extends Select {
  /**
   * @param {*} options extentol.interaction.Select options
   *  @param {boolean} options.active activate the interaction on start, default true
   *  @param {string=} options.name
   *  @param {boolean|string} options.cursor interaction cursor if false use default, default use a paint bucket cursor
   * @param {*} properties The properties as key/value
   */
  constructor(options?: Options, properties?: Record<string, unknown>);

  /** Activate the interaction
   * @param {boolean} active
   */
  setActive(active: boolean): void;

  /** Define the interaction's CSS cursor. */
  setCursor(cursor: string): void;
  /** Get the interaction cursor. */
  getCursor(): string | boolean | undefined;

  /** Set attributes
   * @param {*} properties The properties as key/value
   */
  setAttributes(properties: Record<string, unknown>): void;

  /** Set an attribute
   * @param {string} key
   * @param {*} val
   */
  setAttribute(key: string, val: unknown): void;

  /** get attributes
   * @return {*} The properties as key/value
   */
  getAttributes(): Record<string, unknown> | undefined;

  /** Get an attribute
   * @param {string} key
   * @return {*} val
   */
  getAttribute(key: string): unknown;

  /** Fill feature attributes
   * @param {Array<Feature>} features The features to modify
   * @param {*} properties The properties as key/value
   */
  fill(features: Feature[], properties: Record<string, unknown>): void;

  on: FillAttributeOnSignature<EventsKey>

  once: FillAttributeOnSignature<EventsKey>

  un: FillAttributeOnSignature<void>
}

export interface AttributeEvent extends BaseEvent {
  type: AttributeEventType;
  features: Feature[];
  properties: Record<string, unknown>;
}
