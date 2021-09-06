import { Collection, Feature, Map as _ol_Map_ } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { InteractionOptions } from 'ol/interaction/Interaction';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import ModifyFeature from './ModifyFeature';
import { TouchCursor } from './TouchCursor';
export interface Options extends InteractionOptions {
    className?: string;
    coordinate?: Coordinate;
    source?: VectorSource;
    sources?: VectorSource | VectorSource[];
    features?: Collection<Feature>;
    filter?: (f: Feature)=> boolean;
    pixelTolerance?: number;
    style?: StyleLike;
    wrapX?: boolean;
}



/** TouchCursor interaction + ModifyFeature
 * @constructor
 * @extends {ol_interaction_TouchCursor}
 * @param {olx.interaction.InteractionOptions} options Options
 *  @param {string} options.className cursor class name
 *  @param {ol.coordinate} options.coordinate cursor position
 *	@param {ol.source.Vector} options.source a source to modify (configured with useSpatialIndex set to true)
 *	@param {ol.source.Vector|Array<ol.source.Vector>} options.sources a list of source to modify (configured with useSpatialIndex set to true)
 *  @param {ol.Collection.<ol.Feature>} options.features collection of feature to modify
 *  @param {function|undefined} options.filter a filter that takes a feature and return true if it can be modified, default always true.
 *  @param {number} pixelTolerance Pixel tolerance for considering the pointer close enough to a segment or vertex for editing, default 10
 *  @param {ol.style.Style | Array<ol.style.Style> | undefined} options.style Style for the sketch features.
 *  @param {boolean} options.wrapX Wrap the world horizontally on the sketch overlay, default false
 */
export default class TouchCursorModify extends TouchCursor {
    constructor(options?: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {_ol_Map_} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /**
     * Activate or deactivate the interaction.
     * @param {boolean} active Active.
     * @param {ol.coordinate|null} position position of the cursor (when activating), default viewport center.
     * @observable
     * @api
     */
    setActive(b: boolean, position: Coordinate | null): void;
    /**
     * Get the modify interaction.
     * @retunr {ol.interaction.ModifyFeature}
     * @observable
     * @api
     */
    getInteraction(): ModifyFeature;
}

