import VectorLayer from 'ol/layer/Vector'
import type { Options } from 'ol/layer/BaseVector'
import type VectorSource from 'ol/source/Vector'
import type { Geometry } from 'ol/geom'

interface ClusterOptions extends Options<VectorSource> {
  animationDuration?: number;
  easingFunction?: (t: number) => number;
}

/**
 *  A vector layer for animated cluster
 * @constructor
 * @extends {ol.layer.Vector}

 */
export default class AnimatedCluster extends VectorLayer<VectorSource<Geometry>> {
  /**
   * @param {olx.layer.AnimatedClusterOptions=} options extend olx.layer.Options
   *  @param {Number} options.animationDuration animation duration in ms, default is 700ms
   *  @param {ol.easingFunction} animationMethod easing method to use, default ol.easing.easeOut
   */
  constructor(options?: ClusterOptions);
}
