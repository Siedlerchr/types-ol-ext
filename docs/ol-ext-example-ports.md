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
