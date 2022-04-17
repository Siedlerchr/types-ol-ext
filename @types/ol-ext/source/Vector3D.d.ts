import { Feature } from "ol";
import ImageLayer from "ol/layer/Image";
import { Style } from 'ol/style';
import * as olEasing from 'ol/easing';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import ImageSource from "ol/source/Image";
export interface Options {
    source?: VectorSource;
    style?: StyleLike;
    maxResolution?: number;
    defaultHeight?: number;
    height?: Height
    center?: number[];
}
export type Height = ((f: Feature) => number) | string | number;
/**
 *
 * @classdesc 3D vector layer rendering
 * @constructor
 * @extends {pl.layer.Image}
 * @param {Object} options
 *  @param {ol.source.Vector} options.source the source to display in 3D
 *  @param {ol.style.Style} options.styler drawing style
 *  @param {number} options.maxResolution  max resolution to render 3D
 *  @param {number} options.defaultHeight default height if none is return by a propertie
 *  @param {function|string|Number} options.height a height function (returns height giving a feature) or a popertie name for the height or a fixed value
 *  @param {Array<number>} options.center center of the view, default [.5,1]
 */
export default class Vector3D extends ImageLayer<ImageSource> {
    constructor(options?: Options);

    /**
     * Set the height function for the layer
     * @param {function|string|Number} height a height function (returns height giving a feature) or a popertie name or a fixed value
     */
    setHeight(height: Height): void;
    /**
     * Set style associated with the layer
     * @param {ol.style.Style} s
     */
    setStyle(s: Style): void;
    /**
     * Get style associated with the layer
     * @return {ol.style.Style}
     */
    getStyle(): Style;

    /** Animate rendering
     * @param {*} options
     *  @param {string|function|number} options.height an attribute name or a function returning height of a feature or a fixed value
     *  @param {number} options.duration the duration of the animatioin ms, default 1000
     *  @param {ol.easing} options.easing an ol easing function
     *	@api
     */
    animate(options: {
        height: Height,
        duration?: number;
        easing?: typeof olEasing
    }): void;

    /** Check if animation is on
    *	@return {bool}
    */
    animating(): boolean;

}
