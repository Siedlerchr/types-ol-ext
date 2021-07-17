import ol_control_Control, {Options as ControlOptions} from 'ol/control/Control';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';


export enum BookMarkEventType {
  ADD = "add",
  REMOVE = "remove",
  SELECT = "select"
}

export interface BookmarkContent {
  pos: number[];
  zoom: number;
  permament?: boolean
}
export type Bookmarks = { [key: string]: BookmarkContent }
export interface Options extends ControlOptions {
  className?: string;
  placeholder?: string;
  editable?: boolean;
  namespace?: string;
  marks?: Bookmarks;
}
/** Bookmark positions on ol maps.
 *
 * @constructor
 * @extends {ol_control_Control}
 * @fires add
 * @fires remove
 * @fires select
 * @param {} options Geobookmark's options
 *  @param {string} options.className default ol-bookmark
 *  @param {string | undefined} options.title Title to use for the button tooltip, default "Geobookmarks"
 *  @param {string} options.placeholder input placeholder, default Add a new geomark...
 *  @param {bool} options.editable enable modification, default true
 *  @param {string} options.namespace a namespace to save the boolmark (if more than one on a page), default ol
 *  @param {Array<any>} options.marks a list of default bookmarks:
 * @see [Geobookmark example](../../examples/control/map.control.geobookmark.html)
 * @example
var bm = new GeoBookmark ({
  marks: {
    "Paris": {pos:ol.proj.transform([2.351828, 48.856578], 'EPSG:4326', 'EPSG:3857'), zoom:11, permanent: true },
    "London": {pos:ol.proj.transform([-0.1275,51.507222], 'EPSG:4326', 'EPSG:3857'), zoom:12}
  }
});
 */
export default class GeoBookmark extends ol_control_Control {
  constructor(options?: Options);
  /** Set bookmarks
  * @param {} bmark a list of bookmarks, default retreave in the localstorage
  * @example
  bm.setBookmarks({
    "Paris": {pos:_ol_proj_.transform([2.351828, 48.856578], 'EPSG:4326', 'EPSG:3857'), zoom:11, permanent: true },
    "London": {pos:_ol_proj_.transform([-0.1275,51.507222], 'EPSG:4326', 'EPSG:3857'), zoom:12}
  });
   */
  setBookmarks(bmark: Bookmarks): void;
  /** Get Geo bookmarks
  * @return {any} a list of bookmarks : { BM1:{pos:Coordinates, zoom: number}, BM2:{pos:Coordinates, zoom: number} }
   */
  getBookmarks(): Bookmarks;
  /** Remove a Geo bookmark
  * @param {string} name
   */
  removeBookmark(name: string): void;
  /** Add a new Geo bookmark (replace existing one if any)
  * @param {string} name name of the bookmark (display in the menu)
  * @param {Coordinate} position default current position
  * @param {number} zoom default current map zoom
  * @param {bool} permanent prevent from deletion, default false
   */
  addBookmark(name: string, position?: Coordinate, zoom?: number, permanent?: boolean): void;

  on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
  once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
  un(type: string | string[], listener: (p0: any) => any): void;
  on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
  once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
  un(type: 'change', listener: (evt: BaseEvent) => void): void;
  on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
  once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
  un(type: 'error', listener: (evt: BaseEvent) => void): void;
  on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
  once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
  un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;

  on(type: 'add', listener: (evt: BookmarkEvent) => void): EventsKey;
  once(type: 'add', listener: (evt: BookmarkEvent) => void): EventsKey;
  un(type: 'add', listener: (evt: BookmarkEvent) => void): void;
  on(type: 'remove', listener: (evt: BookmarkEvent) => void): EventsKey;
  once(type: 'remove', listener: (evt: BookmarkEvent) => void): EventsKey;
  un(type: 'remove', listener: (evt: BookmarkEvent) => void): void;
  on(type: 'select', listener: (evt: BookmarkEvent) => void): EventsKey;
  once(type: 'select', listener: (evt: BookmarkEvent) => void): EventsKey;
  un(type: 'select', listener: (evt: BookmarkEvent) => void): void;
}

export class BookmarkEvent extends BaseEvent {
  constructor(
    type: BookMarkEventType,
    name: string,
    bm?: BookmarkContent
  );
  name: string;
  bm?: BookmarkContent
}
