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
- `utils/ExportMap` is a legacy standalone script also distributed under `dist/extra`. Its source has a default export and is marked for rewrite, but importing the installed ES module fails with `ERR_MODULE_NOT_FOUND`: it imports `jspdf.js`, while the jsPDF package resolves as `jspdf`. No upstream release example uses this module. Excluded from module declarations because the published module cannot load as installed.

## Release-specific APIs

- `source/Contour`: compared with source and upstream example. The real d3-contour factory, grid, thresholds, styling, and data loading are type-checked. Inline and file datasets rendered in Chrome; levels were changed. This does not verify all grid shapes.
- `style/StrokeImage`: constructor and public fields compared with source; OpenLayers vector-layer style integration and vector-tile options are type-checked. The ported upstream example rendered its line and polygon sprite strokes in Chrome, including after changing the pattern and fallback color. Vector-tile rendering was not tested; the release source calls an undefined `checkExtentIntersection` identifier when rendering polygons with both `isVectorTile` and `map` set, which is an upstream runtime limitation.

## Upstream fix validation (2026-11-13)

[Upstream PR #1194](https://github.com/Viglino/ol-ext/pull/1194) is open at `fc9108e0`. It fixes import casing/extensions, jsPDF and MapLibre package imports, Maplibre's element-helper import, and Maplibre/TextPath inheritance from modern OpenLayers classes. The compatibility helper remains exported; no source classes on the PR branch still use it. Release 4.0.39 observations below remain applicable to that release.

- Chrome with OpenLayers 10.11.0 and MapLibre GL 6.18.0 rendered a local style URL and GeoJSON polygon; a WebGL pixel read matched `[255, 85, 0, 255]`. Center, zoom, rotation and opacity synchronized. The test bundle explicitly configured the MapLibre worker URL.
- TextPath defaults, custom options and inherited Text methods passed. The actual gulpfile transformation preserved `ol.style.TextPath`; transformed code constructed and drew canvas text in Chrome. Maplibre's `mapboxgl.Map` global reference is retained. The complete minified distribution and full legacy example UI were not tested.
- ExportMap with jsPDF 4.2.1 generated a 4,700-byte PDF containing an image through controlled canvas compose events. Actual OpenLayers map export still fails because map compose events provide no context for the legacy handler. PDF runtime compatibility is not fixed by this PR.

## Upstream JavaScript findings for reporting

These observations concern the checked-out `v4.0.39` implementation. Unless noted as runtime-verified, they are source observations and should be reproduced before filing an issue. The detailed audit entries below retain their validation context.

- `utils/ExportMap`: imports `jspdf.js`, which fails to resolve against the installed jsPDF package (import failure reproduced).
- `style/StrokeImage`: vector-tile polygon rendering references an undefined `checkExtentIntersection`; this rendering path was not exercised.
- `geom/ConvexHull`: the geometry helper discards concatenated coordinates for multi-geometries. `geom/GPAltiCode` does not forward `minZ` from its coordinate wrapper.
- `geom/Simplificator`: its `visvalingam` dependency uses an extensionless import that prevented the Node runtime check.
- `interaction/Ripple`: the documented `interval` constructor option is not read. `interaction/Splitter`: the before-split field is spelled `feaure`; documented `triggerSource` and filter options are ignored, and source arrays are not handled.
- `interaction/Delete`: an empty feature array causes a call to its nonexistent `getLength` method (runtime-verified). `interaction/TouchCursor` drawing subclasses do not forward several documented constructor options to the sketch.
- `interaction/TinkerBell`: a differently capitalized `getMapcanvas.js` import fails on case-sensitive filesystems; detachment dereferences the new map before its null check.
- `source/Mapillary`: the unfinished loader does not add features. `source/Geoportail`: a Node check returned an undefined feature-info URL after `setGPPKey` where the same lookup previously returned a URL.
- `control/Toggle`: reads `autoActivate` instead of documented `autoActive`. `control/TextButton`: inherited `getDisable` returns null and `setDisable` dereferences a missing button because the control uses a div.
- `control/Target`: stores styles as an array, while inherited style-component helpers expect a single Style; calling its setter without a style leaves an undefined array entry.
- `control/GridReference`: `setMap` dereferences its source even when no source was supplied. `control/FeatureList`: `setMap` dereferences a null map and accumulates size listeners.
- `control/Status`: `isShown` returns true when inline display is `none`. `control/Notification` and `control/Scale` document events that their implementations do not dispatch; Scale's `typing` option has no effect.
- `control/Disable`: `isOn` checks `ol-disable` while `disableMap` toggles `ol-enable`; a custom class name suppresses the default classes due to operator precedence. `control/Cloud` ignores documented hue and saturation options.
- `control/Globe`: supplying a target skips pointer creation, but `setCenter` dereferences that pointer. `control/SwipeMap`: `getRectangle` dereferences the map when unattached.

- `control/LayerPopup` and `LayerSwitcherImage`: their initial drawing adds `ol-layer-hidden` when `testLayerVisibility` returns true, opposite to the base switcher’s view-change handler. `control/LayerSwitcher` reads `onextent` rather than `onExtent`; keyboard reordering emits `reorder-end` without a group. These observations are from source and have not been browser-reproduced.

- `control/LayerShop`: its constructor overwrites the supplied `selection` and `noScroll` options with true. This is a source observation; UI behavior was not browser-tested.

- `examples/routing/RoutingDSR.js`: its error event is spelled `errror`. This standalone example script is not an exported ol-ext module; the observation is from source.

- `control/IsochroneGeoportail`: response handling reads `data.method` and `data[data.method]`, whereas the request data contains `costType` and `costValue`; feature metadata may therefore be undefined. This is a source observation; a service response was not exercised.

- `control/RoutingGeoportail`: pointer enter and leave both emit `hover: false`; service response errors emit `errror`, and the caller then passes the undefined result to `listRouting`. Constraint request generation includes keys regardless of their stored boolean value. Segment-joining compares a point to itself, so the condition is always false. These are source observations; live routing was not exercised.

- `control/Print`: `quality: 0` falls back to the configured quality; the canvas compositor calls `save()` before skipping a layer with opacity `0`, without a matching `restore()` for that iteration. Arbitrary print options are merged over event fields and can overwrite them. These are source observations; printing was not browser-tested in this round.

- `control/PrintDialog`: `print({ margin: 0 })` does not apply the margin because the option is tested for truthiness; `setScale` accepts a ratio string but computes its displayed value with numeric division, yielding NaN for values such as `1/1000`. The documented `value` print option is read as `scale`. These are source observations; dialog interaction was not browser-tested.

- `control/Profile`: `pointAtTime` can return a whole internal profile entry instead of a coordinate, and its nearest-point comparison selects the previous point when the query is above the midpoint. The z-unit expression in graph drawing combines `||` and `?:` without grouping, potentially overriding a supplied unit. These are source observations; graph interaction was not browser-tested.

- `control/SelectBase`: the constructor assigns the return of `setFeatures` (which returns undefined) over the collection it just stored, discarding the initial collection. When a collection is subsequently set, selection against an explicit separate feature array can remove items at corresponding indices from that collection. These are source observations; selection UI was not browser-tested.

- `control/SelectMulti`: constructing without `controls` calls `forEach` on undefined; map detachment calls misspelled `remveControl`. `control/SelectCheck`: if no values are found, `setValues` returns before initializing `_checks`, so `doSelect` can throw; later empty value sets leave existing checks in place. These are source observations; UI interactions were not browser-tested.

- `control/Select`: `doSelect` uses `||` to default `useCase` and `matchAll`, so explicit false cannot override checked UI options. `addCondition` replaces falsy values such as numeric zero with an empty string, and documented `selectLabel` is not read. These are source observations; UI interaction was not browser-tested.

- `control/Legend`: `collapse` is documented as returning a boolean but returns undefined; constructing without `legend` dereferences undefined despite the optional options object in the source. These are source observations; UI behavior was not browser-tested.

- `control/Permalink`: position restoration checks both projected coordinates for truthiness, so centers on either zero axis are skipped. `getLayerByLink` without layers dereferences undefined if unattached, and zero `fixed` or `refreshDelay` values fall back to defaults. These are source observations; browser URL behavior was not exercised in this round.

- `control/Storymap`: the initial asynchronous chapter callback dereferences the first chapter and map without checking either exists; repeated `setStory` calls attach additional scroll listeners. The documented string target is treated as an element. These are source observations; story interaction was not browser-tested.

- `control/Swipe`: `removeLayer` and `removeLayers` leave entries in place when the control is unattached; constructor position zero is replaced by 0.5. The rectangle getter also assumes an attached map with a size. These are source observations; swipe rendering was not browser-tested.

- `control/Timeline`: month rounding advances the month before setting the day to one; dates at the end of a long month can overflow the following shorter month. This is a source observation; date rendering was not browser-tested.

- `control/VideoRecorder`: constructor frame-rate and bitrate options are ignored in favor of fixed defaults, and string `videoTarget` values other than `DIALOG` are not resolved to elements. The generated blob is labeled `video/mp4` regardless of the recorder output type. These are source observations; media recording was not browser-tested.

- `control/MapZone`: the documented `zone` option is actually a required `zones` array; missing it throws. A zone without its own layer also requires a control-level layer or factory, despite the optional-looking constructor documentation. These are source observations; map interaction was not browser-tested.

- `control/Imageline`: the initial collapsed class is concatenated without a separating space. `getFeatures` returns arrays grouped by source, and its `maxFeatures` check counts source arrays rather than individual features. The constructor also dereferences omitted options. These are source observations; UI behavior was not browser-tested.

- `control/Dialog`: `close()` is documented as returning a boolean but returns undefined. Its title documentation permits an Element although `setTitle` assigns it to `innerText`. These are source observations; dialog UI was not browser-tested.

- `control/WMSCapabilities`: the network-error handler checks whether the callback is a function but evaluates `false` instead of calling it. The `onselect` adapter also runs for a load-error event and receives undefined layer/options. These are source observations; service requests were not exercised.

- `control/WMTSCapabilities`: option extraction dereferences `caps.Attribution.Title` without checking for attribution, while its parser sets attribution on the parent collection. The parser also assumes service-provider and layer arrays exist. These are source observations; WMTS service responses were not exercised.

- `source/Delaunay`: Node checks reproduced a NaN circumcircle for `[[0,0],[1,0],[0,1]]`, a reported intersection for disjoint segments `[[0,0],[1,0]]` and `[[2,-1],[2,1]]`, and a Voronoi exception for a node with no triangles. Construction also deletes `source` from the caller’s options object. The checks used the checkout’s installed OpenLayers dependency.

- `source/DayNight`: a Node check of `getCoordinates("2024-06-21T12:00:00Z", "daynight")` with step 90 showed that the returned day polygon largely duplicates the night polygon, with only its first coordinate altered and the ring no longer closed. The constructor also overwrites the caller’s `strategy` option, and a negative step would not advance the longitude loop toward termination (source observations).

- `source/IDW`: `getValue` calls a transform created only during rendering, so an earlier call throws. The documented `lib` option is ignored; worker helpers are instead read from `useWorker` when it is an object. Constructor options are mutated by replacing `canvasFunction`. These are source observations; worker rendering was not exercised.

- `source/GridBin`: the documentation states a 200-metre default grid size, but a Node check found size 1 with an EPSG:4326 grid projection; size is applied in the grid projection’s units.

- `source/GeoRSS`: construction overwrites the caller’s loader option (verified in Node); its Ajax error handler only logs an error and the loader does not invoke OpenLayers success/failure callbacks. The network failure behavior is a source observation; no live request was made.

- `source/Vector3D`: when no text style is supplied, `setStyle` puts a Fill in the Text slot; later rendering calls `getFill()` on it. A Node construction check confirmed the default object is Fill and lacks that method. Rendering itself was not exercised.

- `format/GeoJSONX`: a Node check of `encodeCoordinates([[1,2],[3,4]])` followed by `decodeCoordinates` without a decimal argument returned NaN coordinates. The constructor also ignores custom arrays supplied as `deleteNullProperties` and uses its fixed defaults instead (source observation). Point feature round trips passed in both GeoJSONX and GeoJSONP.

- `format/GeoRSS`: `readFeatures` treats a single Node as an indexed collection and returns no features, while `readFeature` does not parse its documented string input. A Node check with a stub node reproduced the empty result and successfully read the same node via `readFeature`; XML parsing in a browser was not tested.

- `geom/sphere`: a Node check crossing east from longitude 179° returned approximately 0° rather than -179° because longitude normalization multiplies by 540. A great-circle track from 179° to -179° mutated the supplied destination to 181°. A negative track distance also makes the loop nonterminating (source observation; not executed).

- `geom/GeomUtils`: Node checks showed `ol_coordinate_findSegment` always reports index 1 for a found segment, including the third segment, and matches points on the infinite extension beyond an endpoint. Sampling a nonzero segment with distance zero produces an infinite loop (source observation; not executed).

- `geom/visvalingam`: the ES module uses an extensionless `GeomUtils` import, which prevented direct Node import in this checkout. The implementation reads an omitted options argument, discards dimensions beyond XY, and uses randomness to break area ties (source observations).

- `geom/ConvexHull`: Node checks returned an empty hull for a single point and for a nonempty MultiLineString. The multi-geometry helper ignores `concat` return values; a MultiPoint comparison produced the expected three vertices.

- `geom/geohash`: a Node check showed default precision is 12, invalid `!` decodes to NaN coordinates, and empty-hash neighbour lookup throws. Source inspection shows precision inference reads `.lat` and `.lon` from a coordinate array, so it cannot match the input.

- `geom/LineStringSplitAt`: a Node check with a horizontal segment and a point 0.001 units away did not split with tolerance 0.01; axis-aligned branches use exact equality. Splitting at an existing vertex succeeded.

- `geom/GPAltiCode`: a Node check reproduced a `getLength` TypeError when `samplingDist` is used with a point. A mocked point elevation request otherwise returned the expected XYZ coordinate. The coordinate wrapper does not forward `minZ` (source observation).

- `geom/DFCI`: validation character classes include `|`, `^`, and commas as literal allowed characters. Node checks of the expressions confirmed that `|` passes the first-letter test and `,` passes the digit test. Direct module import failed because `proj4` is not installed, so end-to-end DFCI validation was not run.

- `geom/Scribble`: a Node check found a one-polygon MultiPolygon returns two copies of its scribble because the merge appends the first result to itself. The `angle` default also replaces zero, and nonpositive intervals can make the scan loop nonterminating (source observations; the latter was not executed).

- `geom/Dijkstra`: the reverse-edge check compares X twice instead of comparing both X and Y, potentially connecting an edge at the wrong endpoint. A Node check confirmed `path` throws when the source has no edges because the closest feature is null. The endpoint condition is a source observation; a full route was not exercised.

- `geom/Simplificator`: despite the getter name, `getFeatures` replaces the geometries of the original input features. `setFeatures` starts named console timers without ending them, which can produce repeated-timer warnings. These are source observations; direct execution of the audited release is blocked by the extensionless Visvalingam import.

- `style/FillPattern` and `StrokePattern`: a Node check with a stub canvas confirmed `clone()` returns base Fill and Stroke instances, respectively, without `getImage`, despite documentation claiming pattern instances.

- `style/Photo`: `folio` construction increases the supplied stroke width, and cloning reuses that stroke and increases it again. This is a source observation; clone rendering was not tested in this round.

- `style/SetTextPath`: a single Style is accepted but the drawing loop treats it as an array, so it draws no styles; clearing an installed style calls `this.unByKey`, which is not an OpenLayers layer method. The local TextPath constructor is not exported. These are source observations; browser drawing was not repeated.

- `render/AnimExtent`: a Node check confirmed supplying a Stroke throws because the implementation calls the nonexistent `getColr` method. Its documented 2000 ms duration defaults to 1000 ms in code. `render/Markup` multiplies image scale by a number, which produces NaN for a two-dimensional scale array; it also assumes every style contains an image. These are source observations; rendering was not tested.

- `render/Cspline`: a Node check returned an empty array for the horizontal line `[[0, 0], [4, 0]]`, while a diagonal produced points. The implementation discards any computed point whose X or Y is zero. `render/Pulse` also multiplies array-valued image scales as numbers and replaces an explicit zero amplitude with one (source observations; rendering was not tested).

- `style/geoportailStyle`: Node checks showed land-cover styles share a cache by code across factories, so a later opacity of 0.8 reused a style created with opacity 0.2; an unknown code threw while looking up its color. Building fill also copies the green channel into blue: an industrial building's fill was `[51, 102, 102, 0.5]` while its stroke was `[51, 102, 153, 1]`.

- `source/OilPainting`: a Node check of its raster operation on a 1×1 image threw because its neighborhood excludes row and column zero and is empty. A radius change emits the source's `change` event before storing the new value; setting the radius to zero bypasses its minimum-value clamp. Canvas and worker rendering were not tested.

- `overlay/AnimatedCanvas`: attaching to a map calls `setAnimation(true)` even when constructed with `animate: false`. Calling `setAnimation(true)` repeatedly schedules additional animation loops. The constructor does not forward ordinary overlay options and installs a document visibility listener without removing it. These are source observations; browser animation was not tested.

- `particule/Cloud` and `RainDrop`: gradient color strings omit their closing parentheses in the release. These are source observations; canvas color parsing was not tested in a browser.

- `style/Profile`: a Node check confirmed the default fill color is the malformed string `rgba(255,255,255,.3` and setting scale to zero restores 0.2. Rendering was not exercised.

- `style/FlowLine`: a Node check confirmed omitted arrow and offset options produce NaN rather than the documented zero defaults. A `square` line cap is also silently changed to `butt` (source observation). Rendering was not tested.

- `style/Shadow`: a Node check showed that cloning a shadow with displacement `[4, 5]` yields displacement `[0, 0]`. Constructor-derived legacy offsets are assigned after the base constructor and do not update its displacement (source observation).

- `style/FontSymbol`: `getChecksum` calls `getChecksum` on Fill and Stroke, methods absent in OpenLayers 10.11 (verified in Node); it also dereferences omitted fill/stroke values. Direct FontSymbol construction was not exercised in Node because it requires a canvas document.

- `style/Chart`: Node checks confirmed omitted options throw, `setRadius` does not change the donut ratio, and cloning loses ratio, displacement and animation state. Source also ignores the declared `rotateWithView` option. Browser rendering was not tested.

## Remaining audit

The following source comparisons are partial, focused on verified missing or incorrect members:

- `control/Permalink`, `Storymap`, `Swipe`, and `Timeline`: added public URL, content, layer removal, and date-rounding methods. Swipe's render and pointer handlers are marked private upstream and were not added.
- `source/DayNight`: corrected `getCoordinates` to return coordinate arrays and added the sun and night-latitude methods; solar calculation helpers are private. `source/Delaunay`: triangle and node lookup return features and the source option is required. `source/BinBase`, `GridBin`, and `HexBin`: corrected the required source, geometry callback coordinate, bin nullability, and inherited `clear`; GridBin exposes circle and projection options and HexBin accepts optional reset flags. This corrects an earlier audit change that incorrectly made GridBin's source optional. `geom/Simplificator`: added Visvalingam options and corrected the optional rounding argument.
- `source/IDW`: corrected required source, inherited canvas options, color and distance options, and `getValue` nullability. `hue2rgb`, `calculateImage`, and `onImageData` are marked private upstream; `computeImage` is an implementation worker callback.
- `control/Select` and `SelectBase`: added public condition APIs and corrected the `!regexp` operator and direct feature/source selection options. `control/SearchFeature`: added its source and search-string APIs and corrected optional constructor fields; its title and history methods override inherited Search methods.
- `legend/Item`, `legend/Legend`, and `overlay/Magnify`: added public sizing, title-style, and refresh methods. Other missing method names have not yet been individually classified.
- `control/Dialog`, `Imageline`, `MapZone`, `Target`, `VideoRecorder`, and `RoutingGeoportail`: added documented public methods and corrected verified constructor options. The layer-switcher visibility handlers, overview view handler, and Dijkstra graph helpers are marked private upstream.
- `render/HexGrid`: corrected the offset-to-cube name, argument and coordinate types, and neighbor overloads. Its interpolation helpers are private. `format/GeoJSONX`: corrected the `featureProjection` option, number encoding/decoding, recursive coordinate types, and compact feature and geometry output shapes. A runtime check verified the feature collection and point encoding. `GeoJSONP` shares these compact output shapes and can return null when decoding an empty array.
- `geom/GeomUtils`: corrected geometry factory and center types, segment and horizontal-intersection shapes, missing exported helpers, and LineString, MultiLineString, Polygon and MultiPolygon sampling extensions. Unsupported geometry factory types return null; Circle intersection only supports polygonal sampling safely in this release.
- `geom/ConvexHull`, `GPAltiCode`, and `geohash`: corrected coordinate-based hulls and Geometry augmentation, elevation callback shapes and options, and lowercase geohash directions. ConvexHull sorts input in place; the upstream geometry helper discards concatenated coordinates for multi-geometries. GPAltiCode's coordinate wrapper does not forward `minZ`; live elevation requests have not been tested.
- `geom/Scribble` and `LineStringSplitAt`: corrected optional angle and tolerance, the required scribble interval, nullable fill output, and no-argument line splitting. Both expose prototype extensions; Scribble also has a public default function.
- `render/Cspline`, `InseeGrid`, and `Pulse`: corrected spline options and geometry augmentation, INSEE inheritance and geometry results, and Pulse's map prototype method and style options. INSEE requires separately installed `proj4`; Pulse is a deprecated side-effect module and was not browser-tested in this round.
- `style/Chart`, `FontSymbol`, and `Shadow`: image methods override OpenLayers image-style methods; `FlowLine.drawArrow` is private. `overlay/Popup.getClassPositioning` is private.
- `util/input/Checkbox` and `filter/Paper`: added the checkbox state and filter light methods. `layer/Render3D`: corrected its BaseObject inheritance, options, layer setter, animation defaults, active state, and feature-height return type. AnimatedCluster's animation and lookup helpers are marked private upstream; filter precompose/postcompose hooks are implementation methods.
- `control/SearchCoordinates` replaces its base class's text input setter with a coordinate setter. `control/FeatureList`, `layer/AnimatedCluster`, `style/Chart`, and `util/element` declarations were corrected after checking all declaration files with TypeScript rather than skipping library checks. AnimatedCluster's easing option is `animationMethod`.
- `interaction/CurrentMap` and `CopyPaste`: corrected the focus condition option, absent current map, optional clipboard sources and destination, and action condition. `interaction/ModifyFeature` extends Interaction, accepts multiple sources, and its nearest-coordinate and arc methods take geometries. `interaction/Split` supports disabling feature styling, clearing sources, and null map detachment; nearest-coordinate lookup can return undefined. The closest-feature and drag handlers are private implementation methods.
- `control/WMSCapabilities` and `WMTSCapabilities`: corrected the capabilities callback spelling, load callback and public method names, request parameters, and WMTS supported-set method. Parsing and network behavior are not runtime-tested in this audit.
- `control/Search` and `SearchJSON`: search results can be plain objects, asynchronous autocomplete may return void, history is an array, and several search and AJAX arguments are optional. SearchGeoportailParcelle and SearchGPS inherit the corrected signatures. Individual service adapters and their response shapes remain to be reviewed.
- `control/SearchFeature`: restored feature-specific select, history, autocomplete, and select-event types. Search and SearchJSON accept result type parameters, and SearchJSON also accepts a response type parameter; their defaults remain permissive for existing adapters. Individual adapters and remaining `any` types need further review.
- `control/Search.equalFeatures` is an overridable comparison hook used internally to suppress adjacent duplicate results; Photon marks its override `@api` and compares GeoJSON point results, not OpenLayers features. Photon now exposes typed results, responses, and comparison arguments; SearchFeature uses OpenLayers features.
- `control/SearchNominatim`: search results are service objects with a display name and latitude/longitude, and reverse-geocode callbacks may receive an error object. Public title, response, select, and reverse-geocoding hooks use those shapes; no live service request was made.
- `control/SearchGPS`: autocomplete and selection use coordinate result objects, and the public input setter takes an optional coordinate rather than a string. Form-creation helpers are private upstream; GPS behavior has not been browser-tested in this round.
- `control/SearchGeoportailParcelle`: corrected its Geoportail inheritance, label options, public parcel methods, input selector, and parcel/commune event payloads. Commune selection, autocomplete, and list rendering helpers are private upstream. A mocked Node request verified parcel parameters and result mapping; live service requests and form behavior have not been browser-tested in this round.
- `control/SearchGeoportail`: typed the service result and response objects, search-area options, version, commune lookup, and reverse-geocoding hook. The service adapters use plain result objects rather than OpenLayers features; live service requests have not been tested.
- `control/SearchWikipedia`: added its public language setter, typed the OpenSearch response and autocomplete entries separately from the enriched select event, and allowed its title hook to return an element. Live MediaWiki requests have not been tested.
- `control/SearchCoordinates` and `SearchDFCI`: typed their coordinate results and public autocomplete hooks; corrected the GPS-label option and coordinate setter, and removed the artificial inheritance workaround. `geom/DFCI` projection and level arguments are optional in the implementation. DFCI modules need separately installed `proj4`; coordinate form behavior was not browser-tested in this round.
- `control/SearchNominatim` and `SearchPhoton` dispatch plain select event objects and expose reverse geocoding methods. Nominatim's selection includes coordinates; base Search events may omit them and adapter events may omit `reverse`. No runtime event constructors or enums are exported. Service requests have not been tested against live APIs.
- `overlay/Popup` and `FixedPopup`: added actual automatic positioning and content options, popup redisplay, map-coordinate and hook methods, and optional positioning and update arguments. FixedPopup's rendering-position methods are private; pixel and map coordinates may be absent before positioning.
- `overlay/PopupFeature`: corrected template arrays and callbacks, feature-only show calls, inherited popup options, and select/attribute event payloads. HTML rendering and selection synchronization were not browser-tested in this round.
- `overlay/Tooltip`, `Placemark`, and `Fixed`: corrected inheritance, options, null map handling, tooltip return values, and feature-event inputs. Placemark's implementation reads `size`, despite its upstream constructor comment naming `radius`.
- `control/Storymap` and `Swipe`: added the actual scroll/image and moving event payloads, corrected Storymap's required options and element target, and allowed Swipe's optional side and null map detachment. Storymap assumes chapter markup and a map when dispatching its scroll event.
- `control/Timeline`: corrected required constructor options, interval and date options, button callback name, optional arguments, and select/scroll/collapse event payloads. Date rendering and scrolling were not runtime-tested in this round.
- `interaction/DropFile`: the drop zone is an event target, formats are constructors, and load/add-feature events are dispatched as plain objects with different payloads. Corrected event names and fields using the implementation; file-drop behavior was not browser-tested.
- `util/input/Slider` and `Range`: corrected slider constructor options, string-valued input reads, Range's optional second input, and numeric change-event payloads. The input widgets were type-checked but not browser-tested in this round.
- `util/input/List`, `Size`, and `Width`: List requires an options array and returns string input values; Size and Width generate their own options and return numbers. Their change events use those respective value types and are plain dispatched objects.
- `util/input/Checkbox`, `Switch`, and `Radio`: the check event contains a boolean `checked` and string `value`; Switch and Radio inherit this behavior. Corrected the Switch class-name option spelling.
- `util/input/PopupBase` and `Color`: corrected popup positioning and accessibility options, visibility events, color event payloads, optional color setters, and string color IDs. These widgets were not browser-tested in this round.
- `util/input/Collection`: corrected its BaseObject inheritance, OpenLayers collection argument, selection nullability, generic item types, and item-event payloads. Reordering was not browser-tested.
- `geom/Dijkstra`: corrected absent-node and path result types, finish/pause event payloads, and the legacy named constructor export. The route example handles the possibly absent distance. Actual route calculation was not browser-tested in this round.
- `geom/Simplificator`: `setFeatures` returns edge features and `getFeatures` returns reconstruction records that contain the original feature, contour edges, and rebuilt geometry; the earlier declaration incorrectly returned void and plain features, respectively. A direct Node runtime check was blocked because the upstream `visvalingam` module uses an extensionless `GeomUtils` import; the shapes were verified from source and type-checked.
- `legend/Legend`, `Item`, and `Image`: corrected mixed item collections, constructor items, optional item titles and image URLs, layer clearing, and select/refresh/items event payloads. Removed an invented single-argument `set(size)` overload; the inherited key/value setter is used by the implementation.
- `featureanimation/FeatureAnimation`, `Bounce`, `Path`, `Slide`, and `Zoom`: corrected the base module's default class export, required path, optional easing, frame and lifecycle payloads, and Zoom's named exports. There is no separate `ZoomOut.js` in the release. Importing the animation module installs `animateFeature` on the map and layer prototypes; an `AnimatedMap` intersection type is provided because OpenLayers' default-exported Map cannot be augmented directly without creating a conflicting type. Its map implementation accepts one animation, whereas the layer implementation also accepts arrays. Node verified the exports, and the ported example rendered in Chrome after selecting Zoom out and Bounce; the remaining animation implementations have not been fully audited.
- `featureanimation/Blink`, `Drop`, `Fade`, `None`, `Null`, `Shake`, `Show`, `Teleport`, and `Throw`: checked constructors, animation overrides, and exports. Blink requires its options object; Fade accepts its speed option and Throw accepts speed. Null has a no-argument constructor. Animation rendering was not repeated for these individual classes.
- `interaction/Transform`: corrected start, active, end, and selection event payloads, which differ by phase and are dispatched as objects rather than exported event classes. Added array selection, nullable detachment, single-layer selection, and select/buffer options. Private pointer handlers remain implementation details.
- `interaction/UndoRedo`: corrected the optional custom action name, stack entries, and `undo`, `redo`, `stack:add`, `stack:remove`, and `stack:clear` event payloads. Upstream exports no event constructor or event enum; grouped undo/redo behavior has not been browser-tested in this round.
- `interaction/DrawRegular`: corrected its `drawcancel` event, per-phase payloads, and nullable map detachment. Internal sketch and event-handler signatures now reflect their returns. `DrawHole` inherits OpenLayers Draw events and no longer uses DrawRegular's unrelated event type. Drawing interactions were not browser-tested in this round.
- `interaction/DrawHole`: its draw-end handler replaces the event feature with the selected polygon feature and exposes the drawn hole separately; modification events carry arrays of features. Corrected optional options, event shapes, polygon availability, and map detachment. The drawing lifecycle has not been browser-tested in this round.
- `interaction/Hover` and `LongTouch`: corrected optional filters, map detachment, feature-versus-leave event payloads, and the plain long-touch callback event. Neither module exports an event constructor. Pointer and timer behavior has not been browser-tested in this round.
- `interaction/Clip`, `Flashlight`, and `Ripple`: corrected initial clip pixel nullability, flashlight color and map options, Ripple's required layer and inherited map setter, and optional rain interval. Their render callbacks are internal. A Node check verified constructor and setter behavior. Ripple's constructor documents `interval` but does not read the option in this release. Rendering has not been browser-tested in this round.
- `interaction/Delete`, `DragOverlay`, and `FillAttribute`: corrected constructor options and event payloads, including feature collections on delete start and arrays on delete end. Events are plain objects and there are no runtime event constructors or enums. A Node check verified delete and attribute event payloads. The upstream Delete implementation throws for an empty feature array because it calls `getLength()` on that array; pointer and form behavior was not browser-tested in this round.
- `interaction/Blob`, `Offset`, and `Splitter`: corrected default exports, offset event phases and segments, and splitter constructor and event types. Splitter's feature handlers and split operation are marked private upstream; its before-split payload spells the field `feaure`. The release ignores the documented splitter `triggerSource` and filter options and does not handle a source array; Blob's extra constructor options are not copied into observable properties. Pointer and rendering behavior was not browser-tested in this round.
- `interaction/SelectCluster`, `SnapGuides`, and `SnapLayerPixel`: corrected option names, optional map detachment, guide-layer constructor and guide return types, and pixel snap's default export and required layer. Cluster animation is an internal handler. A Node check exercised their constructors; pointer behavior was not browser-tested in this round.
- `interaction/TouchCursor` and its Draw, Modify, and Select subclasses: corrected default export and inheritance, button descriptors, nullable positioning, map detachment, and cursor, drawing, and selection event payloads. Drag events can originate from either the overlay or the cursor. A Node check verified module exports and inheritance. Several drawing constructor options documented upstream are not forwarded to the sketch in this release; touch interaction behavior was not browser-tested in this round.
- `interaction/CenterTouch`, `TouchCompass`, and `DrawTouch`: corrected optional event handling, map detachment, compass options and canvas type, supported drawing geometry types, return values, and drawing events. DrawTouch has no `startDrawing` method. A Node check exercised the underlying sketch geometry and drawing event; touch behavior was not browser-tested in this round.
- `interaction/ModifyTouch`: corrected inherited Modify options, required source or feature collection, popup request and event phases, map detachment, and its `removePoint` override, which discards OpenLayers' boolean return. Its public `showDeleteBt` mutates the supplied event type and dispatches the resulting object. A Node check verified the return and event; popup behavior was not browser-tested in this round.
- `interaction/ClipMap`, `FocusMap`, `Synchronize`, and `TinkerBell`: removed invented ClipMap layer methods, corrected null map detachment, FocusMap's plain event, synchronization options and prototype extension types, and TinkerBell's color and handler. Synchronize's underscored pointer handlers are internal. TinkerBell imports `getMapcanvas.js` with different capitalization from the actual `getMapCanvas.js`, so its module import fails on case-sensitive filesystems; its detach implementation also dereferences the new map before checking for null. Map behavior was not browser-tested in this round.
- `interaction/GeolocationDraw`: corrected lifecycle, tracking and follow events, simulation stopping, destination collection, nullable map detachment and optional pause. The drawing helper is private; geolocation and browser behavior were not exercised in this round.
- `source/FeatureBin` and `InseeBin`: corrected their inherited source options, coordinate callbacks, feature arrays, nullability and optional extent projection. FeatureBin requires an attributes object when a collector is found; the base declaration requires it for safe polymorphic calls. `BinBase` only exports a default class. A Node check exercised FeatureBin's collection, attributes, and missing-bin behavior; InseeBin's import requires the separately installed `proj4` package, which is not present in this project. `source/Vector3D` uses a single style and an easing function, and requires a vector source for rendering; its animation options are optional. Rendering has not been browser-tested in this round.
- `source/GeoImage` and `OilPainting`: corrected mask coordinates, crop values before image loading, projection and attribution options, required constructor inputs, and the raster source's general property setter. A Node check exercised GeoImage's crop and mask handling with an image stub. Rendering has not been browser-tested in this round.
- `source/TileWFS` and `Overpass`: corrected required URL and filter inputs, WFS request limits, vector-source options, and tile progress/error/overload payloads. TileWFS dispatches plain objects and exports no event constructors or enum. A mocked Node request verified its URL and progress/overload events; live network services have not been tested.
- `source/DBPedia`, `WikiCommons`, and `Mapillary`: corrected service options and feature-decoding inputs; DBPedia's query methods return strings and its style helpers are named exports. A Node check exercised DBPedia and WikiCommons feature decoding. Mapillary is an unfinished upstream test implementation whose loader does not add features. Live services have not been tested.
- `source/Geoportail` and `GeoRSS`: corrected Geoportail's constructor overloads, static methods, feature-info arguments and options, and GeoRSS's required feed URL. A Node check verified both constructors and feature-info URL generation, but after `setGPPKey` the upstream implementation returned undefined for the same feature-info URL. `source/DFCI` uses internal grid helpers and requires the separately installed `proj4` package. Live service requests have not been tested.
- `interaction/CurrentMap`, `CopyPaste`, `ModifyFeature`, and `Split`: event payloads are plain dispatched objects, not exported runtime event classes or enums. Declarations expose event interfaces and string types; ModifyFeature events contain coordinates, original DOM events, and feature arrays, while CopyPaste supplies features on paste events.
- `interaction/ModifyFeature`: selection is a public event with selected and potentially null previous features. Programmatic `removePoint()` can dispatch modification events without a coordinate or original DOM event; pointer-driven `modifying` events include both. Closest-feature and pointer handlers are internal.

- `control/Bar`: corrected the ID option, nullable map, position strings, optional deactivation exception, array-valued name lookup, and control event payloads. EditBar and GeolocationBar inherit the array lookup; the activation handler is private. The declaration tests cover these signatures, including inherited use. Browser interaction was not exercised in this round.

- `control/Button` and `Toggle`: checked constructor forwarding, optional subbar and interaction, nullable map detachment, and active/disable events. Button supports element content and may return null for disabled state when configured as a text button. Toggle reads `autoActivate`; the documented `autoActive` is ignored. Type tests cover the corrected declarations; button interaction was not browser-tested.

- `control/GeolocationBar` and `GeolocationButton`: declared the bar options forwarded to GeolocationDraw, nullable map detachment, and the button’s position event (which can omit its coordinate). Removed redundant inherited bar declarations that narrowed base signatures. Type tests cover these changes; geolocation and browser behavior were not exercised.

- `control/TextButton`: inherits Button behavior and accepts element content; removed narrower inherited setter declarations. Its text button is a div, so the inherited `getDisable` returns null and `setDisable` dereferences a missing button in this release. Type checks cover inherited behavior.
- `control/CanvasBase`, `CanvasTitle`, `CanvasAttribution`, and `CanvasScaleLine`: corrected title getter, title options, canvas nullability, optional base style and map detachment. Repeated inherited canvas signatures on related subclasses were aligned. Target wraps a missing style in an array, which cannot be rendered as a style. Canvas rendering was not browser-tested.

- `control/Target`, `Compass`, and `CenterPosition`: checked public methods and constructor handling. Target stores an array even when given one style; its inherited style component helpers expect a single Style and are incompatible with that array. Compass reads `rotateWithView`, accepts an omitted image, and inherits the base style setter; CenterPosition also accepts a default style. Type checks cover the corrected API; canvas rendering was not browser-tested.

- `control/Graticule` and `GridReference`: corrected precision and stroke options, scalar formatter input, grid reference nullability, numeric vertical index and plain selection event. GridReference dereferences its source in `setMap` even when none was provided; attaching without a source throws upstream. Type tests exercise corrected signatures; rendering was not browser-tested.

- `control/Gauge` and `ProgressBar`: Gauge has no initial value unless one is provided, and its setter returns the supplied value; ProgressBar can clear its layer listeners without an argument. Type tests cover both. Upstream ProgressBar assumes each supplied layer has a source; tile loading was not browser-tested.

- `control/Status` and `Notification`: corrected Status options, supported object content, center position, optional show/content arguments, and Notification’s null content. Status `isShown()` returns true when its inline display is none in this release; Notification does not dispatch the documented visibility event. Type tests cover signatures; timed visibility and DOM behavior were not browser-tested.

- `control/Scale`: corrected nullable map detachment, absent scale without a map, and string or input-event scale setting. `typing` is read but has no effect, and the documented select and change:input events are not dispatched. Type tests cover the signatures; interactive scale changes were not browser-tested.

- `control/Disable` and `Cloud`: declared the actual class name, wind and image options, wind state, map detachment, and wind setter. Disable checks `ol-disable` in `isOn` but toggles `ol-enable` in `disableMap`; custom class names also suppress the default classes because of upstream operator precedence. Cloud ignores its documented hue and saturation options. Type tests cover the declarations; rendering and pointer blocking were not browser-tested.

- `control/Globe`: corrected optional alignment and show argument, string positions, and map detachment. When a target is supplied upstream does not create the pointer, but `setCenter` dereferences it; globe interaction was not browser-tested. Type checks cover corrected signatures.

- `control/Overview`: corrected optional projection, layers and alignment, supported layer collections and groups, elastic pan option, string positions, and nullable map detachment. The elastic easing helper is local and `setView` is private. Type tests cover the corrected API; overview interaction was not browser-tested.

- `control/SwipeMap`: corrected scalar position, typed constructor, nullable map detachment, missing rectangle on unsized maps, and moving event payload. The upstream rectangle getter dereferences the map and therefore throws when unattached. Type tests and example compilation cover the declarations; pointer interactions were not browser-tested.

- `control/GeoBookmark`: corrected selection versus add/remove event payloads, optional stored zoom, constructor title, optional bookmark reset, and the object-form add method. Events are plain dispatched objects and occur on UI actions; programmatic add/remove does not dispatch them. Type tests cover corrected signatures; storage and UI interaction were not browser-tested.

- `control/FeatureList`: corrected selection and scrolling return values, optional feature reset, sort state and columns, button callback, and row/collapse/resize/sort event payloads. Its `setMap` dereferences the supplied map and accumulates size listeners, so detaching is broken upstream. Type tests cover corrected APIs; table and pointer behavior were not browser-tested.

- `control/LayerSwitcher`, `LayerPopup`, and `LayerSwitcherImage`: corrected options, base-layer and group inputs, nullable selection and detachment, opacity setter, and plain event payloads including keyboard and reorder events. Variant list rendering overrides were checked. Type tests cover signatures; layer interactions were not browser-tested.

- `control/LayerShop`: checked the inherited switcher API, control bars and map lifecycle. Replaced the untyped map argument with map or null; type tests cover detachment and bar methods. UI behavior was not browser-tested.

- `control/RoutingZDSR`: no corresponding module exists in the release. The similarly named DSR implementation is a standalone global example script; removed the declaration that implied an importable module. A negative type check verifies the module is absent.

- `control/Overlay`: corrected optional content and show arguments, image display options, and visibility event payload. A coordinate passed to `show` requires an attached map. Type tests cover the corrected API; animation and visibility timing were not browser-tested.

- `control/IsochroneGeoportail`: corrected optional iteration, map detachment, required mode and direction, constructor auth/method options, and the plain isochrone event payload. Type tests cover the signatures; live service requests were not made.

- `control/RoutingGeoportail`: corrected map detachment, documented constructor options, boolean constraints, XHR callbacks, and routing, step, error and lifecycle event signatures. Type tests cover these declarations; live routing and UI were not tested.

- `control/Print`: corrected partial print options, arbitrary metadata, optional fast-print options, and plain print/printing/error event payloads. Type tests cover the signatures; rendering and clipboard behavior were not browser-tested.

- `control/PrintDialog` and `PrintDialog2x`: corrected options including the jsPDF constructor, named or custom sizes, scale option, event types, optional map detachment and second map. Type tests cover these signatures; printing and the dialog UI were not browser-tested.

- `control/Profile`: corrected optional unit system, geometry unit strings, nullable display lookup, the inconsistent time lookup result, canvas image overload and plain pointer/show/zoom/geometry events. Type tests cover signatures; graph behavior was not browser-tested.

- `control/SelectBase`: corrected nullable/undefined feature collection, optional clearing, condition value types, operations map and plain selection event. Type checks cover these APIs; subclasses remain to be audited.

- `control/SelectCheck`, `SelectCondition`, `SelectFulltext`, `SelectPopup`, and `SelectMulti`: corrected optional callbacks, boolean selection defaults, value-list options, labels, condition clearing, map detachment and the required multi-control list. Type tests cover signatures; selection UI was not browser-tested.

- `control/Select`: reviewed constructor and public condition methods against the implementation. Existing type tests cover condition creation, retrieval, formatting and invalid operators; its inherited event and selection types were corrected in the SelectBase round. UI behavior was not browser-tested.

- `control/Legend`: corrected the required legend, collapse return and forwarded selection/items plus collapse events. Type tests cover the signatures; canvas and UI behavior were not browser-tested.

- `control/EditBar`: corrected map detachment, optional interaction lookup, draw options, interaction labels and DrawHole option, and the plain info event. Removed repeated inherited declarations that narrowed Bar signatures. Type tests and the example check cover the changes; editing interaction was not browser-tested.

- `control/Permalink`: checked public URL, layer and map methods; added class name and refresh delay options, base-layer lookup and nullable detachment. Type tests cover the corrected signatures; browser URL behavior was not exercised in this round.

- `control/Storymap`: reviewed chapter, content and scroll/image event APIs; declared its public content element and added type checks. Story interaction was not browser-tested.

- `control/Swipe`: checked public layer, map and moving-event APIs and declared the public layer entries. Type checks cover these signatures; swipe rendering was not browser-tested.

- `control/Timeline`: completed a further public-method comparison and allowed feature clearing without an argument. Existing type tests cover events, dates and controls, with a check added for clearing; date rendering was not browser-tested.

- `control/VideoRecorder`: reviewed recording controls and corrected map detachment, button tips and start/stop/error event payloads. Type tests cover signatures; actual media recording was not browser-tested.

- `control/MapZone`: corrected the `zones` option, optional control options and select/collapse event payloads. Type tests cover the signatures; map interaction was not browser-tested.

- `control/Imageline`: corrected required options, map detachment, grouped feature return and plain select/collapse events. Type tests cover these signatures; image scrolling and rendering were not browser-tested.

- `control/Dialog`: corrected show/content options, progress arguments, title and close signatures, and plain button and lifecycle events. Type tests cover these APIs; dialog UI was not browser-tested.

- `control/WMSCapabilities`: corrected WMS result field names and legend/extent shapes, constructor labels and plain capabilities/load events, including failure payloads. WMTS uses its own result type as recorded below. Type tests cover WMS signatures; live requests were not made.

- `control/WMTSCapabilities`: declared its distinct result and unsupported-matrix undefined result, layer factory nullability, inherited typed load events and supported-set list. Type tests cover these signatures; live capabilities requests were not made.

- `source/Delaunay`: corrected the Voronoi result to polygon features and the optional border argument; `_addTriangle` returns a polygon feature and mutates its coordinate array. Type checks cover these signatures; separate Node checks exposed edge cases documented above.

- `source/DayNight`: reviewed constructor, public solar and coordinate methods against source. Existing type checks cover line and day/night results; a Node check exposed the day polygon issue recorded above.

- `source/IDW`: reviewed public source, color and value methods and added worker helper and draw-event types. Type checks cover the signatures; canvas and worker rendering were not exercised.

- `source/GridBin` and `HexBin`: reviewed geometry and grid configuration methods against the release. Expanded HexBin type checks; a Node check verified GridBin defaults. Bin rendering was not browser-tested.

- `source/GeoRSS`: checked its constructor and inherited vector-source API. Existing type checks cover its required feed URL; a Node check verified construction and loader mutation. No live feed request was made.

- `source/Vector3D`: reviewed constructor and public height, style and animation APIs against the release. Existing type tests cover these signatures; a Node construction check identified the default-style issue above.

- `format/GeoJSONX` and `GeoJSONP`: reviewed encoding methods and added GeoJSONP type checks. Point feature round trips passed in Node; line encoding exposed the issue above. Other geometry shapes and extended properties still need runtime checks.

- `format/GeoRSS`: corrected the projection option spelling and element input to `readFeature`. Type checks cover both methods; a Node check verified point decoding and exposed the single-node collection issue above.

- `geom/sphere`: exported the missing `setMapScale` declaration and corrected its absent-result case. Type tests cover exports; Node checks reproduced antimeridian normalization and input mutation issues above.

- `geom/GeomUtils`: compared exported coordinate and geometry helpers and prototype extensions with the release. Existing type checks cover representative helpers and sampling; Node checks exposed the segment-finding issues above.

- `geom/visvalingam`: corrected its default LineString export, prototype augmentation, required options and boolean `keepEnds`. Type tests cover the declared module shape; direct Node execution remains blocked by the extensionless upstream import.

- `geom/ConvexHull`: checked the default export and geometry augmentation; existing type checks cover both. Node checks confirmed the singleton and multi-geometry issues listed above.

- `geom/geohash`: reviewed encode, decode, extent and neighbour exports. Expanded type checks and ran Node checks for input edge cases documented above.

- `geom/LineStringSplitAt`: reviewed the side-effect-only module and LineString augmentation. Existing type checks cover single and omitted points; Node checks covered vertex splitting and the tolerance issue above.

- `geom/GPAltiCode`: reviewed point and line overloads and excluded distance sampling from the point overload. Type tests cover callbacks and invalid point sampling; a mocked Node request checked point results. Live service requests were not made.

- `geom/DFCI`: reviewed exported conversion and validation signatures; existing type checks cover them. Direct runtime import remains blocked by missing `proj4`; standalone regex checks revealed the validation issue above.

- `geom/Scribble`: reviewed the default function and polygon prototype extensions. Existing type checks cover the APIs; a Node comparison reproduced duplicate MultiPolygon output.

- `geom/Dijkstra`: reviewed public path, node and event APIs and corrected the base event type. Existing type tests cover path and finish events; an empty-source Node check reproduced the failure above.

- `geom/Simplificator`: reviewed public edge, reconstruction and simplification methods. Existing type checks cover the returned records and simplification options; direct runtime execution remains blocked by the release import issue noted above.

- `style/FillPattern` and `StrokePattern`: corrected clone returns, pattern repetition options, optional pattern definitions, opacity spelling and inherited stroke options. Type tests and a stub-canvas Node check cover these behaviors; browser rendering was not tested.

- `style/Photo`: corrected fill, opacity, rotation and declutter options and the optional pixel-ratio image signature. OpenLayers 10.11 may return a cached ImageBitmap at runtime even though its RegularShape declaration only permits canvas types; the Photo declaration follows the base type for override compatibility. Type checks cover the options; browser rendering was not repeated.

- `style/SetTextPath`: replaced an invented default class declaration with its actual side-effect vector-layer and canvas context augmentations. Type checks cover these signatures; the vector augmentation follows the named `ol/layer` import form used by this project. Browser drawing was not repeated.

- `style/Profile`: corrected geometry, z-index and vertex options and default-reset setter arguments. Type tests cover the signatures; a Node check verified the defaults and issues above.

- `style/FlowLine`: corrected arrow-color spelling, optional line cap, inherited style options, reset setters and arbitrary offset lookup. Type tests cover the signatures; Node checked default values, while rendering was not tested.

- `style/Shadow`: corrected declutter and image signatures and removed an obsolete checksum method from Shadow and Photo. Type tests cover these signatures; Node reproduced clone displacement loss. Browser rendering was not repeated.

- `style/FontSymbol`: corrected glyph character and font lookup signatures and declutter options. Its `getFill` and `getStroke` declarations still need a compatible representation for omitted values without conflicting with OpenLayers base signatures. Type checks cover the corrected signatures; rendering was not repeated.

- `style/Chart`: corrected required options, displacement and image signatures, scale/donut options, declutter mode and its default-only export; removed an obsolete checksum declaration. Type tests and Node checks cover the API and issues above; browser rendering was not tested.

- `render/Ordering`: corrected optional z-index comparator options and the comparator return type. Type checks cover both ordering factories; a Node check verified descending order and equal values.

- `render/AnimExtent` and `Markup`: corrected the side-effect map prototype augmentations, extent/coordinate arguments, optional options and the markup listener's `stop` method. Type checks cover map calls and listener cleanup; runtime limitations are recorded above.

- `render/Pulse` and `Cspline`: added the direct map prototype augmentation for Pulse and checked spline behavior against the release. Type tests cover Pulse through a normal Map; a Node check exposed the spline issue above.

- `style/defaultStyle` and `geoportailStyle`: reviewed both factory exports, options and land-cover color definitions. Expanded type checks for returned styles and the color table; Node checks exposed Geoportail styling issues above.

- `source/OilPainting`: checked raster constructor and property behavior against the implementation. Existing type checks cover construction and setting properties; a Node check exposed operation and notification issues above.

- `overlay/AnimatedCanvas` and `particule/Base`: corrected the particle factory, coordinate and return types, map detachment, optional draw time and public wrap helper. Ordinary overlay options are not forwarded by the constructor. Type checks cover these APIs; browser animation was not tested.

- `particule/Bird`, `Cloud`, `Rain`, `RainDrop` and `Snow`: reviewed constructor and drawing/update APIs, and added Bird's image source option. Type checks cover construction; canvas behavior was not browser-tested.

The broad comparison of existing declarations across controls, interactions, sources, geometry, rendering, formats, overlays, legends, and input controls is incomplete. Inherited and private member decisions still need module-by-module recording.
