import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DFCI from 'ol-ext/source/DFCI';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import SearchDFCI from 'ol-ext/control/SearchDFCI';
import Popup from 'ol-ext/overlay/Popup';
import Select from 'ol/interaction/Select';
import * as condition from 'ol/events/condition';
import Hover from 'ol-ext/interaction/Hover';
import { ol_coordinate_toDFCI as toDFCI } from 'ol-ext/geom/DFCI';

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [273434, 5765953],
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

// DFCI source
const vectorSource = new DFCI({});

map.addLayer(
  new VectorLayer({
    source: vectorSource,
    style: function (f, resolution) {
      return [
        new Style({
          text: new Text({
            text: f.get('id'),
            font: 'bold 9px sans-serif',
            backgroundFill: new Fill({ color: 'rgba(255,255,255,.6)' }),
            overflow: true,
            placement: 'point',
          }),
          fill: new Fill({
            color: [0, 0, 0, 0],
          }),
          stroke: new Stroke({
            width: 0.75,
            color: '#f00',
          }),
        }),
      ];
    },
  }),
);

// Serach control
const search = new SearchDFCI();
map.addControl(search);
const zoom = [7, 10, 12, 14, 15];
search.on('select', function (e) {
  map.getView().animate({
    center: e.search.coordinate,
    zoom: zoom[Math.floor(e.search.name.length / 2)],
  });
});

// Show info
const popup = new Popup({
  popupClass: 'tooltips',
  offsetBox: 15,
  positioning: 'top-left',
});
map.addOverlay(popup);
const select = new Select({
  condition: condition.click,
  toggleCondition: condition.always,
});
// One at a time
select.on('select', function (e) {
  if (e.selected.length) {
    select.getFeatures().clear();
    select.getFeatures().push(e.selected[0]);
  }
});
map.addInteraction(select);
const hover = new Hover();
map.addInteraction(hover);
hover.on('hover', function (e) {
  popup.show(
    e.coordinate,
    e.feature.get('id') +
      '<br/>' +
      toDFCI(e.coordinate, 3, map.getView().getProjection()),
  );
});
hover.on('leave', function (e) {
  popup.hide();
});

/* test if coords are valid * /
  map.on('click', function(e) {
    console.log(e.coordinate, ol.coordinate.validDFCICoord(e.coordinate, map.getView().getProjection()));
  })
/* */
