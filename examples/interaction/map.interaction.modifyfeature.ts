import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import RegularShape from 'ol/style/RegularShape';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import MultiPoint from 'ol/geom/MultiPoint';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import MultiLineString from 'ol/geom/MultiLineString';
import GeometryCollection from 'ol/geom/GeometryCollection';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import ModifyFeature from 'ol-ext/interaction/ModifyFeature';
import Snap from 'ol/interaction/Snap';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import type { ModifyEvent as OLModifyEvent } from 'ol/interaction/Modify';
import type { ModifyEvent as ExtModifyEvent } from 'ol-ext/interaction/ModifyFeature';

declare const $: JQueryStatic;

// Layers
var layers = [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })];
// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  layers: layers,
});

// Style function
function getStyle() {
  return [
    new Style({
      stroke: new Stroke({ color: '#ffcc33', width: 2 }),
      fill: new Fill({ color: [255, 255, 255, 0.5] }),
    }),
    new Style({
      image: new RegularShape({
        radius: 4,
        points: 4,
        fill: new Fill({ color: '#f00' }),
      }),
    }),
  ];
}

// New vector layer
var vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source: new VectorSource(),
  style: getStyle,
});
map.addLayer(vector);
vector.getSource()!.addFeature(new Feature(new Point([23000, 5500000])));
vector.getSource()!.addFeature(
  new Feature(
    new MultiPoint([
      [100000, 5400000],
      [200000, 5400000],
    ]),
  ),
);
vector.getSource()!.addFeature(
  new Feature(
    new LineString([
      [-288626, 5757848],
      [210354, 5576845],
      [34243, 6305749],
    ]),
  ),
);
vector.getSource()!.addFeature(
  new Feature(
    new Polygon([
      [
        [400000, 5600000],
        [680000, 5710000],
        [690000, 6140000],
        [420000, 6180000],
        [400000, 5600000],
      ],
      [
        [500000, 5750000],
        [520000, 6000000],
        [580000, 5900000],
        [500000, 5750000],
      ],
    ]),
  ),
);
vector.getSource()!.addFeature(
  new Feature(
    new MultiPolygon([
      [
        [
          [690000, 6300000],
          [700000, 6400000],
          [600000, 6400000],
          [690000, 6300000],
        ],
      ],
      [
        [
          [490000, 6300000],
          [500000, 6400000],
          [400000, 6400000],
          [490000, 6300000],
        ],
      ],
    ]),
  ),
);
vector.getSource()!.addFeature(
  new Feature(
    new MultiLineString([
      [
        [300000, 6300000],
        [200000, 6400000],
        [100000, 6400000],
      ],
      [
        [300000, 6500000],
        [200000, 6600000],
        [100000, 6600000],
      ],
    ]),
  ),
);

// Test using geometry collection instead
function toGeometryCollection() {
  const geom = [] as import('ol/geom').Geometry[];
  vector
    .getSource()!
    .getFeatures()
    .forEach(function (f) {
      const geometry = f.getGeometry();
      if (geometry) geom.push(geometry);
    });
  vector.getSource()!.clear();
  vector.getSource()!.addFeature(new Feature(new GeometryCollection(geom)));
}

var interactions = {
  draw: new Draw({
    source: vector.getSource()!,
    type: 'LineString',
  }),
  modify: new Modify({
    source: vector.getSource()!,
    //features: vector.getSource().getFeaturesCollection(),
    // insertVertexCondition: function(){ return false; }
  }),
  modifyfeature: new ModifyFeature({
    sources: vector.getSource()!,
    cursor: 'pointer',
    // insertVertexCondition: function(){ return false; }
    // style: getStyle
  }),
};
Object.values(interactions).forEach((interaction) =>
  map.addInteraction(interaction),
);

function setInteraction() {
  $('.options > div').html('');
  var name = $('[name="op"]:checked').val();
  for (const [key, interaction] of Object.entries(interactions)) {
    interaction.setActive(key === name);
  }
}
setInteraction();
$('input:radio').on('change', setInteraction);

// Add snap to get multi modification
map.addInteraction(
  new Snap({
    source: vector.getSource()!,
    pixelTolerance: 5,
  }),
);

// Listen for modification events on the two interactions.
function showModification(event: OLModifyEvent | ExtModifyEvent) {
  const features = Array.isArray(event.features)
    ? event.features
    : event.features.getArray();
  const geometry = features[0]?.getGeometry();
  if (event.type === 'modifystart') $('.options p').empty();
  const points =
    geometry instanceof SimpleGeometry
      ? ` ${geometry.getFlatCoordinates().length / geometry.getStride()} point(s)`
      : '';
  $('.options .' + event.type).text(
    `${event.type} ${features.length} feature(s): ${geometry?.getType() ?? ''}${points}`,
  );
}

interactions.modifyfeature.on('modifystart', showModification);
interactions.modifyfeature.on('modifying', showModification);
interactions.modifyfeature.on('modifyend', showModification);
interactions.modify.on('modifystart', showModification);
interactions.modify.on('modifyend', showModification);

Object.assign(window, { toGeometryCollection });
