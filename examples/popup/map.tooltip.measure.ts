import { Map, View } from 'ol';
import Draw from 'ol/interaction/Draw';
import Geoportail from 'ol-ext/layer/Geoportail';
import Tooltip from 'ol-ext/overlay/Tooltip';

const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })] });
const drawLine = new Draw({ type: 'LineString' });
const drawPoly = new Draw({ type: 'Polygon' });
map.addInteraction(drawLine);
map.addInteraction(drawPoly);
drawPoly.setActive(false);
const tooltip = new Tooltip();
map.addOverlay(tooltip);
[drawLine, drawPoly].forEach(draw => {
  draw.on('drawstart', event => tooltip.setFeature(event.feature));
  draw.on(['change:active', 'drawend'], () => tooltip.removeFeature());
});
Object.assign(window, { drawLine, drawPoly });
