import type { ProjectionLike } from 'ol/proj'
import { Interaction } from 'ol/interaction'
import type FeatureFormat from 'ol/format/Feature'
import type { Map as _ol_Map_ } from 'ol'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import type Feature from 'ol/Feature'

type DropFileOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'addfeatures', DropFeaturesEvent, Return> &
  OnSignature<'loadstart', LoadStartEvent, Return> &
  OnSignature<'loadend', LoadEndEvent, Return> &
  CombinedOnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange' | 'addfeatures' | 'loadstart' | 'loadend', Return>;

export type LoadEventType = 'loadstart' | 'loadend'

export interface Options {
  zone?: Document | Element;
  projection?: ProjectionLike;
  formatConstructors?: Array<new () => FeatureFormat>;
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
   *  @param {Document|Element} options.zone drop zone, default document
   *  @param{Projection} options.projection default projection of the map
   *  @param {Array<function(new:ol.format.Feature)>|undefined} options.formatConstructors Format constructors, default [ ol.format.GPX, ol.format.GeoJSONX, ol.format.GeoJSONP, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON ]
   *  @param {Array<string>|undefined} options.accept list of accepted format, default ["gpx","json","geojsonx","geojsonp","geojson","igc","kml","topojson"]
   */
  constructor(options?: Options);

  /** Set the map
   */
  setMap(map: _ol_Map_ | null): void;

  /** Do somthing when over
   */
  onstop(e: Event): false;

  /** Do something when over
   */
  ondrop(e: DragEvent): false;

  on: DropFileOnSignature<EventsKey>

  once: DropFileOnSignature<EventsKey>

  un: DropFileOnSignature<void>
}

export interface LoadStartEvent extends BaseEvent {
  type: 'loadstart';
  file: File;
  filesize: number;
  filetype: string;
  fileextension: string;
  projection: ProjectionLike | null;
  isok: boolean;
}
export interface LoadEndEvent extends BaseEvent {
  type: 'loadend';
  file: File;
  features?: Feature[];
  projection?: ProjectionLike | null;
  result?: string | ArrayBuffer | null;
}
export interface DropFeaturesEvent extends BaseEvent {
  type: 'addfeatures';
  file: File;
  features: Feature[];
  projection: ProjectionLike | null;
}
