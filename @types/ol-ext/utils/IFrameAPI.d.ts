
/** IFrame API create an api and wait the target ready
 * @constructor
 * @param {string} targetOrigin, default '*'
 */
export class ol_ext_IFrameAPI {
    constructor(targetOrigin?: string);

    /** Add properties
     * @param {string} key
     * @param {*} value
     */
    set(key: string, value: any): void;
    /** Get properties
     * @param {string} key
     * @return {*}
     */
    get(key: string): any;
    /**
     * @typedef {Object} TemplateAPI
     * @property {string} name api name
     * @property {function} function if return a Transferable it will be send to the iFrame
     */
    /**
     * @typedef {Object} TemplateAPI
     * @property {string} name api name
     * @property {function} function if return a Transferable it will be send to the iFrame
     */
    /** Add functions to the API
     * @param {Array<TemplateAPI>} list of functions to add to the api
     *
     */
    setAPI(api: any[]): void;
    /** Post a message to the iframe
     * @param {string} name api name
     * @param {Transferable } data object to transfer to the iframe
     */
    postMessage(name: string, data: Transferable): void;
    addListener(name: string, listener: any): void;
}
