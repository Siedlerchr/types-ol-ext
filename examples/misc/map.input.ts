import Switch from 'ol-ext/util/input/Switch';
import Checkbox from 'ol-ext/util/input/Checkbox';
import Radio from 'ol-ext/util/input/Radio';
import Slider from 'ol-ext/util/input/Slider';
import Color from 'ol-ext/util/input/Color';
import Size from 'ol-ext/util/input/Size';
import Width from 'ol-ext/util/input/Width';
import List from 'ol-ext/util/input/List';
import PopupBase from 'ol-ext/util/input/PopupBase';
import { asString } from 'ol/color';
import { Map as _ol_Map } from 'ol';
import Dialog from 'ol-ext/control/Dialog';
import Range from 'ol-ext/util/input/Range';

declare global {
  interface Window {
    $(selector: any, context?: any): any;
    [key: string]: any;
    dialog: Dialog;
  }
}

/* A dialog with a color input */ 
const fakeMap = new _ol_Map();
const dialog = new Dialog({ fullscreen: true });
fakeMap.addControl(dialog);
dialog.setContent({
  title: 'Color',
  content: 'Color : '
});
const inputColor = new Color({ position: 'fixed', parent: dialog.getContentElement() })
window.dialog = dialog;

/* Set inputs */
const switcher = new Switch({
  input: $('.switch').get(0),
  html: 'off',
  after: 'on',
});

const checkbox = new Checkbox({
  input: $('.check').get(0),
  html: 'Checkbox:',
  after: 'on',
});
$('.radio').each((i: number, elem: Element) => {
  const radio: Radio = new Radio({
    input: elem,
    html: i ? '' : 'Radio:',
    after: 'radio ' + (i + 1),
    checked: !i,
  });
  window['radio'+(i+1)] = radio;
});

const slider = new Slider({ input: $('.slider').get(0) });
slider.on('change:value', (e) => {
  $('.opacity').css('opacity', e.value / 100);
});
slider.setValue(25);

const slide2 = new Slider({ input: $('.slide2').get(0), type: 'size' });
slide2.on('change:value', (e) => {
  $('.fa-map-marker').css('font-size', e.value + 'px');
});
slide2.setValue(50);

const cpicker = new Color({
  input: $('.color1').get(0),
  color: 'red',
  position: 'fixed',
  hidden: true,
  opacity: false,
  hastab: true,
});
cpicker.on('color', (e) => {
  console.log('Color:', e.color);
});

const cpicker2 = new Color({ input: $('.color2').get(0), position: 'inline' });
cpicker2.on('color', (e) => {
  $('.color').css('background-color', asString(e.color));
});
cpicker2.setColor('#f90');

const size = new Size({ input: $('.size').get(0), fixed: false });
size.on('change:value', (e) => {
  $('.fa-map-pin').css('font-size', e.value + 'px');
});
size.setValue(8);

const size2 = new Size({ input: $('.size2').get(0), className: 'marker' });
size2.setValue(8);

const width = new Width({ input: $('.width').get(0), fixed: false });
width.on('change:value', (e) => {
  $('.line').height(e.value);
});
//  width.setValue(8);

// An arrow list
const arrow = new List({
  input: $('.arrow').get(0),
  className: 'arrow',
  disabled: true,
  hidden: true,
  // align: 'middle',
  options: [
    {
      value: 0,
      title: 'none',
      html: '<i class="arrow0"></i>',
    },
    {
      value: 1,
      title: 'direct',
      html: '<i class="arrow1"></i>',
    },
    {
      value: -1,
      title: 'revers',
      html: '<i class="arrow-1"></i>',
    },
    {
      value: 2,
      title: 'both',
      html: '<i class="arrow2"></i>',
    },
  ],
});
arrow.on('change:value', (e) => {
  console.log(e.value);
});

const popup = new PopupBase({
  input: $('.popup').get(0),
});

const range = new Range({
  input: $('.range').get(0),
});
var range2 = new Range({
  input: $('.range2').get(0),
  input2: $('.range2').get(1),
  overflow: true
});
