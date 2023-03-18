/** Add new properties to style.Text
 * to use with layer.Vector.prototype.setTextPathStyle
 * @constructor

 */
export default class TextPath {
  /**
   * @param {} options
   *  @param {visible|ellipsis|string} textOverflow
   *  @param {number} minWidth minimum width (px) to draw text, default 0
   */
  constructor(options: any, textOverflow: 'visible' | 'ellipsis' | string, minWidth: number);
}
