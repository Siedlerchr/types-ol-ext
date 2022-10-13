import Projection from 'ol/proj/Projection';
import { DragAndDrop, Interaction } from 'ol/interaction';
import FeatureFormat from 'ol/format/Feature';
import { Map as _ol_Map_ } from 'ol';
import BaseEvent from 'ol/events/Event';
import Feature from 'ol/Feature';
import { EventsKey } from 'ol/events';
import { DragAndDropEvent } from 'ol/interaction/DragAndDrop';
import { ObjectEvent } from 'ol/Object';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';

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
 * @param {*} options
 *  @param {string} options.zone selector for the drop zone, default document
 *  @param{Projection} options.projection default projection of the map
 *  @param {Array<function(new:ol.format.Feature)>|undefined} options.formatConstructors Format constructors, default [ ol.format.GPX, ol.format.GeoJSONX, ol.format.GeoJSONP, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON ]
 *  @param {Array<string>|undefined} options.accept list of accepted format, default ["gpx","json","geojsonx","geojsonp","geojson","igc","kml","topojson"]
 */
export default class DropFile extends Interaction {
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

    on: DropFileOnSignature<EventsKey>;
    once: DropFileOnSignature<EventsKey>;
    un: DropFileOnSignature<void>;
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
