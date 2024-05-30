import type { Map as _ol_Map_ } from 'ol'
import type { Options as PrintOptions } from './PrintDialog'
import PrintDialog from './PrintDialog'

/** Print control to get an image of the map
 * @constructor
 * @fire show
 * @fire print
 * @fire error
 * @fire printing
 * @extends {ol_control_PrintDialog}
 */
export default class PrintDialog2x extends PrintDialog {
  /** Add a new language
   * @param {string} lang lang id
   * @param  labels
   */
  static addLang(lang: string, labels: any): void;

  /**
   * @param {Object=} options Control options.
   *  @param {string} options.className class of the control
   *  @param {string} [options.lang=en] control language, default en
   *  @param {string} options.imageType A string indicating the image format, default image/jpeg
   *  @param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
   *  @param {string} options.orientation Page orientation (landscape/portrait), default guest the best one
   *  @param {boolean} options.immediate force print even if render is not complete,  default false
   *  @param {boolean} [options.openWindow=false] open the file in a new window on print
   *  @param {boolean} [options.copy=true] add a copy select option
   *  @param {boolean} [options.print=true] add a print select option
   *  @param {boolean} [options.pdf=true] add a pdf select option
   *  @param {function} [options.saveAs] a function to save the image as blob
   *  @param {*} [options.jsPDF] jsPDF object to save map as pdf
   */
  constructor(options: PrintOptions)

  /** Set the second map to print
  * @param {ol.Map} map
  * @API
  */
  setMap2(map: _ol_Map_): void

  /** Set the second map to print
  * @returns {ol.Map}
  * @API
  */
  getMap2(): _ol_Map_
}
