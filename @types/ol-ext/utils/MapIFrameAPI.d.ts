/** A message listener registered for an iframe API event. */
export type IFrameListener = (event: MessageEvent) => void
/** API exposed by the iframe; additional methods are supplied by the embedded map. */
export interface IFrameAPI {
  on(key: string, callback: (data: any) => void): IFrameListener;
  un(listener: IFrameListener): void;
  mapInput(key: string, input: string | HTMLInputElement, value?: string): void;
  [method: string]: (...args: any[]) => any;
}
/** Internal message bridge. Use ready to obtain the public iframe API. */
export default class MapIFrameAPI {
  constructor(win: Window, id: number, targetOrigin: string);
  /** Obtain the iframe API once the embedded map is ready. */
  static ready(iframe: string | HTMLIFrameElement, ready: (api: IFrameAPI) => void, targetOrigin?: string): void;
  /** Call an iframe API method, optionally receiving its response. */
  call(key: string, data?: any, callback?: (data: any) => void): void;
  /** Register a listener for messages from the iframe. */
  addIFrameListener(key: string, callback: (data: any) => void, data?: any): IFrameListener;
  /** Remove a registered iframe listener. */
  removeIFrameListener(listener: IFrameListener): void;
}
