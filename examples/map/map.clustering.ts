import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Chart from 'ol-ext/style/Chart';
import Stroke from 'ol/style/Stroke';
import FontSymbol from 'ol-ext/style/FontSymbol';
import Fill from 'ol/style/Fill';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import SelectCluster from 'ol-ext/interaction/SelectCluster';
import * as condition from 'ol/events/condition';
import 'ol-ext/style/FontMakiDef';

declare const $: JQueryStatic;

// Layers
var layers = [
  new TileLayer({
    source: new OSM(),
  }),
];

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [166326, 5992663],
  }),
  layers: layers,
});

// Addfeatures to the cluster
function addFeatures(nb: number) {
  var ext = map.getView().calculateExtent(map.getSize());
  var features = [];
  for (var i = 0; i < nb; ++i) {
    features[i] = new Feature(
      new Point([
        ext[0] + (ext[2] - ext[0]) * Math.random(),
        ext[1] + (ext[3] - ext[1]) * Math.random(),
      ]),
    );
    features[i].set('id', i);
    features[i].set('type', Math.floor(Math.random() * 4));
  }
  clusterSource.getSource()!.clear();
  clusterSource.getSource()!.addFeatures(features);
}

// Style for the clusters
let styleCache: Partial<Record<string, Style>> = {};
function getStyle(feature: FeatureLike) {
  const features: Feature[] = feature.get('features');
  var size = features.length;
  // Feature style
  if (size === 1) return featureStyle(feature);
  // ClusterStyle
  else {
    var data = [0, 0, 0, 0];
    for (const feature of features) data[Number(feature.get('type'))]++;
    var style = styleCache[data.join(',')];

    if (!style) {
      var radius = Math.min(size + 7, 20);
      style = styleCache[data.join(',')] = new Style({
        image: new Chart({
          type: 'pie',
          radius: radius,
          data: data,
          rotateWithView: true,
          stroke: new Stroke({
            color: 'rgba(0,0,0,0)',
            width: 0,
          }),
        }),
      });
    }
    return [style];
  }
}

// Style for the features
var form = ['bus', 'town_hall', 'theatre', 'industrial'];
function featureStyle(f: FeatureLike) {
  var sel = f.get('features');
  if (sel) {
    const type = Number(sel[0].get('type'));
    var style = styleCache[type];
    if (!style) {
      var color = Chart.colors.classic[type];
      style = styleCache[type] = new Style({
        /*
          image: new ol.style.Icon({
            src: 'https://cdn.pixabay.com/photo/2014/04/02/10/45/poi-304466_960_720.png',
            scale: .05
          }),
          */
        image: new FontSymbol({
          glyph: 'maki-' + form[type],
          radius: 24,
          color: color,
          scale: 0.5,
          fill: new Fill({
            color: color,
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 1,
          }),
        }),
      });
    }
    return [style];
  } else
    return [
      new Style({
        // Draw a link beetween points (or not)
        stroke: new Stroke({
          color: '#fff',
          width: 1,
        }),
      }),
    ];
}

// Cluster Source
var clusterSource = new Cluster({
  distance: 40,
  source: new VectorSource(),
});
// Animated cluster layer
var clusterLayer = new AnimatedCluster({
  source: clusterSource,
  animationDuration: document.querySelector<HTMLInputElement>(
    '#animatecluster',
  )!.checked
    ? 700
    : 0,
  // Cluster style
  style: getStyle,
});
map.addLayer(clusterLayer);
// add 2000 features
addFeatures(2000);

// Select interaction to spread cluster out and select features
var selectCluster = new SelectCluster({
  // Point radius: to calculate distance between the features
  pointRadius: 10,
  animate: document.querySelector<HTMLInputElement>('#animatesel')!.checked,
  condition: condition.click,
  // Feature style when it springs apart
  featureStyle: featureStyle,
  selectCluster: false, // disable cluster selection
  // Style the selection
  style: function (f) {
    var s = featureStyle(f);
    s[0] = s[0].clone();
    s[0].getImage()?.setScale(1);
    s[0].setZIndex(1);
    return s;
  },
});
map.addInteraction(selectCluster);

// On selected => get feature in cluster and show info
selectCluster.getFeatures().on('add', function (e) {
  var c = e.element.get('features');
  if (c.length == 1) {
    var feature = c[0];
    var color = Chart.colors.classic[feature.get('type')];
    $('.infos').html(
      "<i class='maki-" +
        form[feature.get('type')] +
        "' style='color:" +
        color +
        "'></i>" +
        'One feature selected...<br/>(type=' +
        form[feature.get('type')] +
        ')',
    );
  } else {
    $('.infos').text('Cluster (' + c.length + ' features)');
  }
});
selectCluster.getFeatures().on('remove', function (e) {
  $('.infos').html('');
});

function testFontLoaded() {
  // Loaded ?
  if (($('.maki-bus').width() ?? 0) > 60) {
    styleCache = {};
  } else {
    setTimeout(testFontLoaded, 100);
  }
}
testFontLoaded();

Object.assign(window, { addFeatures, clusterLayer, selectCluster });
