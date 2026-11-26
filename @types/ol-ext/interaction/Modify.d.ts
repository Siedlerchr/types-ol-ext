import type Feature from 'ol/Feature'
import Modify from 'ol/interaction/Modify'

declare module 'ol/interaction' {
  interface Modify {
    /** Get features in the current modify drag segments. */
    getModifiedFeatures(): Feature[];
  }
}

/** OpenLayers Modify constructor with the deprecated prototype extension installed. */
export default class ExtendedModify extends Modify {
  /** Get the modified features.
   * @deprecated Uses OpenLayers internal drag segment state.
   */
  getModifiedFeatures(): Feature[]
}
