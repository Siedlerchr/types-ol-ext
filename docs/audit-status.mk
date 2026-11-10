# Update this checkpoint after each completed and verified audit round.
# The detailed module decisions and remaining work live in the linked records.
AUDIT_UPSTREAM := ol-ext 4.0.39
AUDIT_OPENLAYERS := 10.11.0
AUDIT_LAST_ROUND := hull, elevation and geohash declarations
AUDIT_LAST_COMMIT := 6e80394
AUDIT_STATE := in progress

.PHONY: audit-status
audit-status:
	@printf 'Upstream: %s\nOpenLayers: %s\nState: %s\nLast round: %s (%s)\n\n' '$(AUDIT_UPSTREAM)' '$(AUDIT_OPENLAYERS)' '$(AUDIT_STATE)' '$(AUDIT_LAST_ROUND)' '$(AUDIT_LAST_COMMIT)'
	@cat docs/ol-ext-audit-progress.md
