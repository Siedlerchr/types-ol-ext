import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import cspline from 'ol-ext/render/Cspline';
import Fill from 'ol/style/Fill';
import type { Options as TextOptions } from 'ol/style/Text';

// Layers
var layer = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' });

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 1,
    center: [1957830, 3212031],
  }),
  layers: [layer],
});

// Data to draw on the map
var data = {
  Africa: [
    [430493, 2755157],
    [1721973, 1581084],
    [2856910, -923604],
    [2935182, -2802121],
  ],
  Europe: [
    [-587036, 4985895],
    [313086, 5846882],
    [1643702, 6433918],
    [3052589, 7060091],
  ],
  Asia: [
    [7474930, 4751081],
    [11662456, 8116756],
    [14206280, 8977743],
  ],
  Australia: [
    [12797393, -2684713],
    [14323688, -2606442],
    [15928254, -3232614],
    [16632697, -4054465],
  ],
  'North America': [
    [-15654303, 9564779],
    [-13580108, 8273299],
    [-11897271, 5964289],
    [-11075420, 2989972],
  ],
  'South America': [
    [-8375052, 563555],
    [-7122708, -493111],
    [-6457400, -2762985],
    [-7631473, -5502488],
  ],
  'Atlantic Ocean': [
    [-313086, -6011253],
    [-1252344, -2762985],
    [-2856910, 759233],
    [-4774563, 3185651],
    [-6848758, 4711945],
  ],
  'Pacific Ocean': [
    [18354671, 4711945],
    [21642074, 2950836],
    [25633922, -688790],
    [27982067, -5150266],
  ],
  Antartica: [
    [-547901, -15129884],
    [3091725, -14308034],
    [8101102, -14112355],
    [14206280, -14855934],
  ],
  'Southern Ocean': [
    [469629, -9102978],
    [4578884, -7537547],
    [10057890, -7028782],
    [13814923, -7498412],
    [17493684, -8907299],
  ],
  'Indian Ocean': [
    [11271098, -4641501],
    [10175297, -2410763],
    [8727274, -1197554],
    [6457400, -453975],
  ],
  'Artic Ocean': [
    [5439870, 13713170],
    [1995924, 12969590],
    [-1174073, 10973666],
    [-3013453, 9056014],
  ],
};

const features = Object.entries(data).map(
  ([name, coordinates]) =>
    new Feature({ name, geometry: new LineString(coordinates) }),
);

const vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source: new VectorSource({ features }),
});

const font = '15px Arial';
const measure = document.createElement('canvas').getContext('2d')!;
measure.font = font;

function setTextPathStyle() {
  const value = (id: string) =>
    document.querySelector<HTMLInputElement | HTMLSelectElement>('#' + id)!
      .value;
  const checked = (id: string) =>
    document.querySelector<HTMLInputElement>('#' + id)!.checked;
  const smooth = checked('cspline');
  const maxResolution = Number(value('resolution'));
  const minWidth = Number(value('minwidth'));
  const overflow = value('overflow');
  const options: TextOptions = {
    font,
    placement: 'line',
    fill: new Fill({ color: '#369' }),
    stroke: new Stroke({ color: '#fff', width: 3 }),
    textAlign: value('textAlign') as TextOptions['textAlign'],
    textBaseline: value('textBaseline') as TextOptions['textBaseline'],
    rotateWithView: checked('rotation'),
    overflow: overflow === 'visible',
  };

  vector.setStyle((feature, resolution) => {
    const line = feature.getGeometry();
    if (!(line instanceof LineString)) return [];
    const geometry = smooth
      ? new LineString(cspline(line.getCoordinates()))
      : line;
    const width = geometry.getLength() / resolution;
    let label = String(feature.get('name'));
    if (
      overflow &&
      overflow !== 'visible' &&
      measure.measureText(label).width > width
    ) {
      const suffix = overflow === 'ellipsis' ? '…' : overflow;
      while (label && measure.measureText(label + suffix).width > width)
        label = label.slice(0, -1);
      if (label) label += suffix;
    }
    return new Style({
      geometry,
      stroke: new Stroke({ color: 'red', width: 1 }),
      text:
        width >= minWidth && (!maxResolution || resolution <= maxResolution)
          ? new Text({ ...options, text: label })
          : undefined,
    });
  });
}

setTextPathStyle();
map.addLayer(vector);
Object.assign(window, { setTextPathStyle });
