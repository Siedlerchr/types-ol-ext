import { Overlay } from 'ol';
import { Pointer } from 'ol/interaction';
import BaseEvent from 'ol/events/Event';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { FrameState } from 'ol/PluggableMap';
import { Coordinate } from 'ol/coordinate';

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
}
export class DragEvent extends BaseEvent {
    constructor(
        type: DragEventTypes,
        overlay: Overlay,
        originalEvent: MapBrowserEvent,
        frameState: FrameState,
        coordinate: Coordinate
    )
}
