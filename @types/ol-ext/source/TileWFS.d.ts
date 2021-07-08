import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { Geometry } from 'ol/geom';
import { ObjectEvent } from 'ol/Object';
import { TileSourceEvent } from 'ol/source/Tile';
import VectorSource, { Options as VectorSourceOptions, VectorSourceEvent } from 'ol/source/Vector';

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
 * @param {Object} options
 *  @param {string} [options.version=1.1.0] WFS version to use. Can be either 1.0.0, 1.1.0 or 2.0.0.
 *  @param {string} options.typeName WFS type name parameter
 *  @param {number} options.tileZoom zoom to load the tiles
 *  @param {number} options.maxFeatures maximum features returned in the WFS
 *  @param {number} options.featureLimit maximum features in the source before refresh, default Infinity
 *  @param {boolean} [options.pagination] experimental enable pagination, default no pagination
 */
export class ol_source_TileWFS extends VectorSource {
    constructor(options?: Options);

    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'featuresloadend', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'featuresloadend', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'featuresloadend', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'featuresloaderror', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'featuresloaderror', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'featuresloaderror', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'featuresloadstart', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'featuresloadstart', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'featuresloadstart', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;

    on(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): void;

    on(type: 'overload', listener: (evt: OverloadEvent) => void): EventsKey;
    once(type: 'overload', listener: (evt: OverloadEvent) => void): EventsKey;
    un(type: 'overload', listener: (evt: OverloadEvent) => void): void;
}
export class OverloadEvent extends BaseEvent {
    constructor(type: TileWFSEventType,
        total: number,
        returned: number
    );
    total: number;
    returned: number;
}
