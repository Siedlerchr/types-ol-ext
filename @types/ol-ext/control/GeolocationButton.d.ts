import type { Map as _ol_Map_ } from 'ol'
import type { GeolocationDrawOptions } from '../interaction/GeolocationDraw'
import type GeolocationDraw from '../interaction/GeolocationDraw'
import Toggle from './Toggle'

export interface Options extends GeolocationDrawOptions {
  className?: string;
  title?: string;
  delay?: number;
}

export default class GeolocationButton extends Toggle {
  constructor(options?: Options)

  setMap(map: _ol_Map_): void;

  getInteraction(): GeolocationDraw
}
