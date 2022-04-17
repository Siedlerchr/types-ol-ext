import { Map as _ol_Map_ } from "ol";
import ol_control_Control, { Options as ControlOptions } from "ol/control/Control";
import { Layer } from "ol/layer";
import LayerGroup from "ol/layer/Group";
import { Extent } from "ol/extent";
import BaseEvent from "ol/events/Event";
import { EventsKey } from "ol/events";
import { ObjectEvent } from "ol/Object";
import { CombinedOnSignature, EventTypes, OnSignature } from "ol/Observable";
import { Types } from "ol/ObjectEventType";

type LayerSwitcherOnSignature<Return> = OnSignature<EventTypes, Event, Return> &
  OnSignature<Types | 'change' | 'error' | 'propertychange', ObjectEvent, Return> &
  OnSignature<Types | 'drawlist' | 'layer:visible' | 'layer:opacity', LayerSwitcherEvent, Return> &
  OnSignature<Types | 'toggle', ToggleEvent, Return> &
  OnSignature<Types | 'reroder-start' | 'reroder-end', LayerSwitcherReorderEvent, Return> &
  CombinedOnSignature<Types | EventTypes | 'change' | 'error' | 'propertychange' | 'drawlist' | 'layer:visible' | 'layer:opacity' | 'toggle' | 'reroder-start' | 'reroder-end', Return>;

export enum LayerSwitcherEventType {
    DRAWLIST = "drawlist",
    LAYERVISIBLE = "layer:visible",
    LAYEROPACITY = "layer:opacity",
}
export enum ToggleEventType {
    TOGGLE = "toggle",
}
export enum LayerSwitcherReorderEventType {
    REODERSTART = "reoder-start",
    REORDEREND = "reorder-end",
}

export interface Options extends ControlOptions {
    displayInLayerSwitcher?: (layer: Layer) => boolean;
    show_progress?: boolean;
    mouseover?: boolean;
    reordering?: boolean;
    trash?: boolean;
    oninfo?: (l: Layer) => void;
    extent?: Extent;
    onExtent?: (l: Layer) => void;
    drawDelay?: number;
    collapsed?: boolean;
    layerGroup?: LayerGroup;
    noScroll?: boolean;
    onchangeCheck?: (l: Layer) => void;
}

export interface Tip {
    up: string;
    down: string;
    info: string;
    extent: string;
    trash: string;
    plus: string;
}

/** Layer Switcher Control.
 * @fires drawlist
 * @fires toggle
 * @fires reorder-start
 * @fires reorder-end
 * @fires layer:visible
 * @fires layer:opacity
 *
 * @constructor
 * @extends {ol_control_Control}
 * @param {Object=} options
 *  @param {function} options.displayInLayerSwitcher function that takes a layer and return a boolean if the layer is displayed in the switcher, default test the displayInLayerSwitcher layer attribute
 *  @param {boolean} options.show_progress show a progress bar on tile layers, default false
 *  @param {boolean} options.mouseover show the panel on mouseover, default false
 *  @param {boolean} options.reordering allow layer reordering, default true
 *  @param {boolean} options.trash add a trash button to delete the layer, default false
 *  @param {function} options.oninfo callback on click on info button, if none no info button is shown DEPRECATED: use on(info) instead
 *  @param {boolean} options.extent add an extent button to zoom to the extent of the layer
 *  @param {function} options.onextent callback when click on extent, default fits view to extent
 *  @param {number} options.drawDelay delay in ms to redraw the layer (usefull to prevent flickering when manipulating the layers)
 *  @param {boolean} options.collapsed collapse the layerswitcher at beginning, default true
 *  @param {layerGroup} options.layerGroup a layer group to display in the switcher, default display all layers of the map
 *  @param {function} options.onchangeCheck optional callback on click on checkbox, you can call this method for doing operations after check/uncheck a layer

 * Layers attributes that control the switcher
 *	- allwaysOnTop {boolean} true to force layer stay on top of the others while reordering, default false
 *	- displayInLayerSwitcher {boolean} display the layer in switcher, default true
 *	- noSwitcherDelete {boolean} to prevent layer deletion (w. trash option = true), default false
 */
export default class LayerSwitcher extends ol_control_Control {
    constructor(options?: Options);
    /** List of tips for internationalization purposes
     */
    tip: Tip;
    /** Test if a layer should be displayed in the switcher
     * @param {layer} layer
     * @return {boolean} true if the layer is displayed
     */
    displayInLayerSwitcher(layer: Layer): boolean;
    /**
     * Set the map instance the control is associated with.
     * @param {_ol_Map_} map The map instance.
     */
    setMap(map: _ol_Map_): void;
    /** Show control
     */
    show(): void;
    /** Hide control
     */
    hide(): void;
    /** Toggle control
     */
    toggle(): void;
    /** Is control open
     * @return {boolean}
     */
    isOpen(): boolean;
    /** Add a custom header
     * @param {Element|string} html content html
     */
    setHeader(html: Element | string): void;
    /** get classname of the layer
     * @param {ol.layer.Layer} layer
     * @returns {string} the layer classname
     * @api
     */
    getLayerClass(layer: Layer): string;
    /** Select a layer
     * @param {ol.layer.Layer} layer
     * @api
     */
    selectLayer(layer: Layer, silent?: boolean): void;
    /**
     *	Draw the panel control (prevent multiple draw due to layers manipulation on the map with a delay function)
     */
    drawPanel(): void;
    /** Get selected layer
     * @returns {ol.layer.Layer}
     */
    getSelection(): Layer;
    /** Get control panel
     * @api
     */
    getPanel(): Element;
    /** Set visibility for a layer
     * @param {ol.layer.Layer} layer
     * @param {Element} li the list element
     * @api
     */
    setLayerVisibility(layer: Layer, li: Element): void;
    /** Render a list of layer
     * @param {Elemen} element to render
     * @param {Array<Layer>} list of layer to show
     * @api stable
     */
    drawList(element: Element, collection: Layer[]): void;

    on: LayerSwitcherOnSignature<EventsKey>;
    once: LayerSwitcherOnSignature<EventsKey>;
    un: LayerSwitcherOnSignature<void>;
}
export class ToggleEvent extends BaseEvent {
    constructor(type: ToggleEventType, collapsed: boolean);
    collapsed: boolean;
}

export class LayerSwitcherEvent extends BaseEvent {
    constructor(type: LayerSwitcherEventType, layer?: Layer, li?: Text | HTMLElement);
    layer: Layer;
    li?: Text | HTMLElement;
}

export class LayerSwitcherReorderEvent extends BaseEvent {
    constructor(type: LayerSwitcherReorderEventType, layer: Layer, group: LayerGroup);
    layer: Layer;
    group: LayerGroup;
}
