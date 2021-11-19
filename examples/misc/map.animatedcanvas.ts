import { View, Map as _ol_Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Stamen } from 'ol/source';
import AnimatedCanvas from 'ol-ext/overlay/AnimatedCanvas';
import Bird from 'ol-ext/particule/Bird';
import Rain from 'ol-ext/particule/Rain';
import Snow from 'ol-ext/particule/Snow';
import Cloud from 'ol-ext/particule/Cloud';
import RainDrop from 'ol-ext/particule/RainDrop';



declare global {
    interface Window {
        ol: {
            particule: {}
        }
    }
}

// Layers
var layers = [
  new TileLayer({
    source: new Stamen({ layer: 'terrain' }),
  }),
];

// The map
var map = new _ol_Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: layers,
});

// Birds
var birds = new AnimatedCanvas({
  particule: Bird,
  density: 0.2,
  angle: Math.PI / 3,
  speed: 2,
});
birds.setVisible(false);
map.addOverlay(birds);

// Rain
var rain = new AnimatedCanvas({
  particule: Rain,
  density: 1,
  angle: (2 * Math.PI) / 5,
  speed: 5,
});
rain.setVisible(false);
map.addOverlay(rain);

// Snow
var snow = new AnimatedCanvas({
  particule: Snow,
  density: 5,
  angle: Math.PI / 2,
  speed: 0.5,
});
snow.setVisible(false);
map.addOverlay(snow);

// Clouds
var cloud = new AnimatedCanvas({
  particule: Cloud,
  density: 2,
  angle: Math.PI / 3,
  speed: 2,
});
map.addOverlay(cloud);

// Clouds
var cloud2 = new AnimatedCanvas({
  particule: Cloud,
  density: 1.5,
  angle: Math.PI / 4,
  speed: 2,
});
cloud2.setVisible(false);
map.addOverlay(cloud2);

// Raindrop
var raindrop = new AnimatedCanvas({
  particule: RainDrop,
  density: 1,
  speed: 5,
});
raindrop.setVisible(false);
map.addOverlay(raindrop);
