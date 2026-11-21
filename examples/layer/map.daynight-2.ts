import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/interaction/defaults';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DayNight from 'ol-ext/source/DayNight';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 0,
    center: [0, 0],
    projection: 'EPSG:4326',
  }),
  interactions: defaults(),
  layers: [new TileLayer({ source: new OSM() })],
});

function setProjection(p: string) {
  map.setView(new View({ zoom: 0, center: [0, 0], projection: p }));
  source.forEach(function (s) {
    s.refresh();
  });
}

const source: DayNight[] = [];
function addVector(time: number) {
  // DayNight source
  const vectorSource = new DayNight({
    time: new Date(time),
  });
  source.push(vectorSource);

  map.addLayer(
    new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: [0, 0, 50, 0.15],
        }),
      }),
    }),
  );
}

const deltaDay = 10 * 24 * 60 * 60 * 1000;
for (let i = -2; i <= 2; i++) {
  addVector(new Date().getTime() + deltaDay * i);
}

const date = document.querySelector<HTMLInputElement>('#date')!;
date.addEventListener('change', () => {
  const time = new Date(date.value).getTime();
  if (!Number.isFinite(time)) return;
  source.forEach((layerSource, index) =>
    layerSource.setTime(new Date(time + deltaDay * (index - 2))),
  );
});
date.value = new Date(source[2].get('time')).toISOString().slice(0, 16);

Object.assign(window, { setProjection });
