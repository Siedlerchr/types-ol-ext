import { Map, View } from 'ol';
import { Tile } from 'ol/layer';
import { Stamen } from 'ol/source';
import Clip from 'ol-ext/interaction/Clip';

declare global {
    interface Window {
        $(selector: any, context?: any): any,
        clip: Clip
    }
}
const $ = window.$;

// Layers
const mapbox = new Tile({
    source: new Stamen({ layer: 'terrain' })
});
mapbox.set('title', 'terrain-background');
const stamen = new Tile({
    source: new Stamen({ layer: 'watercolor' })
});

// The map
const map = new Map({
    target: 'map',
    view: new View({
        zoom: 5,
        center: [166326, 5992663]
    }),
    layers: [mapbox, stamen]
});

// Clip interaction
const clip = new Clip({ radius: Number($("#radius").val()), layers:stamen });
map.addInteraction(clip);
window.clip = clip;
