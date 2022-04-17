import { Map as _ol_Map_ } from 'ol';
import Feature, { FeatureLike } from 'ol/Feature';
import { Vector } from 'ol/layer';
import { StyleLike } from 'ol/style/Style';
import { Select } from 'ol/interaction';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { Options as SelectOptions } from 'ol/interaction/Select'
import VectorSource from 'ol/source/Vector';
import { Geometry } from 'ol/geom';

export interface Options extends SelectOptions {
    featureStyle?: StyleLike;
    selectCluster?: boolean;
    pointRadius?: number;
    spiral?: boolean;
    circleMaxObject?: number;
    maxObjects?: number;
    animate?: boolean;
    animationDuration?: number;
}
/**
 * @classdesc
 * Interaction for selecting vector features in a cluster.
 * It can be used as an ol.interaction.Select.
 * When clicking on a cluster, it springs apart to reveal the features in the cluster.
 * Revealed features are selectable and you can pick the one you meant.
 * Revealed features are themselves a cluster with an attribute features that contain the original feature.
 *
 * @constructor
 * @extends {ol.interaction.Select}
 * @param {olx.interaction.SelectOptions=} options SelectOptions.
 *  @param {ol.style.StyleLike} options.featureStyle used to style the revealed features as options.style is used by the Select interaction.
 * 	@param {boolean} options.selectCluster false if you don't want to get cluster selected
 * 	@param {Number} options.pointRadius to calculate distance between the features
 * 	@param {bool} options.spiral means you want the feature to be placed on a spiral (or a circle)
 * 	@param {Number} options.circleMaxObjects number of object that can be place on a circle
 * 	@param {Number} options.maxObjects number of object that can be drawn, other are hidden
 * 	@param {bool} options.animate if the cluster will animate when features spread out, default is false
 * 	@param {Number} options.animationDuration animation duration in ms, default is 500ms
 * @fires ol.interaction.SelectEvent
 * @api stable
 */
export default class SelectCluster extends Select {
    constructor(options?: Options);
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /**
     * Clear the selection, close the cluster and remove revealed features
     * @api stable
     */
    clear(): void;
    /**
     * Get the layer for the revealed features
     * @api stable
     */
    getLayer(): Vector<VectorSource<Geometry>>;
    /**
     * Select a cluster
     * @param {Feature} a cluster feature ie. a feature with a 'features' attribute.
     * @api stable
     */
    selectCluster(a: Feature): void;

    /** Helper function to get the extent of a cluster
   * @param {ol.feature} feature
   * @return {ol.extent|null} the extent or null if extent is empty (no cluster or superimposed points)
   */
    getClusterExtent(feature: Feature): Extent | null
    /**
     * Animate the cluster and spread out the features
     * @param {Array<Coordinate>} the center of the cluster
     */
    animateCluster_(center: Coordinate[], feature: Feature): void;
}
