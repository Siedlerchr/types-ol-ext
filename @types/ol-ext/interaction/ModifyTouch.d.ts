import { Modify } from 'ol/interaction'
import type BaseEvent from 'ol/events/Event'
import type Map from 'ol/Map'
import type Feature from 'ol/Feature'
import type Collection from 'ol/Collection'
import type VectorSource from 'ol/source/Vector'
import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { ModifyEvent, Options as ModifyOptions } from 'ol/interaction/Modify'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import type { Positioning } from 'ol/Overlay'

/** ModifyTouch overrides removePoint without returning the OpenLayers boolean. */
declare const ModifyTouchBase: new (options: ModifyOptions) => Omit<Modify, 'removePoint' | 'setMap'>

type ModifyTouchOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'modifyend' | 'modifystart' | 'modifying', ModifyEvent, Return> &
  OnSignature<'showpopup', ShowPopupEvent, Return> &
  OnSignature<'hidepopup', HidePopupEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'modifyend' | 'modifystart' | 'modifying' | 'showpopup' | 'hidepopup', Return>

export type PopupEventType = 'showpopup' | 'hidepopup'

export type Options = ModifyOptions & ({ source: VectorSource } | { features: Collection<Feature> }) & {
  title?: string;
  className?: string;
  positioning?: Positioning;
  offsetBox?: number | number[];
  usePopup?: boolean;
}

export type PopupRequest = { type: 'show'; feature: Feature; coordinate: Coordinate } |
  { type: 'hide'; modifying?: boolean }

/** Modify interaction with a popup to delet a point on touch device
 * @constructor
 * @fires showpopup
 * @fires hidepopup
 * @extends {ol.interaction.Modify}

 */
export default class ModifyTouch extends ModifyTouchBase {
  /**
   * @param {olx.interaction.ModifyOptions} options
   * @param {String|undefined} options.title title to display, default "remove point"
   * @param {String|undefined} options.className CSS class name for the popup
   * @param {String|undefined} options.positioning positioning for the popup
   * @param {Number|Array<number>|undefined} options.offsetBox offset box for the popup
   * @param {Boolean|undefined} options.usePopup use a popup, default true
   */
  constructor(options: Options);

  /** Attach to a map, or detach when passed null. */
  setMap(map: Map | null): void;

  /**
   * Remove the current point
   */
  removePoint(): void;

  /**
   * Show the delete button (menu)
   * @param {Event} e
   * @api stable
   */
  showDeleteBt(e: PopupRequest): void;

  /**
   * Change the popup content
   * @param {DOMElement} html
   */
  setPopupContent(html: Element): void;

  /**
   * Get the popup content
   * @return {DOMElement}
   */
  getPopupContent(): Element;

  on: ModifyTouchOnSignature<EventsKey>

  once: ModifyTouchOnSignature<EventsKey>

  un: ModifyTouchOnSignature<void>
}

export interface PopupEvent extends BaseEvent {
  type: PopupEventType;
}

export interface ShowPopupEvent extends PopupEvent {
  type: 'showpopup';
  feature: Feature;
  coordinate: Coordinate;
}

export interface HidePopupEvent extends PopupEvent {
  type: 'hidepopup';
  modifying?: boolean;
}
