import type { Map as _ol_Map_ } from 'ol'
import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type { Coordinate } from 'ol/coordinate'
import type Feature from 'ol/Feature'
import BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'

type IsochroneGeoportailOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange' | 'isochrone', ObjectEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'isochrone', Return>;

export interface Options extends ControlOptions {
  className?: string;
  apiKey?: string;
  label?: string;
  placeholder?: string;
  inputLabel?: string;
  noCollapse?: string;
  typing?: number;
  minLength?: number;
  maxItems?: number;
  maxHistory?: number;
  getTitle: (f: Feature) => string;
  autocomplete?: (s: string, ...params: any[]) => any; // TODO: not sure about the syntax
  exclusions?: string;
}

/**
 * Geoportail isochrone Control.
 * @see https://geoservices.ign.fr/documentation/geoservices/isochrones.html
 * @constructor
 * @extends {ol_control_Control}
 * @fires isochrone
 * @fires error
 */
export default class IsochroneGeoportail extends ol_control_Control {
  /**
   * @param {Object=} options
   *  @param {string} options.className control class name
   *  @param {string} [options.apiKey] Geoportail apo key
   *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {string | undefined} options.label Text label to use for the search button, default "search"
   *  @param {string | undefined} options.placeholder placeholder, default "Search..."
   *  @param {string | undefined} options.inputLabel label for the input, default none
   *  @param {string | undefined} options.noCollapse prevent collapsing on input blur, default false
   *  @param {number | undefined} options.typing a delay on each typing to start searching (ms) use -1 to prevent autocompletion, default 300.
   *  @param {integer | undefined} options.minLength minimum length to start searching, default 1
   *  @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
   *  @param {integer | undefined} options.maxHistory maximum number of items to display in history. Set -1 if you don't want history, default maxItems
   *  @param {function} options.getTitle a function that takes a feature and return the name to display in the index.
   *  @param {function} options.autocomplete a function that take a search string and callback function to send an array
   *
   *  @param {string} options.exclusions Exclusion list separate with a comma 'Toll,Tunnel,Bridge'
   */
  constructor(options?: Options);

  /**
   * Set the map instance the control is associated with
   * and add its controls associated to this map.
   * @param map The map instance.
   */
  setMap(map: _ol_Map_): void;

  /** Set the travel method
   * @param method The method (time or distance)
   */
  setMethod(method?: 'time' | 'distance'): void;

  /** Set mode
   * @param mode The mode: 'car' or 'pedestrian', default 'car'
   */
  setMode(mode?: 'car' | 'pedestrian'): void;

  /** Set direction
   * @param  direction The direction: 'direct' or 'reverse', default direct
   */
  setDirection(direction?: 'direct' | 'reverse'): void;

  /** Calculate an isochrone
   * @param  coord
   * @param  option A number as time (in second) or distance (in meter), depend on method propertie
   * or a string with a unit (s, mn, h for time or km, m)
   * @param iter number of iterations
   */
  search(coord: Coordinate, option: number | string, iter: number): void;

  on: IsochroneGeoportailOnSignature<EventsKey>

  once: IsochroneGeoportailOnSignature<EventsKey>

  un: IsochroneGeoportailOnSignature<void>
}

export class IsoChroneEvent extends BaseEvent {
  constructor(type: 'isochrone');

  feature: Feature

  iteration: number
}
