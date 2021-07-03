import { Map as _ol_Map_ } from 'ol';
import Collection from 'ol/Collection';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Style } from 'ol/style';
import { Interaction, Draw, Modify } from 'ol/interaction';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorLayer from 'ol/layer/Vector';

export interface Options {
    pixelTolerance?: number;
    enableInitialGuides?: boolean;
    style?: Style | Style[];
    vectorClass?: VectorLayer | VectorImageLayer
}
/** Interaction to snap to guidelines
 * @constructor
 * @extends {ol_interaction_Interaction}
 * @param {*} options
 *  @param {number | undefined} options.pixelTolerance distance (in px) to snap to a guideline, default 10 px
 *  @param {bool | undefined} options.enableInitialGuides whether to draw initial guidelines based on the maps orientation, default false.
 *  @param {ol_style_Style | Array<ol_style_Style> | undefined} options.style Style for the sektch features.
 *  @param {*} options.vectorClass a vector layer class to create the guides with ol6, use ol/layer/VectorImage using ol6
 */
export default class SnapGuides extends Interaction {
    constructor(options: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Activate or deactivate the interaction.
    * @param {boolean} active
     */
    setActive(active: boolean): void;
    /** Clear previous added guideliness
    * @param {Array<Feature> | undefined} features a list of feature to remove, default remove all feature
     */
    clearGuides(features?: Feature[] ): void;
    /** Get guidelines
    * @return {Collection} guidelines features
     */
    getGuides(): Collection<Feature>;
    /** Add a new guide to snap to
    * @param {Array<Coordinate>} v the direction vector
    * @return {Feature} feature guide
     */
    addGuide(v: Coordinate[], ortho: boolean): Feature;
    /** Add a new orthogonal guide to snap to
    * @param {Array<Coordinate>} v the direction vector
    * @return {Feature} feature guide
     */
    addOrthoGuide(v: Coordinate[]): Feature;
    /** Listen to draw event to add orthogonal guidelines on the first and last point.
    * @param {_ol_interaction_Draw_} drawi a draw interaction to listen to
    * @api
     */
    setDrawInteraction(drawi: Draw): void;
    /** Listen to modify event to add orthogonal guidelines relative to the currently dragged point
    * @param {_ol_interaction_Modify_} modifyi a modify interaction to listen to
    * @api
     */
    setModifyInteraction(modifyi: Modify): void;
}
