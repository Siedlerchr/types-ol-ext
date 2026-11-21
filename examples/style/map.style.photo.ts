import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import Photo from 'ol-ext/style/Photo';
import type { FeatureLike } from 'ol/Feature';
import ordering from 'ol-ext/render/Ordering';
import Stroke from 'ol/style/Stroke';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Select from 'ol/interaction/Select';
import * as condition from 'ol/events/condition';

// Layers
const layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 16,
    center: [260767, 6250718],
  }),
  layers: [layer],
});

// Array to cache image style
const styleCache: Partial<Record<string, Style>> = {};
// Vector style
function getFeatureStyle(feature: FeatureLike, sel = false) {
  const img: string =
    feature.get('img') ||
    'https://pbs.twimg.com/media/FkZzSZgXwAMqjTy?format=jpg&name=large';
  const k =
    document.querySelector<HTMLInputElement>('#kind')!.value +
    '_' +
    document.querySelector<HTMLInputElement>('#border')!.value +
    '_' +
    img +
    (document.querySelector<HTMLInputElement>('#shadow')!.checked
      ? '_1'
      : '_0') +
    (document.querySelector<HTMLInputElement>('#crop')!.checked ? '_1' : '_0') +
    (sel ? '_1' : '');
  let style = styleCache[k];
  if (!style) {
    styleCache[k] = style = new Style({
      image: new Photo({
        src: img,
        radius: 20,
        crop: document.querySelector<HTMLInputElement>('#crop')!.checked,
        kind: document.querySelector<HTMLSelectElement>('#kind')!
          .value as NonNullable<ConstructorParameters<typeof Photo>[0]>['kind'],
        shadow: document.querySelector<HTMLInputElement>('#shadow')!.checked
          ? 5
          : 0,
        onload: function () {
          vector.changed();
        },
        displacement: [
          0,
          document.querySelector<HTMLInputElement>('#kind')!.value ===
          'anchored'
            ? 20
            : 0,
        ],
        stroke: new Stroke({
          width:
            Number(document.querySelector<HTMLInputElement>('#border')!.value) +
            (sel ? 3 : 0),
          color: sel ? 'red' : '#fff',
        }),
      }),
    });
  }
  return [style];
}

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/paris-1900.geojson',
  format: new GeoJSON(),
  attributions: [
    "&copy; <a href='https://twitter.com/search?q=paris%20autrefois%20(from%3ASamuelMartin75)&src=typed_query&f=live'>@SamuelMartin75</a>",
  ],
});
//vectorSource.addFeature(new ol.Feature(new ol.geom.Point(map.getView().getCenter())))

const vector = new VectorLayer({
  properties: {
    name: 'Paris 1900',
    preview:
      'https://pbs.twimg.com/media/Fnnx0ylXgAABNjV?format=jpg&name=small',
  },
  source: vectorSource,
  // y ordering
  renderOrder: ordering.yOrdering(),
  style: (feature) => getFeatureStyle(feature),
});

map.addLayer(vector);

// Control Select
const select = new Select({
  condition: condition.click,
  style: function (feature) {
    return getFeatureStyle(feature, true);
  },
});
map.addInteraction(select);

// onselect
const info = document.querySelector('#select')!;
select.getFeatures().on('add', ({ element }) => {
  const title = document.createElement('h3');
  title.textContent = element.get('title');
  const img = document.createElement('img');
  img.src = element.get('img');
  const description = document.createElement('p');
  description.textContent = element.get('description');
  const copy = document.createElement('p');
  copy.className = 'copy';
  copy.textContent = `© ${element.get('copy')}`;
  const heading = document.createElement('p');
  heading.textContent = 'Selection:';
  info.replaceChildren(heading, title, img, description, copy);
});
select.getFeatures().on('remove', () => {
  const message = document.createElement('p');
  message.textContent = 'Select an image.';
  info.replaceChildren(message);
});

Object.assign(window, { vector });
