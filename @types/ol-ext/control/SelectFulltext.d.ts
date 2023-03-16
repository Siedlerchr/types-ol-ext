import type { Vector as VectorSource } from 'ol/source'
import type { Options as SelectOptions } from './SelectBase'
import SelectBase from './SelectBase'

export interface Options extends SelectOptions {
  className?: string;
  source?: VectorSource | VectorSource[];
  property?: string;
  onchoice?: () => void;
}

/**
 * Select features by property using a simple text input
 *
 * @constructor
 * @extends {contrSelectBase}
 * @fires select

 */
export default class SelectFulltext extends SelectBase {
  /**
   * @param {Object=} options
   *  @param {string} options.className control class name
   *  @param {Element | undefined} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {Vector | Array<Vector>} options.source the source to search in
   *  @param {string} options.property property to select on
   *  @param {function|undefined} options.onchoice function triggered the text change, default nothing
   */
  constructor(options?: Options);
}
