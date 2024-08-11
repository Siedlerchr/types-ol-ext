import type { Overlay } from 'ol'
import { Pointer } from 'ol/interaction'
import BaseEvent from 'ol/events/Event'
import type MapBrowserEvent from 'ol/MapBrowserEvent'
import type { FrameState } from 'ol/Map'
import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable'
import type { Types } from 'ol/ObjectEventType'
import type { Size } from 'ol/size'

type DragOverlayOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'change:active' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'dragstart' | 'dragging' | 'dragend', DragEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'change:active' | 'error' | 'propertychange' | 'dragstart' | 'dragging' | 'dragend', Return>;

export enum DragEventTypes {
  DRAGSTART = 'dragstart',
  DRAGGING = 'dragging',
  DRAGEND = 'dragend'
}

export interface Options {
  overlay?: Overlay | Overlay[];
  offset?: Size
  centerOnClick?: boolean
}

/** Drag an overlay on the map
 * @constructor
 * @extends {ol_interaction_Pointer}
 * @fires dragstart
 * @fires dragging
 * @fires dragend
 * @param {any} options
 *  @param {ol.Overlay|Array<ol.Overlay>} options.overlays the overlays to drag
 *  @param {ol.Size} options.offset overlay offset, default [0,0]
 *  @param {boolean} options.centerOnClick wheter a click inside the popup should move it to the click coordinates, default false
 */
export default class DragOverlay extends Pointer {
  constructor(options?: Options);

  /** Add an overlay to the interacton
   * @param {Overlay} ov
   */
  addOverlay(ov: Overlay): void;

  /** Remove an overlay from the interacton
   * @param {Overlay} ov
   */
  removeOverlay(ov: Overlay): void;

  on: DragOverlayOnSignature<EventsKey>

  once: DragOverlayOnSignature<EventsKey>

  un: DragOverlayOnSignature<void>
}

export class DragEvent extends BaseEvent {
  constructor(
    type: DragEventTypes,
    overlay: Overlay,
    originalEvent: MapBrowserEvent<UIEvent>,
    frameState: FrameState,
    coordinate: Coordinate
  );

  overlay: Overlay

  originalEvent: MapBrowserEvent<UIEvent>

  frameState: FrameState

  coordinate: Coordinate
}
