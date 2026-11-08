# ol-ext 4.0.39 declaration audit

Comparisons use upstream tag `v4.0.39`. This is a working audit record, not a claim of complete coverage.

## Modules without declarations

- `interaction/Modify` augments and exports OpenLayers Modify; `source/Vector` patches the vector source and has no exports. Both have declarations for their actual module shape.
- The FontAwesome and Maki definition modules register symbols; all except `FontMaki2Def` also default-export FontSymbol. `defaultStyle` and `geoportailStyle` export style factories. The Geoportail WFS examples call the latter directly.
- `util/Ajax` and the public image loader functions are used directly in upstream layer and filter examples. Their module exports are declared. `loadBILImage` and `ol_ext_imageLoader_shadedRelief` are marked private in source despite being exported; they are excluded from the public declaration.
- `util/getMapCanvas`, `getVectorContext`, `getVectorContextStyle`, and `matrix3D` are exported for internal imports, but the release examples do not use them as APIs. The vector context modules are compatibility helpers; `matrix3D` is used by PerspectiveMap. Excluded from public declarations pending evidence of intended external use.
- `util/sphere` is a pre-OpenLayers-5 global compatibility shim, not an exported module API; excluded.
- `utils/Exif2Geojson` and `utils/MapIFrameAPI` default-export functions used by standalone upstream examples, despite the latter marking its constructor internal. Declarations cover their module exports; EXIF requires a global EXIF-JS dependency.
- `utils/WSynchro` is a standalone global script used by the synchronization example, with no ES exports. `utils/d3` is the bundled D3 7.9.0 UMD distribution, not an ol-ext ES module. Neither is declared as an ol-ext module API.
- `utils/ExportMap` has a default export but is marked for rewrite and imports `jspdf.js`, which is not the normal jsPDF package entry. Its standalone status and usable module path need further verification before declaring it.

## Release-specific APIs

- `source/Contour`: compared with source and upstream example. The real d3-contour factory, grid, thresholds, styling, and data loading are type-checked. Inline and file datasets rendered in Chrome; levels were changed. This does not verify all grid shapes.
- `style/StrokeImage`: constructor and public fields compared with source; OpenLayers style integration is type-checked. Rendering is not browser-tested.

## Remaining audit

The following source comparisons are partial, focused on verified missing or incorrect members:

- `control/Permalink`, `Storymap`, `Swipe`, and `Timeline`: added public URL, content, layer removal, and date-rounding methods. Swipe's render and pointer handlers are marked private upstream and were not added.
- `source/DayNight`: corrected `getCoordinates` to return coordinate arrays and added the sun and night-latitude methods; solar calculation helpers are private. `source/Delaunay`: triangle and node lookup return features and the source option is required. `source/BinBase`, `GridBin`, and `HexBin`: corrected the required source, geometry callback coordinate, bin nullability, and inherited `clear`; GridBin exposes circle and projection options and HexBin accepts optional reset flags. This corrects an earlier audit change that incorrectly made GridBin's source optional. `geom/Simplificator`: added Visvalingam options and corrected the optional rounding argument.
- `source/IDW`: corrected required source, inherited canvas options, color and distance options, and `getValue` nullability. `hue2rgb`, `calculateImage`, and `onImageData` are marked private upstream; `computeImage` is an implementation worker callback.
- `control/Select` and `SelectBase`: added public condition APIs and corrected the `!regexp` operator and direct feature/source selection options. `control/SearchFeature`: added its source and search-string APIs and corrected optional constructor fields; its title and history methods override inherited Search methods.
- `legend/Item`, `legend/Legend`, and `overlay/Magnify`: added public sizing, title-style, and refresh methods. Other missing method names have not yet been individually classified.
- `control/Dialog`, `Imageline`, `MapZone`, `Target`, `VideoRecorder`, and `RoutingGeoportail`: added documented public methods and corrected verified constructor options. The layer-switcher visibility handlers, overview view handler, and Dijkstra graph helpers are marked private upstream.
- `render/HexGrid`: corrected the offset-to-cube name, argument and coordinate types, and neighbor overloads. Its interpolation helpers are private. `format/GeoJSONX`: corrected the `featureProjection` option, number encoding/decoding, recursive coordinate types, and compact feature and geometry output shapes. A runtime check verified the feature collection and point encoding. `GeoJSONP` shares these compact output shapes and can return null when decoding an empty array.
- `style/Chart`, `FontSymbol`, and `Shadow`: image methods override OpenLayers image-style methods; `FlowLine.drawArrow` is private. `overlay/Popup.getClassPositioning` is private.
- `util/input/Checkbox` and `filter/Paper`: added the checkbox state and filter light methods. `layer/Render3D`: corrected its BaseObject inheritance, options, layer setter, animation defaults, active state, and feature-height return type. AnimatedCluster's animation and lookup helpers are marked private upstream; filter precompose/postcompose hooks are implementation methods.

The broad comparison of existing declarations across controls, interactions, sources, geometry, rendering, formats, overlays, legends, and input controls is incomplete. Inherited and private member decisions still need module-by-module recording. ExportMap remains unresolved.
