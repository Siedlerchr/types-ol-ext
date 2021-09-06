import {FeatureLike} from "ol/Feature";

/** y-Ordering
*	@return ordering function (f0,f1)
  */
declare function yOrdering(): (f0: FeatureLike, f1: FeatureLike) => number;

export interface ZIndexOptions {
  /** ordering attribute, default zIndex */
  attribute?: string;
  /** ordering function for equal values */
  equalFn?: (f0: FeatureLike, f1: FeatureLike) => number;
}

/** Order with a feature attribute
 * @param options
 *  @param {string} options.attribute ordering attribute, default zIndex
 *  @param {function} options.equalFn ordering function for equal values
 * @return ordering function (f0,f1)
 */
declare function zIndex(options: {
    attribute: string;
    equalFn: (...params: any[]) => any;
}): any;

interface Ordering {
  yOrdering: typeof yOrdering;
  zIndex: typeof zIndex;
}

declare const ordering: Ordering;

export default ordering;
