# Update this checkpoint after each completed and verified audit round.
# The detailed module decisions and remaining work live in the linked records.
AUDIT_UPSTREAM := ol-ext 4.0.39
AUDIT_OPENLAYERS := 10.11.0
AUDIT_LAST_ROUND := profile style
# This file is updated and committed with each completed round.
AUDIT_LAST_COMMIT := $(shell git log -1 --format=%h -- docs/audit-status.mk)
AUDIT_STATE := in progress

# A completed step records the current evidence, not a release approval.
BASELINE_STATE := complete
MISSING_MODULES_STATE := classified
EXISTING_DECLARATIONS_STATE := in progress
RELEASE_APIS_STATE := verified with documented limits
EXAMPLES_AND_TESTS_STATE := in progress
PACKAGE_AND_CI_STATE := configured
FINAL_CHECK_STATE := pending full audit

.PHONY: audit-status audit-plan audit-baseline audit-missing-modules \
	audit-existing-declarations audit-release-apis audit-examples \
	audit-package-ci audit-final-check audit-verify

audit-status:
	@printf 'Upstream: %s\nOpenLayers: %s\nState: %s\nLast round: %s (%s)\n\n' '$(AUDIT_UPSTREAM)' '$(AUDIT_OPENLAYERS)' '$(AUDIT_STATE)' '$(AUDIT_LAST_ROUND)' '$(AUDIT_LAST_COMMIT)'
	@cat docs/ol-ext-audit-progress.md

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
