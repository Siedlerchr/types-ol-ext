# ol-ext example migration

## Release 4.0.39, round of 35 ports

The ports exercise animation, graticules, feature lists, swipe, clipping,
editing, vector sources, legends, 3D rendering, perspective, recording,
dialogs, story maps and styles with OpenLayers 10.11.0. The example inventory
in `audit-status.mk` has 110 unmatched HTML files after this round.
`examples/hackmacarte.html` is a bookmarklet and remains in the raw inventory.

The example server built and served all 35 new bundles. Chrome loaded all of
their pages. The Overpass page logged failed data requests and the other
pages passed the startup console check. The check covers navigation and
startup errors. It leaves interactions and the availability of every remote
tile, image and data source unverified.

The declaration changes cover PerspectiveMap's change event, hidden style
arrays for feature animations, GeoJSONX compatibility with VectorSource,
ModifyTouch compatibility with Map, and SnapGuides' ModifyFeature argument.

## Upstream findings

- `examples/style/map.style.chart+text.html` builds a cache key from the
  `#graph` and `#color` controls, which are absent from that page. Chrome
  raised a null dereference during rendering. The port keys the style by
  data and selection state, the two values its fixed pie style uses.
- `src/interaction/SnapGuides.js` documents an OpenLayers Modify parameter,
  while the implementation calls `getModifiedFeatures()` on the interaction.
  That method belongs to ol-ext's ModifyFeature, which the upstream example
  already uses. The declaration now reflects this requirement. The example's
  initial-guide toggle uses the release's internal `enableInitialGuides_`
  property because the release has no public setter.
- `examples/map.pirate-old.html` refers to `../control/piratecontrol.js` and
  `../control/piratecontrol.css`, which are missing from the release tag.
  The modern `map/map.pirate.html` demonstrates the effect with the current
  filters and controls and was ported in this round.
- The Overpass endpoint used by `source/Overpass` returned HTTP 502 and 429
  during the two browser sweeps. The example bundle was served successfully.
  Live feature loading remains unverified.
- The example build still reports the three previously identified StrokeImage
  imports of OpenLayers types as runtime values. See the
  [declaration audit](ol-ext-4.0.39-audit.md) for the release findings and
  upstream fix validation.

## Release 4.0.39, round of 24 ports

Chrome loaded the new canvas and print, overview, split and modify, layer,
3D rendering, conversion, interaction, and flow-line pages. The inventory
has 86 unmatched HTML files. The browser check covered startup and bundle
loading. Export downloads, editing gestures, and other interactions still
need exercise. Type checks and lint passed.

- Both print-dialog legend examples request Wikimedia's 30px thumbnail URLs
  for the church and camera symbols. Both requests returned HTTP 400. The
  ports use the original SVGs with a 30px display width, and both pages
  passed the follow-up console check.
- The two-map print example requests geographical-name tiles outside the
  data coverage at matrix 6, row 15. Those requests returned HTTP 404.
  The page and its bundle loaded, and in-coverage tiles returned HTTP 200.
- The npm implementation of TinkerBell imports `getMapcanvas.js`, while
  the package ships `getMapCanvas.js`. The examples' webpack configuration
  resolves the published filename on case-sensitive filesystems.
- The overview demo calls the implementation's private `setView` method
  after changing the instance's zoom bounds and rotation. The declarations
  describe those members for the release. Print declarations cover
  the PDF flag carried by the print event and the legend flag on dialog
  output.

## Release 4.0.39, round of 15 ports

Chrome loaded the new LayerShop, editing, conversion, styling, and data-source
pages. All 15 bundles loaded. The DBPedia and Wikimedia Commons font-loader
correction passed a focused recheck, with the first navigation reporting
only a missing local favicon. The inventory has 71 unmatched HTML files.
The check covered startup. Drag-and-drop input, export output, and editing
gestures remain outside this check. The server was stopped after the recheck.

- The DBPedia and Commons pages load WebFont after the map script. Moving all
  the page logic into a bundle exposed the ordering dependency. The ports
  load the stylesheet and wait for the font before redrawing, with the old
  inline callbacks removed when serving the ports.
- The GeoJSONL example uses `ol.source.Stamen`, which is absent from
  OpenLayers 10. The port uses OSM for the basemap and ol-ext's
  `TextStreamReader` for the dropped GeoJSONL file.
- The drag-and-drop example passed a checkbox's value to its style toggle.
  The port reads its checked state and uses the current OpenLayers
  `View.fit` options.

## Release 4.0.39, round of 11 ports

The profile, georeferenced image, elevation and shaded relief, spatial
binning, Delaunay, and WMS/WMTS capabilities pages all passed the Chrome
startup check. The inventory has 60 unmatched HTML files. The server was
stopped after the check. Local file imports, data downloads, and interactive
map operations still need separate exercise.

- The shaded-relief example uses `shade` for both its raster operation and
  layer. Its operation now returns the `ImageData` required by OpenLayers
  Raster in image mode.
- The GridBin projection change previously used the projection code's
  characters to form a coordinate. The port uses adjacent coordinates at
  the view center to compare scale across projections.
- The WMTS capabilities page contains a hidden export button that attempts
  to serialize WMS parameters. The port shares the WMS-only export code.
  WMTS serialization remains unsupported.

## Release 4.0.39, round of 7 ports

Both painting pages, the clustering and DBPedia photo examples, the timeline
and historical imagery demos, and text along paths passed the Chrome startup
check. The server was stopped afterward. The inventory has 53 unmatched HTML
files. The test checked startup and left interaction and export behavior
unverified.

- Oil painting and pointillism relied on the classic `paint.js` script
  for an OpenLayers global and page state. They now share a TypeScript
  bootstrap and preserve their individual controls, permalink settings,
  and downloads.
- The release's `SetTextPath` module does not export the constructor
  used by the original text-path example. The port uses OpenLayers line
  text placement and implements the demo's clipping and width settings.
  Label placement can differ from the old canvas implementation.

## Release 4.0.39, round of 9 ports

The four routing and shortest-path pages, Wikipedia search, geometry
simplification, OpenAgenda, window synchronization, and the ISS tracker
passed the Chrome startup checks. The server was stopped after the check.
The inventory has 44 unmatched HTML files. Live route calculation,
authenticated DSR responses, file drops, EXIF reads, and window-to-window
synchronization remain unverified.

- The standalone DSR routing script calls the base class as a function and
  dispatches a misspelled `errror` event. The port uses a subclass and the
  `error` event. Its remote endpoint and credentials were outside the
  startup test.
- The geometry simplification example reused the base layer variable for the
  edge layer and passed a stroke option named `with`. The port gives the
  two layers distinct variables and uses `width`.
- The window synchronization example uses the release's global WSynchro
  script. The port types the global at the example boundary and exposes its
  map for the child window to read.
