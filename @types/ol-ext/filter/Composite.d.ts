import Base from './Base';

export interface Options {
    operation?: string;
}
/** Colorize map or layer
* @constructor
* @requires filter
* @extends {filter.Base}
* @param {Object} options
*   @param {string} options.operation composite operation
 */
export class Composite extends Base {
    constructor(options?: Options);
    /** Change the current operation
    *	@param {string} operation composite function
     */
    setOperation(operation: string): void;
    /** Activate / deactivate filter
    *	@param {boolean} b
     */
    setActive(b: boolean): void;
    /** Get filter active
    *	@return {boolean}
     */
    getActive(): boolean;
}

