import { Map, View } from 'ol'
import { toStringHDMS } from 'ol/coordinate'
import { toLonLat } from 'ol/proj'
import Geoportail from 'ol-ext/layer/Geoportail'
import Status from 'ol-ext/control/Status'
import Toggle from 'ol-ext/control/Toggle'

const map = new Map({
  target: 'map',
  view: new View({ zoom: 13, center: [649083, 5408224] }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS')],
})
const ctrl = new Status()
map.addControl(ctrl)
map.on('postrender', event => {
  const view = map.getView()
  const center = view.getCenter()
  if (!center) return
  ctrl.status({
    center: center.map(Math.round),
    lonlat: toStringHDMS(toLonLat(center)),
    zoom: view.getZoom(),
    resolution: view.getResolution()?.toFixed(4),
    angle: Math.round(view.getRotation() * 180 / Math.PI * 100) / 100,
    size: map.getSize(),
    animate: event.frameState?.animate,
  })
})
map.addControl(new Toggle({ html: '<i class="fa fa-bug"></i>', className: 'debug', onToggle: active => ctrl.setVisible(!active) }))
Object.assign(window, { ctrl })
