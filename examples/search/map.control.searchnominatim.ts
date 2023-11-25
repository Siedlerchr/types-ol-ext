import { Map, View } from 'ol'
import { Tile, Vector } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'
import { defaults as interaction_defaults } from 'ol/interaction'
import { GeoJSON } from 'ol/format'
import {
  Style, Circle, Stroke, Fill,
} from 'ol/style'
import { getCenter } from 'ol/extent'
import SearchNominatim from 'ol-ext/control/SearchNominatim'

// Layers
const layers = [new Tile({ source: new OSM() })]

// The map
const map = new Map
({
  target: 'map',
  view: new View
  ({
    zoom: 5,
    center: [166326, 5992663],
  }),
  interactions: interaction_defaults({ altShiftDragRotate: false, pinchRotate: false }),
  layers,
})

// Current selection
const sLayer = new Vector({
  source: new VectorSource(),
  style: new Style({
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: 'rgb(255,165,0)',
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(255,165,0,.3)',
      }),
    }),
    stroke: new Stroke({
      color: 'rgb(255,165,0)',
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(255,165,0,.3)',
    }),
  }),
})
map.addLayer(sLayer)

// Set the search control
const search = new SearchNominatim({
  // target: $(".options").get(0),
  polygon: document.querySelector<HTMLInputElement>('#polygon')!.checked,
  reverse: true,
  // position: true // Search, with priority to geo position
})
map.addControl(search)

// Select feature when click on the reference index
search.on('select', e => { // console.log(e);
  sLayer.getSource()?.clear()
  // Check if we get a geojson to describe the search
  if (e.search.geojson) {
    const f = new GeoJSON().readFeatures(e.search.geojson, {
      dataProjection: 'EPSG:4326',
      featureProjection: map.getView().getProjection(),
    })

    sLayer.getSource()?.addFeatures(f)

    const view = map.getView()
    const resolution = view.getResolutionForExtent(f[0].getGeometry()!.getExtent(), map.getSize())
    const zoom = view.getZoomForResolution(resolution)!
    const center = getCenter(f[0].getGeometry()!.getExtent())
    // redraw before zoom
    setTimeout(() => {
      view.animate({
        center,
        zoom: Math.min(zoom, 16),
      })
    }, 100)
  } else {
    map.getView().animate({
      center: e.coordinate,
      zoom: Math.max(map.getView().getZoom()!, 16),
    })
  }
})

declare global {
  interface Window {
    search: SearchNominatim;
  }
}
window.search = search
