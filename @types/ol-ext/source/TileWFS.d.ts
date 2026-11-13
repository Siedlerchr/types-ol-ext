import type { EventsKey } from 'ol/events'
import type BaseEvent from 'ol/events/Event'
import type Feature from 'ol/Feature'
import type { Geometry } from 'ol/geom'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { VectorSourceEvent } from 'ol/source/Vector'
import VectorSource from 'ol/source/Vector'

type TileWFSOnSignature<Return> =
  OnSignature<EventTypes, Event, Return>
  &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return>
  &
  OnSignature<Types | 'addfeature' | 'changefeature' | 'clear' | 'featuresloadend' | 'featuresloaderror' | 'featuresloadstart' | 'removefeature', VectorSourceEvent<Feature<Geometry>>, Return>
  &
  OnSignature<'tileloadstart' | 'tileloadend', TileLoadEvent, Return>
  &
  OnSignature<'tileloaderror', TileLoadErrorEvent, Return>
  &
  OnSignature<'overload', OverloadEvent, Return>
  &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'addfeature' | 'changefeature' | 'clear' | 'featuresloadend' | 'featuresloaderror' | 'featuresloadstart' | 'removefeature' | 'tileloadend' | 'tileloaderror' | 'tileloadstart' | 'overload', Return>

export type WFSVersion = '1.0.0' | '1.1.0' | '2.0.0'

export type TileWFSEventType = 'tileloadstart' | 'tileloadend' | 'tileloaderror' | 'overload'

export interface Options {
  url: string;
  typeName?: string;
  version?: WFSVersion;
  outputFormat?: string | 'application/json'
  tileZoom?: number;
  maxFeatures?: number;
  featureLimit?: number;
  pagination?: boolean;
}

/** A vector source to load WFS at a tile zoom level
 * @constructor
 * @fires tileloadstart
 * @fires tileloadend
 * @fires tileloaderror
 * @fires overload
 * @extends {ol.source.Vector}

 */
export default class TileWFS extends VectorSource {
  /**
   * @param {Object} options
   *  @param {string} options.url WFS service URL
 *  @param {string} options.typeName WFS type name parameter
 *  @param {string} [options.version=1.1.0] WFS version to use. Can be either 1.0.0, 1.1.0 or 2.0.0.
 *  @param {string} [options.outputFormat=application/json] WFS outputFormat parameter
 *  @param {number} [options.tileZoom=14] zoom to load the tiles
 *  @param {number} [options.maxFeatures] maximum features returned in the WFS
 *  @param {number} [options.featureLimit=Infinity] maximum features in the source before refresh, default Infinity
 *  @param {boolean} [options.pagination] experimental enable pagination, default no pagination
 */
  constructor(options: Options);

  on: TileWFSOnSignature<EventsKey>

  once: TileWFSOnSignature<EventsKey>

  un: TileWFSOnSignature<void>
}

/** Progress of requests made for WFS tiles. */
export interface TileLoadEvent extends BaseEvent {
  type: 'tileloadstart' | 'tileloadend';
  loading: number;
  loaded: number;
}

export interface TileLoadErrorEvent extends BaseEvent {
  type: 'tileloaderror';
  loading: number;
  loaded: number;
  error: unknown;
}

export interface OverloadEvent extends BaseEvent {
  type: 'overload';
  total: number;
  returned: number;
}
