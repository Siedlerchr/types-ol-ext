import type { Options as TileLayerOptions } from 'ol/layer/BaseTile'
import type { ProjectionLike } from 'ol/proj'
import Tile from 'ol/layer/Tile'
import GeoportailSource from '../source/Geoportail'
import type { Options as SourceOptions } from '../source/Geoportail'

/** Layer options for a Geoportail WMTS layer. */
export interface Options extends TileLayerOptions<GeoportailSource> {
  /** Name of the registered WMTS layer. */
  layer?: string;
  /** Geoportail API key. */
  gppKey?: string;
  /** Alternative API key. */
  key?: string;
  /** Projection used for the layer extent. */
  projection?: ProjectionLike;
  /** Whether the layer is a base layer. */
  baseLayer?: boolean;
}

/** A Geoportail layer capability, including service-specific properties. */
export interface Capability {
  key?: string;
  [property: string]: any;
}
/** Capabilities indexed by layer name. */
export type Capabilities = Record<string, Capability>
/** Capabilities grouped by theme. */
export type CapabilityThemes = Record<string, Capabilities>

/** Callback registration object returned by the release's capability loaders. */
export interface CapabilityRequest {
  /** Register the success callback. */
  then(callback: (capabilities: Capabilities, themes?: CapabilityThemes) => void): CapabilityRequest;
  /** Register the error callback. */
  catch(callback: (error: any) => void): CapabilityRequest;
  /** Register the completion callback. */
  finally(callback: (capabilities?: Capabilities, themes?: CapabilityThemes) => void): CapabilityRequest;
}

/** IGN Geoportail WMTS layer. */
export default class Geoportail extends Tile<GeoportailSource> {
  /** Create a layer by name with optional layer and source options. */
  constructor(layer: string, options?: Options, tileOptions?: SourceOptions);
  /** Create a layer using a layer name or source in the options. */
  constructor(options: Options & ({ layer: string } | { source: GeoportailSource }), tileOptions?: SourceOptions);

  /** Register a layer capability. */
  static register(layer: string, capability: Capability): void;
  /** Return the registered key, or undefined if no key is registered. */
  static isRegistered(layer: string): string | undefined;
  /** Load capabilities and replace the class's capability table. */
  static loadCapabilities(gppKey?: string): CapabilityRequest;
  /** Request capabilities without replacing the capability table. */
  static getCapabilities(gppKey?: string): CapabilityRequest;
  /** Current capability table. */
  static capabilities: Capabilities;
  /** Rules used to assign themes to capabilities. */
  static themes: Array<{ theme: string; rex: RegExp }>;
}
