import type Feature from 'ol/Feature'
import type { FeatureLike } from 'ol/Feature'
import { Vector as VectorSource } from 'ol/source'
import type { Options as VectorOptions } from 'ol/source/Vector'
import type { Style, Fill, Stroke } from 'ol/style'

export interface Options extends Omit<VectorOptions<Feature>, 'url' | 'loader'> {
  url?: string;
  maxResolution?: number;
  lang?: string;
  limit?: number;
}

export interface RDFValue {
  type: string;
  value: string;
}

export interface StyleOptions {
  glyph?: string | ((feature: FeatureLike) => string);
  radius?: number;
  fill?: Fill;
  stroke?: Stroke;
  prefix?: string;
}

/** Reset the style cache, for example after fonts are loaded. */
export function ol_style_clearDBPediaStyleCache(): void;

/** Get a default style function for DBpedia.
 * @param options.glyph A glyph name or a function that returns a glyph for a feature.
 * @param options.radius Radius of the symbol, default 8.
 * @param options.fill Fill style, default navy.
 * @param options.stroke Stroke style, default 2px white.
 * @param options.prefix Prefix when multiple styles use the same type.
 * FontSymbol and FontAwesome definitions are required.
 */
export function ol_style_dbPediaStyleFunction(options?: StyleOptions): (feature: FeatureLike) => Style[];

/**
 * @constructor source.DBPedia
 * @extends {VectorSource}
 */
export default class DBPedia extends VectorSource {
  /**
   * @param {olx.source.DBPedia=} opt_options
   */
  constructor(opt_options?: Options);

  /** Decode RDF attributes and choose to add feature to the layer
   * @param {feature} the feature
   * @param {attributes} RDF attributes
   * @param {lastfeature} last feature added (null if none)
   * @return {boolean} true: add the feature to the layer
   * @API stable
   */
  readFeature(feature: Feature, attributes: Record<string, RDFValue>, lastfeature?: Feature | null): boolean;

  /** Set RDF query subject, default: select label, thumbnail, abstract and type
   * @API stable
   */
  querySubject(): string;

  /** Set RDF query filter, default: select language
   * @API stable
   */
  queryFilter(): string;
}
