import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import SelectCluster from 'ol-ext/interaction/SelectCluster';
import convexHull from 'ol-ext/geom/ConvexHull';
import type { FeatureLike } from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';

const info = document.querySelector<HTMLElement>('.infos')!;

// Layers
const layers = [
  new TileLayer({
    source: new OSM(),
  }),
];

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 4,
    center: [166326, 5992663],
  }),
  layers: layers,
});

// Addfeatures to the cluster
function addFeatures(value: number | string) {
  const nb = Number(value);
  const ext = map.getView().calculateExtent(map.getSize());
  const features: Feature<Point>[] = [];
  for (let i = 0; i < nb; ++i) {
    features[i] = new Feature(
      new Point([
        ext[0] + (ext[2] - ext[0]) * Math.random(),
        ext[1] + (ext[3] - ext[1]) * Math.random(),
      ]),
    );
    features[i].set('id', i);
  }
  source.clear();
  source.addFeatures(features);
}

// Style for the clusters
const styleCache: Partial<Record<number, Style>> = {};
function getStyle(feature: FeatureLike) {
  const size = feature.get('features').length;
  let style = styleCache[size];
  if (!style) {
    const color = size > 25 ? '192,0,0' : size > 8 ? '255,128,0' : '0,128,0';
    const radius = Math.max(8, Math.min(size * 0.75, 20));
    const dash = (2 * Math.PI * radius) / 6;
    const lineDash = [0, dash, dash, dash, dash, dash, dash];
    style = styleCache[size] = new Style({
      image: new Circle({
        radius: radius,
        stroke: new Stroke({
          color: 'rgba(' + color + ',0.5)',
          width: 15,
          lineDash,
          lineCap: 'butt',
        }),
        fill: new Fill({
          color: 'rgba(' + color + ',1)',
        }),
      }),
      text: new Text({
        text: size.toString(),
        //font: 'bold 12px comic sans ms',
        //textBaseline: 'top',
        fill: new Fill({
          color: '#fff',
        }),
      }),
    });
  }
  return style;
}

// Cluster Source
const source = new VectorSource<Feature<Point>>();
const clusterSource = new Cluster({
  distance: 40,
  source,
});
// Animated cluster layer
const clusterLayer = new AnimatedCluster({
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

// Style for selection
const img = new Circle({
  radius: 5,
  stroke: new Stroke({
    color: 'rgba(0,255,255,1)',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(0,255,255,0.3)',
  }),
});
const style0 = new Style({
  image: img,
});
const style1 = new Style({
  image: img,
  // Draw a link beetween points (or not)
  stroke: new Stroke({
    color: '#fff',
    width: 1,
  }),
});
// Select interaction to spread cluster out and select features
const selectCluster = new SelectCluster({
  // Point radius: to calculate distance between the features
  pointRadius: 7,
  // circleMaxObjects: 40,
  // spiral: false,
  // autoClose: false,
  // toggleCondition: ol.events.condition.singleClick,
  animate: document.querySelector<HTMLInputElement>('#animatesel')!.checked,
  // Feature style when it springs apart
  featureStyle: function () {
    return [
      document.querySelector<HTMLInputElement>('#haslink')!.checked
        ? style1
        : style0,
    ];
  },
  // selectCluster: false,	// disable cluster selection
  // Style to draw cluster when selected
  style: function (f) {
    const cluster: Feature<Point>[] = f.get('features');
    if (cluster.length > 1) {
      const s = [getStyle(f)];
      if (document.querySelector<HTMLInputElement>('#convexhull')!.checked) {
        const chull = convexHull(
          cluster.map((feature) => feature.getGeometry()!.getCoordinates()),
        );
        s.push(
          new Style({
            stroke: new Stroke({ color: 'rgba(0,0,192,0.5)', width: 2 }),
            fill: new Fill({ color: 'rgba(0,0,192,0.3)' }),
            geometry: new Polygon([chull]),
            zIndex: 1,
          }),
        );
      }
      return s;
    } else {
      return [
        new Style({
          image: new Circle({
            stroke: new Stroke({ color: 'rgba(0,0,192,0.5)', width: 2 }),
            fill: new Fill({ color: 'rgba(0,0,192,0.3)' }),
            radius: 5,
          }),
        }),
      ];
    }
  },
});
map.addInteraction(selectCluster);

// On selected => get feature in cluster and show info
selectCluster.getFeatures().on('add', function (e) {
  const c = e.element.get('features');
  if (c.length == 1) {
    const feature = c[0];
    info.textContent = `One feature selected (id=${feature.get('id')})`;
  } else {
    info.textContent = `Cluster (${c.length} features)`;
  }
});
selectCluster.getFeatures().on('remove', function () {
  info.textContent = '';
});

Object.assign(window, { addFeatures, clusterLayer, selectCluster });
