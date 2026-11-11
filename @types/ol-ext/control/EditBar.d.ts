import type { Collection, Feature, Map as _ol_Map_ } from 'ol'
import type { Vector as VectorSource } from 'ol/source'
import type Event from 'ol/events/Event'
import type { Interaction, Select, Draw } from 'ol/interaction'
import type { EventsKey } from 'ol/events'
import BaseEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'
import type { Geometry } from 'ol/geom'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import Bar, { type BarOnSignature } from './Bar'
import type Delete from '../interaction/Delete'
import type ModifyFeature from '../interaction/ModifyFeature'
import type DrawRegular from '../interaction/DrawRegular'
import type DrawHole from '../interaction/DrawHole'
import type Transform from '../interaction/Transform'
import type Split from '../interaction/Split'
import type Offset from '../interaction/Offset'

type EditBarOnSignature<Return> = BarOnSignature<Return> & OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'info', InfoEvent, Return> &
  CombinedOnSignature<EventTypes | Types | 'change' | 'error' | 'propertychange' | 'info', Return>;

export type EditBarEventType = 'info'

export interface DrawRegularInit {
  title?: string;
  ptsLabel?: string;
  circleLabel?: string;
}

export interface Interactions {
  Select?: Select | string | boolean;
  Delete?: Delete | string | boolean;
  Info?: string | boolean; // no real interaction
  DrawPoint?: Draw | string | boolean;
  DrawLine?: Draw | string | boolean;
  DrawPolygon?: Draw | string | boolean;
  DrawHole?: DrawHole | string | boolean;
  UndoDraw?: string;
  FinishDraw?: string;
  DrawRegular?: DrawRegular | string | boolean | DrawRegularInit;
  ModifySelect?: ModifyFeature | boolean;
  Transform?: Transform | string | boolean;
  Split?: Split | string | boolean;
  Offset?: Offset | string | boolean;
}

export interface Options {
  className?: string;
  target?: HTMLElement | string;
  drawOptions?: boolean;
  edition?: boolean;
  interactions?: Interactions; // TODO dig deeper into the type system
  source?: VectorSource | null;
}

/** Control bar for editing in a layer
 * @constructor
 * @extends {contrBar}
 * @fires info
 */
export default class EditBar extends Bar {
  /**
   * @param {Object=} options Control options.
   *  @param {String} options.className class of the control
   *  @param {String} options.target Specify a target if you want the control to be rendered outside of the map's viewport.
   *  @param {boolean} options.edition false to remove the edition tools, default true
   *  @param {Object} options.interactions List of interactions to add to the bar
   *    ie. Select, Delete, Info, DrawPoint, DrawLine, DrawPolygon
   *    Each interaction can be an interaction or true (to get the default one) or false to remove it from bar
   *  @param {VectorSource} options.source Source for the drawn features.
   */
  constructor(options?: Options);

  /**
   * Set the map instance the control is associated with
   * and add its controls associated to this map.
   * @param {_ol_Map_} map The map instance.
   */
  setMap(map: _ol_Map_ | null): void;

  /** Get an interaction associated with the bar
   * @param {string} name
   */
  getInteraction(name: string): Interaction | undefined;

  on: EditBarOnSignature<EventsKey>

  once: EditBarOnSignature<EventsKey>

  un: EditBarOnSignature<void>
}

export interface InfoEvent extends BaseEvent {
  type: EditBarEventType;
  features: Collection<Feature<Geometry>>;
}
