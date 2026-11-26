import { setupPaintMap } from '../.shared/paint';
import 'ol-ext/layer/GetPreview';
import OilPainting from 'ol-ext/source/OilPainting';
import Image from 'ol/layer/Image';
import CanvasFilter from 'ol-ext/filter/CanvasFilter';
import 'ol-ext/filter/Base';

declare const $: JQueryStatic;

const { map, plink, photoLayer, print } = setupPaintMap([178343, 6510825, 14]);

// Oil painting source
var oil = new OilPainting({
  // sources: [ new ol.layer.Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS'}) ]
  sources: [photoLayer],
});
var layer = new Image({
  source: oil,
});
layer.setProperties({
  title: 'Painting',
  baseLayer: true,
  preview: '../img/oilpaint.jpg',
});

// Show waiting when processing
oil.on('beforeoperations', function () {
  $('body').addClass('waiting');
});
oil.on('afteroperations', function () {
  $('body').removeClass('waiting');
});

var filter = new CanvasFilter();
layer.addFilter(filter);

// Permalilnk
if (plink.getUrlParam('rd') !== '') {
  oil.set('radius', plink.getUrlParam('rd'));
  document.querySelector<HTMLInputElement>('#radius')!.value = String(
    plink.getUrlParam('rd'),
  );
}
if (plink.getUrlParam('i') !== '') {
  oil.set('intensity', plink.getUrlParam('i'));
  document.querySelector<HTMLInputElement>('#intensity')!.value = String(
    plink.getUrlParam('i'),
  );
}
if (plink.getUrlParam('s') !== '') {
  filter.set('saturate', Number(plink.getUrlParam('s')) * 100);
  document.querySelector<HTMLInputElement>('#saturate')!.value = String(
    plink.getUrlParam('s'),
  );
}
if (plink.getUrlParam('h') !== '') {
  filter.set('hueRotate', plink.getUrlParam('h'));
  document.querySelector<HTMLInputElement>('#hueRotate')!.value = String(
    plink.getUrlParam('h'),
  );
}

map.addLayer(layer);

Object.assign(window, { layer, plink, print, oil, filter });
