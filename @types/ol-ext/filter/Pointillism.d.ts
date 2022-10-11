import Base from "./Base";

export type FilterPointillismOptions = {
    /**
     * saturation, default 2
     */
    saturate?: number;
};
/** @typedef {Object} FilterPointillismOptions
 * @property {number} saturate saturation, default 2
 */
/** A pointillism filter to turn maps into pointillism paintings
 * @constructor
 * @extends {ol_filter_Base}
 * @param {FilterPointillismOptions} options
 */
export default class Pointillism extends Base {
    constructor(options?: FilterPointillismOptions);

}
