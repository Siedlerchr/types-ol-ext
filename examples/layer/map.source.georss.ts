declare const $: JQueryStatic;

import type { FeatureLike } from 'ol/Feature';
import ordering from 'ol-ext/render/Ordering';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoRSS from 'ol-ext/source/GeoRSS';
import Style from 'ol/style/Style';
import FontSymbol from 'ol-ext/style/FontSymbol';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector';
import Select from 'ol/interaction/Select';
import PopupFeature from 'ol-ext/overlay/PopupFeature';
import GeoJSON from 'ol/format/GeoJSON';
import 'ol-ext/style/FontAwesomeDef';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 2,
    center: [-1089966, 4552499],
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

// WikiCommons layer source
const vectorSource = new GeoRSS({
  url: 'https://earthquakes.bgs.ac.uk/feeds/MhSeismology.xml',
  attributions: [
    '<a href="https://www.bgs.ac.uk/data/services/georss.html">BGS</a>',
  ],
  //url: 'https://emergency.copernicus.eu/mapping/activations-risk-and-recovery/feed',
  //attributions: ['<a href="https://emergency.copernicus.eu/mapping/">Copernicus EMS</a>']
  //url: 'https://emergency.copernicus.eu/mapping/list-of-components/EMSN053/feed',
});

const getStyle = function (f: FeatureLike) {
  const glyph = /fire/i.test(f.get('category'))
    ? 'fa-fire'
    : /flood/i.test(f.get('category'))
      ? 'fa-tint'
      : /wind/i.test(f.get('category'))
        ? 'fa-forumbee'
        : /storm/i.test(f.get('category'))
          ? 'fa-flash'
          : /human/i.test(f.get('category'))
            ? 'fa-heartbeat'
            : /quake/i.test(f.get('category'))
              ? 'fa-bullseye'
              : /other/i.test(f.get('category'))
                ? 'fa-gear'
                : 'fa-shield';
  return new Style({
    image: new FontSymbol({
      form: 'marker',
      glyph: glyph,
      radius: 16,
      offsetY: -8,
      fill: new Fill({
        color: /tint|bee/.test(glyph)
          ? 'cyan'
          : /eye|beat/.test(glyph)
            ? 'lightgreen'
            : 'orange',
      }),
      stroke: new Stroke({
        color: /tint|bee/.test(glyph)
          ? 'blue'
          : /eye|beat/.test(glyph)
            ? 'darkgreen'
            : 'red',
        width: 1.5,
      }),
    }),
  });
};
const vector = new VectorLayer({
  properties: { name: 'GeoRSS' },
  source: vectorSource,
  // y ordering
  renderOrder: ordering.yOrdering(),
  style: getStyle,
});

map.addLayer(vector);

// Control Select
const select = new Select({});
map.addInteraction(select);

const popup = new PopupFeature({
  popupClass: 'default anim',
  select: select,
  canFix: true,
});
map.addOverlay(popup);

// Save resulting layer
function save() {
  const format = new GeoJSON();
  const data = format.writeFeatures(vectorSource.getFeatures(), {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = 'georss.geojson';
  link.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}
Object.assign(window, { map });
