import Source from 'ol/source/Source'
import TileWMS from 'ol/source/TileWMS'
import type { Coordinate } from 'ol/coordinate'
import { Stroke } from 'ol/style'
import Layer from 'ol/layer/Layer'
import BaseLayer from 'ol/layer/Base'
import LayerGroup from 'ol/layer/Group'

declare module 'ol/source/Source' {
  export default interface Source {

    getPreview(lonlat: Coordinate, resolution: number): string;
  }
}

declare module 'ol/source/Tile' {
  export default interface TileSource {

    getPreview(lonlat?: Coordinate, resolution?: number): string;
  }
}

declare module 'ol/source/TileWMS' {
  export default interface TileWMS {
    /**
     * Return the tile image of the source.
     * @param {Coordinate|undefined} lonlat The center of the preview.
     * @param {number} resolution of the preview.
     * @return {String} the preview url
     * @api
     */
    getPreview(lonlat?: Coordinate, resolution?: number): string;
  }
}
declare module 'ol/layer/Layer' {
  export default interface Layer {
    /**
     * Return a preview for the layer.
     * @param {Coordinate|undefined} lonlat The center of the preview.
     * @param {number} resolution of the preview.
     * @return {Array<String>} list of preview url
     * @api
     */
    getPreview(lonlat?: Coordinate, resolution?: number): string[];
  }
}
/**
 * Return a preview for the layer.
 * @param {Coordinate|undefined} lonlat The center of the preview.
 * @param {number} resolution of the preview.
 * @return {Array<String>} list of preview url
 * @api
 */
declare module 'ol/layer/Group' {
  export default interface LayerGroup {

    getPreview(lonlat?: Coordinate, resolution?: number): string[];
  }
}
