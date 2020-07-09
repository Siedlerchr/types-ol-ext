import Feature from 'ol/Feature';
import { LineString } from 'ol/geom';
import { default as featureAnimation, FeatureAnimationEvent } from './FeatureAnimation';

export interface Options{
    speed?: number;
    rotate?: number | boolean;
    path?: LineString | Feature;
}
/** Path animation: feature follow a path
 * @constructor
 * @extends {featureAnimation}
 * @param {featureAnimationPathOptions} options extend featureAnimation options
 *  @param {Number} options.speed speed of the feature, if 0 the duration parameter will be used instead, default 0
 *  @param {Number|boolean} options.rotate rotate the symbol when following the path, true or the initial rotation, default false
 *  @param {LineString|Feature} options.path the path to follow
 */
declare class Path extends featureAnimation {
    constructor(options? : Options)
    /** Animate
    * @param {FeatureAnimationEvent} e
     */
    animate(e: FeatureAnimationEvent): boolean;
}

export default Path;
