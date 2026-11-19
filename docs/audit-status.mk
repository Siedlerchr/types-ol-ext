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
EXAMPLE_PORTS_LAST_ROUND := GeoJSON drop, globe, great-circle, pulse, long-touch, touch-compass, and touch-draw examples
EXAMPLE_LOAD_CHECK := latest seven pages load; pulse Paris button checked; interaction coverage incomplete

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
