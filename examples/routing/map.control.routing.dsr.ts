import Feature from 'ol/Feature';
import RoutingDsr from '../.shared/routing-dsr';
import { downloadBlob } from '../.shared/download';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults } from 'ol/interaction/defaults';
import Permalink from 'ol-ext/control/Permalink';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Modify from 'ol/interaction/Modify';
import Select from 'ol/interaction/Select';
import defaultStyle from 'ol-ext/style/defaultStyle';
import Hover from 'ol-ext/interaction/Hover';
import Popup from 'ol-ext/overlay/Popup';
import GeoJSON from 'ol/format/GeoJSON';
import { Geometry } from 'ol/geom';

declare const $: JQueryStatic;

// Layers
var layers = [new Geoportail('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2')];

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  interactions: defaults({ altShiftDragRotate: false, pinchRotate: false }),
  layers: layers,
});

map.addControl(new Permalink({ hidden: true }));

// Set the control grid reference
var search = new RoutingDsr({});
map.addControl(search);

var vector = new VectorLayer({
  properties: { title: 'trajet' },
  source: new VectorSource(),
  style: [
    new Style({
      stroke: new Stroke({ color: [255, 255, 255, 0.5], width: 10 }),
    }),
    new Style({
      stroke: new Stroke({ color: [255, 0, 0, 1], width: 7 }),
      zIndex: 1,
    }),
  ],
});
map.addLayer(vector);

// Preocess result
search.on('routing', function (routing) {
  if ($('.remove').prop('checked')) vector.getSource()!.clear();
  vector.getSource()!.addFeature(routing.feature);
  setTimeout(function () {
    const extent = vector.getSource()!.getExtent();
    if (extent) map.getView().fit(extent, { duration: 1000 });
  }, 500);
});

var steps = new VectorLayer({
  properties: { title: 'Steps' },
  //ol.style.Style.defaultStyle,
  style: function (f) {
    return new Style({
      image: new Circle({
        stroke: new Stroke({
          width: 2,
          color:
            f.get('pos') === 'start'
              ? 'green'
              : f.get('pos') === 'end'
                ? 'red'
                : 'blue',
        }),
        fill: new Fill({ color: '#fff' }),
        radius: 8,
      }),
      text: new Text({
        text: String(f.get('step') + 1),
        font: 'bold 12px sans-serif',
        offsetY: 2,
      }),
    });
  },
  source: search.getSource(),
});
map.addLayer(steps);
map.addControl(new LayerSwitcher());
var modify = new Modify({ source: search.getSource() });
map.addInteraction(modify);
// is modifying
var modif = false;
modify.on('modifystart', function () {
  popup.hide();
  modif = true;
});
modify.on('modifyend', function () {
  modif = false;
  search.calculate();
});

// Dispkay information on hover
var select = new Select({ style: defaultStyle() });
map.addInteraction(select);
var hover = new Hover({
  layers: [vector, steps],
  cursor: 'pointer',
  hitTolerance: 5,
});
hover.on('enter', function (e) {
  if (modif) return;
  select.getFeatures().clear();
  if (e.feature.get('distance')) {
    if (e.feature instanceof Feature) select.getFeatures().push(e.feature);
    var content = e.feature.get('distance') + ' - ' + e.feature.get('duration');
    popup.show(e.coordinate, content);
  } else {
    popup.hide();
  }
});
hover.on('hover', function (e) {
  if (!modif && e.feature.get('distance')) popup.show(e.coordinate);
});
hover.on('leave', function (e) {
  if (!modif) select.getFeatures().clear();
  popup.hide();
});
map.addInteraction(hover);
var popup = new Popup({
  popupClass: 'black',
  positioning: 'bottom-center',
});
map.addOverlay(popup);

function save() {
  var format = new GeoJSON();
  var data = format.writeFeatures(vector.getSource()!.getFeatures(), {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection(),
  });
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'route.geojson');
}

Object.assign(window, { save });
