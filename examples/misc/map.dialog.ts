import Geoportail from 'ol-ext/layer/Geoportail';
import Map from 'ol/Map';
import View from 'ol/View';
import Notification from 'ol-ext/control/Notification';
import Dialog from 'ol-ext/control/Dialog';

// Layers
const layer = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' });

// The map
const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [166326, 5992663],
  }),
  layers: [layer],
});

// Notification
const notification = new Notification({});
map.addControl(notification);

// Dialog outside the map
const dialog = new Dialog({ fullscreen: true, closeBox: true });
map.addControl(dialog);

// Dialog with zoom option
const dialogZoom = new Dialog({ fullscreen: true, zoom: true, closeBox: true });
dialogZoom.on('button', function (e) {
  notification.show(e.button);
});
map.addControl(dialogZoom);

// A dialog inside a map
const dialogMap = new Dialog({ hideOnClick: true, className: 'center' });
map.addControl(dialogMap);

// Prompt dialog
const dialogPrompt = new Dialog({
  fullscreen: true,
  // closeBox: false,
  buttons: { submit: 'ok', cancel: 'cancel' },
});
dialogPrompt.setContent({
  content:
    'Enter a value:<br/><input class="value" type="text" placeholder="Enter a value" />',
  title: 'Prompt',
  buttons: { submit: 'ok', cancel: 'cancel' },
});
dialogPrompt.on('button', function (e) {
  if (e.button === 'submit') {
    dialogMap.show('Your enter: "' + e.inputs['value'].value + '"');
  }
});
dialogPrompt.on('show', function () {
  dialogMap.close();
});
map.addControl(dialogPrompt);

// Progress dialog
const dialogProgress = new Dialog({
  fullscreen: true,
  closeBox: false,
});
dialogProgress.setContent({
  content: 'Processing...',
  title: 'Progress',
  max: 10,
});
dialogProgress.on('show', function () {
  dialogMap.close();
  function step(i: number) {
    dialogProgress.setProgress(i);
    if (i < 10) {
      setTimeout(function () {
        step(i + 1);
      }, 500);
    } else {
      dialogMap.show('End of progress...');
      dialogProgress.hide();
    }
  }
  step(0);
});
map.addControl(dialogProgress);

// Alert
const alert = new Dialog({
  className: 'alert',
  hideOnClick: true,
  closeBox: true,
});
map.addControl(alert);

// Large dialog
const aclose = new Dialog({
  className: 'autoclose',
  fullscreen: true,
  zoom: true,
  closeBox: true,
});
map.addControl(aclose);
function showAutoClose() {
  const delay = 5;
  const content = document.createElement('DIV');
  content.innerHTML = 'The dialog will close <br/> in <span></span> s.';
  const dspan = content.querySelector('SPAN');
  aclose.show({ content: content, autoclose: delay * 1000 });
  function setTime(d: number) {
    dspan!.textContent = String(d--);
    if (d > 0)
      setTimeout(function () {
        setTime(d);
      }, 1000);
  }
  setTime(delay);
}

// Large dialog
const dlarg = new Dialog({ fullscreen: true, zoom: true, closeBox: true });
map.addControl(dlarg);
let lorem =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis massa leo. Sed tempor tristique ligula non tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eget varius urna. Maecenas dapibus, metus vitae pellentesque gravida, dolor nisi vehicula arcu, vel tincidunt metus arcu tincidunt lectus. Praesent id auctor risus. Nam id molestie tellus, id aliquam ante. Proin imperdiet, velit sed aliquet tempor, libero felis lobortis nisl, vel pretium purus lectus ut velit. Pellentesque vitae luctus mauris. Suspendisse eros magna, vulputate eu ornare id, dictum at mi. Etiam et viverra erat. Maecenas sed elementum lorem, eget posuere quam.</p>';
lorem =
  lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem;

Object.assign(window, {
  dialog,
  dialogZoom,
  dialogMap,
  dialogPrompt,
  dialogProgress,
  alert,
  showAutoClose,
  dlarg,
  lorem,
});
