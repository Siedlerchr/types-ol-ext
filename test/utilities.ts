import TileSource from 'ol/source/XYZ'
import { grayscale, pixelTransform, seaLevelMap, transparent, elevationMap, getElevationFromPixel, getPixelFromElevation } from '../@types/ol-ext/util/imagesLoader'
import geoportailStyle from '../@types/ol-ext/style/geoportailStyle'
import defaultStyle from '../@types/ol-ext/style/defaultStyle'
import type Style from 'ol/style/Style'
import type { StyleFunction } from 'ol/style/Style'
import exif2geojson from '../@types/ol-ext/utils/Exif2Geojson'
import Ajax from '../@types/ol-ext/util/Ajax'
import MapIFrameAPI from '../@types/ol-ext/utils/MapIFrameAPI'

new TileSource({ tileLoadFunction: grayscale() })
new TileSource({ tileLoadFunction: pixelTransform((pixels, i, size) => { pixels[i] = size[0] }) })
seaLevelMap(10, { color: '#0088ff', minValue: -10 })
transparent(['#fff', '#000'])
elevationMap(height => getPixelFromElevation(height))
const elevation: number = getElevationFromPixel([1, 2, 3, 255])
geoportailStyle('BDTOPO_V3:batiment', { symbol: true })
const editingStyles: Style[] = defaultStyle(true)
const wfsStyles: Style[] | StyleFunction = geoportailStyle('LANDCOVER2018', { opacity: 0.5 })
const landCoverColor: number[] = geoportailStyle.clcColors['111'].color
void [editingStyles, wfsStyles, landCoverColor]
exif2geojson([], { onLoad: collection => collection.features.forEach(feature => feature.geometry.coordinates) })
declare const files: FileList
exif2geojson(files)
MapIFrameAPI.ready('map', api => {
  const listener = api.on('move', data => { void data.center })
  api.un(listener)
  api.setZoom(10)
})
Ajax.get({ url: '/data', success: (response, event) => { void response; void event.status } })
new Ajax({ dataType: 'text' }).send('/data', { query: 'test' }, { timeout: 5000 })
void elevation
// @ts-expect-error sea level must be numeric
seaLevelMap('high')
// @ts-expect-error the pixel transform callback must be callable
pixelTransform(3)
