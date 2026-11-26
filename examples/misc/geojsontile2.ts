import { downloadBlob } from '../.shared/download';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point';
import VectorImage from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import DropFile from 'ol-ext/interaction/DropFile';
import Select from 'ol/interaction/Select';
import PopupFeature from 'ol-ext/overlay/PopupFeature';
import Permalink from 'ol-ext/control/Permalink';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { createXYZ } from 'ol/tilegrid';
import VectorLayer from 'ol/layer/Vector';
import * as Olextent from 'ol/extent';
import Feature from 'ol/Feature';
import { fromExtent } from 'ol/geom/Polygon';
import * as loadingstrategy from 'ol/loadingstrategy';
import * as geohash from 'ol-ext/geom/geohash';
import * as proj from 'ol/proj';

declare const $: JQueryStatic;

var Base64 = {
  _Rixits:
    //   0       8       16      24      32      40      48      56     63
    //   v       v       v       v       v       v       v       v      v
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/',
  /** get Base64 string */
  fromNumber: function (number: number): string {
    if (!Number.isFinite(number)) return '';
    if (number < 0) return '-' + this.fromNumber(-number);
    var rixit; // like 'digit', only in some non-decimal radix
    var residual = Math.floor(number);
    var result = '';
    while (true) {
      rixit = residual % 64;
      result = this._Rixits.charAt(rixit) + result;
      residual = Math.floor(residual / 64);
      if (residual == 0) break;
    }
    return result;
  },
};

var hash = [
  'PONT-RAIL', //  7688
  'PONT-ROUTE', //  5502
  'PASSERELLE', //  1943
  'BORNE KILOMETRIQUE', //  2893
  'BORNE', // 60000
  'SAINT', // 10919
  'IMMEUBLE', //  1388
  'MAISON', // 86973
  'ECOLE', //  8331
  'MAIRIE', // 14753
  'BATIMENT', // 20673
  'EGLISE', // 23011
  'CHAPELLE', //  2663
  'CIMETIERE', //  4585
  'GARAGE', //  1318
  'HOPITAL', //   247
  'CALVAIRE', //  2856
  'AQUEDUC', // 36515
  'PONCEAU', // 14717
  'RUISSEAU', // 18735
  'RIVIERE', // 20320
  'BARRAGE', //  2250
  'ESCALIER', //  1590
  'ANCIEN', // 20027
  'MUR DE CLOTURE', //  8265
  'MUR DE FACADE', //126465
  'MUR DE SOUTENEMENT', // 13448
  'MUR EN AILE', // 13491
  'MUR EN RETOUR', // 28791
  'MUR PIGNON', // 53630
  'SOUBASSEMENT DU MUR', // 27842
  'SOUBASSEMENT', // 11542
  'PILIER', //  9622
  'PORTAIL', //  6770
  'FACADE', //126901
  'PARAPET', // 13780
  'FACE A', // 36705
  'FACE', //271471
  'AVANCEE', //  4035
  'SUD-OUEST', // 27388
  'SUD-EST', // 26991
  'NORD-OUEST', // 26263
  'NORD-EST', // 26076
  'RIVE DROITE', // 23249
  'RIVE GAUCHE', // 22424
  'SUPERIEUR', // 12779
  'INFERIEUR', //   503
  'OPPOSE', // 19368
  'ACCES', //  2407
  'PRINCIPAL', //  4590
  'AMONT', // 37377
  'RETOUR', // 29919
  'AVAL', // 34742
  'ROCHER', // 20495
  'RAVIN', //  1698
  'PYLONE', // 20495
  'SOCLE', // 13297
  'ROUTE', //138391
  'CARREFOUR', //  7346
  'AVENUE', //  1481
  'CHEMIN', //  6398
  'RUE', // 11110
  'VOIE', // 25992
  'BOULEVARD', //   774
];
const patterns = hash.map((word) => new RegExp(word, 'g'));

// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 1,
    center: [270055, 3528229],
  }),
  layers: [new TileLayer({ properties: { title: 'OSM' }, source: new OSM() })],
});

var vector = new VectorImage({
  properties: { title: 'GeoJSON' },
  source: new VectorSource(),
  visible: false,
});
map.addLayer(vector);

var dnd = new DropFile();
var keys: string[] = [];
map.addInteraction(dnd);
dnd.on('addfeatures', function (e) {
  /* remove null */
  keys = [];
  var first = true;
  e.features.forEach(function (f) {
    Object.keys(f.getProperties()).forEach(function (k) {
      var v = f.get(k);
      if (v === null || v === undefined || v === '') f.set(k, '');
      if (first && k !== 'geometry') keys.push(k);
    });
    first = false;
  });
  /**/
  vector.getSource()!.addFeatures(e.features);
  $('#map').css('opacity', 1);
});
dnd.on('loadstart', function () {
  $('#map').css('opacity', 0.3);
  vector.getSource()!.clear();
});

var select = new Select();
map.addInteraction(select);
map.addOverlay(new PopupFeature({ select: select }));

map.addControl(new Permalink({ visible: false }));
map.addControl(new LayerSwitcher());

let tile: VectorLayer<VectorSource> | undefined;
function calculate() {
  if (tile) map.removeLayer(tile);
  const tgrid = createXYZ({ minZoom: 10, maxZoom: 10, tileSize: 256 });
  const tileSource = new VectorSource({
    loader: loadTile,
    strategy: loadingstrategy.tile(tgrid),
  });
  tile = new VectorLayer({
    properties: { title: 'tiles' },
    source: tileSource,
    minZoom: 0,
  });
  map.addLayer(tile);
  function loadTile(extent: Olextent.Extent, resolution: number) {
    resolution = tgrid.getResolution(tgrid.getMinZoom());
    var features = vector.getSource()!.getFeaturesInExtent(extent);
    if (features.length) {
      var tcoord = tgrid.getTileCoordForCoordAndResolution(
        Olextent.getCenter(extent),
        resolution,
      );
      var f = new Feature(fromExtent(extent));
      f.set('features', features);
      f.set('id', tcoord.join('-'));
      f.set('size', features.length);
      f.set('extent', extent);
      tileSource.addFeature(f);
    }
  }
}

function download() {
  const tileSource = tile?.getSource();
  if (!tileSource) return;
  var feature = tileSource.getFeatures()[0];
  if (!feature) {
    alert('Finish');
    return;
  }
  tileSource.removeFeature(feature);
  console.log(tileSource.getFeatures().length);
  var id = feature.get('id');

  const type: Record<string, string> = {
    nivf: 'N',
    nivo: 'n',
    rsgf: 'G',
    rsgo: 'g',
  };
  var result = ''; //keys.join('\t')+'\tx\ty';
  const features: Feature[] = feature.get('features');
  features.forEach(function (fi) {
    const geometry = fi.getGeometry();
    if (!(geometry instanceof Point)) return;
    if (result) result += '\n';
    const p = geometry.getCoordinates();
    /* geohash */
    keys = [
      'rtype',
      'id',
      'name',
      'no',
      'z',
      'date',
      'insee',
      'support',
      'info',
      'img',
    ];
    result += geohash.fromLonLat(proj.toLonLat(p), 10);
    /**/
    keys.forEach(function (k) {
      switch (k) {
        case 'commune':
          break;
        // G/N + Base64(id)
        case 'id': {
          var id = fi.get(k);
          result += type[String(fi.get('type'))] ?? '';
          result += Base64.fromNumber(id);
          break;
        }
        // Base64
        case 'rtype': {
          result += Base64.fromNumber(parseInt(fi.get(k) || 0));
          break;
        }
        // Base64
        case 'z':
        case 'dimg': {
          if (fi.get(k) === '') result += '\t';
          else result += '\t' + Base64.fromNumber(parseInt(fi.get(k)));
          break;
        }
        case 'img': {
          if (!fi.get(k)) result += '\t';
          else {
            var img = fi.get(k).replace('.jpg', '').split('_');
            if (fi.get('date') === img[1]) {
              result += '\t' + Base64.fromNumber(parseInt(img[2] + img[3]));
            } else {
              result +=
                '\t' + Base64.fromNumber(parseInt(img[1] + img[2] + img[3]));
            }
          }
          break;
        }
        // Base64(date - 1900)
        case 'date': {
          if (!fi.get(k)) result += '\t';
          else result += '\t' + Base64.fromNumber(parseInt(fi.get(k)) - 1900);
          break;
        }
        // Text
        case 'support':
        case 'info': {
          var s = String(fi.get(k))
            .replace(/\n/g, ' ')
            .replace(/\r/g, '')
            .replace(/  /g, ' ');
          patterns.forEach(function (h, i) {
            s = s.replace(h, '@' + Base64.fromNumber(i));
          });
          result += '\t' + s;
          break;
        }
        default: {
          result += '\t' + fi.get(k);
          break;
        }
      }
    });
  });
  var blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, id + '.csv');
  setTimeout(function () {
    download();
  }, 100);
}

Object.assign(window, { calculate, download });
