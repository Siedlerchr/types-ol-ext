declare module 'ol-ext/util/element' {

  /** Options for creating an HTML element
   * @property {string} [className] - CSS class name(s) for the element
   * @property {Element} [parent] - Parent element to append the new element to
   * @property {Element|string} [html] - HTML content or element to insert
   * @property {string} [text] - Text content for the element
   * @property {Record<string, string>} [options] - Additional attributes for the element
   * @property {Record<string, string|number>} [style] - CSS styles for the element
   * @property {EventListener} [change] - Event listener for the change event
   * @property {EventListener} [click] - Event listener for the click event
   * @property {Record<string, EventListener>} [on] - Event listeners for other events
   * @property {boolean} [checked] - Checkbox or radio button state
   * @property {any} [key: string] - Any additional properties
   */
  interface CreateElementOptions {
    className?: string;
    parent?: Element;
    html?: Element | string;
    text?: string;
    options?: Record<string, string>;
    style?: Record<string, string | number>;
    change?: EventListener;
    click?: EventListener;
    on?: Record<string, EventListener>;
    checked?: boolean;
    [key: string]: any;
  }

  /** Options for creating a switch element
   * @extends CreateElementOptions
   * @property {string|Element} [html] - HTML content or element to insert
   * @property {string|Element} [after] - Content to insert after the switch
   * @property {boolean} [checked] - Switch state
   */
  interface SwitchOptions extends CreateElementOptions {
    html?: string | Element;
    after?: string | Element;
    checked?: boolean;
  }

  /** Options for creating a checkbox or radio button element
   * @extends CreateElementOptions
   * @property {string|Element} [html] - HTML content or element to insert
   * @property {string|Element} [after] - Content to insert after the checkbox/radio button
   * @property {string} [name] - Name attribute for the input element
   * @property {'checkbox'|'radio'} [type] - Type of input element
   * @property {string} [value] - Value attribute for the input element
   */
  interface CheckOptions extends CreateElementOptions {
    html?: string | Element;
    after?: string | Element;
    name?: string;
    type?: 'checkbox' | 'radio';
    value?: string;
  }

  /** Options for creating a scrollable div
   * @property {(scrolling: boolean) => void} [onmove] - Callback for scroll events
   * @property {boolean} [vertical] - Whether the div scrolls vertically
   * @property {boolean} [animate] - Whether to animate scrolling
   * @property {boolean} [mousewheel] - Whether to enable mouse wheel scrolling
   * @property {boolean} [minibar] - Whether to show a mini scrollbar
   */
  interface ScrollDivOptions {
    onmove?: (scrolling: boolean) => void;
    vertical?: boolean;
    animate?: boolean;
    mousewheel?: boolean;
    minibar?: boolean;
  }

  /** Result of creating a scrollable div
   * @property {() => void} refresh - Function to refresh the scrollable div
   */
  interface ScrollDivResult {
    refresh: () => void;
  }

  /** Rectangle with offset properties
   * @property {number} top - Top offset
   * @property {number} left - Left offset
   * @property {number} height - Height of the rectangle
   * @property {number} width - Width of the rectangle
   */
  interface OffsetRect {
    top: number;
    left: number;
    height: number;
    width: number;
  }

  /** Rectangle with position properties
   * @property {number} top - Top position
   * @property {number} left - Left position
   * @property {number} bottom - Bottom position
   * @property {number} right - Right position
   */
  interface PositionRect {
    top: number;
    left: number;
    bottom: number;
    right: number;
  }

  export namespace ol_ext_element {

    /** Create an HTML element or text node
     * @param {string} tagName - The name of the HTML tag to create
     * @param {CreateElementOptions} [options] - Options for creating the element
     * @returns {Element|Text} - The created element or text node
     */
    function create(tagName: string, options?: CreateElementOptions): Element | Text;

    /** Create a switch input element
     * @param {SwitchOptions} options - Options for creating the switch element
     * @returns {HTMLInputElement} - The created switch element
     */
    function createSwitch(options: SwitchOptions): HTMLInputElement;

    /** Create a checkbox or radio button input element
     * @param {CheckOptions} options - Options for creating the checkbox/radio button element
     * @returns {HTMLInputElement} - The created checkbox/radio button element
     */
    function createCheck(options: CheckOptions): HTMLInputElement;

    /** Set HTML content for an element
     * @param {Element} element - The element to set HTML content for
     * @param {Element|string} html - The HTML content or element to insert
     */
    function setHTML(element: Element, html: Element | string): void;

    /** Append text content to an element
     * @param {Element} element - The element to append text content to
     * @param {string} text - The text content to append
     */
    function appendText(element: Element, text: string): void;

    /** Add an event listener to an element
     * @param {Element} element - The element to add an event listener to
     * @param {string|string[]} eventType - The event type(s) to listen for
     * @param {EventListener} fn - The event listener function
     * @param {boolean} [useCapture] - Whether to use capture phase
     */
    function addListener(element: Element, eventType: string | string[], fn: EventListener, useCapture?: boolean): void;

    /** Remove an event listener from an element
     * @param {Element} element - The element to remove an event listener from
     * @param {string|string[]} eventType - The event type(s) to remove
     * @param {EventListener} fn - The event listener function
     */
    function removeListener(element: Element, eventType: string | string[], fn: EventListener): void;

    /** Show an element (make it visible)
     * @param {Element} element - The element to show
     */
    function show(element: Element): void;

    /** Hide an element (make it invisible)
     * @param {Element} element - The element to hide
     */
    function hide(element: Element): void;

    /** Check if an element is hidden
     * @param {Element} element - The element to check
     * @returns {boolean} - Whether the element is hidden
     */
    function hidden(element: Element): boolean;

    /** Toggle the visibility of an element
     * @param {Element} element - The element to toggle visibility for
     */
    function toggle(element: Element): void;

    /** Set CSS styles for an element
     * @param {Element} el - The element to set styles for
     * @param {Record<string, string|number>} st - The styles to set
     */
    function setStyle(el: Element, st: Record<string, string | number>): void;

    /** Get the value of a specific CSS property of an element
     * @param {Element} el - The element to get the style for
     * @param {string} styleProp - The name of the CSS property
     * @returns {string|number} - The value of the CSS property
     */
    function getStyle(el: Element, styleProp: string): string | number;

    /** Get the outer height of an element
     * @param {Element} elt - The element to get the height for
     * @returns {number} - The outer height of the element
     */
    function outerHeight(elt: Element): number;

    /** Get the outer width of an element
     * @param {Element} elt - The element to get the width for
     * @returns {number} - The outer width of the element
     */
    function outerWidth(elt: Element): number;

    /** Get the offset rectangle of an element
     * @param {Element} elt - The element to get the offset rectangle for
     * @returns {OffsetRect} - The offset rectangle of the element
     */
    function offsetRect(elt: Element): OffsetRect;

    /** Get the fixed offset of an element
     * @param {Element} elt - The element to get the fixed offset for
     * @returns {{top: number, left: number}} - The fixed offset of the element
     */
    function getFixedOffset(elt: Element): { top: number; left: number };

    /** Get the position rectangle of an element
     * @param {Element} elt - The element to get the position rectangle for
     * @param {boolean} [fixed] - Whether to use fixed positioning
     * @returns {PositionRect} - The position rectangle of the element
     */
    function positionRect(elt: Element, fixed?: boolean): PositionRect;

    /** Create a scrollable div
     * @param {Element} elt - The element to make scrollable
     * @param {ScrollDivOptions} [options] - Options for creating the scrollable div
     * @returns {ScrollDivResult} - The result of creating the scrollable div
     */
    function scrollDiv(elt: Element, options?: ScrollDivOptions): ScrollDivResult;

    /** Dispatch an event on an element
     * @param {string} eventName - The name of the event to dispatch
     * @param {Element} element - The element to dispatch the event on
     */
    function dispatchEvent(eventName: string, element: Element): void;
  }

  export default ol_ext_element;
}
