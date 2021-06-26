import { Map as _ol_Map_ } from 'ol';
import ol_control_Control from 'ol/control/Control';
import { Layer } from 'ol/layer';
import LayerGroup from 'ol/layer/Group';
import { Extent } from 'ol/extent';

export interface Options {
    displayInLayerSwitcher?: (layer: Layer) => boolean;
    show_progress?: boolean;
    mouseover?: boolean;
    reordering?: boolean;
    trash?: boolean;
    oninfo?: (...params: any[]) => any;
    extent: Extent;
    onExtent: (...params: any[]) => any;
    drawDelay: number;
    collapsed: boolean;
    layerGroup: LayerGroup;
}

export interface Tip {
    up: string;
    down: string;
    info: string,
    extent: string,
    trash: string,
    plus: string
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
 *
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
    /** Calculate overflow and add scrolls
     *	@param {Number} dir scroll direction -1|0|1|'+50%'|'-50%'
     */
    overflow(dir: number): void;
    /**
     *	Draw the panel control (prevent multiple draw due to layers manipulation on the map with a delay function)
     */
    drawPanel(): void;
    /** Set opacity for a layer
     * @param {Layer} layer
     * @param {Element} li the list element
     * @api
     */
    setLayerOpacity(layer: Layer, li: Element): void
    /** Set visibility for a layer
  * @param {Layer} layer
  * @param {Element} li the list element
  * @api
  */
    setLayerVisibility(layer: Layer, li: Element): void
    /** Change layer visibility according to the baselayer option
     * @param {Layer} l
     * @param {Array<layer>} layers related layers
     */
    switchLayerVisibility(l: Layer, layers: Layer[]): void;
    /** Check if Layer is on the map (depending on zoom and Extent)
     * @param {Layer}
     * @return {boolean}
     */
    testLayerVisibility(layer: Layer): boolean;
    /** Render a list of layer
     * @param {Elemen} element to render
     * @param {Array<Layer>} list of layer to show
     * @api stable
     */
    drawList(element: Element, collection: Layer[]): void;
}
