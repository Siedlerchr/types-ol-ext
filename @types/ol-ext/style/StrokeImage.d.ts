import type Map from 'ol/Map'
import type Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'

export interface Options {
  icon: Icon;
  fallbackColor?: string;
  isVectorTile?: boolean;
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
