# Update this checkpoint after each completed and verified audit round.
# The detailed module decisions and remaining work live in the linked records.
AUDIT_UPSTREAM := ol-ext 4.0.39
AUDIT_OPENLAYERS := 10.11.0
AUDIT_LAST_ROUND := final integrated audit
# This file is updated and committed with each completed round.
AUDIT_LAST_COMMIT := $(shell git log -1 --format=%h -- docs/audit-status.mk)
AUDIT_STATE := complete

# Porting the remaining upstream examples is a separate follow-up to the audit.
EXAMPLE_PORTS_STATE := in progress
EXAMPLE_PORTS_LAST_ROUND := drag overlay interaction and overlay menu examples
EXAMPLE_LOAD_CHECK := both pages load; dragging, menu, and feature selection interactions untested

# Refresh the complete unmatched-page snapshot with:
# python3 scripts/example-inventory.py --update-status
# Some entries may be support or standalone pages rather than map examples.

# BEGIN GENERATED MISSING EXAMPLES
# 146 upstream HTML files without a matching TypeScript port.
#   animation/map.animatedcluster.html (inline scripts: 1)
#   animation/map.featureanimation.path.html (inline scripts: 1)
#   animation/map.featureanimation.select.html (inline scripts: 1)
#   canvas/map.canvas.control.html (inline scripts: 1)
#   canvas/map.control.graticule.html (inline scripts: 1)
#   canvas/map.control.graticule2.html (inline scripts: 1)
#   canvas/map.control.print.html (inline scripts: 1)
#   canvas/map.control.printdialog.fr.html (inline scripts: 1)
#   canvas/map.control.printdialog.html (inline scripts: 1)
#   canvas/map.control.printdialog2x.html (inline scripts: 1)
#   canvas/map.target.control.html (inline scripts: 1)
#   control/map.control.featurelist.html (inline scripts: 1)
#   control/map.control.profile.html (inline scripts: 1)
#   control/map.control.swipe-cog.html (inline scripts: 1)
#   control/map.overview.html (inline scripts: 1)
#   control/map.switcher.shop.html (inline scripts: 1)
#   filter/map.filter.clip.html (inline scripts: 1)
#   filter/map.filter.composite.html (inline scripts: 1)
#   filter/map.filter.oilpaint.html (inline scripts: 0)
#   filter/map.filter.pointillism.html (inline scripts: 0)
#   geom/map.simplify.html (inline scripts: 1)
#   hackmacarte.html (inline scripts: 0)
#   interaction/map.ddrop.html (inline scripts: 1)
#   interaction/map.interaction.copypaste.2.html (inline scripts: 1)
#   interaction/map.interaction.copypaste.html (inline scripts: 1)
#   interaction/map.interaction.drawhole.html (inline scripts: 1)
#   interaction/map.interaction.modifyfeature.html (inline scripts: 1)
#   interaction/map.interaction.modifytouch.html (inline scripts: 1)
#   interaction/map.interaction.snapguides.html (inline scripts: 1)
#   interaction/map.interaction.split.html (inline scripts: 1)
#   interaction/map.interaction.splitter.html (inline scripts: 1)
#   interaction/map.interaction.transformrectangle.html (inline scripts: 1)
#   interaction/map.interaction.undocustom.html (inline scripts: 1)
#   interaction/map.interaction.undoredo.html (inline scripts: 1)
#   interaction/map.interaction.undoredo2.html (inline scripts: 1)
#   layer/map.carhab.html (inline scripts: 1)
#   layer/map.carhab.wfs.html (inline scripts: 1)
#   layer/map.circle.intersection.html (inline scripts: 1)
#   layer/map.daynight-2.html (inline scripts: 1)
#   layer/map.dbpedia.html (inline scripts: 1)
#   layer/map.dfci.html (inline scripts: 1)
#   layer/map.flickrfeed.html (inline scripts: 1)
#   layer/map.geoimage.html (inline scripts: 1)
#   layer/map.geoportail.wmts.html (inline scripts: 0)
#   layer/map.intersection.html (inline scripts: 1)
#   layer/map.layer.altitude-2.html (inline scripts: 1)
#   layer/map.layer.altitude.html (inline scripts: 1)
#   layer/map.layer.bdtopo.vtile.html (inline scripts: 1)
#   layer/map.layer.bw.html (inline scripts: 1)
#   layer/map.layer.clc.wfs.html (inline scripts: 1)
#   layer/map.layer.elev.html (inline scripts: 1)
#   layer/map.layer.featurebin.html (inline scripts: 1)
#   layer/map.layer.geoportail.AOC.html (inline scripts: 1)
#   layer/map.layer.geoportail.html (inline scripts: 1)
#   layer/map.layer.geoportail.wfs.html (inline scripts: 0)
#   layer/map.layer.gppvtile.html (inline scripts: 0)
#   layer/map.layer.gridbin.html (inline scripts: 1)
#   layer/map.layer.hexbin.html (inline scripts: 1)
#   layer/map.layer.idw.html (inline scripts: 1)
#   layer/map.layer.insee.html (inline scripts: 1)
#   layer/map.layer.maplibre copy.html (inline scripts: 1)
#   layer/map.layer.maplibre.html (inline scripts: 1)
#   layer/map.layer.ocsge.html (inline scripts: 1)
#   layer/map.layer.sealevel.html (inline scripts: 1)
#   layer/map.maplibre.gl.html (inline scripts: 0)
#   layer/map.overpass.html (inline scripts: 1)
#   layer/map.preview.html (inline scripts: 1)
#   layer/map.source.delaunay.html (inline scripts: 1)
#   layer/map.source.georss.html (inline scripts: 1)
#   layer/map.stat.wfs.html (inline scripts: 1)
#   layer/map.wikicommons.html (inline scripts: 1)
#   layer/map.wmscapabilities.html (inline scripts: 1)
#   layer/map.wmtscapabilities.html (inline scripts: 1)
#   layer/test.html (inline scripts: 1)
#   legend/map.control.legend.html (inline scripts: 1)
#   legend/map.control.legend.image.html (inline scripts: 1)
#   legend/map.control.legend.layer.html (inline scripts: 1)
#   legend/map.control.legends.html (inline scripts: 1)
#   legend/map.control.legendstat.html (inline scripts: 1)
#   map/map.clustering.html (inline scripts: 1)
#   map/map.dbpedia.photo.html (inline scripts: 1)
#   map/map.layer.3D.0.html (inline scripts: 1)
#   map/map.layer.3D.1.html (inline scripts: 1)
#   map/map.layer.3D.html (inline scripts: 1)
#   map/map.perspective.html (inline scripts: 0)
#   map/map.pirate.html (inline scripts: 1)
#   map/map.watchdogs.html (inline scripts: 1)
#   map.pirate-old.html (inline scripts: 1)
#   misc/csv2geojson.html (inline scripts: 1)
#   misc/dsfr.html (inline scripts: 1)
#   misc/exif2geojson.html (inline scripts: 1)
#   misc/geocommune.html (inline scripts: 0)
#   misc/geoimport.html (inline scripts: 1)
#   misc/geojson.check.html (inline scripts: 1)
#   misc/geojson2csv.html (inline scripts: 1)
#   misc/geojson2geojsonx.html (inline scripts: 1)
#   misc/geojson2topojson.html (inline scripts: 1)
#   misc/geojsontile.html (inline scripts: 1)
#   misc/geojsontile2.html (inline scripts: 1)
#   misc/geoportail.loader.html (inline scripts: 0)
#   misc/map.apigeo.html (inline scripts: 1)
#   misc/map.awesome.gpp.html (inline scripts: 1)
#   misc/map.control.videorecorder.html (inline scripts: 1)
#   misc/map.dialog.html (inline scripts: 1)
#   misc/map.format.geojsonl.html (inline scripts: 1)
#   misc/map.geoportail.migration.html (inline scripts: 1)
#   misc/map.georef2wmts.html (inline scripts: 1)
#   misc/map.iframe.api.html (inline scripts: 0)
#   misc/map.iframe.html (inline scripts: 1)
#   misc/map.interaction.tinkerbell.html (inline scripts: 1)
#   misc/map.lidar.txt.html (inline scripts: 1)
#   misc/map.openagenda.html (inline scripts: 1)
#   misc/map.overlay.magnify.html (inline scripts: 1)
#   misc/map.synchro.html (inline scripts: 1)
#   misc/map.wthit.html (inline scripts: 1)
#   misc/maplibre.gl.html (inline scripts: 0)
#   misc/poly2grid.html (inline scripts: 1)
#   misc/vendeglobe.html (inline scripts: 1)
#   routing/map.control.isochrone.html (inline scripts: 1)
#   routing/map.control.routing.dsr.html (inline scripts: 1)
#   routing/map.control.routing.html (inline scripts: 1)
#   routing/map.source.dijkstra2.html (inline scripts: 1)
#   search/map.control.searchpedia.html (inline scripts: 1)
#   storymap/geotiff.html (inline scripts: 1)
#   storymap/map.control.storymap.2.html (inline scripts: 1)
#   storymap/map.control.storymap.html (inline scripts: 1)
#   storymap/map.control.timeinterval.html (inline scripts: 1)
#   storymap/map.control.timeline.html (inline scripts: 1)
#   storymap/map.control.timemap.html (inline scripts: 1)
#   storymap/map.control.timequake.html (inline scripts: 1)
#   storymap/map.historical.html (inline scripts: 1)
#   storymap/map.rlt.html (inline scripts: 1)
#   storymap/map.rlt2.html (inline scripts: 0)
#   storymap/map.rlt3.html (inline scripts: 0)
#   style/map.style.chart+text.html (inline scripts: 1)
#   style/map.style.chart.html (inline scripts: 1)
#   style/map.style.flowarrow.html (inline scripts: 1)
#   style/map.style.flowline.html (inline scripts: 1)
#   style/map.style.flowline2.html (inline scripts: 1)
#   style/map.style.gpxline.html (inline scripts: 1)
#   style/map.style.hashlines.html (inline scripts: 1)
#   style/map.style.photo.html (inline scripts: 1)
#   style/map.style.profile.html (inline scripts: 1)
#   style/map.style.scribblefill.html (inline scripts: 1)
#   style/map.style.strokepattern.html (inline scripts: 1)
#   style/map.style.textpath.html (inline scripts: 1)
# END GENERATED MISSING EXAMPLES

# A completed step records the current evidence, not a release approval.
BASELINE_STATE := complete
MISSING_MODULES_STATE := classified
EXISTING_DECLARATIONS_STATE := complete with documented limits
RELEASE_APIS_STATE := verified with documented limits
EXAMPLES_AND_TESTS_STATE := complete with documented limits
PACKAGE_AND_CI_STATE := configured
FINAL_CHECK_STATE := complete

.PHONY: audit-status audit-plan audit-baseline audit-missing-modules \
	audit-existing-declarations audit-release-apis audit-examples \
	audit-package-ci audit-final-check audit-verify example-ports-status example-load-check

audit-status:
	@printf 'Upstream: %s\nOpenLayers: %s\nState: %s\nLast round: %s (%s)\n\n' '$(AUDIT_UPSTREAM)' '$(AUDIT_OPENLAYERS)' '$(AUDIT_STATE)' '$(AUDIT_LAST_ROUND)' '$(AUDIT_LAST_COMMIT)'
	@cat docs/ol-ext-audit-progress.md
	@printf '\nExample ports: %s (last round: %s)\n' '$(EXAMPLE_PORTS_STATE)' '$(EXAMPLE_PORTS_LAST_ROUND)'

# Each target describes a step in .scratch/to-plan/ol-ext-declaration-audit.md.
audit-plan: audit-baseline audit-missing-modules audit-existing-declarations \
	audit-release-apis audit-examples audit-package-ci audit-final-check

audit-baseline:
	@printf '1. Baseline: %s\n' '$(BASELINE_STATE)'

audit-missing-modules:
	@printf '2. Modules without declarations: %s\n' '$(MISSING_MODULES_STATE)'

audit-existing-declarations:
	@printf '3. Existing declarations: %s\n' '$(EXISTING_DECLARATIONS_STATE)'

audit-release-apis:
	@printf '4. Contour and StrokeImage: %s\n' '$(RELEASE_APIS_STATE)'

audit-examples:
	@printf '5. Examples and type tests: %s\n' '$(EXAMPLES_AND_TESTS_STATE)'

audit-package-ci:
	@printf '6. Package alignment and CI: %s\n' '$(PACKAGE_AND_CI_STATE)'

audit-final-check:
	@printf '7. Final integrated check: %s\n' '$(FINAL_CHECK_STATE)'

# Run these again after the module review is complete.
audit-verify:
	npm test
	npm run lint
	git diff --check

# Lists unmatched upstream HTML pages; some may be support or standalone pages.
example-ports-status:
	@printf 'Example ports: %s\nLast round: %s\n\n' '$(EXAMPLE_PORTS_STATE)' '$(EXAMPLE_PORTS_LAST_ROUND)'
	@python3 scripts/example-inventory.py

# Start the example server first and pass the IDE-provided browser CLI path.
example-load-check:
	@test -n "$(CHROME_DEVTOOLS)" || (printf 'Set CHROME_DEVTOOLS to the Chrome DevTools CLI path.\n' && exit 1)
	@python3 scripts/check-example-loads.py "$(CHROME_DEVTOOLS)"
