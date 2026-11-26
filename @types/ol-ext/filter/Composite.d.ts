import Base from './Base'
import type { Options as BaseOptions } from './Base'

export interface Options extends BaseOptions {
  operation?: string;
}

/** Colorize map or layer
 * @constructor
 * @requires filter
 * @extends {filter.Base}

 */
export default class Composite extends Base {
  /**
   * @param {Object} options
   *   @param {string} options.operation composite operation
   */
  constructor(options: Options);

  /** Change the current operation
   *  @param {string} operation composite function
   */
  setOperation(operation?: string): void;

  /** Activate / deactivate filter
   *  @param {boolean} b
   */
  setActive(b: boolean): void;

  /** Get filter active
   *  @return {boolean}
   */
  getActive(): boolean;
}
