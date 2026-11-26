import type Feature from 'ol/Feature';
import { getCenter } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorImage from 'ol/layer/VectorImage';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import DropFile from 'ol-ext/interaction/DropFile';
import PopupFeature from 'ol-ext/overlay/PopupFeature';
import TextStreamReader from 'ol-ext/util/TextStreamReader';

const map = new Map({
  target: 'map',
  view: new View({ zoom: 10, center: [256697, 6249708] }),
  layers: [new TileLayer({ source: new OSM() })],
});
const source = new VectorSource<Feature>();
map.addLayer(new VectorImage({ source }));

const select = new Select();
map.addInteraction(select);
map.addOverlay(new PopupFeature({ select }));

const drop = new DropFile({ formatConstructors: [] });
map.addInteraction(drop);
drop.on('loadstart', ({ file }) => {
  const reader = new TextStreamReader({ file, chunkSize: 64 * 1024 });
  const format = new GeoJSON<Feature>();
  const view = map.getView();
  const options = { featureProjection: view.getProjection() };
  const info = document.querySelector('.options')!;
  let count = 0;
  let invalid = 0;
  reader.readLines(
    (line) => {
      if (!line.trim()) return;
      try {
        const [feature] = format.readFeatures(line, options);
        if (!feature) return;
        if (count === 0) {
          const geometry = feature.getGeometry();
          if (geometry) view.setCenter(getCenter(geometry.getExtent()));
        }
        source.addFeature(feature);
        count++;
      } catch {
        invalid++;
      }
    },
    (_progress, done) => {
      if (!done) return;
      const message = document.createElement('p');
      message.textContent = `${file.name}: ${count} features loaded, ${invalid} invalid lines.`;
      info.append(message);
    },
  );
});
