import type { ColorLike } from 'ol/colorlike'
import type { Color } from 'ol/color'
import type { Options as BaseOptions } from './Base'
import Base from './Base'
import type BaseEvent from 'ol/events/Event'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'

export interface PopupVisibilityEvent extends BaseEvent {
  type: 'collapse' | 'change:visible';
  visible: boolean;
}

export interface Options extends BaseOptions {
  className?: string;
  color?: ColorLike | Color;
  input?: Element;
  parent?: Element;
  position?: 'popup' | 'fixed' | 'static' | 'inline';
  ariaLabel?: string;
  autoClose?: boolean;
  hidden?: boolean;
}

/** Base class for input popup
 * @constructor
 * @extends {ol_ext_input_Base}
 * @fires change:color
 * @fires color

 */
export default class PopupBase extends Base {
  /**
   * @param {*} options
   *  @param {string} [options.className]
   *  @param {ol.colorLike} [options.color] default color
   *  @param {Element} [options.input] input element, if non create one
   *  @param {Element} [options.parent] parent element, if create an input
   *  @param {string} [options.position='popup'] fixed | popup | inline (no popup)
   *  @param {boolean} [options.autoClose=true] close when click on color
   *  @param {boolean} [options.hidden=false] display the input
   */
  constructor(options?: Options);

  /** show/hide color picker
   * @param {boolean} [b=false]
   */
  collapse(b?: boolean): void;

  /** Is the popup collapsed ?
   * @returns {boolean}
   */
  isCollapsed(): boolean;

  /** Toggle the popup
   */
  toggle(): void;

  on: Base['on'] & OnSignature<'collapse' | 'change:visible', PopupVisibilityEvent, EventsKey>;
  once: Base['once'] & OnSignature<'collapse' | 'change:visible', PopupVisibilityEvent, EventsKey>;
  un: Base['un'] & OnSignature<'collapse' | 'change:visible', PopupVisibilityEvent, void>;
}
