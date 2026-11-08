import HexGrid from '../@types/ol-ext/render/HexGrid'
import GeoJSONX from '../@types/ol-ext/format/GeoJSONX'
import Render3D from '../@types/ol-ext/layer/Render3D'
import Checkbox from '../@types/ol-ext/util/input/Checkbox'
import Paper from '../@types/ol-ext/filter/Paper'
import Feature from 'ol/Feature'

const grid = new HexGrid({ size: 100, layout: 'flat' })
const hex: number[] = grid.coord2hex([1, 2])
const coordinate: number[] = grid.hex2coord(hex)
grid.offset2cube([0, 0])
grid.cube_round([0, 0, 0])
grid.hex_corner(coordinate, 100, 1)
const neighbor: number[] = grid.hex_neighbors(hex, 1)
const neighbors: number[][] = grid.hex_neighbors(hex)
const format = new GeoJSONX({ featureProjection: 'EPSG:3857' })
const encoded: string = format.encodeNumber(42, 2)
const decoded: number = format.decodeNumber(encoded, 2)
const compact = format.writeFeaturesObject([new Feature()])
const featureEncoding = compact.features[0][0]
const propertyNames: string[] = compact.hashProperties
const geometryEncoding = format.writeFeatureObject(new Feature())[0]
void featureEncoding
void propertyNames
void geometryEncoding
const renderer = new Render3D({ active: true, ghost: true, height: 12 })
const height: number = renderer.getFeatureHeight(new Feature())
renderer.getActive()
renderer.animate({ height: 50 })
new Checkbox().isChecked()
new Paper().setLight(50)
void neighbor
void neighbors
void decoded
void height
// @ts-expect-error direction must be numeric
grid.hex_neighbors(hex, 'north')
