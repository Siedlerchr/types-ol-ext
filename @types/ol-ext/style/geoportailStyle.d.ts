import type Style, { StyleFunction } from 'ol/style/Style'

export interface Options {
  /** Show road direction, optionally only below a maximum resolution. */
  sens?: boolean | number;
  /** Style green road sections. */
  vert?: boolean;
  /** Show building symbols. */
  symbol?: boolean;
  /** Show parcel sections. */
  section?: boolean;
  /** Land-cover opacity. */
  opacity?: number;
}
/** Get a style for Geoportail WFS features. */
declare function geoportailStyle(typeName: string, options?: Options): StyleFunction | Style[]
declare namespace geoportailStyle {
  /** Copy of the Corine Land Cover color definitions. */
  const clcColors: Record<string, { color: number[]; title: string }>
}
export default geoportailStyle
