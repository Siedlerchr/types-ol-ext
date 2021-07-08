import VectorSource, { Options as VectorSourceOptions } from 'ol/source/Vector';

export interface Options extends VectorSourceOptions {
    resolutions?: number[];
}

/** DFCI source: a source to display the French DFCI grid on a map
 * @see http://ccffpeynier.free.fr/Files/dfci.pdf
 * @constructor ol_source_DFCI
 * @extends {ol/source/Vector}
 * @param {any} options Vector source options
 *  @param {Array<Number>} resolutions a list of resolution to change the drawing level, default [1000,100,20]
 */
export default class DFCI extends VectorSource {
    constructor(options?: Options);
}
