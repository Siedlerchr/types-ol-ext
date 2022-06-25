import { Map as _ol_Map_ } from 'ol';
import Collection from 'ol/Collection';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Style } from 'ol/style';
import { Interaction } from 'ol/interaction';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import VectorSource from 'ol/source/Vector';
import BaseEvent from 'ol/events/Event';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable';
import { Types } from 'ol/ObjectEventType';

type SplitOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
    OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
    OnSignature<Types | 'beforesplit' | 'aftersplit', SplitEvent, Return> &
    CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'beforesplit' | 'aftersplit', Return>


export enum SplitEventType {
    BEFORESPLIT = 'beforesplit',
    AFTERSPLIT = 'aftersplit'

}

export interface Options {
    sources?: VectorSource | VectorSource[];
    features?: Collection<Feature>;
    snapDistance?: number;
    cursor?: string;
    filter?: (f: Feature) => boolean;
    featureStyle?: Style | Style[];
    sketchStyle?: Style | Style[];
    tolerance?: number
}

/** Interaction split interaction for splitting feature geometry
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires  beforesplit, aftersplit, pointermove
 * @param {*}
 *  @param {ol.source.Vector|Array<ol.source.Vector>} [options.sources] a list of source to split (configured with useSpatialIndex set to true), if none use map visible layers.
 *  @param {ol.Collection.<ol.Feature>} options.features collection of feature to split (instead of a list of sources)
 *  @param {integer} options.snapDistance distance (in px) to snap to an object, default 25px
 *	@param {string|undefined} options.cursor cursor name to display when hovering an objet
 *  @param {function|undefined} opttion.filter a filter that takes a feature and return true if it can be clipped, default always split.
 *  @param ol_style_Style | Array<ol_style_Style> | false | undefined} options.featureStyle Style for the selected features, choose false if you don't want feature selection. By default the default edit style is used.
 *  @param {ol_style_Style | Array<ol_style_Style> | undefined} options.sketchStyle Style for the sektch features.
 *  @param {number|undefined} options.tolerance Distance between the calculated intersection and a vertex on the source geometry below which the existing vertex will be used for the split.  Default is 1e-10.
 */
export default class Split extends Interaction {
    constructor(options?: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {_ol_Map_} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Get sources to split features in
     * @return {Array<VectorSource>}
     */
    getSources(): VectorSource[]
    /** Set sources to split features in
     * @param {VectorSource|Array<VectorSource>} [sources]
     */
    setSources(sources: VectorSource| VectorSource[]): void
    /** Get nearest coordinate in a list
    * @param {Coordinate} pt the point to find nearest
    * @param {Array<Coordinate>} coords list of coordinates
    * @return {Coordinate} the nearest coordinate in the list
     */
    getNearestCoord(pt: Coordinate, coords: Coordinate[]): Coordinate;
    /**
     * @param {MapBrowserEvent<UIEvent>} evt Map browser event.
     * @return {boolean} `true` to start the drag sequence.
     */
    handleDownEvent(evt: MapBrowserEvent<UIEvent>): boolean;
    /**
     * @param {MapBrowserEvent<UIEvent>} evt Event.
     */
    handleMoveEvent(evt: MapBrowserEvent<UIEvent>): void;
    on: SplitOnSignature<EventsKey>;
    once: SplitOnSignature<EventsKey>;
    un: SplitOnSignature<void>;
}
export class SplitEvent extends BaseEvent {
    constructor(type: SplitEventType,
        original: Feature,
        toSplit: Feature[]
    );
    original: Feature;
    toSplit: Feature[];

}
