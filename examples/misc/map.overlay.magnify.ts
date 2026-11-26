import Map from 'ol/Map';
import View from 'ol/View';
import Geoportail from 'ol-ext/layer/Geoportail';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Magnify from 'ol-ext/overlay/Magnify';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [270148, 6247782],
  }),
  layers: [new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })],
});

// Layers for the overview
const layersOV1 = [
  new TileLayer({
    source: new OSM(),
    // Use preload to have tile when moving
    preload: 12,
  }),
  new Geoportail({
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
    // Use preload to have tile when moving
    preload: 12,
  }),
];
const layersOV2 = [
  new TileLayer({ source: new OSM() }),
  new Geoportail({
    layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
    // Use preload to have tile when moving
    preload: 12,
  }),
];
setOVLayer(document.querySelector<HTMLSelectElement>('.options select')!.value);

// New control on the map
const ov = new Magnify({
  layers: layersOV1,
  zoomOffset: Number(document.querySelector<HTMLInputElement>('#zoom')!.value),
});
map.addOverlay(ov);

const ov2 = new Magnify({
  layers: layersOV2,
  target: document.querySelector<HTMLElement>('.overview')!,
  zoomOffset: Number(document.querySelector<HTMLInputElement>('#zoom')!.value),
});
map.addOverlay(ov2);

// Options changes
function setOVLayer(value: string) {
  const n = Number(value);
  layersOV1[n].setVisible(true);
  layersOV1[1 - n].setVisible(false);
  layersOV2[n].setVisible(true);
  layersOV2[1 - n].setVisible(false);
}

document.querySelector('#zoom')!.addEventListener('change', () => {
  ov.set(
    'zoomOffset',
    Number(document.querySelector<HTMLInputElement>('#zoom')!.value),
  );
  ov2.set(
    'zoomOffset',
    Number(document.querySelector<HTMLInputElement>('#zoom')!.value),
  );
});

Object.assign(window, { setOVLayer });
