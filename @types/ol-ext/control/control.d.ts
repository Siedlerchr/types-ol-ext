import { Collection } from 'ol';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { Style } from 'ol/style';

export type position = 'top' | 'left' | 'bottom' | 'right';
export interface ControlOptions {
    follow?: boolean;
    align: 'top' | 'bottom-left' | 'right';
    layers?: BaseLayer[] | Collection<BaseLayer> | LayerGroup;
    style?: Style | Style[];
}

export function Status(): void;
