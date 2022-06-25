
import { jsPDF } from "jspdf";
import { Size } from 'ol/size';
import { Map as _ol_Map_ } from 'ol';
import ol_control_Control, { Options as ControlOptions } from 'ol/control/Control';
import Print from './Print';

export interface Options extends ControlOptions {
    className?: string;
    lang?: string;
    imageType?: string;
    quality?: number;
    orientation?: 'landscape' | 'portrait';
    immediate?: boolean;
    openWindow?: boolean;
    copy?: boolean;
    print?: boolean;
    pdf?: true;
    saveAs?: (blob: Blob, name: string) => void
    northImage?: 'default' | 'compact';
    jsPDF?: jsPDF
}
export type PaperSize = 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'US Letter'| 'A5' | 'B4' | 'B5';
/** Print control to get an image of the map
 * @constructor
 * @fire print
 * @fire error
 * @fire printing
 * @extends {ol.control.Control}
 * @param {Object=} options Control options.
 *	@param {string} options.className class of the control
 *  @param {string} [options.lang=en] control language, default en
 *	@param {string} options.imageType A string indicating the image format, default image/jpeg
 *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
 *	@param {string} options.orientation Page orientation (landscape/portrait), default guest the best one
 *	@param {boolean} options.immediate force print even if render is not complete,  default false
 *	@param {boolean} [options.openWindow=false] open the file in a new window on print
 *	@param {boolean} [options.copy=true] add a copy select option
 *	@param {boolean} [options.print=true] add a print select option
 *	@param {boolean} [options.pdf=true] add a pdf select option
 *	@param {function} [options.saveAs] a function to save the image as blob
 *	@param {*} [options.jsPDF] jsPDF object to save map as pdf
 */
export default class PrintDialog extends ol_control_Control {
    /** Add a new language
     * @param {string} lang lang id
     * @param  labels
     */
    static addLang(lang: string, labels: any): void;
    constructor(options: any);

    /** Check if the dialog is oprn
     * @return {boolean}
     */
    isOpen(): boolean;
    /** Translate
     * @param {string} what
     * @returns {string}
     */
    i18n(what: string): string;
    /** Get print orientation
     * @returns {string}
     */
    getOrientation(): string;
    /** Set print orientation
     * @param {string} ori landscape or portrait
     */
    setOrientation(ori: 'landscape' | 'portrait'): void;
    /** Get print margin
     */
    getMargin(): number;
    /** Set print margin
     * @param margin
     */
    setMargin(margin: number): void;
    /** Get print size
     *
     */
    getSize(): Size;
    /** Set map print size
     * @param  size map size as ol/size or A4, etc.
     */
    setSize(size: Size | PaperSize): void;
    /** Get dialog content element
     * @return {Element}
     */
    getContentElement(): Element;
    /** Get dialog user element
     * @return {Element}
     */
    getUserElement(): Element;
    /** Get page element
     * @return {Element}
     */
    getPage(): Element;
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {ol.Map} map Map.
     * @api stable
     */
    setMap(map: _ol_Map_): void;
    /** Set the current scale (will change the scale of the map)
     * @param {number|string} value the scale factor or a scale string as 1/xxx
     */
    setScale(value: number | string): void;
    /** Get the current map scale factor
     * @return {number}
     */
    getScale(): number;
    /** Show print dialog
     * @param {*}
     *  @param {ol/size|string} options.size map size as ol/size or A4, etc.
     *  @param {number|string} options.value the scale factor or a scale string as 1/xxx
     *  @param {string} options.orientation landscape or portrait
     *  @param {number} options.margin
     */
    print(options?: {
        size?: Size | string;
        value: number | string;
        orientation: 'landscape' | 'portrait';
        margin?: number
    }): void;


    /** Get print control
     * @returns {Print}
     */
    getrintControl(): Print
    /** Print dialog labels (for customisation) */
    _labels: {
        en: {
            title: string;
            orientation: string;
            portrait: string;
            landscape: string;
            size: string;
            custom: string;
            margin: string;
            scale: string;
            legend: string;
            north: string;
            mapTitle: string;
            saveas: string;
            saveLegend: string;
            copied: string;
            errorMsg: string;
            printBt: string;
            cancel: string;
        };
        fr: {
            title: string;
            orientation: string;
            portrait: string;
            landscape: string;
            size: string;
            custom: string;
            margin: string;
            scale: string;
            legend: string;
            north: string;
            mapTitle: string;
            saveas: string;
            saveLegend: string;
            copied: string;
            errorMsg: string;
            printBt: string;
            cancel: string;
        };
    };
    /** List of paper size */
    paperSize: {
        '': any;
        A0: number[];
        A1: number[];
        A2: number[];
        A3: number[];
        A4: number[];
        A5: number[];
        B4: number[];
        B5: number[];
    };
    /** List of margin size */
    marginSize: {
        none: number;
        small: number;
        large: number;
    };
    /** List of legeng options * /
    ol_control_PrintDialog.prototype.legendOptions = {
      off: 'Hide legend',
      on: 'Show legend'
    };

    /** List of print image file formats */
    formats: ({
        title: string;
        imageType: string;
        clipboard: boolean;
        quality?: undefined;
        pdf?: undefined;
    } | {
        title: string;
        imageType: string;
        quality: number;
        clipboard?: undefined;
        pdf?: undefined;
    } | {
        title: string;
        imageType: string;
        pdf: boolean;
        clipboard?: undefined;
        quality?: undefined;
    })[];
    /** List of print scale */
    scales: {
        ' 5000': string;
        ' 10000': string;
        ' 25000': string;
        ' 50000': string;
        ' 100000': string;
        ' 250000': string;
        ' 1000000': string;
    };
}
