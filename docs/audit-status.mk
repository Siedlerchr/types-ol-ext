# Update this checkpoint after each completed and verified audit round.
# The detailed module decisions and remaining work live in the linked records.
AUDIT_UPSTREAM := ol-ext 4.0.39
AUDIT_OPENLAYERS := 10.11.0
AUDIT_LAST_ROUND := final integrated audit
# This file is updated and committed with each completed round.
AUDIT_LAST_COMMIT := $(shell git log -1 --format=%h -- docs/audit-status.mk)
AUDIT_STATE := complete

# Porting the remaining upstream examples is a separate follow-up to the audit.
# Load results and upstream issues are recorded in docs/ol-ext-example-ports.md.
EXAMPLE_PORTS_STATE := in progress
EXAMPLE_PORTS_LAST_ROUND := 7 Geoportail, legend and iframe ports
EXAMPLE_LOAD_CHECK := 7 new pages loaded in Chrome, with DNS failures on the historic Geoportail demo

# Refresh the complete unmatched-page snapshot with:
# python3 scripts/example-inventory.py --update-status
# Some entries may be support or standalone pages rather than map examples.

# BEGIN GENERATED MISSING EXAMPLES
# 37 upstream HTML files without a matching TypeScript port.
#   hackmacarte.html (inline scripts: 0)
#   interaction/map.interaction.transformrectangle.html (inline scripts: 1)
#   layer/map.carhab.html (inline scripts: 1)
#   layer/map.carhab.wfs.html (inline scripts: 1)
#   layer/map.circle.intersection.html (inline scripts: 1)
#   layer/map.intersection.html (inline scripts: 1)
#   layer/map.layer.bdtopo.vtile.html (inline scripts: 1)
#   layer/map.layer.clc.wfs.html (inline scripts: 1)
#   layer/map.layer.geoportail.wfs.html (inline scripts: 0)
#   layer/map.layer.gppvtile.html (inline scripts: 0)
#   layer/map.layer.maplibre copy.html (inline scripts: 1)
#   layer/map.layer.maplibre.html (inline scripts: 1)
#   layer/map.layer.ocsge.html (inline scripts: 1)
#   layer/map.maplibre.gl.html (inline scripts: 0)
#   layer/map.stat.wfs.html (inline scripts: 1)
#   map/map.watchdogs.html (inline scripts: 1)
#   map.pirate-old.html (inline scripts: 1)
#   misc/geocommune.html (inline scripts: 0)
#   misc/geoimport.html (inline scripts: 1)
#   misc/geojsontile.html (inline scripts: 1)
#   misc/geojsontile2.html (inline scripts: 1)
#   misc/geoportail.loader.html (inline scripts: 0)
#   misc/map.awesome.gpp.html (inline scripts: 1)
#   misc/map.georef2wmts.html (inline scripts: 1)
#   misc/map.lidar.txt.html (inline scripts: 1)
#   misc/maplibre.gl.html (inline scripts: 0)
#   misc/poly2grid.html (inline scripts: 1)
#   misc/vendeglobe.html (inline scripts: 1)
#   storymap/geotiff.html (inline scripts: 1)
#   storymap/map.control.timeinterval.html (inline scripts: 1)
#   storymap/map.control.timemap.html (inline scripts: 1)
#   storymap/map.control.timequake.html (inline scripts: 1)
#   storymap/map.rlt.html (inline scripts: 1)
#   storymap/map.rlt2.html (inline scripts: 0)
#   storymap/map.rlt3.html (inline scripts: 0)
#   style/map.style.flowarrow.html (inline scripts: 1)
#   style/map.style.gpxline.html (inline scripts: 1)
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
