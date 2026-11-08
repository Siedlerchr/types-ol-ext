import type ol_Collection from 'ol/Collection'
import BaseObject from 'ol/Object'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'

export interface Options<T> {
  target?: Element;
  className?: string;
  collection?: ol_Collection<T>;
  getTitle?: (elt: T) => Element | string;
}

export interface CollectionItemEvent<T> extends BaseEvent {
  type: 'item:select' | 'item:dblclick' | 'item:order' | 'item:keydown';
  position: number;
  item: T | null;
  oldPosition?: number;
  key?: string;
  originalEvent?: KeyboardEvent;
}

/** A list element synchronize with a Collection.
 * Element in the list can be reordered interactively and the associated Collection is kept up to date.
 * @constructor
 * @fires item:select
 * @fires item:dblclick
 * @fires item:order
 * @extends {ol_Object}

 */
export default class Collection<T> extends BaseObject {
  /**
   * @param {*} options
   *  @param {Element} [options.target]
   *  @param {Collection} [options.collection]  the collection to display in the list
   *  @param {function} [options.getTitle] a function that takes a collection item and returns an Element or a string
   */
  constructor(options: Options<T>);

  element: HTMLUListElement;

  /** Select an item
   * @param {*} item
   */
  select(item: T | null): void;

  /** Select an item at
   * @param {number} n
   */
  selectAt(n: number): void;

  /** Get current selection
   * @returns {*}
   */
  getSelect(): T | null | undefined;

  /** Get current selection
   * @returns {number}
   */
  getSelectPosition(): number;

  /** Redraw the list
   */
  refresh(focus?: T): void;

  /** Set the collection
   * @param {ol_Collection} collection
   */
  setCollection(collection?: ol_Collection<T> | null): void

  /** Remove current collection (listeners)
   * /!\ remove collection when input list is removed from the DOM
   */
  removeCollection(): void

  on: BaseObject['on'] & OnSignature<CollectionItemEvent<T>['type'], CollectionItemEvent<T>, EventsKey>;
  once: BaseObject['once'] & OnSignature<CollectionItemEvent<T>['type'], CollectionItemEvent<T>, EventsKey>;
  un: BaseObject['un'] & OnSignature<CollectionItemEvent<T>['type'], CollectionItemEvent<T>, void>;
}
