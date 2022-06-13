import { Geometry } from 'ol/geom';
import { Vector } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';
import Feature from 'ol/Feature';
/**
 *
 * @classdesc
 *  3D vector layer rendering
 * @constructor
 * @param {Object} param
 *  @param {ol.layer.Vector} param.layer the layer to display in 3D
 *  @param {ol.style.Style} options.style drawing style
 *  @param {function|boolean} param.active a function that returns a boolean or a boolean ,default true
 *  @param {boolean} param.ghost use ghost style
 *  @param {number} param.maxResolution  max resolution to render 3D
 *  @param {number} param.defaultHeight default height if none is return by a propertie
 *  @param {function|string|Number} param.height a height function (returns height giving a feature) or a popertie name for the height or a fixed value
 */
export default class Render3D {
    constructor(param: {
        layer: Vector<VectorSource<Geometry>>;
        style?: Style
        active?: (() => boolean)
        maxResolution?: number;
        defaultHeight?: number;
        height?: ((...params: any[]) => any) | string | number;
    });
    /**
     * Set style associated with the renderer
     * @param {Style} s
     */
    setStyle(s: Style): void;
    /**
     * Get style associated with the renderer
     * @return {Style}
     */
    getStyle(): Style;

    /** Set active
    * @param {function|boolean} active
    */
    setActive(active: boolean | (() => boolean)): void;

    /** Set layer to render 3D
     */
    setLayer(): void;
    /** Create a function that return height of a feature
    *	@param {function|string|number} h a height function or a popertie name or a fixed value
    *	@return {function} function(f) return height of the feature f
     */
    getHfn(h: ((f: Feature) => number) | string | number): (f: Feature) => number
    /** Animate rendering
     * @param {olx.render3D.animateOptions}
     *  @param {string|function|number} param.height an attribute name or a function returning height of a feature or a fixed value
     *  @param {number} param.duration the duration of the animatioin ms, default 1000
     *  @param {ol.easing} param.easing an ol easing function
     *	@api
     */
    animate(options: {
        height: ((f: Feature) => number) | string | number;
        duration: number;
        easing: ((p0: number) => number);
    }): void;
    /** Check if animation is on
    *	@return {bool}
     */
    animating(): boolean;
    /** Get feature height
     * @param {Feature} f
     */
    getFeatureHeight(f: Feature): void;

}
