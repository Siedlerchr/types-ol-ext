import type { EventsKey } from 'ol/events'
import BaseEvent from 'ol/events/Event'
import type { Geometry } from 'ol/geom'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { TileSourceEvent } from 'ol/source/Tile'
import type { VectorSourceEvent } from 'ol/source/Vector'
import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector'

type TileWFSOnSignature<Return> =
  OnSignature<EventTypes, Event, Return>
  &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return>
  &
  OnSignature<Types | 'addfeature' | 'changefeature' | 'clear' | 'featuresloadend' | 'featuresloaderror' | 'featuresloadstart' | 'removefeature', VectorSourceEvent<Geometry>, Return>
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
  version?: WFSVersion;
  typeName?: string;
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
   *  @param {string} [options.version=1.1.0] WFS version to use. Can be either 1.0.0, 1.1.0 or 2.0.0.
   *  @param {string} options.typeName WFS type name parameter
   *  @param {number} options.tileZoom zoom to load the tiles
   *  @param {number} options.maxFeatures maximum features returned in the WFS
   *  @param {number} options.featureLimit maximum features in the source before refresh, default Infinity
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
