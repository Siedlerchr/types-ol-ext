import {
  Map,
  View,
  Feature
} from 'ol'
import {
  LineString,
  Polygon
} from 'ol/geom'
import Draw
  from 'ol/interaction/Draw'
import VectorLayer
  from 'ol/layer/Vector'
import VectorSource
  from 'ol/source/Vector'
import Icon
  from 'ol/style/Icon'
import type {
  Size
} from 'ol/size'
import Geoportail
  from 'ol-ext/layer/Geoportail'
import StrokeImage
  from 'ol-ext/style/StrokeImage'

// Sprite regions used by the ol-ext 4.0.39 StrokeImage example.
const sprites: Record<string, {
  size: Size;
  offset: number[]
}> = {
  ACHARE51: {
    size: [116, 20],
    offset: [40, 40]
  },
  ACHRES51: {
    size: [108, 20],
    offset: [196, 40]
  },
  ADMARE01: {
    size: [12, 8],
    offset: [344, 38]
  },
  ARCSLN01: {
    size: [24, 8],
    offset: [396, 38]
  }
}

const source = new VectorSource<Feature<LineString | Polygon>>()
const vector = new VectorLayer({
  source,
  style: () => {
    const pattern = document.querySelector<HTMLSelectElement>('#pattern')!.value
    const color = document.querySelector<HTMLSelectElement>('#color')!.value
    return new StrokeImage({
      icon: new Icon({ src: '../data/stroke-image-sprint.png', ...sprites[pattern] }),
      fallbackColor: color
    })
  }
})

const map = new Map({
  target: 'map',
  view: new View({
    zoom: 5,
    center: [-684876.746983723, 5919283.45284623]
  }),
  layers: [new Geoportail('ORTHOIMAGERY.ORTHOPHOTOS'), vector]
})

source.addFeature(new Feature(new Polygon([[
  [-1662063.867775031, 5510719.475652008],
  [-718511.3206573606, 5510719.475652008],
  [-718511.3206573606, 6037003.764880988],
  [-1665823.0412695236, 6033244.591386495],
  [-1662063.867775031, 5510719.475652008]
]])))
source.addFeature(new Feature(new LineString([
  [161434.03018974862, 6633511.045142917],
  [-29352.79241005145, 6476968.011214876],
  [-210355.67538934876, 6472076.0414046245],
  [-528333.7130556819, 6325316.947097086],
  [-1668162.6788442305, 6344884.826338091]
])))
map.addInteraction(new Draw({
  type: 'LineString',
  source
}))

declare global {
  interface Window {
    refresh(): void
  }
}
window.refresh = () => vector.changed()
