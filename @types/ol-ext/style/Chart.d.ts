import { Stroke, RegularShape } from 'ol/style';
import { Color } from 'ol/color';

export default Chart;
export type chartType = 'pie' | 'pie3d' | 'donut' | 'bar';
export interface Options {
    type: chartType;
    radius?: number;
    rotation?: number;
    snapToPixel?: boolean;
    stroke?: Stroke;
    colors?: string | Color[];
    displacemet? : number;
    offsetX?: number;
    offsetY?: number;
    animation?: number;
    max?: number;
}
/**
 * @requires ol.style.Circle
 */
/**
 * @classdesc
 * Set chart style for vector features.
 *
 * @constructor
 * @param {} options
 *	@param {String} options.type Chart type: pie,pie3D, donut or bar
 *	@param {number} options.radius Chart radius/size, default 20
 *	@param {number} options.rotation Rotation in radians (positive rotation clockwise). Default is 0.
 *	@param {bool} options.snapToPixel use integral numbers of pixels, default true
 *	@param {_ol_style_Stroke_} options.stroke stroke style
 *	@param {String|Array<ol_color>} options.colors predefined color set "classic","dark","pale","pastel","neon" / array of color string, default classic
 *	@param {Array<number>} options.displacement
 *	@param {number} options.offsetX X offset in px (deprecated, use displacement)
 *	@param {number} options.offsetY Y offset in px (deprecated, use displacement)
 *	@param {number} options.animation step in an animation sequence [0,1]
 *	@param {number} options.max maximum value for bar chart
 * @see [Statistic charts example](../../examples/style/map.style.chart.html)
 * @extends {RegularShape}
 * @api
 */
export class Chart extends RegularShape {
    constructor(options?: Options);
    /**
     * Clones the style.
     * @return {style.Chart}
     */
    clone(): Chart;
    /** Get data associatied with the chart
     */
    getData(): number[];
    /** Set data associatied with the chart
    *	@param {Array<number>}
     */
    setData(data: number[]): void;
    /** Get symbol radius
     */
    getRadius(): number;
    /** Set symbol radius
    *	@param {number} symbol radius
    *	@param {number} donut ratio
     */
    setRadius(symbol: number, ratio: number): void;
    /** Set animation step
    *	@param {false|number} false to stop animation or the step of the animation [0,1]
     */
    setAnimation(step: false | number): void;
    /**
     * @inheritDoc
     */
    getChecksum(): string;
}
export declare namespace Chart {
   export namespace colors {
        const classic: string[];
        const dark: string[];
        const pale: string[];
        const pastel: string[];
        const neon: string[];
    }
}
