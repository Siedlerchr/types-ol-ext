import type { Map as _ol_Map_ } from 'ol'
import type { GeolocationDrawOptions } from '../interaction/GeolocationDraw'
import type GeolocationDraw from '../interaction/GeolocationDraw'
import Toggle, { type ToggleOnSignature } from './Toggle'
import type BaseEvent from 'ol/events/Event'
import type { Coordinate } from 'ol/coordinate'
import type { EventsKey } from 'ol/events'
import type { OnSignature } from 'ol/Observable'

export interface PositionEvent extends BaseEvent {
  type: 'position';
  coordinate?: Coordinate;
}
export type GeolocationButtonOnSignature<Return> = ToggleOnSignature<Return> & OnSignature<'position', PositionEvent, Return>

export interface Options extends GeolocationDrawOptions {
  className?: string;
  title?: string;
  delay?: number;
}

export default class GeolocationButton extends Toggle {
  constructor(options?: Options)

  on: GeolocationButtonOnSignature<EventsKey>
  once: GeolocationButtonOnSignature<EventsKey>
  un: GeolocationButtonOnSignature<void>

  setMap(map: _ol_Map_ | null): void;

  getInteraction(): GeolocationDraw
}
