import { View, Map as _ol_Map } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { Stamen } from 'ol/source'
import AnimatedCanvas from 'ol-ext/overlay/AnimatedCanvas'
import Bird from 'ol-ext/particule/Bird'
import Rain from 'ol-ext/particule/Rain'
import Snow from 'ol-ext/particule/Snow'
import Cloud from 'ol-ext/particule/Cloud'
import RainDrop from 'ol-ext/particule/RainDrop'

// Layers
const layers = [
  new TileLayer({
    source: new Stamen({ layer: 'terrain' }),
  }),
]

// The map
const map = new _ol_Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers,
})

// Birds
const birds = new AnimatedCanvas({
  particule: Bird,
  density: 0.2,
  angle: Math.PI / 3,
  speed: 2,
})
birds.setVisible(false)
map.addOverlay(birds)

// Rain
const rain = new AnimatedCanvas({
  particule: Rain,
  density: 1,
  angle: (2 * Math.PI) / 5,
  speed: 5,
})
rain.setVisible(false)
map.addOverlay(rain)

// Snow
const snow = new AnimatedCanvas({
  particule: Snow,
  density: 5,
  angle: Math.PI / 2,
  speed: 0.5,
})
snow.setVisible(false)
map.addOverlay(snow)

// Clouds
const cloud = new AnimatedCanvas({
  particule: Cloud,
  density: 2,
  angle: Math.PI / 3,
  speed: 2,
})
map.addOverlay(cloud)

// Clouds
const cloud2 = new AnimatedCanvas({
  particule: Cloud,
  density: 1.5,
  angle: Math.PI / 4,
  speed: 2,
})
cloud2.setVisible(false)
map.addOverlay(cloud2)

// Raindrop
const raindrop = new AnimatedCanvas({
  particule: RainDrop,
  density: 1,
  speed: 5,
})
raindrop.setVisible(false)
map.addOverlay(raindrop)

declare global {
  interface Window {
    cloud: AnimatedCanvas;
    cloud2: AnimatedCanvas;
    rain: AnimatedCanvas;
    raindrop: AnimatedCanvas;
    snow: AnimatedCanvas;
    birds: AnimatedCanvas;
  }
}
window.cloud = cloud
window.cloud2 = cloud2
window.rain = rain
window.raindrop = raindrop
window.snow = snow
window.birds = birds
