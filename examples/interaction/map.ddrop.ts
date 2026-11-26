import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import type { FeatureLike } from 'ol/Feature';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Permalink from 'ol-ext/control/Permalink';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorImage from 'ol/layer/VectorImage';
import Select from 'ol/interaction/Select';
import DropFile from 'ol-ext/interaction/DropFile';

declare const $: JQueryStatic;

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 6,
    center: [396249, 6009784], // [-245575, 5986863], //[-244777, 5989809]
  }),
  layers: [new TileLayer({ source: new OSM() })],
});

// Create layer vector
const vectorSource = new VectorSource({ wrapX: false });
const vector = new VectorLayer({
  source: vectorSource,
});
map.addLayer(vector);

map.on('moveend', function (e) {
  const ex = e.frameState?.extent;
  if (!ex) return;
  const f = vectorSource.getFeaturesInExtent(ex);
  $('.vis span').text(f.length);
  // console.log("Calcul "+(new Date() -t));
});
map.addControl(new Permalink({ visible: false }));

const defaultStyle = vector.getStyleFunction()!;
const labelInput = document.querySelector<HTMLInputElement>('#label')!;

function setStyle(feature: FeatureLike, resolution: number) {
  const defaultStyles = defaultStyle(feature, resolution);
  const s = Array.isArray(defaultStyles)
    ? [...defaultStyles]
    : defaultStyles
      ? [defaultStyles]
      : [];
  const value = feature.get(labelInput.value);
  if (value && resolution < 100000) {
    const text = String(value);
    const geometry = feature.getGeometry();
    let g = feature instanceof Feature ? feature.getGeometry() : undefined;
    if (geometry instanceof MultiPolygon) {
      for (const polygon of geometry.getPolygons()) {
        if (
          g instanceof MultiPolygon ||
          polygon.getArea() > (g instanceof Polygon ? g.getArea() : 0)
        )
          g = polygon;
      }
    }
    s.push(
      new Style({
        text: new Text({
          text: text,
          font: '12px helvetica,sans-serif',
          fill: new Fill({
            color: 'red', //'#000'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
        geometry: g,
      }),
    );
  }
  return s;
}

vector.setStyle(setStyle);
labelInput.addEventListener('change', () => vectorSource.changed());

// Create layer image-vector
/* old version (<4.6)
  var image = new ol.layer.Image(
  {	source: new ol.source.ImageVector(
    {	source: vectorSource,
      style: vector.getStyle(),
      wrapX: true
    })
  });
  */
const image = new VectorImage({
  source: vectorSource,
  style: vector.getStyle(),
});
map.addLayer(image);

// Event handlers when source is ready
vectorSource.on('change', function (e) {
  if (vectorSource.getState() === 'ready') {
    $('.nb span').text(vectorSource.getFeatures().length);
  }
});

const select = new Select();
map.addInteraction(select);
select.on('select', function (e) {
  if (e.selected && e.selected[0]) {
    const prop = $.extend({}, e.selected[0].getProperties());
    delete prop.geometry;
    $('.info')
      .text(JSON.stringify(prop, null, ' '))
      .css('white-space', 'pre-line');
    if (prop.idcliche && prop.mission && prop.url) {
      const url =
        'http://wxs.ign.fr/yvmoikafaddadzmxvh6sdmjb/iipsrv?FIF=DEMAT.PVA/' +
        prop.mission +
        '/' +
        prop.url +
        '&WID=2048&CVT=JPEG';
      const app =
        'http://localhost.ign.fr/exemples/Map-georeferencer/?photo=' +
        encodeURIComponent(url) +
        '&lon=' +
        prop.lon +
        '&lat=' +
        prop.lat +
        '&ori=' +
        prop.orientation +
        '&res=' +
        prop.res +
        '&w=' +
        prop.largeur +
        '&h=' +
        prop.hauteur;
      $('<br/>').appendTo($('.info'));
      const a = $('<a>')
        .attr({ href: app, target: 'new' })
        .appendTo($('.info'));
      $('<img>').attr('src', url).appendTo(a).width(100);
    }
  } else {
    $('.info').html('');
  }
});

const dd = new DropFile({
  /*
    formatConstructors: [
      ol.format.GPX,
      ol.format.GeoJSON,
      ol.format.GeoJSONX,
      ol.format.IGC,
      ol.format.KML,
      ol.format.TopoJSON
    ]
    */
});
map.addInteraction(dd);
let loading = 0;

// Drag and drop
dd.on('loadstart', function (e) {
  if (!/(.json|.gpx|.geojson|.igc|.kml)/.test(e.fileextension)) return;
  if (!document.querySelector<HTMLInputElement>('#addto')!.checked && !loading)
    vectorSource.clear();
  select.getFeatures().clear();
  $('.info').html('');
  loading++;
  $('.loading').show();
  $('.loading p').html('LOADING (' + loading + ')');
});
dd.on('addfeatures', function (event) {
  loading--;
  $('.loading p').html('LOADING (' + loading + ')');
  $('.loading span').html(event.features.length + ' Objects');

  setTimeout(function () {
    vectorSource.addFeatures(event.features);

    if (!loading) $('.loading').hide();

    if (!document.querySelector<HTMLInputElement>('#zoomto')!.checked) return;
    const vext = map.getView().getProjection().getExtent();
    const extent = vectorSource.getExtent();
    if (!extent) return;
    if (vext) {
      extent[0] = Math.max(extent[0], vext[0]);
      extent[1] = Math.max(extent[1], vext[1]);
      extent[2] = Math.min(extent[2], vext[2]);
      extent[3] = Math.min(extent[3], vext[3]);
    }
    map.getView().fit(extent, { size: map.getSize() });
  }, 500);
});

function setLayerVisibility() {
  vector.setVisible(
    !document.querySelector<HTMLInputElement>('#imgvector')!.checked,
  );
  image.setVisible(
    document.querySelector<HTMLInputElement>('#imgvector')!.checked,
  );
}
setLayerVisibility();

function fixStyle() {
  const checked = document.querySelector<HTMLInputElement>('#fix')!.checked;
  const f = vectorSource.getFeatures();
  const res = map.getView().getResolution();
  vectorSource.clear();
  for (let i = 0; i < f.length; i++) {
    if (checked && res !== undefined) {
      f[i].setStyle(setStyle(f[i], res));
    } else {
      f[i].setStyle();
    }
  }
  vectorSource.addFeatures(f);
}

Object.assign(window, { vectorSource, setLayerVisibility, fixStyle });
