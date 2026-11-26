import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control/defaults'
import { defaults as defaultInteractions } from 'ol/interaction/defaults'
import Geoportail from 'ol-ext/layer/Geoportail'
import Lego from 'ol-ext/filter/Lego'

const ortho = new Geoportail({ layer: 'ORTHOIMAGERY.ORTHOPHOTOS' })
const ignmap = new Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })
new Map({
  target: 'map',
  view: new View({ zoom: 6, center: [8866, 6607904] }),
  controls: defaultControls({ rotate: false }),
  interactions: defaultInteractions({ altShiftDragRotate: false, pinchRotate: false }),
  layers: [ortho, ignmap],
})
function setLayer(): void {
  const visible = document.querySelector<HTMLSelectElement>('#layer')!.value === 'ortho'
  ortho.setVisible(visible)
  ignmap.setVisible(!visible)
}
setLayer()
const lego = new Lego({
  brickSize: Number(document.querySelector<HTMLSelectElement>('#size')!.value),
  img: document.querySelector<HTMLSelectElement>('#brick')!.value,
})
ignmap.addFilter(lego)
ortho.addFilter(lego)

declare global {
  interface Window { lego: Lego; setLayer(): void }
}
window.lego = lego
window.setLayer = setLayer
