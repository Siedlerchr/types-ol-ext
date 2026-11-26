import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Point from 'ol/geom/Point';
import * as extent from 'ol/extent';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Legend from 'ol-ext/legend/Legend';
import ExtLegend from 'ol-ext/control/Legend';
import Popup from 'ol-ext/overlay/Popup';
import Hover from 'ol-ext/interaction/Hover';
import 'ol-ext/style/FontAwesomeDef';

// Layers
const layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: [layer],
});

// Style function
function getFeatureStyle(feature: import('ol/Feature').FeatureLike) {
  return [
    new Style({
      image: new Circle({
        radius: Math.sqrt(feature.get('pop') / Math.PI) / 50,
        fill: new Fill({
          color: [0, 128, 255, 0.3],
        }),
        stroke: new Stroke({
          width: 1,
          color: [0, 128, 255],
        }),
      }),
      geometry: function (feature) {
        return new Point(extent.getCenter(feature.getGeometry()!.getExtent()));
      },
    }),
    new Style({
      stroke: new Stroke({
        width: 1,
        color: [255, 128, 0],
      }),
      fill: new Fill({
        color: [255, 128, 0, 0.2],
      }),
    }),
  ];
}

// GeoJSON layer
const vectorSource = new VectorSource({
  url: '../data/departements.geojson',
  format: new GeoJSON(),
  attributions: [
    "&copy; <a href='https://www.insee.fr'>INSEE</a>",
    "&copy; <a href='https://www.data.gouv.fr/fr/datasets/geofla-r/'>IGN</a>",
  ],
});

map.addLayer(
  new VectorLayer({
    properties: { name: 'Departements' },
    source: vectorSource,
    style: getFeatureStyle,
  }),
);

// Define a new legend
const legend = new Legend({
  title: 'Legend',
  style: getFeatureStyle,
  margin: 0,
  size: [50, 16],
});
map.addControl(
  new ExtLegend({
    collapsible: false,
    legend: legend,
  }),
);

// Add empty row to
legend.addItem({});
legend.addItem({
  title: '2.600.000',
  properties: { pop: 2600000 },
  typeGeom: 'Point',
  height: 8,
});
legend.addItem({ properties: { pop: 1000000 }, typeGeom: 'Point', height: 8 });
legend.addItem({
  title: '100.000',
  properties: { pop: 100000 },
  typeGeom: 'Point',
  height: 8,
});

// Display the style on select
const popup = new Popup({
  popupClass: 'tooltips',
  positioning: 'top-auto',
  offsetBox: [-10, 0, 15, 0],
});
map.addOverlay(popup);
const hover = new Hover();
map.addInteraction(hover);
hover.on('leave', function (e) {
  popup.hide();
});
hover.on('hover', function (e) {
  popup.show(
    e.coordinate,
    '<b>' +
      e.feature.get('nom') +
      ' (' +
      e.feature.get('id') +
      ')' +
      '</b>' +
      '<br/>' +
      e.feature.get('pop').toLocaleString() +
      ' hab.',
  );
});
