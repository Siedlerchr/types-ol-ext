import type Collection from 'ol/Collection'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type Feature from 'ol/Feature'
import type { Vector as VectorSource } from 'ol/source'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'

export interface SelectBaseEvent extends BaseEvent { type: 'select'; features: Feature[] }
export type SelectBaseOnSignature<Return> = OnSignature<EventTypes, BaseEvent, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'select', SelectBaseEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'error' | 'propertychange' | 'select', Return>

/**
 *  '=': '=',
 '!=': '≠',
 '<': '<',
 '<=': '≤',
 '>=': '≥',
 '>': '>',
 'contain': '⊂', // ∈
 '!contain': '⊄',  // ∉
 'regexp': '≃',
 '!regexp': '≄'
 */
export type operators = '=' | '!=' | '<' | '>' | '<=' | '>=' | 'contain' | '!contain' | 'regexp' | '!regexp'

export interface condition {
  attr: string;
  op: operators;
  val: unknown;
}

export interface Options extends ControlOptions {
  className?: string;
  content?: Element;
  features?: Collection<Feature>;
  source?: VectorSource | VectorSource[];
  btInfo?: string;
}

/**
 /**
 * This is the base class for Select controls on attributes values.
 * Abstract base class;
 * normally only used for creating subclasses and not instantiated in apps.
 *
 * @constructor
 * @extends {ol_control_Control}
 * @fires select

 */
export default class SelectBase extends ol_control_Control {
  /**
   * @param {Object=} options
   *  @param {string} options.className control class name
   *  @param {Element} options.content form element
   *  @param {Element | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {ol.Collection<ol.Feature>} options.features a collection of feature to search in, the collection will be kept in date while selection
   *  @param {ol.source.Vector | Array<ol.source.Vector>} options.source the source to search in if no features set
   *  @param {string} options.btInfo ok button label
   */
  constructor(options?: Options);

  on: SelectBaseOnSignature<EventsKey>;
  once: SelectBaseOnSignature<EventsKey>;
  un: SelectBaseOnSignature<void>;

  /** Set the current sources
   * @param {VectorSource|Array<VectorSource>|undefined} source
   */
  setSources(source?: VectorSource | VectorSource[]): void;

  /** Set feature collection to search in
   * @param {Collection<Feature>} features
   */
  setFeatures(features?: Collection<Feature>): void;

  /** Get feature collection to search in
   * @return {Collection<Feature>}
   */
  getFeatures(): Collection<Feature> | null | undefined;

  /** List of operators / translation
   * @api
   */
  operationsList: Record<operators, string>
  /** Escape string for regexp
   * @param {string} search
   * @return {string}
   */

  /** Get vector source
   * @return {Array<VectorSource>}
   */
  getSources(): VectorSource[];

  /** Select features by attributes
   * @param {*} options
   *  @param {Array<Vector|undefined} options.sources source to apply rules, default the select sources
   *  @param {bool} options.useCase case sensitive, default false
   *  @param {bool} options.matchAll match all conditions, default false
   *  @param {Array<conditions>} options.conditions array of conditions
   * @return {Array<Feature>}
   * @fires select
   */
  doSelect(options?: {
    sources?: VectorSource[];
    features?: Feature[];
    useCase?: boolean;
    matchAll?: boolean;
    conditions?: condition[];
  }): Feature[];
}
