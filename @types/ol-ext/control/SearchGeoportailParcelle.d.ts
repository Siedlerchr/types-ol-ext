import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type BaseEvent from 'ol/events/Event'
import type { OnSignature, CombinedOnSignature } from 'ol/Observable'
import type { SearchOnSignature } from './Search'
import type { Options as GeoportailOptions, GeoportailResult } from './SearchGeoportail'
import SearchGeoportail from './SearchGeoportail'

export interface Options extends GeoportailOptions {
  className?: string;
  apiKey?: string;
  target?: HTMLElement | string
  authentication?: string;
  label?: string;
  placeholder?: string;
  prefixLabel?: string;
  sectionLabel?: string;
  numberLabel?: string;
  arrondLabel?: string;
  typing?: number;
  minLength?: number;
  maxItems?: number;
  pageSize?: number;
}

export interface Parcel {
  lon: number;
  lat: number;
  Commune?: string;
  CommuneAbsorbee?: string;
  Section?: string;
  Numero?: string;
  [key: string]: unknown;
}

export interface ParcelEvent extends BaseEvent {
  type: 'parcelle';
  search: Parcel;
  coordinate: Coordinate;
}

export interface CommuneEvent extends BaseEvent {
  type: 'commune';
  search: GeoportailResult;
  coordinate?: Coordinate;
}

type ParcelOnSignature<Return> = SearchOnSignature<Return, GeoportailResult> &
  OnSignature<'parcelle', ParcelEvent, Return> &
  OnSignature<'commune', CommuneEvent, Return> &
  CombinedOnSignature<'parcelle' | 'commune', Return>

/**
 * Search places using the French National Base Address (BAN) API.
 *
 * @constructor
 * @extends {ol.control.SearchGeoportail}
 * @fires commune
 * @fires parcelle

 * @see {@link https://geoservices.ign.fr/documentation/geoservices/geocodage.html} */
export default class SearchGeoportailParcelle extends SearchGeoportail {
  /**
   * @param {string} options.className control class name
   * @param {boolean | undefined} [options.apiKey] the service api key.
   * @param {string | undefined} options.authentication: basic authentication for the service API as btoa("login:pwd")
   * @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   * @param {string | undefined} options.label Text label to use for the search button, default "search"
   * @param {string | undefined} options.placeholder placeholder for city input, default "Choisissez une commune..."
   * @param {string | undefined} options.prefixLabel label for prefix input, default "Préfixe"
   * @param {string | undefined} options.sectionLabel label for section input, default "Section"
   * @param {string | undefined} options.numberLabel label for number input, default "Numéro"
   * @param {string | undefined} options.arrondLabel label for arrondissement, default "Arrond."
   * @param {number | undefined} options.typing a delay on each typing to start searching (ms), default 500.
   * @param {integer | undefined} options.minLength minimum length to start searching, default 3
   * @param {integer | undefined} options.maxItems maximum number of items to display in the autocomplete list, default 10
   * @param {Number} options.pageSize item per page for parcelle list paging, use -1 for no paging, default 5
   */
  constructor(options: Options);

  /** Set the input parcelle
   * @param {*} p parcel
   *  @param {string} p.Commune
   *  @param {string} p.CommuneAbsorbee
   *  @param {string} p.Section
   *  @param {string} p.Numero
   * @param {boolean} search start a search
   */
  setParcelle(p: {
    Commune?: string;
    CommuneAbsorbee?: string;
    Section?: string;
    Numero?: string;
  }, search?: boolean): void;

  /** Activate parcelle inputs
   * @param {bolean} b
   */
  activateParcelle(b: boolean): void;

  /** Send search request for a parcelle number
   * @param {string} commune Commune code.
   * @param {string} olcode Old municipality code.
   * @param {string} prefix District prefix.
   * @param {string} section Parcel section.
   * @param {string} numero Parcel number.
   * @param {function} success callback function called on success
   */
  searchParcelle(commune: string, olcode: string, prefix: string, section: string, numero: string, success: (parcels: Parcel[]) => void): void;

  /** Get a commune or parcel input field. */
  getInputField(what?: 'commune' | 'arrond' | 'prefix' | 'section' | 'numero'): HTMLInputElement;

  /** Clear the parcel list. */
  clearParcelList(): void;

  on: ParcelOnSignature<EventsKey>
  once: ParcelOnSignature<EventsKey>
  un: ParcelOnSignature<void>
}
