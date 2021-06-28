import { Stroke, RegularShape } from 'ol/style';
import { Color } from 'ol/color';

export type chartType = 'pie' | 'pie3d' | 'donut' | 'bar';
export interface Options {
    type: chartType;
    radius?: number;
    rotation?: number;
    snapToPixel?: boolean;
    stroke?: Stroke;
    colors?: string | Color[];
    offsetX?: number;
    offsetY?: number;
    animation?: number;
    max?: number;
}
/**
 * @classdesc
 * Set chart style for vector features.
 *
 * @constructor
 * @param {} options
 *	@param {String} options.type Chart type: pie,pie3D, donut or bar
 *	@param {number} options.radius Chart radius/Size, default 20
 *	@param {number} options.rotation Rotation in radians (positive rotation clockwise). Default is 0.
 *	@param {bool} options.snapToPixel use integral numbers of pixels, default true
 *	@param {Stroke} options.stroke stroke style
 *	@param {String|Array<color>} options.colors predefined color set "classic","dark","pale","pastel","neon" / array of color string, default classic
 *	@param {number} options.offsetX X offset in px
 *	@param {number} options.offsetY Y offset in px
 *	@param {number} options.animation step in an animation sequence [0,1]
 *	@param {number} options.max maximum value for bar chart
 * @see [Statistic charts example](../../examples/map.style.chart.html)
 * @extends {style.RegularShape}
 * @implements {structs.IHasChecksum}
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
