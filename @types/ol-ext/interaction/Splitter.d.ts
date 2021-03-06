import Collection from 'ol/Collection';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import { Interaction } from 'ol/interaction';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { SplitEvent } from './Split';

export interface Options {
    source?: VectorSource | VectorSource[];
    triggerSource?: VectorSource;
    features?: Collection<Feature>;
    filter?: (f: Feature) => boolean;
    tolerance?: number;
}
/** Interaction splitter: acts as a split feature agent while editing vector features (LineString).
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @fires  beforesplit, aftersplit
 * @param {olx.interaction.SplitOptions}
 *	- source {ol.source.Vector|Array{ol.source.Vector}} The target source (or array of source) with features to be split (configured with useSpatialIndex set to true)
 *	- triggerSource {ol.source.Vector} Any newly created or modified features from this source will be used to split features on the target source. If none is provided the target source is used instead.
 *	- features {ol_Collection.<ol.Feature>} A collection of feature to be split (replace source target).
 *	- triggerFeatures {ol_Collection.<ol.Feature>} Any newly created or modified features from this collection will be used to split features on the target source (replace triggerSource).
 *	- filter {function|undefined} a filter that takes a feature and return true if the feature is eligible for splitting, default always split.
 *	- tolerance {function|undefined} Distance between the calculated intersection and a vertex on the source geometry below which the existing vertex will be used for the split. Default is 1e-10.
 * @todo verify auto intersection on features that split.
 */
export class Splitter extends Interaction {
    constructor(options: Options);
    /** Calculate intersection on 2 segs
    * @param {Array<Coordinate>} s1 first seg to intersect (2 points)
    * @param {Array<Coordinate>} s2 second seg to intersect (2 points)
    * @return { boolean | Coordinate } intersection point or false no intersection
     */
    intersectSegs(s1: Coordinate[], s2: Coordinate[]): boolean | Coordinate;
    /** Split the source using a feature
    * @param {Feature} feature The feature to use to split.
     */
    splitSource(feature: Feature): void;
    /** New feature source is added
     */
    onAddFeature(): void;
    /** Feature source is removed > count features added/removed
     */
    onRemoveFeature(): void;
    /** Feature source is changing
     */
    onChangeFeature(): void;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
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

    on(type: 'beforesplit', listener: (evt: SplitEvent) => void): EventsKey;
    once(type: 'beforesplit', listener: (evt: SplitEvent) => void): EventsKey;
    un(type: 'beforesplit', listener: (evt: SplitEvent) => void): void;
    on(type: 'aftersplit', listener: (evt: SplitEvent) => void): EventsKey;
    once(type: 'aftersplit', listener: (evt: SplitEvent) => void): EventsKey;
    un(type: 'aftersplit', listener: (evt: SplitEvent) => void): void;
}
