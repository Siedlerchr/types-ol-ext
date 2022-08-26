export default ol_ext_Worker;
/** Worker helper to create a worker from code
 * @constructor
 * @param {function} mainFn main worker function
 * @param {object} options
 *  @param {function} [options.onMessage] a callback function to get worker result
 */
export default class ol_ext_Worker {
    constructor(mainFn: any, options: {
        onMessage: (callback: any) => void;
    });
    /** Terminate current worker and start a new one
     */
    start(): void;
    /** Terminate a worker */
    terminate(): void;
    /** Post a new message to the worker
     * @param {object} message
     * @param {boolean} [restart=false] stop the worker and restart a new one
     */
    postMessage(message: any, restart?: boolean): void;
    /** Set onMessage callback
     * @param {function} fn a callback function to get worker result
     */
    onMessage(fn: (callback: any) => void): void;
}
