import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Circle from 'ol/style/Circle';
import RegularShape from 'ol/style/RegularShape';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Target from 'ol-ext/control/Target';
import { Control } from 'ol/control';

// Layers
const layers = [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')];

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: layers,
});

// Target control
let target: Target | undefined;

function setTarget() {
  let style: Style | Style[];
  if (target) map.removeControl(target);

  const stroke = new Stroke({
    color: document.querySelector<HTMLInputElement>('#color')!.value,
    width: 2,
  });

  switch (document.querySelector<HTMLInputElement>('#style')!.value) {
    case 'icon': {
      style = new Style({
        image: new Icon({ src: '../data/target.png' }),
      });
      break;
    }
    case 'circle': {
      style = new Style({
        image: new Circle({ radius: 10, stroke: stroke }),
      });
      break;
    }
    case 'regular': {
      style = new Style({
        image: new RegularShape({
          radius: 20,
          points: 6,
          stroke: stroke,
        }),
      });
      break;
    }
    case 'text': {
      style = new Style({
        text: new Text({
          text: 'A',
          font: '30px sherif',
          fill: new Fill({
            color: document.querySelector<HTMLInputElement>('#color')!.value,
          }),
        }),
      });
      break;
    }
    case 'bullseye':
    case 'crosshairs': {
      style = new Style({
        text: new Text({
          text:
            document.querySelector<HTMLInputElement>('#style')!.value ==
            'bullseye'
              ? '\uf140'
              : '\uf05b',
          font: '30px Fontawesome',
          fill: new Fill({
            color: document.querySelector<HTMLInputElement>('#color')!.value,
          }),
        }),
      });
      break;
    }
    case 'mixt': {
      style = [
        new Style({
          image: new RegularShape({
            points: 4,
            radius: 11,
            radius2: 0,
            stroke: stroke,
          }),
        }),
        new Style({ image: new Circle({ radius: 10, stroke: stroke }) }),
        new Style({
          image: new RegularShape({ radius: 20, points: 6, stroke: stroke }),
        }),
      ];
      break;
    }
    default: {
      style = [
        new Style({
          image: new RegularShape({
            points: 4,
            radius: 11,
            radius2: 0,
            stroke: new Stroke({ color: '#fff', width: 3 }),
          }),
        }),
        new Style({
          image: new RegularShape({
            points: 4,
            radius: 11,
            radius2: 0,
            stroke: stroke,
          }),
        }),
      ];
      break;
    }
  }
  target = new Target({
    style: style,
    composite: document.querySelector<HTMLInputElement>('#composite')!.value,
  });
  map.addControl(target);
}

setTarget();

Object.assign(window, { setTarget });
