import type Projection from 'ol/proj/Projection'
import { Interaction } from 'ol/interaction'
import type FeatureFormat from 'ol/format/Feature'
import type { Map as _ol_Map_ } from 'ol'
import BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { DragAndDropEvent } from 'ol/interaction/DragAndDrop'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import type Feature from 'ol/Feature'

type DropFileOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'addfeatures', DragAndDropEvent, Return> &
  OnSignature<Types | 'loadstart' | 'loadend', LoadEvent, Return> &
  CombinedOnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange' | 'addfeatures' | 'loadstart' | 'loadend', Return>;

export enum LoadEventType {
  LOADSTART = 'loadstart',
  LOADEND = 'loadend'
}

export interface Options {
  zone?: string;
  projection?: Projection;
  formatConstructors?: FeatureFormat[];
  accept?: string[];
}

/** Extend DragAndDrop choose drop zone + fires loadstart, loadend
 * @constructor
 * @extends {Interaction}}
 * @fires loadstart, loadend, addfeatures

 */
export default class DropFile extends Interaction {
  /**
   * @param {*} options
   *  @param {string} options.zone selector for the drop zone, default document
   *  @param{Projection} options.projection default projection of the map
   *  @param {Array<function(new:ol.format.Feature)>|undefined} options.formatConstructors Format constructors, default [ ol.format.GPX, ol.format.GeoJSONX, ol.format.GeoJSONP, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON ]
   *  @param {Array<string>|undefined} options.accept list of accepted format, default ["gpx","json","geojsonx","geojsonp","geojson","igc","kml","topojson"]
   */
  constructor(options?: Options);

  /** Set the map
   */
  setMap(map: _ol_Map_): void;

  /** Do somthing when over
   */
  onstop(e: Event): void;

  /** Do something when over
   */
  ondrop(e: Event): void;

  on: DropFileOnSignature<EventsKey>

  once: DropFileOnSignature<EventsKey>

  un: DropFileOnSignature<void>
}

export class LoadEvent extends BaseEvent {
  constructor(
    type: LoadEvent,
    file: File
  );

  features?: Feature[]

  file: File

  filesize?: number

  result?: string | ArrayBuffer

  projection?: Projection

  fileextension?: string

  isOk?: boolean
}
