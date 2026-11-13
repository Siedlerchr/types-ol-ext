import type { Options as ControlOptions } from 'ol/control/Control'
import ol_control_Control from 'ol/control/Control'
import type Feature from 'ol/Feature'
import type { Geometry } from 'ol/geom'
import type { Style } from 'ol/style'
import type { Coordinate } from 'ol/coordinate'
import type { ProjectionLike } from 'ol/proj'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { ObjectEvent } from 'ol/Object'
import type { Types } from 'ol/ObjectEventType'

export type ProfilePoint = [number, number, string, Coordinate]
export interface ProfilePointerEvent extends BaseEvent { type: 'over' | 'click' | 'dragstart' | 'dragging' | 'dragend'; index: number; coord: Coordinate; time: string; distance: number; click?: boolean }
export interface ProfileShowEvent extends BaseEvent { type: 'show'; show: boolean }
export interface ProfileZoomEvent extends BaseEvent { type: 'zoom'; geometry?: Geometry; start?: number; end?: number }
export interface ProfileGeometryEvent extends BaseEvent { type: 'change:geometry'; geometry: Geometry }
export type ProfileOnSignature<Return> = OnSignature<EventTypes, BaseEvent, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<'over' | 'click' | 'dragstart' | 'dragging' | 'dragend', ProfilePointerEvent, Return> &
  OnSignature<'show', ProfileShowEvent, Return> & OnSignature<'zoom', ProfileZoomEvent, Return> &
  OnSignature<'change:geometry', ProfileGeometryEvent, Return> & OnSignature<'out' | 'dragcancel', BaseEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'error' | 'propertychange' | 'over' | 'click' | 'dragstart' | 'dragging' | 'dragend' | 'show' | 'zoom' | 'change:geometry' | 'out' | 'dragcancel', Return>

export interface Options extends ControlOptions {
  className?: string;
  title?: string;
  style?: Style;
  selectStyle?: Style;
  info?: { [key: string]: any };
  width?: number;
  height?: number;
  units?: 'metric' | 'imperial';
  feature?: Feature;
  selectable?: boolean;
  zoomable?: boolean;
  numberFormat?: string;
  skipFirst?: number;
}
export interface ProfileInfo {
  zmin: string;
  zmax: string;
  ytitle: string;
  xtitle: string;
  time: string;
  altitude: string;
  elevation: string;
  elevgain: string;
  elevloss: string;
  maxslope: string;
  avgslope: string;
}

export interface ProfileUnit {
  Meter: 'm';
  Kilometer: 'km';
  Foot: 'ft';
  Mile: 'mi';
}
/**
 * @classdesc OpenLayers 3 Profile Control.
 * Draw a profile of a feature (with a 3D geometry)
 *
 * @constructor
 * @extends {ol_control_Control}
 * @fires over
 * @fires out
 * @fires show
 * @fires dragstart
 * @fires dragging
 * @fires dragend
 * @fires dragcancel
 */
export default class Profile extends ol_control_Control {
  static prototype: {
    info: ProfileInfo;
    Unit: ProfileUnit;
    FOOT_VALUE: number;
    MILE_VALUE: number;
    KILOMETER_VALUE: number;
  }

  /**
   * @param {Object=} options
   *  @param {string} options.className
   *  @param {String} options.title button title
   *  @param {ol.style.Style} [options.style] style to draw the profil, default darkblue
   *  @param {ol.style.Style} [options.selectStyle] style for selection, default darkblue fill
   *  @param {*} options.info keys/values for i19n
   *  @param {number} [options.width=300]
   *  @param {number} [options.height=150]
   *  @param {'metric'|'imperial'} [options.units='metric'] output system of measurement Note that input z coords are expected to be in meters in either mode (as determined by GPX, DEM, DSM, etc. standards).
   *  @param {ol.Feature} [options.feature] the feature to draw profil
   *  @param {boolean} [options.selectable=false] enable selection on the profil, default false
   *  @param {boolean} [options.zoomable=false] can zoom in the profil
   *  @param {string} [options.numberFormat] Convert numbers to a custom locale format, default is not used
   *  @param {string} [options.skipFirst] Skip the first/last n points of the profile to avoid GPS spike on start, default 0
   */
  constructor(options?: Options);

  on: ProfileOnSignature<EventsKey>;
  once: ProfileOnSignature<EventsKey>;
  un: ProfileOnSignature<void>;

  /** Show popup info
   * @param {string} info to display as a popup
   * @api stable
   */
  popup(info: string): void;

  /**
   * Refresh the profil
   */
  refresh(): void;

  /** Show point at coordinate or a distance on the profil
   * @param { Coordinate|number } where a coordinate or a distance from begining, if none it will hide the point
   * @return {Coordinate} current point
   */
  showAt(where?: Coordinate | number): Coordinate | null;

  /** Show point at a time on the profil
   * @param { Date|number } time a Date or a DateTime (in s) to show the profile on, if none it will hide the point
   * @param { boolean } delta true if time is a delta from the start, default false
   * @return { Coordinate } current point
   */
  showAtTime(time?: Date | number, delta?: boolean): Coordinate | null;

  /** Get the point at a given time on the profil
   * @param { number } time time at which to show the point
   * @return { Coordinate } current point
   */
  pointAtTime(time: number): Coordinate | ProfilePoint;

  /** Show panels
   * @api stable
   */
  show(): void;

  /** Hide panel
   * @api stable
   */
  hide(): void;

  /** Toggle panel
   * @api stable
   */
  toggle(): void;

  /** Is panel visible
   */
  isShown(): boolean;

  /** Get selection
   * @param {number} starting point
   * @param {number} ending point
   * @return {Array<Coordinate>}
   */
  getSelection(start: number, end: number): Coordinate[];

  /**
   * Set the geometry to draw the profil.
   * @param {ol.Feature|ol.geom.Geometry} f the feature.
   * @param {Object=} options
   *  @param {('m'|'km'|'ft'|'mi')} [options.zunit='m'] 'm', 'km', 'ft' or 'mi', default 'm' or 'ft' according to the System of measurement
   *  @param {('m'|'km'|'ft'|'mi')} [options.unit='km'] 'm', 'km', 'ft' or 'mi', default 'km' or 'mi' according to the System of measurement
   *  @param {Number|undefined} [options.zmin=0] default 0
   *  @param {Number|undefined} options.zmax default max Z of the feature
   *  @param {integer|undefined} [options.zDigits=0] number of digits for z graduation, default 0
   *  @param {integer|undefined} [options.xDigits=1] number of digits for x-axis (distance), default 1
   *  @param {number} [options.zDigitsHover=2] Decimals number while hovering the profile graph, default 2
   *  @param {number} [options.xDigitsHover=1] Decimals number while hovering the profile graph, default 1
   *  @param {integer|undefined} [options.zMaxChars] maximum number of chars to be used for z graduation before switching to scientific notation
   *  @param {Number|undefined} [options.graduation=100] length of each z graduation step, default 100. If `zSteps` is provided, this is not used
   *  @param {integer|undefined} [options.amplitude] amplitude of the altitude, default zmax-zmin
   *  @param {integer|undefined} [options.xSteps] number of steps at the x-axis (distance), default 10. If not provided, default is calculated from the distance
   *  @param {integer|undefined} [options.zSteps] number of steps at the amplitude scale. If not provided, default is calculated from graduation
   * @api stable
   */
  setGeometry(f: Feature | Geometry, options?: {
    projection?: ProjectionLike;
    zunit?: ProfileUnit[keyof ProfileUnit];
    unit?: ProfileUnit[keyof ProfileUnit];
    zmin?: number;
    zmax?: number;
    zDigits?: number;
    xDigits?: number;
    zDigitsHover?: number;
    xDigitsHover?: number;
    zMaxChars?: number;
    graduation?: number;
    amplitude?: number;
    xSteps?: number;
    zSteps?: number;
  }): void;

  /** Get profil image
   * @param {string|undefined} type image format or 'canvas' to get the canvas image, default image/png.
   * @param {Number|undefined} encoderOptions between 0 and 1 indicating image quality image/jpeg or image/webp, default 0.92.
   * @return {string} requested data uri
   * @api stable
   */
  getImage(type: 'canvas', encoderOptions?: number): HTMLCanvasElement;
  getImage(type?: string, encoderOptions?: number): string | HTMLCanvasElement;
}
