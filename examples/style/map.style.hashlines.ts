import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import { ol_coordinate_offsetCoords } from 'ol-ext/geom/GeomUtils';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Collection from 'ol/Collection';
import Feature, { FeatureLike } from 'ol/Feature';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';

// Layers
const layer = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: [layer],
});

// Offset geometry
function offsetGeometry(feature: FeatureLike, size: number) {
  const geometry = feature.getGeometry();
  if (geometry instanceof Polygon) {
    const coordinates = geometry.getCoordinates();
    const sign = geometry.getLinearRing(0)!.getArea() < 0 ? -1 : 1;
    coordinates[0] = ol_coordinate_offsetCoords(coordinates[0], sign * size);
    return new Polygon(coordinates);
  }
  if (geometry instanceof LineString) {
    return new LineString(
      ol_coordinate_offsetCoords(geometry.getCoordinates(), size),
    );
  }
  return feature instanceof Feature ? feature.getGeometry() : undefined;
}

// Style function with offset hash
function getStyle(_feature: FeatureLike, res: number) {
  const offset = parseInt(
    document.querySelector<HTMLInputElement>('#offset')!.value,
  );
  return [
    new Style({
      stroke: new Stroke({
        width: 1.5,
        color: '#8B4513',
      }),
    }),
    new Style({
      stroke: new Stroke({
        color: '#8B4513',
        width: offset > 0 ? 2 * offset : -2 * offset,
        lineDash: [1.5, 10],
        lineCap: 'butt',
        lineJoin: 'bevel',
      }),
      // Offset geometry
      geometry: function (feature) {
        return offsetGeometry(feature, offset * res);
      },
    }),
  ];
}

// Nouvelle source de donnee
const features = new Collection<Feature>();
const source = new VectorSource({ features });
const vector = new VectorLayer({
  source,
  style: getStyle,
});
map.addLayer(vector);
source.addFeature(
  new Feature(
    new Polygon([
      [
        [259274, 6398696],
        [63595, 5958419],
        [635956, 5772524],
        [259274, 6398696],
      ],
    ]),
  ),
);

// global so we can remove it later
const interactions = {
  select: new Select(),
  modify: new Modify({ features }),
  drawLine: new Draw({
    type: 'LineString',
    source,
  }),
  drawPoly: new Draw({
    type: 'Polygon',
    source,
  }),
};
Object.values(interactions).forEach((interaction) =>
  map.addInteraction(interaction),
);

// Activate interaction
function setInteraction() {
  const selected = document.querySelector<HTMLInputElement>(
    '[name="op"]:checked',
  )?.value;
  for (const [name, interaction] of Object.entries(interactions)) {
    interaction.setActive(name === selected);
  }
}
setInteraction();
document.querySelectorAll('input[type="radio"][name="op"]').forEach((input) => {
  input.addEventListener('change', setInteraction);
});

Object.assign(window, { vector });
