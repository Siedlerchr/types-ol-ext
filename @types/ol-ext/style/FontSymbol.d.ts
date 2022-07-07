import _ol_ImageStyle  from 'ol/style/Image';
import { Fill, Stroke, RegularShape } from 'ol/style';


export type Form = 'none' | 'circle' | 'poi' | 'bubble' | 'marker' | 'coma' | 'shield' | 'blazon' | 'bookmark' | 'hexagon' | 'diamond' |
    'triangle' | 'sign' | 'ban' | 'lozenge' | 'square';
export interface Options {
    color?: string;
    glyph?: string | null;
    text?: string;
    font?: string;
    form?: Form;
    radius?: number;
    rotation?: number;
    rotateWithView?: boolean;
    opacity?: number;
    fontSize?: number;
    fontStyle?: string;
    gradient?: boolean;
    displacement?: number[];
    offsetX?: number;
    offsetY?: number;
    fill?: Fill;
    stroke?: Stroke;
}

export interface Font {
    font: string,
    name: string,
    copyright: string,
    prefix?: string
}

export interface Glyph {
    font: string,
    char: number,
    theme: string,
    name: string,
    search: string
}

/**
 * @classdesc
 * A marker style to use with font symbols.
 *
 * @constructor
 * @param {Options=} options Options.
 *  @param {string} [options.color] default #000
 *  @param {string} options.glyph the glyph name or a char to display as symbol.
 *    The name must be added using the {@link FontSymbol.addDefs} function.
 *  @param {string} [options.text] a text to display as a glyph
 *  @param {string} [options.font] font to use with the text option
 *  @param {string} options.form
 * 	  none|circle|poi|bubble|marker|coma|shield|blazon|bookmark|hexagon|diamond|triangle|sign|ban|lozenge|square
 * 	  a form that will enclose the glyph, default none
 *  @param {number} options.radius
 *  @param {number} options.rotation
 *  @param {boolean} options.rotateWithView
 *  @param {number} [options.opacity=1]
 *  @param {number} [options.fontSize=1] size of the font compare to the radius, fontSize greater than 1 will exceed the symbol extent
 *  @param {string} [options.fontStyle] the font style (bold, italic, bold italic, etc), default none
 *  @param {boolean} options.gradient true to display a gradient on the symbol
 *  @param {Array<number>} [options.displacement] to use with ol > 6
 * 	@param {number} [options.offsetX=0] Horizontal offset in pixels, deprecated use displacement with ol>6
 * 	@param {number} [options.offsetY=0] Vertical offset in pixels, deprecated use displacement with ol>6
 *  @param {Fill} options.fill
 *  @param {Stroke} options.stroke
 * @extends {RegularShape}
 * @api
 */
export default class FontSymbol extends RegularShape {
    constructor(options?: Options);
    /** Cool stuff to get the image symbol for a style
     */
    /**
     *	Font defs
     */
    defs: {
        fonts: any;
        glyphs: any;
    };
    /** Static function : add new font defs
     * @param {String|Object} font the font desciption
     * @param {} glyphs a key / value list of glyph definitions.
     * 		Each key is the name of the glyph,
     * 		the value is an object that code the font, the caracter code,
     * 		the name and a search string for the glyph.
     */
    static addDefs(font: string | Font | any, glyphs: { [key: string]: Glyph }): void;
    /**
     * Clones the style.
     * @return {FontSymbol}
     */
    clone(): FontSymbol;
    /**
     * Get the fill style for the symb
     * @return {Fill} Fill style.
     * @api
     */
    getFill(): Fill;
    /**
     * Get the stroke style for the symb
     * @return {Stroke} Stroke style.
     * @api
     */
    getStroke(): Stroke;
    /**
     * Get the glyph definition for the symb
     * @param {string|undefined} name a glyph name to get the definition, default return the glyph definition for the style.
     * @return {Glyph}
     * @api
     */
    getGlyph(name?: string): Glyph;
    /** Get glyph definition given a text and a font
     * @param {string|undefined} text
     * @param {string} [font] the font for the text
     * @return {Glyph}
     * @api
     */
    getTextGlyph(text?: string, font?: string): Glyph;
    /**
     * Get the glyph name.
     * @return {string} the name
     * @api
     */
    getGlyphName(): string;
    /**
     * Get the font info
     * @return {Font}
     * @api
     */
    getFontInfo(): Font;

    getChecksum(): string;
}

export interface ImageStyle extends _ol_ImageStyle {
    getImagePNG(): string | boolean;
}
