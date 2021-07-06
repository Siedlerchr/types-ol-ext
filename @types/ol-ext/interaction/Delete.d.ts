import Collection from 'ol/Collection';
import { EventsKey } from 'ol/events';
import Feature from 'ol/Feature';
import { Select } from 'ol/interaction';
import { ObjectEvent } from 'ol/Object';
import BaseEvent from 'ol/events/Event';
import { Condition } from 'ol/events/condition';
import { Geometry } from 'ol/geom';
import { FilterFunction, SelectEvent } from 'ol/interaction/Select';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { StyleLike } from 'ol/style/Style';

export interface Options {
    addCondition?: Condition;
    condition?: Condition;
    layers?: Layer<Source>[] | ((p0: Layer<Source>) => boolean);
    style?: StyleLike;
    removeCondition?: Condition;
    toggleCondition?: Condition;
    multi?: boolean;
    features?: Collection<Feature<Geometry>>;
    filter?: FilterFunction;
    hitTolerance?: number;
}

export enum DeleteEventType {
    DELETESTART = 'deletestart',
    DELETEEND = 'deleteend'
}
/** A Select interaction to delete features on click.
 * @constructor
 * @extends {Interaction}
 * @fires deletestart
 * @fires deleteend
 * @param {*} options interaction.Select options
 */
export default class Delete extends Select {
    constructor(options?: Options);

    /** Delete features: remove the features from the map (from all layers in the map)
     * @param {Collection<Feature>|Array<Feature>} features The features to delete
     * @api
     */
    delete(features: Collection<Feature> | Feature[]): void;

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
    on(type: 'select', listener: (evt: SelectEvent) => void): EventsKey;
    once(type: 'select', listener: (evt: SelectEvent) => void): EventsKey;
    un(type: 'select', listener: (evt: SelectEvent) => void): void;
    on(type: 'deletestart', listener: (evt: DeleteEvent) => void): EventsKey | EventsKey[];
    once(type: 'deletestart', listener: (evt: DeleteEvent) => void): EventsKey | EventsKey[];
    un(type: 'deletestart', listener: (evt: DeleteEvent) => void): void;
    on(type: 'deleteend', listener: (evt: DeleteEvent) => void): EventsKey | EventsKey[];
    once(type: 'deleteend', listener: (evt: DeleteEvent) => void): EventsKey | EventsKey[];
    un(type: 'deleteend', listener: (evt: DeleteEvent) => void): void;
}

export class DeleteEvent extends BaseEvent {
    constructor(
        type: DeleteEventType,
        features: Collection<Feature<Geometry>>[] | Feature<Geometry>[]
    );
    features: Collection<Feature<Geometry>>[] | Feature<Geometry>[]
}
