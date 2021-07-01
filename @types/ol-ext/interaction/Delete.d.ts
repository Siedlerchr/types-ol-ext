import Collection from 'ol/Collection';
import { EventsKey } from 'ol/events';
import Feature from 'ol/Feature';
import Select, {Options as SelectOptions} from 'ol/interaction/Select';

/** A Select interaction to delete features on click.
 * @constructor
 * @extends {Interaction}
 * @fires deletestart
 * @fires deleteend
 * @param {*} options interaction.Select options
 */
export default class Delete extends Select {
    constructor(options?: SelectOptions);

    /** Delete features: remove the features from the map (from all layers in the map)
     * @param {Collection<Feature>|Array<Feature>} features The features to delete
     * @api
     */
    delete(features: Collection<Feature> | Feature[]): void;
}
