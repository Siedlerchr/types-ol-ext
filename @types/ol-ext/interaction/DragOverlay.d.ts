import { Overlay } from 'ol';
import { Pointer } from 'ol/interaction';
import BaseEvent from 'ol/events/Event';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { FrameState } from 'ol/PluggableMap';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import { ObjectEvent } from 'ol/Object';

export enum DragEventTypes {
    DRAGSTART = 'dragstart',
    DRAGGING = 'dragging',
    DRAGEND = 'dragend'
}

export interface Options {
    overlay?: Overlay[];
}
/** Drag an overlay on the map
 * @constructor
 * @extends {interaction.Pointer}
 * @fires dragstart
 * @fires dragging
 * @fires dragend
 * @param {any} options
 *  @param {Overlay|Array<Overlay} options.overlays the overlays to drag
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

    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:active', listener: (evt: ObjectEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;

    on(type: 'dragstart', listener: (p0: DragEvent) => void): EventsKey | EventsKey[];
    once(type: 'dragging', listener: (p0: DragEvent) => void): EventsKey | EventsKey[];
    un(type: 'drageend', listener: (p0: DragEvent) => void): void;
}
export class DragEvent extends BaseEvent {
    constructor(
        type: DragEventTypes,
        overlay: Overlay,
        originalEvent: MapBrowserEvent,
        frameState: FrameState,
        coordinate: Coordinate
    );
    overlay: Overlay;
    originalEvent: MapBrowserEvent;
    frameState: FrameState;
    coordinate: Coordinate;
}
