import type Map from 'ol/Map'

/** Get a non-rotated canvas overlay on top of the map. */
export default function getMapCanvas(map: Map | null | undefined): HTMLCanvasElement | null
