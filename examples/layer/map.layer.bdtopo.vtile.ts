import { applyStyle } from 'ol-mapbox-style';
import RenderFeature, { toFeature } from 'ol/render/Feature';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import Map from 'ol/Map';
import View from 'ol/View';
import Permalink from 'ol-ext/control/Permalink';
import SearchBAN from 'ol-ext/control/SearchBAN';
import VectorTile from 'ol/layer/VectorTile';
import OlVectorTile from 'ol/source/VectorTile';
import { createXYZ } from 'ol/tilegrid';
import MVT from 'ol/format/MVT';
import defaultStyle from 'ol-ext/style/defaultStyle';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Tooltip from 'ol-ext/overlay/Tooltip';
import Hover from 'ol-ext/interaction/Hover';
// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 15,
    center: [261204.43490751847, 6250258.191535994],
  }),
  // layers: [ new ol.layer.Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')]
});
map.addControl(new Permalink());

map.addControl(new SearchBAN({ zoomOnSelect: 15 }));

// Vector layer
var vlayer = new VectorTile({
  properties: { title: 'Plan IGN vecteur' },
  renderMode: 'hybrid',
  source: new OlVectorTile({
    tileGrid: createXYZ({ maxZoom: 19 }),
    format: new MVT(),
    url: 'https://data.geopf.fr/tms/1.0.0/BDTOPO/{z}/{x}/{y}.pbf',
    attributions:
      '<a href="https://geoservices.ign.fr/blog/2018/07/08/nouveautes_vecteur.html">&copy; IGN-Géoportail</a>',
  }),
  declutter: true,
});
map.addLayer(vlayer);

void applyStyle(
  vlayer,
  'https://data.geopf.fr/annexes/ressources/vectorTiles/styles/BDTOPO/classique.json',
  { source: 'bdtopo', updateSource: false },
).catch(console.error);

// Selection
var selStyle = defaultStyle(true);
selStyle.push(
  new Style({
    image: new Circle({
      radius: 3,
      fill: new Fill({ color: '#f00' }),
    }),
    geometry: function (f) {
      const geometry = f.getGeometry();
      return geometry instanceof SimpleGeometry
        ? new Point(geometry.getFirstCoordinate())
        : undefined;
    },
  }),
);
var select = new VectorLayer({
  source: new VectorSource(),
  style: selStyle,
});
map.addLayer(select);

// Log properties
map.on('click', function (e) {
  var f = map.getFeaturesAtPixel(e.pixel)[0];
  if (f) {
    console.clear();
    console.table(f.getProperties());
  }
});

// Show tooltip on hover
var tooltip = new Tooltip({
  className: 'default',
  positioning: 'bottom-center',
});
map.addOverlay(tooltip);

var hover = new Hover({
  cursor: 'pointer',
  layers: [vlayer],
});
hover.setActive(false);
map.addInteraction(hover);
function showPopup(b: boolean) {
  tooltip.setInfo('');
  hover.setActive(b);
}
hover.on('enter', function (e) {
  var showGeom = document.querySelector<HTMLInputElement>('#showSel')!.checked;
  // hover.setCursor("pointer");
  var feature = e.feature;
  if (select.getSource()!.getFeatures().length) select.getSource()!.clear();
  var info = '';
  if (feature && feature.get('layer') !== 'fond_opaque') {
    info =
      '<h2>' + String(feature.get('layer') ?? '').replace(/_/g, ' ') + '</h2>';
    [
      'symbo',
      'nature',
      'rond_point',
      'sens_circu',
      'texte',
      'nom_desabrege',
      'numero',
      'hauteur',
    ].forEach(function (a) {
      if (feature.get(a))
        info += '<br/>' + a.replace(/_/g, ' ') + ': ' + feature.get(a);
    });
  }
  tooltip.setInfo(info);
  if (showGeom) {
    select
      .getSource()!
      .addFeature(
        feature instanceof RenderFeature ? toFeature(feature) : feature,
      );
  }
});
hover.on('leave', function (e) {
  tooltip.setInfo('');
  select.getSource()!.clear();
});

Object.assign(window, { showPopup });
