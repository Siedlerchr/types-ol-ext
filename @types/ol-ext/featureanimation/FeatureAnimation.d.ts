import type {
  Style
} from 'ol/style'
import type Feature
  from 'ol/Feature'
import type {
  Geometry
} from 'ol/geom'
import type {
  Extent
} from 'ol/extent'
import type {
  Coordinate
} from 'ol/coordinate'
import type VectorContext
  from 'ol/render/VectorContext'
import {
  Object as _OL_OBJECT
} from 'ol'
import type {
  Type
} from 'ol/geom/Geometry'
import type {
  FrameState
} from 'ol/Map'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'

/** An animation lifecycle event dispatched with the animated feature. */
export interface AnimationLifecycleEvent extends BaseEvent {
  type: 'animationstart' | 'animationrepeat' | 'animationend';
  feature: Feature;
  [key: string]: unknown;
}

/** Current animation frame, emitted while the animation is playing. */
export interface AnimationFrameEvent extends BaseEvent {
  type: 'animating';
  feature: Feature;
  step: number;
  start: number;
  time: number;
  elapsed: number;
  rotation: number;
  geom: Geometry;
  coordinate: Coordinate;
  style: Style[];
  extra: unknown;
}

/** Drawing information; listeners can replace the styles before drawing. */
export interface AnimationDrawingEvent extends BaseEvent {
  type: 'drawing';
  feature: Feature;
  start: number;
  time: number;
  stop?: number;
  rotation?: number;
  style: Style | Style[];
  extra?: unknown;
}

export interface FeatureAnimationEvent {
  vectorContext: VectorContext | null,
  frameState: FrameState,
  start: number,
  time: number,
  elapsed: number,
  extent: Extent,
  // Feature information
  feature: Feature,
  geom: Geometry
  typeGeom: Type,
  bbox: Extent
  coord: Coordinate
  style: Style[]
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  rotation?: number
  extra?: unknown
}

export interface Options {
  speed?: number;
  duration?: number;
  side?: any;
  revers?: boolean;
  repeat?: number;
  hiddenStyle?: Style;
  horizontal?: boolean;
  fade?: ((p0: number) => number);
  easing?: ((p0: number) => number);
}

/** An animation controler object an object to control animation with start, stop and isPlaying function.
 * To be used with {@link olx.Map#animateFeature} or {@link layer.Vector#animateFeature}
 * @typedef {Object} animationControler
 * @property {function} start - start animation.
 * @property {function} stop - stop animation option arguments can be passed in animationend event.
 * @property {function} isPlaying - return true if animation is playing.
 */
export type animationControler = {
  start: (options?: Record<string, unknown>) => void;
  stop: (options?: Record<string, unknown>) => void;
  isPlaying: () => boolean;
};

/** Feature animation base class
 * Use the {@link _ol_Map_#animateFeature} or {@link _ol_layer_Vector_#animateFeature} to animate a feature
 * on postcompose in a map or a layer
 * @constructor
 * @fires animationstart
 * @fires animating
 * @fires animationend

 */
export default class FeatureAnimation extends _OL_OBJECT {
  /**
   * @param {featureAnimationOptions} options
   *  @param {Number} options.duration duration of the animation in ms, default 1000
   *  @param {bool} options.revers revers the animation direction
   *  @param {Number} options.repeat number of time to repeat the animation, default 0
   *  @param {oo.Style} options.hiddenStyle a style to display the feature when playing the animation
   *    to be used to make the feature selectable when playing animation
   *    (@see {@link ../examples/map.featureanimation.select.html}), default the feature
   *    will be hidden when playing (and niot selectable)
   *  @param {easing.Function} options.fade an easing function used to fade in the feature, default none
   *  @param {easing.Function} options.easing an easing function for the animation, default easing.linear
   */
  constructor(options?: Options);

  /** Transparent style used while a feature is animating. */
  static hiddenStyle: Style

  /** Function to perform manipulations onpostcompose.
   * This function is called with an featureAnimationEvent argument.
   * The function will be overridden by the child implementation.
   * Return true to keep this function for the next frame, false to remove it.
   * @param {FeatureAnimationEvent} e
   * @return {bool} true to continue animation.
   * @apis
   */
  animate(e: FeatureAnimationEvent): boolean;

  on: _OL_OBJECT['on'] & OnSignature<AnimationLifecycleEvent['type'], AnimationLifecycleEvent, EventsKey> & OnSignature<'animating', AnimationFrameEvent, EventsKey> & OnSignature<'drawing', AnimationDrawingEvent, EventsKey>;
  once: _OL_OBJECT['once'] & OnSignature<AnimationLifecycleEvent['type'], AnimationLifecycleEvent, EventsKey> & OnSignature<'animating', AnimationFrameEvent, EventsKey> & OnSignature<'drawing', AnimationDrawingEvent, EventsKey>;
  un: _OL_OBJECT['un'] & OnSignature<AnimationLifecycleEvent['type'], AnimationLifecycleEvent, void> & OnSignature<'animating', AnimationFrameEvent, void> & OnSignature<'drawing', AnimationDrawingEvent, void>;
}

declare module 'ol/layer' {
  interface Vector<VectorSourceType> {
    /** Animate a feature on this layer. Importing this module installs the method. */
    animateFeature(feature: Feature, animation: FeatureAnimation | FeatureAnimation[], useFilter?: boolean): animationControler;
  }
}

/** Map augmented by this module at runtime. */
export type AnimatedMap =
  import('ol/Map').default
  & {
  animateFeature(feature: Feature, animation: FeatureAnimation): animationControler;
}
