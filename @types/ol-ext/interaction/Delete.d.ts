import Collection from 'ol/Collection';
import { EventsKey } from 'ol/events';
import Feature from 'ol/Feature';
import { Select } from 'ol/interaction';
import { ObjectEvent } from 'ol/Object';
import BaseEvent from 'ol/events/Event';
import { Condition } from 'ol/events/condition';
import { Geometry } from 'ol/geom';
import { FilterFunction } from 'ol/interaction/Select';
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
    //TODO: how to override events?
    /*
    on(type: 'deletestart', listener: (evt: DeleteEvent) => void): EventsKey | EventsKey[];
    once(type: 'deletestart', listener: (evt: DeleteEvent) => void): EventsKey | EventsKey[];
    un(type: 'deletestart', listener: (evt: DeleteEvent) => void): void;
    on(type: 'deleteend', listener: (evt: DeleteEvent) => void): EventsKey | EventsKey[];
    once(type: 'deleteend', listener: (evt: DeleteEvent) => void): EventsKey | EventsKey[];
    un(type: 'deleteend', listener: (evt: DeleteEvent) => void): void;
    */
}

export class DeleteEvent extends BaseEvent {
    constructor(
        type: DeleteEventType,
        features: Feature[]
    );
}
