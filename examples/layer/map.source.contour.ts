// TypeScript port of the ol-ext v4.0.39 Contour example.
import { contours } from 'd3-contour'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import Contour, { GridData } from 'ol-ext/source/Contour'

const map = new Map({
  target: 'map',
  view: new View({ projection: 'EPSG:4326', zoom: 11, center: [8.55, 47.36] }),
  layers: [new TileLayer({ source: new OSM() })],
})
const contourSource = new Contour({ factory: contours, thresholds: 6 })
map.addLayer(new VectorLayer({
  source: contourSource,
  style: feature => {
    const value = Number(feature.get('value')) || 0
    const color = value > 5 ? '#67001f' : '#eaf1f5'
    return new Style({ fill: new Fill({ color }), stroke: new Stroke({ color, width: 1.5 }) })
  },
}))

function sampleData(scale: number): GridData {
  return {
    x: Array.from({ length: 7 }, () => [8.475, 8.5, 8.525, 8.55, 8.575, 8.6, 8.625]),
    y: [47.42, 47.4, 47.38, 47.36, 47.34, 47.32, 47.3].map(y => Array(7).fill(y)),
    z: [
      [null, null, null, null, null, null, null],
      [null, null, null, 2 * scale, null, null, null],
      [null, null, 2 * scale, 5 * scale, 2 * scale, null, null],
      [null, 2 * scale, 5 * scale, 10 * scale, 5 * scale, 2 * scale, null],
      [null, null, 2 * scale, 5 * scale, 2 * scale, null, null],
      [null, null, null, 2 * scale, null, null, null],
      [null, null, null, null, null, null, null],
    ],
  }
}

function applyData(data: GridData): void {
  contourSource.setData(data)
  const xs = data.x.flat().filter(Number.isFinite)
  const ys = data.y.flat().filter(Number.isFinite)
  map.getView().fit([Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)], {
    size: map.getSize(), padding: [20, 20, 20, 20],
  })
}

function rebuild(): void {
  contourSource.thresholds = Number(document.querySelector<HTMLSelectElement>('#levels')!.value) || 6
  const mode = document.querySelector<HTMLSelectElement>('#dataset')!.value
  if (mode === 'inline') {
    applyData(sampleData(Number(document.querySelector<HTMLInputElement>('#scale')!.value) || 1))
  } else {
    fetch('../data/contour_gridData.json')
      .then(response => response.text())
      .then(text => applyData(JSON.parse(text.replace(/,\s*([}\]])/g, '$1')) as GridData))
      .catch(() => { document.querySelector('#dataStatus')!.textContent = 'load failed' })
  }
}

declare global {
  interface Window {
    rebuild(): void
    setDataset(value: string): void
  }
}
window.rebuild = rebuild
window.setDataset = () => rebuild()
rebuild()
