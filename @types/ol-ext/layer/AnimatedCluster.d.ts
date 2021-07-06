import VectorLayer from 'ol/layer/Vector';
import { Options } from 'ol/layer/BaseVector';

interface ClusterOptions extends Options {
    animationDuration?: number;
    easingFunction?: (t: number) => number;
}

export default class AnimatedCluster extends VectorLayer {
    constructor(param: ClusterOptions);
}