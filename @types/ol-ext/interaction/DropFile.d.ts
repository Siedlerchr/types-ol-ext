import Projection from 'ol/proj/Projection';
import { DragAndDrop } from 'ol/interaction';
import FeatureFormat from 'ol/format/Feature';
import { Map as _ol_Map_ } from 'ol';
import BaseEvent from 'ol/events/Event';
import Feature from 'ol/Feature';
import Collection from 'ol/Collection';
import { ProjectionLike } from 'ol/proj';
import { EventsKey } from 'ol/events';
import { DragAndDropEvent } from 'ol/interaction/DragAndDrop';
import { ObjectEvent } from 'ol/Object';

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
 * @extends {ol_interaction_DragAndDrop}
 * @fires loadstart, loadend, addfeatures
 * @param {*} options
 *  @param {string} options.zone selector for the drop zone, default document
 *  @param{ol.projection} options.projection default projection of the map
 *  @param {Array<function(new:ol.format.Feature)>|undefined} options.formatConstructors Format constructors, default [ ol.format.GPX, ol.format.GeoJSONX, ol.format.GeoJSONP, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON ]
 *  @param {Array<string>|undefined} options.accept list of accepted format, default ["gpx","json","geojsonx","geojsonp","geojson","igc","kml","topojson"]
 */
export default class DropFile extends DragAndDrop {
    constructor(options: Options);
    /** Set the map
     */
    setMap(map: _ol_Map_): void;
    /** Do somthing when over
     */
    onstop(e: Event): void;
    /** Do something when over
     */
    ondrop(e: Event): void;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'addfeatures', listener: (evt: DragAndDropEvent) => void): EventsKey;
    once(type: 'addfeatures', listener: (evt: DragAndDropEvent) => void): EventsKey;
    un(type: 'addfeatures', listener: (evt: DragAndDropEvent) => void): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:active', listener: (evt: ObjectEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;

    on(type: 'loadstart', listener: (evt: LoadEvent) => void): EventsKey;
    once(type: 'loadstart', listener: (evt: LoadEvent) => void): EventsKey;
    un(type: 'loadstart', listener: (evt: LoadEvent) => void): void;
    on(type: 'loadend', listener: (evt: LoadEvent) => void): EventsKey;
    once(type: 'loadend', listener: (evt: LoadEvent) => void): EventsKey;
    un(type: 'loadend', listener: (evt: LoadEvent) => void): void;
}
export class LoadEvent extends BaseEvent {
    constructor(
        type: LoadEvent,
        file: File,
    );
    features?: Feature[]
    file: File;
    filesize?: number;
    result?: string | ArrayBuffer;
    projection?: Projection
    fileextension?: string;
    isOk?: boolean
}
