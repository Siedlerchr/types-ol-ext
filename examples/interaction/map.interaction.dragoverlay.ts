import { Map, Overlay, View } from 'ol';
import DragOverlay from 'ol-ext/interaction/DragOverlay';
import Geoportail from 'ol-ext/layer/Geoportail';
import Placemark from 'ol-ext/overlay/Placemark';
import Popup from 'ol-ext/overlay/Popup';

const map = new Map({ target: 'map', view: new View({ zoom: 5, center: [166326, 5992663] }),
  layers: [new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })] });
const popup = new Popup({ position: [0, 6000000], closeBox: true, positioning: 'bottom-center', html: 'Move<br/>me!', stopEvent: false });
const marker = new Placemark({ position: [0, 5600000], stopEvent: false });
function numberedOverlay(text: string, position: number[]) {
  const element = document.createElement('div');
  element.textContent = text;
  return new Overlay({ position, positioning: 'center-center', element, stopEvent: false });
}
const overlays = [popup, marker, numberedOverlay('1', [300000, 6000000]), numberedOverlay('2', [300000, 5600000])];
overlays.forEach(overlay => map.addOverlay(overlay));
const drag = new DragOverlay({ overlays });
map.addInteraction(drag);
drag.on('dragend', event => { if (event.overlay === marker) marker.show(true); });
