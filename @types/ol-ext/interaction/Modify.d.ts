import type Feature from 'ol/Feature'
import Modify from 'ol/interaction/Modify'

export default class ExtendedModify extends Modify {
  /** @deprecated Uses OpenLayers internal drag segment state. */
  getModifiedFeatures(): Feature[]
}
