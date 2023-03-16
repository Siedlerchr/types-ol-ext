import type Feature from 'ol/Feature'
import { Select } from 'ol/interaction'
import type { Options as SelectOptions, SelectEvent } from 'ol/interaction/Select'
import BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'

type FillAttributeOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'select', SelectEvent, Return> &
  OnSignature<Types | 'setattributestart' | 'setattributeend', AttributeEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'select' | 'setattributestart' | 'setattributeend', Return>;

export enum AttributeEventType {
  SETATTRIBUTESTART = 'setattributestart',
  SETATTRIBUTEEND = 'setattributeend'
}

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
  constructor(options: Options, properties: { [key: string]: any });

  /** Activate the interaction
   * @param {boolean} active
   */
  setActive(active: boolean): void;

  /** Set attributes
   * @param {*} properties The properties as key/value
   */
  setAttributes(properties: { [key: string]: any }): void;

  /** Set an attribute
   * @param {string} key
   * @param {*} val
   */
  setAttribute(key: string, val: any): void;

  /** get attributes
   * @return {*} The properties as key/value
   */
  getAttributes(): any;

  /** Get an attribute
   * @param {string} key
   * @return {*} val
   */
  getAttribute(key: string): any;

  /** Fill feature attributes
   * @param {Array<Feature>} features The features to modify
   * @param {*} properties The properties as key/value
   */
  fill(features: Feature[], properties: { [key: string]: any }): void;

  on: FillAttributeOnSignature<EventsKey>

  once: FillAttributeOnSignature<EventsKey>

  un: FillAttributeOnSignature<void>
}

export class AttributeEvent extends BaseEvent {
  constructor(type: AttributeEventType,
              properties: { [key: string]: any }
  );

  properties: { [key: string]: any }
}
