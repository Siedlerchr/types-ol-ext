import type LineString from 'ol/geom/LineString'

export interface Options {
    area?: number;
    dist?: number;
    ratio?: number;
    minPoints?: number
    keepEnds?: number;
}

declare module 'ol/geom/LineString' {
    /**
     * Visvalingam polyline simplification algorithm, adapted from http://bost.ocks.org/mike/simplify/simplify.js
     * This uses the [Visvalingam–Whyatt](https://en.wikipedia.org/wiki/Visvalingam%E2%80%93Whyatt_algorithm) algorithm.
     * @param {Object} options
     *  @param {number} [area] the tolerance area for simplification
     *  @param {number} [dist] a tolerance distance for simplification
     *  @param {number} [ratio=.8] a ratio of points to keep
     *  @param {number} [minPoints=2] minimum number of points to keep
     *  @param {boolean} [keepEnds] keep line ends
     * @return { LineString } A new, simplified version of the original geometry.
     * @api
     */
    export function simplifyVisvalingam(options?: Options): LineString
}
