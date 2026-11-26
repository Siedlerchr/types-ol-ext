/** An iframe-side API that exchanges messages with its parent window. */
export default class IFrameAPI {
  /** Create an API using the target origin for outgoing messages (default `*`). */
  constructor(targetOrigin?: string);

  /** Store a local property. */
  set(key: string, value: unknown): void;

  /** Read a local property, or undefined if it has not been stored. */
  get(key: string): unknown;

  /** Register named handlers; returned values are sent to the parent. */
  setAPI(api: Record<string, (data: any) => any>): void;

  /** Send a named message and structured-cloneable data to the parent. */
  postMessage(name: string, data: unknown): void;

  /** Register a listener; the message data is supplied as its `this` value. */
  addListener(name: string, listener: (this: any) => void): void;
}
