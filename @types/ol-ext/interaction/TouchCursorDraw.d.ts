import type { Coordinate } from 'ol/coordinate'
import type { InteractionOptions } from 'ol/interaction/Interaction'
import type VectorSource from 'ol/source/Vector'
import type Collection from 'ol/Collection'
import type { Feature, Map as _ol_Map_ } from 'ol'
import type { StyleLike } from 'ol/style/Style'
import type { Type } from 'ol/geom/Geometry'
import type Button from '../control/Button'
import { TouchCursor } from './TouchCursor'

export interface Options extends InteractionOptions {
  className?: string;
  coordinate?: Coordinate;
  buttons?: Button[];
  maxButtons?: number;
  type?: Type;
  types?: string[];
  source?: VectorSource;
  features?: Collection<Feature>;
  clickTolerance?: number;
  snapTolerance?: number;
  maxPoints?: number;
  minPoints?: number;
  style?: StyleLike;
  geometryFunction?: () => void;
  geometryName?: string;
  wrapX?: boolean;
}

/** TouchCursor interaction + ModifyFeature
 * @constructor
 * @extends {ol_interaction_TouchCursor}
 * @fires drawend
 * @fires change:type

 */
export default class TouchCursorDraw extends TouchCursor {
  /**
   * @param {olx.interaction.InteractionOptions} options Options
   *  @param {string} options.className cursor class name
   *  @param {ol.coordinate} options.coordinate cursor position
   *  @param {string} options.type geometry type
   *  @param {Array<string>} options.types geometry types avaliable, default none
   *  @param {ol.source.Vector} options.source Destination source for the drawn features
   *  @param {ol.Collection<ol.Feature>} options.features Destination collection for the drawn features
   *  @param {number} options.clickTolerance The maximum distance in pixels for "click" event to add a point/vertex to the geometry being drawn. default 6
   *  @param {number} options.snapTolerance Pixel distance for snapping to the drawing finish, default 12
   *  @param {number} options.maxPoints The number of points that can be drawn before a polygon ring or line string is finished. By default there is no restriction.
   *  @param {number} options.minPoints The number of points that must be drawn before a polygon ring or line string can be finished. Default is 3 for polygon rings and 2 for line strings.
   *  @param {ol.style.Style} options.style Style for sketch features.
   *  @param {function} options.geometryFunction Function that is called when a geometry's coordinates are updated.
   *  @param {string} options.geometryName Geometry name to use for features created by the draw interaction.
   *  @param {boolean} options.wrapX Wrap the world horizontally on the sketch overlay, default false
   */
  constructor(options?: Options);

  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {_ol_Map_} map Map.
   * @api stable
   */
  setMap(map: _ol_Map_): void;

  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @param {ol.coordinate|null} position position of the cursor (when activating), default viewport center.
   * @observable
   * @apis
   */
  setActive(b: boolean, position?: Coordinate | null): void;

  /**
   * Set Geometry type
   * @param {string} type Geometry type
   */
  setType(type: string): void;

  /** Get geometry type
   */
  getType(): string;
}
