import { setupPaintMap } from '../.shared/paint';
import 'ol-ext/layer/GetPreview';
import Geoportail from 'ol-ext/layer/Geoportail';
import Pointillism from 'ol-ext/filter/Pointillism';
import CanvasFilter from 'ol-ext/filter/CanvasFilter';
import Colorize from 'ol-ext/filter/Colorize';
import 'ol-ext/filter/Base';

declare const $: JQueryStatic;

const { map, plink, photoLayer, print } = setupPaintMap([343598, 5240059, 17]);

// Pointillism filter
var layer = new Geoportail({
  layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
  baseLayer: true,
});
// Use same source to load images once
layer.setSource(photoLayer.getSource());

// Add filter
var filter = new Pointillism();
layer.addFilter(filter);

// Add hueRotate filter
var filter2 = new CanvasFilter();
layer.addFilter(filter2);

// Add pastel filter
var pastel = new Colorize({ operation: 'luminosity', value: 1 });
pastel.setColor([255, 192, 255]);
pastel.setValue(0);
layer.addFilter(pastel);

// Permalilnk
if (plink.getUrlParam('s') !== '') {
  filter.set('saturate', plink.getUrlParam('s'));
  document.querySelector<HTMLInputElement>('#saturate')!.value = String(
    plink.getUrlParam('s'),
  );
}
if (plink.getUrlParam('h') !== '') {
  filter2.set('hueRotate', plink.getUrlParam('h'));
  document.querySelector<HTMLInputElement>('#hueRotate')!.value = String(
    plink.getUrlParam('h'),
  );
}
if (plink.getUrlParam('p') !== '') {
  pastel.setValue(Number(plink.getUrlParam('p')));
  document.querySelector<HTMLInputElement>('#pastel')!.value = String(
    plink.getUrlParam('p'),
  );
}

map.addLayer(layer);
layer.set('preview', '../img/pointillism.jpg');

Object.assign(window, { layer, plink, print, filter, filter2, pastel });
