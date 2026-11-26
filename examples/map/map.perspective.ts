import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import PerspectiveMap from 'ol-ext/map/PerspectiveMap';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorImage from 'ol/layer/VectorImage';
import Select from 'ol/interaction/Select';
import * as condition from 'ol/events/condition';
import Draw from 'ol/interaction/Draw';
import Placemark from 'ol-ext/overlay/Placemark';

const layer = new TileLayer({ source: new OSM() });

// The map
const map = new PerspectiveMap({
  target: 'map',
  view: new View({
    zoom: 19,
    center: [-245406, 5986536], // [-245575, 5986863], //[-244777, 5989809]
  }),
  layers: [layer],
});

map.on('change:perspective', function (e) {
  if (!e.animating)
    document.querySelector<HTMLInputElement>('#angle')!.value = String(e.angle);
});

// Create vector layer for select
const vectorSource = new VectorSource({
  url: '../data/ignf.json',
  format: new GeoJSON(),
  attributions: [
    "&copy; <a href='http://professionnels.ign.fr/bdtopo'>ign.fr</a>",
  ],
});
const vector = new VectorImage({
  source: vectorSource,
  maxResolution: 2,
});
map.addLayer(vector);

// Select and draw interaction
map.addInteraction(
  new Select({
    layers: [vector],
    condition: function (e) {
      return condition.pointerMove(e) && !condition.altKeyOnly(e);
    },
  }),
);
map.addInteraction(new Draw({ type: 'LineString' }));

// An overlay
const place = new Placemark({
  contentColor: '#000',
});
map.addOverlay(place);
map.on('click', function (e) {
  place.show(e.coordinate);
});

// Fullscreen
// map.addControl(new ol.control.FullScreen({ source: 'map' }));

Object.assign(window, { map });
