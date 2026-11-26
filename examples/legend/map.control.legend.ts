import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import PrintDialog from 'ol-ext/control/PrintDialog';
import Style from 'ol/style/Style';
import Shadow from 'ol-ext/style/Shadow';
import FontSymbol from 'ol-ext/style/FontSymbol';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import RegularShape from 'ol/style/RegularShape';
import Icon from 'ol/style/Icon';
import Legend from 'ol-ext/legend/Legend';
import ExtLegend from 'ol-ext/control/Legend';
import Select from 'ol/interaction/Select';
import 'ol-ext/style/FontAwesomeDef';

declare const $: JQueryStatic;

// Layers
var layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [166326, 5992663],
  }),
  layers: [layer],
});
// Print control
var printControl = new PrintDialog();
map.addControl(printControl);
printControl.on('print', function (e) {
  // Print success
  if (e.canvas) {
    const image = document.createElement('img');
    image.src = e.canvas.toDataURL();
    window.open()?.document.body.append(image);
  } else {
    console.warn('No canvas to export');
  }
});

// Style function
function getFeatureStyle() {
  var st = [];
  // Shadow style
  st.push(
    new Style({
      image: new Shadow({
        radius: 15,
      }),
    }),
  );

  // Font style
  st.push(
    new Style({
      image: new FontSymbol({
        form: 'marker',
        glyph: 'fa-car',
        radius: 15,
        offsetY: -15,
        fontSize: 0.7,
        color: '#fff',
        fill: new Fill({
          color: 'blue',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
      }),
      stroke: new Stroke({
        width: 5,
        color: '#f00',
      }),
      fill: new Fill({
        color: [255, 0, 0, 0.6],
      }),
    }),
  );
  return st;
}

// Vector layer
var vector = new VectorLayer({
  source: new VectorSource(),
  style: getFeatureStyle,
});
map.addLayer(vector);

// Add features
/* */
let f: Feature = new Feature(
  new Polygon([
    [
      [30000, 6300000],
      [-200000, 6000000],
      [300000, 6000000],
      [34000, 6300000],
    ],
  ]),
);
vector.getSource()!.addFeature(f);
f = new Feature(
  new LineString([
    [400000, 6000000],
    [680000, 5900000],
    [690000, 6100000],
    [420000, 6200000],
  ]),
);
vector.getSource()!.addFeature(f);
/* */
var f0 = new Feature(new Point([269914, 6248592]));
vector.getSource()!.addFeature(f0);

/* */
// Add features with style
f = new Feature(new Point([500000, 6300000]));
vector.getSource()!.addFeature(f);
f.setStyle(
  new Style({
    image: new RegularShape({
      radius: 18,
      radius2: 7,
      points: 5,
      stroke: new Stroke({ color: [255, 128, 0, 1], width: 1.5 }),
      fill: new Fill({ color: [255, 255, 0, 0.3] }),
    }),
  }),
);
// Add features with style
f = new Feature(new Point([500000, 6100000]));
f.setStyle(
  new Style({
    image: new Icon({ src: '../data/camera.png' }),
  }),
);
vector.getSource()!.addFeature(f);
// Add features with style
f = new Feature(
  new Polygon([
    [
      [30000, 5600000],
      [-100000, 5900000],
      [300000, 5800000],
      [34000, 5600000],
    ],
  ]),
);
f.setStyle(
  new Style({
    fill: new Fill({ color: 'cyan' }),
    stroke: new Stroke({ color: 'blue', width: 2, lineDash: [5, 8] }),
  }),
);
vector.getSource()!.addFeature(f);
// Add features with style
f = new Feature(
  new LineString([
    [400000, 5900000],
    [680000, 5800000],
    [690000, 5700000],
    [420000, 5600000],
  ]),
);
f.setStyle([
  new Style({
    stroke: new Stroke({ color: 'blue', width: 8 }),
  }),
  new Style({
    stroke: new Stroke({ color: '#fff', width: 4 }),
  }),
]);
vector.getSource()!.addFeature(f);
/* */

// Define a new legend
var legend = new Legend({
  title: 'Legend',
  // textStyle: new ol.style.Text({ font: '16px sans-serif', fill: new ol.style.Fill({ color: '#369'  }) }),
  style: getFeatureStyle,
});
var legendCtrl = new ExtLegend({
  legend: legend,
  collapsed: false,
});
map.addControl(legendCtrl);
legend.on('select', function (e) {
  if (e.index >= 0)
    console.log(
      (e.symbol ? 'You click on symbol: ' : 'You click on row: ') +
        e.item.get('title') +
        ' (' +
        e.index +
        ')',
    );
  else console.log('You click on the title: ' + e.item.get('title'));
});
legend.addItem({ title: 'Car placemark', feature: f0 });
function addSVG(svg?: string, scale?: number) {
  legend.addItem({
    title: 'SVG icon',
    typeGeom: 'Point',
    style: new Style({
      image: new Icon({
        src:
          svg ||
          'https://upload.wikimedia.org/wikipedia/commons/6/67/OpenLayers_logo.svg',
        scale: scale || 0.3,
      }),
    }),
  });
}

// Display the style on select
var select = new Select({ hitTolerance: 3 });
map.addInteraction(select);

select.on('select', function (e) {
  var f = e.selected[0];
  // Remove feature from select (to get its style back) BUG ol6 ?
  if (f) select.getFeatures().remove(f);
  $('.options .img').html('');
  if (f) {
    var img = Legend.getLegendImage({
      /* given a style  and a geom type
        style: f.getStyle() || getFeatureStyle(f),
        typeGeom: f.getGeometry().getType()
        */
      /* or given a feature */
      feature: f.clone(),
      style: getFeatureStyle,
    });
    $('.options .img').append(img);
    $('#center').hide();
  } else {
    $('#center').show();
  }
  if (f) select.getFeatures().push(f);
});

// Add selection to legend
function addToLegend() {
  var f = select.getFeatures().item(0);
  // Remove feature from select (to get its style back with ol6)
  if (f) select.getFeatures().remove(f);
  legend.addItem({
    className: $('#center input').prop('checked') ? 'center' : '',
    title: document.querySelector<HTMLTextAreaElement>(
      '.options .row textarea',
    )!.value,
    /* given a style  and a geom type
      style: f.getStyle() || getFeatureStyle(f),
      typeGeom: f.getGeometry().getType()
      */
    /* or given a feature */
    feature: f,
  });
  if (f) select.getFeatures().push(f);
}

// Change text color
const color = document.querySelector<HTMLInputElement>('#color')!;
color.addEventListener('change', () => {
  legend.getTextStyle().getFill()?.setColor(color.value);
  legend.getTitleStyle().getFill()?.setColor(color.value);
  legend.refresh();
});

$(window).on('load', function () {
  legend.refresh();
  vector.changed();
});

Object.assign(window, { legend, legendCtrl, addToLegend });
