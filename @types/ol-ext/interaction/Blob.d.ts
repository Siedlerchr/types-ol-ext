import { Layer } from "ol/layer";
import Clip from "./Clip";

export interface Options {
    radius?: number;
    layers?: Layer | Layer[];
    stiffness?: number;
    damping?: number;
    mass?: number;
    points?: number;
    tension?: number;
    fuss?: number;
    amplitude?: number;
}

/** Blob interaction to clip layers in a blob
 * @constructor
 * @extends {ol_interaction_Clip}
 * @param {*} options blob  options
 *  @param {number} options.radius radius of the clip, default 100
 *	@param {ol.layer|Array<ol.layer>} options.layers layers to clip
 *	@param {number} [options.stiffness=20] spring stiffness coef, default 20
 *	@param {number} [options.damping=7] spring damping coef
 *	@param {number} [options.mass=1] blob mass
 *	@param {number} [options.points=10] number of points for the blob polygon
 *	@param {number} [options.tension=.5] blob polygon spline tension
 *	@param {number} [options.fuss] bob fussing factor
 *	@param {number} [options.amplitude=1] blob deformation amplitude factor
 */
export class Blob extends Clip{
    constructor(options?: Options);

}
