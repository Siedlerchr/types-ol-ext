import type { FeatureLike } from 'ol/Feature';
import type Collection from 'ol/Collection';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Transform, {
  type TransformStartEvent,
} from 'ol-ext/interaction/Transform';
import Text from 'ol/style/Text';
import * as condition from 'ol/events/condition';

declare const $: JQueryStatic;

// Layers
var layers = [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })];
// The map
var map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [261720, 5951081],
  }),
  layers: layers,
});

// Style
function getStyle(feature: FeatureLike) {
  return [
    new Style({
      image: new RegularShape({
        fill: new Fill({ color: [0, 0, 255, 0.4] }),
        stroke: new Stroke({ color: [0, 0, 255, 1], width: 1 }),
        radius: feature.get('radius') || 10,
        points: 3,
        angle: feature.get('angle') || 0,
      }),
      fill: new Fill({ color: [0, 0, 255, 0.4] }),
      stroke: new Stroke({ color: [0, 0, 255, 1], width: 1 }),
    }),
  ];
}

// New vector layer
var vector = new VectorLayer({
  properties: { name: 'Vecteur' },
  source: new VectorSource({ wrapX: false }),
  style: getStyle,
});
map.addLayer(vector);
// add a rectangle feature
vector.getSource()!.addFeature(
  new Feature({
    geometry: new Polygon([
      [
        [261720 - 200000, 5951081 - 200000],
        [261720 + 200000, 5951081 - 200000],
        [261720 + 200000, 5951081 + 200000],
        [261720 - 200000, 5951081 + 200000],
        [261720 - 200000, 5951081 - 200000],
      ],
    ]),
  }),
);

// Set cursor style
Transform.prototype.Cursors['rotate'] =
  "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXAgMAAACdRDwzAAAAAXNSR0IArs4c6QAAAAlQTFRF////////AAAAjvTD7AAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wwSEgUFmXJDjQAAAEZJREFUCNdjYMAOuCCk6goQpbp0GpRSAFKcqdNmQKgIILUoNAxIMUWFhoKosNDQBKDgVAilCqcaQBogFFNoGNjsqSgUTgAAM3ES8k912EAAAAAASUVORK5CYII=') 5 5, auto";
Transform.prototype.Cursors['rotate0'] =
  "url('data:image/png;base64,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') 5 5, auto";

/** Style the transform handles for the current interaction
 */
function setHandleStyle() {
  if (document.querySelector<HTMLInputElement>('#style')!.checked) {
    // Style the rotate handle
    var circle = new RegularShape({
      fill: new Fill({ color: [255, 255, 255, 0.01] }),
      stroke: new Stroke({ width: 1, color: [0, 0, 0, 0.01] }),
      radius: 8,
      points: 10,
    });
    interaction.setStyle(
      'rotate',
      new Style({
        text: new Text({
          text: '\uf0e2',
          font: '16px Fontawesome',
          textAlign: 'left',
          fill: new Fill({ color: 'red' }),
        }),
        image: circle,
      }),
    );
    // Center of rotation
    interaction.setStyle(
      'rotate0',
      new Style({
        text: new Text({
          text: '\uf0e2',
          font: '20px Fontawesome',
          fill: new Fill({ color: [255, 255, 255, 0.8] }),
          stroke: new Stroke({ width: 2, color: 'red' }),
        }),
      }),
    );
    // Style the move handle
    interaction.setStyle(
      'translate',
      new Style({
        text: new Text({
          text: '\uf047',
          font: '20px Fontawesome',
          fill: new Fill({ color: [255, 255, 255, 0.8] }),
          stroke: new Stroke({ width: 2, color: 'red' }),
        }),
      }),
    );
    // Style the strech handles
    /* uncomment to style * /
        interaction.setStyle ('scaleh1',
          new ol.style.Style({
            text: new ol.style.Text ({
            text:'\uf07d',
            font:"bold 20px Fontawesome",
            fill: new ol.style.Fill({ color:[255,255,255,0.8] }),
            stroke: new ol.style.Stroke({ width:2, color:'red' })
          })
        }));
        interaction.style.scaleh3 = interaction.style.scaleh1;
        interaction.setStyle('scalev',
          new ol.style.Style({
            text: new ol.style.Text ({
              text:'\uf07e',
              font:"bold 20px Fontawesome",
              fill: new ol.style.Fill({ color:[255,255,255,0.8] }),
              stroke: new ol.style.Stroke({ width:2, color:'red' })
            })
          }));
        interaction.style.scalev2 = interaction.style.scalev;
        /**/
  } else {
    interaction.setDefaultStyle();
  }
  // Refresh
  interaction.set('translate', interaction.get('translate'));
}

/** Set properties
 */
function setPropertie(p: string) {
  interaction.set(p, $('#' + p).prop('checked'));
  if (!document.querySelector<HTMLInputElement>('#scale')!.checked)
    $('#stretch').prop('disabled', true);
  else $('#stretch').prop('disabled', false);
}

function setAspectRatio(p: string) {
  if ($('#' + p).prop('checked'))
    interaction.set('keepAspectRatio', condition.always);
  else interaction.set('keepAspectRatio', condition.shiftKeyOnly);
}

function setKeepRectangle(p: string) {
  interaction.set('keepRectangle', $('#' + p).prop('checked'));
}

var interaction = new Transform({
  enableRotatedTransform: false,
  /* Limit interaction inside bbox * /
      condition: function(e, features) {
        return ol.extent.containsXY([-465960, 5536486, 1001630, 6514880], e.coordinate[0], e.coordinate[1]);
      },
      /* */
  addCondition: condition.shiftKeyOnly,
  // filter: function(f,l) { return f.getGeometry().getType()==='Polygon'; },
  // layers: [vector],
  hitTolerance: 2,
  translateFeature:
    document.querySelector<HTMLInputElement>('#translateFeature')!.checked,
  scale: document.querySelector<HTMLInputElement>('#scale')!.checked,
  rotate: document.querySelector<HTMLInputElement>('#rotate')!.checked,
  keepAspectRatio: document.querySelector<HTMLInputElement>('#keepAspectRatio')!
    .checked
    ? condition.always
    : undefined,
  keepRectangle:
    document.querySelector<HTMLInputElement>('#keepRectangle')!.checked,
  translate: document.querySelector<HTMLInputElement>('#translate')!.checked,
  stretch: document.querySelector<HTMLInputElement>('#stretch')!.checked,
  // Get scale on points
  pointRadius: function (f) {
    var radius = f.get('radius') || 10;
    return [radius, radius];
  },
});
map.addInteraction(interaction);
// Style handles
setHandleStyle();
// Events handlers
var startangle = 0;
var startRadius = 10;
var d = [0, 0];

// Handle rotate on first point
var firstPoint = false;
function setCenterFromFirst(features: Collection<Feature>) {
  const geometry = features.item(0)?.getGeometry();
  if (firstPoint && geometry instanceof SimpleGeometry) {
    interaction.setCenter(geometry.getFirstCoordinate());
  }
}
interaction.on('select', (e) => {
  if (e.features) setCenterFromFirst(e.features);
});
function startTransform(e: TransformStartEvent) {
  startangle = e.feature.get('angle') || 0;
  startRadius = e.feature.get('radius') || 10;
  d = [0, 0];
}
interaction.on('rotatestart', startTransform);
interaction.on('translatestart', startTransform);
interaction.on('scalestart', startTransform);
interaction.on('rotating', function (e) {
  $('#info').text(
    'rotate: ' + ((((e.angle * 180) / Math.PI - 180) % 360) + 180).toFixed(2),
  );
  // Set angle attribute to be used on style !
  e.feature.set('angle', startangle - e.angle);
});
interaction.on('translating', function (e) {
  d[0] += e.delta[0];
  d[1] += e.delta[1];
  $('#info').text('translate: ' + d[0].toFixed(2) + ',' + d[1].toFixed(2));
  setCenterFromFirst(e.features);
});
interaction.on('scaling', function (e) {
  $('#info').text(
    'scale: ' + e.scale[0].toFixed(2) + ',' + e.scale[1].toFixed(2),
  );
  setCenterFromFirst(e.features);
  if (e.features.getLength() === 1) {
    var feature = e.features.item(0);
    feature.set('radius', startRadius * Math.abs(e.scale[0]));
  }
});
interaction.on(['rotateend', 'translateend', 'scaleend'], function (e) {
  $('#info').text('');
});

/* * /
    map.addInteraction(new ol.interaction.Snap({
      source: vector.getSource()
    }))
    /* */

Object.assign(window, {
  map,
  setHandleStyle,
  setPropertie,
  setAspectRatio,
  setKeepRectangle,
  interaction,
});
Object.defineProperty(window, 'firstPoint', {
  get: () => firstPoint,
  set: (value: boolean) => {
    firstPoint = value;
  },
});
