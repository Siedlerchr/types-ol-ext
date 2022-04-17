import { Coordinate } from 'ol/coordinate';
import { ProjectionLike } from 'ol/proj';
import { Stroke } from 'ol/style';
import Feature from 'ol/Feature';
import { FeatureAnimation } from '../featureanimation/FeatureAnimation';
import { animationControler } from '../featureanimation/FeatureAnimation';

declare module 'ol/Map' {
  export interface Options {
    projection?: ProjectionLike;
    duration?: number;
    easing?: (p0: number) => number;
    style?: Stroke;
  }

  /** Pulse an Extent on postcompose
   *	@param {Array<Coordinate>} point to pulse
   *	@param {pulse.options} options pulse options param
   *	  @param {projectionLike|undefined} options.projection projection of coords, default no transform
   *	  @param {Number} options.duration animation duration in ms, default 2000
   *	  @param {easing} options.easing easing function, default easing.upAndDown
   *	  @param {style.Stroke} options.style stroke style, default 2px red
   */
  function animExtent(point: Coordinate, options?: Options): void;
}

declare module 'ol/layer' {
  /** An animation controller object an object to control animation with start, stop and isPlaying function.
   * To be used with {@link olx.Map#animateFeature} or {@link layer.Vector#animateFeature}
   * @typedef {Object} animationControler
   * @property {function} start - start animation.
   * @property {function} stop - stop animation option arguments can be passed in animationend event.
   * @property {function} isPlaying - return true if animation is playing.
   */
  type animationController = {
    start: (...params: any[]) => any;
    stop: (...params: any[]) => any;
    isPlaying: (...params: any[]) => any;
  };

  interface Vector<VectorSourceType> {
    /** Animate feature on a vector layer
     * @fires animationstart, animationend
     * @param {ol.Feature} feature Feature to animate
     * @param {featureAnimation|Array<featureAnimation>} fanim the animation to play
     * @param {boolean} useFilter use the filters of the layer
     * @return {animationControler} an object to control animation with start, stop and isPlaying function
     */
    animateFeature(
      feature: Feature,
      fanim: FeatureAnimation | FeatureAnimation[],
      useFilter?: boolean
    ): animationControler;
  }
}
