import type Map from 'ol/Map'
import type Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'

export interface Options {
  /** Icon style to apply to the stroke. */
  icon: Icon;
  /** Alternative stroke color when a segment is shorter than the image width. */
  fallbackColor?: string;
  /** Enable when applying the style to a vector tile layer. */
  isVectorTile?: boolean;
  /** Map instance used to determine a point's location on the tile extent. */
  map?: Map;
}

/** Applies an image-based stroke to line and polygon features. */
export default class StrokeImage extends Style {
  constructor(options: Options);
  icon: Icon;
  fallbackColor: string | undefined;
  isVectorTile: boolean | undefined;
  map: Map | undefined;
}
