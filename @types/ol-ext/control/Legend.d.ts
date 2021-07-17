import ol_legend_Legend from '../legend/Legend';
import CanvasBase, { Options as CanvasOptions } from './CanvasBase';
export interface Options extends CanvasOptions {
    className?: string;
    legend?: ol_legend_Legend;
    title?: string;
    collapsed?: boolean;
    collapsible?: boolean;
}
/** Create a legend for styles
 * @constructor
 * @extends {ol_control_CanvasBase}
 * @fires select
 * @param {*} options
 *  @param {String} options.className class of the control
 *  @param {ol_legend_Legend} options.legend
 *  @param {boolean | undefined} options.collapsed Specify if legend should be collapsed at startup. Default is true.
 *  @param {boolean | undefined} options.collapsible Specify if legend can be collapsed, default true.
 *  @param {Element | string | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 */
export default class Legend extends CanvasBase {
    constructor(options?: Options);

    /** Draw control on canvas
     * @param {boolean} b draw on canvas.
     */
    setCanvas(b: boolean): void;
    /** Is control on canvas
      * @returns {boolean}
      */
    onCanvas(): boolean;

    getLegend(): ol_legend_Legend;

    show(): void;
    /** Hide control
     */
    hide(): void;
    /** Toggle control
     */
    toggle(): void;
    /** Show/hide control
       *
       */
    collapse(b: boolean): boolean;
  /** Is control collapsed
   * @returns {boolean}
   */
    isCollapsed(): boolean;
}
