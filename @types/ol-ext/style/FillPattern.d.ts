import { Fill, Image } from 'ol/style';
import { Color } from 'ol/color';

export interface FillPatternOptions {
    size?: number;
    width?: number;
    height?: number;
    circles?: number[][];
    lines?: number[][];
    stroke?: number;
    fill?: boolean;
    char?: string;
    font?: string;
}

export interface Options {
    image?: Image;
    opacity?: number;
    pattern?: FillPattern;
    color?: Color;
    fill?: Color;
    offset?: number;
    Size?: number;
    spacing?: number;
    angle?: number | boolean;
    scale?: number;
}
/**
 * @classdesc
 * Fill style with named pattern
 *
 * @constructor
 * @param {olx.style.FillPatternOption=}  options
 *	@param {style.Image|undefined} options.image an image pattern, image must be preloaded to draw on first call
 *	@param {number|undefined} options.opacity opacity with image pattern, default:1
 *	@param {olx.style.fillPattern} options.pattern pattern name (override by image option)
 *	@param {color} options.color pattern color
 *	@param {Fill} options.fill fill color (background)
 *	@param {number} options.offset pattern offset for hash/dot/circle/cross pattern
 *	@param {number} options.Size line Size for hash/dot/circle/cross pattern
 *	@param {number} options.spacing spacing for hash/dot/circle/cross pattern
 *	@param {number|bool} options.angle angle for hash pattern / true for 45deg dot/circle/cross
 *	@param {number} options.scale pattern scale
 * @extends {Fill}
 * @api
 */
export default class FillPattern extends Fill {
    constructor(options?: Options);
    /**
     * Clones the style.
     * @return {style.FillPattern}
     */
    clone(): FillPattern;
    /** Get canvas used as pattern
    *	@return {canvas}
     */
    getImage(): HTMLCanvasElement;
    /** Static fuction to add char patterns
    *	@param {title}
    *	@param {olx.fillpattern.Option}
    *		- Size {number} default 10
    *		- width {number} default 10
    *		- height {number} default 10
    *		- circles {Array<circles>}
    *		- lines: {Array<pointlist>}
    *		- stroke {number}
    *		- fill {bool}
    *		- char {char}
    *		- font {string} default "10px Arial"
     */
    static addPattern(title: string, options: FillPatternOptions): void;
    /** Patterns definitions
        Examples : http://seig.ensg.ign.fr/fichchap.php?NOFICHE=FP31&NOCHEM=CHEMS009&NOLISTE=1&N=8
     */
    patterns: {
        hatch: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        cross: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        dot:  {
            width: number;
            height: number;
            circles: number[][];
            stroke: boolean;
            fill: boolean;
        };
        circle: {
            width: number;
            height: number;
            circles: number[][];
            stroke: number;
            fill: boolean;
        };
        square: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
            fill: boolean;
        };
        tile: {
            width: number;
            height: number;
            lines: number[][];
            fill: boolean;
        };
        woven:  {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        crosses:  {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        caps: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        nylon: {
            width: number;
            height: number;
            lines: number[][];
            repeat: number[][];
            stroke: number;
        };
        hexagon: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
            repeat: number[][];
        };
        cemetry: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
            repeat: number[][];
        };
        sand: {
            width: number;
            height: number;
            circles: number[][];
            fill: number;
        };
        conglomerate: {
            width: number;
            height: number;
            circles: number[][];
            lines: number[][];
            stroke: number;
        };
        gravel: {
            width: number;
            height: number;
            circles: number[][];
            lines: number[][];
            stroke: number;
        };
        brick: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        dolomite: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        coal: {
            width: number;
            height: number;
            lines: number[][];
            fill: number;
        };
        breccia: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        clay: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        flooded: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        chaos: {
            width: number;
            height: number;
            lines: number[][];
            fill: number;
        };
        grass: {
            width: number;
            height: number;
            lines: number[][];
            repeat: number[][];
            stroke: number;
        };
        swamp: {
            width: number;
            height: number;
            lines: number[][];
            repeat: number[][];
            stroke: number;
        };
        wave: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        vine: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
        forest: {
            width: number;
            height: number;
            circles: number[][];
            stroke: number;
        };
        scrub: {
            width: number;
            height: number;
            lines: number[][];
            circles: number[][];
            stroke: number;
        };
        tree: {
            width: number;
            height: number;
            lines: number[][];
            repeat: number[][];
            stroke: number;
        };
        pine: {
            width: number;
            height: number;
            lines: number[][];
            repeat: number[][];
            stroke: number;
        };
        pines: {
            width: number;
            height: number;
            lines: number[][];
            repeat: number[][];
            stroke: number;
        };
        rock: {
            width: number;
            height: number;
            lines: number[][];
            repeat: number[][];
            stroke: number;
        };
        rocks: {
            width: number;
            height: number;
            lines: number[][];
            stroke: number;
        };
    };
}
