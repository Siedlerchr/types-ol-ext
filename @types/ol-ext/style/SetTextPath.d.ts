import type { FeatureLike } from 'ol/Feature'
import type Style from 'ol/style/Style'

declare module 'ol/layer' {
  interface Vector<VectorSourceType> {
    /** @deprecated Prefer Text styles with placement: 'line'. */
    setTextPathStyle(style?: Style | Style[] | ((feature: FeatureLike, resolution: number) => Style[]) | null, maxResolution?: number): void;
  }
}

declare global {
  interface CanvasRenderingContext2D {
    textPath(text: string, path: number[]): void;
    textJustify: boolean;
    textOverflow: string;
    minWidth: number;
  }
}

export {}
