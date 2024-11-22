import type { EventsKey } from 'ol/events'
import BaseEvent from 'ol/events/Event'
import type Feature from 'ol/Feature'
import type { Geometry } from 'ol/geom'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { TileSourceEvent } from 'ol/source/Tile'
import type { VectorSourceEvent } from 'ol/source/Vector'
import VectorSource from 'ol/source/Vector'

type TileWFSOnSignature<Return> =
  OnSignature<EventTypes, Event, Return>
  &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return>
  &
  OnSignature<Types | 'addfeature' | 'changefeature' | 'clear' | 'featuresloadend' | 'featuresloaderror' | 'featuresloadstart' | 'removefeature', VectorSourceEvent<Feature<Geometry>>, Return>
  &
  OnSignature<Types | 'tileloadend' | 'tileloaderror' | 'tileloadstart', TileSourceEvent, Return>
  &
  OnSignature<Types | 'overload', OverloadEvent, Return>
  &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'addfeature' | 'changefeature' | 'clear' | 'featuresloadend' | 'featuresloaderror' | 'featuresloadstart' | 'removefeature' | 'tileloadend' | 'tileloaderror' | 'tileloadstart' | 'overload', Return>

export type WFSVersion = '1.0.0' | '1.1.0' | '2.0.0'

export enum TileWFSEventType {
  OVERLOAD = 'overload'
}

export interface Options {
  typeName?: string;
  version?: WFSVersion;
  outputFormat?: string | 'application/json'
  tileZoom?: number;
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
 *  @param {string} options.typeName WFS type name parameter
 *  @param {string} [options.version=1.1.0] WFS version to use. Can be either 1.0.0, 1.1.0 or 2.0.0.
 *  @param {string} [options.outputFormat=application/json] WFS outputFormat parameter
 *  @param {number} [options.tileZoom=14] zoom to load the tiles
 *  @param {number} [options.maxFeatures] maximum features returned in the WFS
 *  @param {number} [options.featureLimit=Infinity] maximum features in the source before refresh, default Infinity
 *  @param {boolean} [options.pagination] experimental enable pagination, default no pagination
 */
  constructor(options?: Options);

  on: TileWFSOnSignature<EventsKey>

  once: TileWFSOnSignature<EventsKey>

  un: TileWFSOnSignature<void>
}

export class OverloadEvent extends BaseEvent {
  constructor(type: TileWFSEventType,
    total: number,
    returned: number
  );

  total: number

  returned: number
}
