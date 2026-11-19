import { Map, View } from 'ol';
import GPX from 'ol/format/GPX';
import MultiLineString from 'ol/geom/MultiLineString';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeolocationBar from 'ol-ext/control/GeolocationBar';

const source = new VectorSource();
const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [261720, 5951081] }),
  layers: [new TileLayer({ source: new OSM() }), new VectorLayer({ source })] });
const bar = new GeolocationBar({ source, followTrack: 'auto', minZoom: 16, minAccuracy: 10000 });
map.addControl(bar);
async function simulate() {
  const interaction = bar.getInteraction();
  if (interaction.simulating()) {
    interaction.simulate(false);
  } else {
    const response = await fetch('../data/2009-09-04_rando.gpx');
    if (!response.ok) throw new Error(`GPX request failed: ${response.status}`);
    const feature = new GPX().readFeature(await response.text(), {
      dataProjection: 'EPSG:4326', featureProjection: map.getView().getProjection(),
    });
    const geometry = feature?.getGeometry();
    if (geometry instanceof MultiLineString) interaction.simulate(geometry.getCoordinates()[0], { delay: 200, repeat: true });
  }
}
Object.assign(window, { simulate });
