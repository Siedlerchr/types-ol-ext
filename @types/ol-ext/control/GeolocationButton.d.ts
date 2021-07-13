import GeolocationDraw, { GeolocationDrawOptions } from '../interaction/GeolocationDraw';
import { Map as _ol_Map_ } from 'ol';
import Toggle from './Toggle';


export interface Options extends GeolocationDrawOptions {
    className?: string;
    title?: string;
    delay?: number;
}

export default class GeolocationButton extends Toggle {
    constructor(options? : Options)

    setMap(map: _ol_Map_): void;

    getInteraction(): GeolocationDraw
}

