# ol-ext 4.0.39 audit progress

Updated 2026-11-14. The declaration audit is complete within the documented scope. Plan: `.scratch/to-plan/ol-ext-declaration-audit.md`; module decisions, exclusions, upstream findings and validation limits: `docs/ol-ext-4.0.39-audit.md`.

- Branch `audit/ol-ext-4.0.39`, draft PR https://github.com/Siedlerchr/types-ol-ext/pull/212. The audit uses ol-ext 4.0.39 and OpenLayers 10.11.0. The project release version was not changed.
- Controls, interactions, sources, geometry, rendering, styles, formats, overlays, legends, animations, inputs and utilities have module decisions recorded. Named exports, prototype extensions and option candidates were reconciled against the release, with private and excluded modules documented.
- The final integrated `make -f docs/audit-status.mk audit-verify` passed: `npm test` includes the full unsuppressed example compilation; `npm run lint` and `git diff --check` passed. A previous clean isolated `npm ci` installed TypeScript 5.9.3 and OpenLayers 10.11.0; dependencies have not changed since that check.
- Contour, StrokeImage and animation examples were exercised in Chrome. Upstream PR https://github.com/Viglino/ol-ext/pull/1194 contains the separately validated import and inheritance fixes; they are not part of release 4.0.39. ExportMap map export still has a compose-event context limitation.
- Known limits include missing `proj4` for InseeBin/DFCI, upstream import and runtime defects, FontSymbol fill/stroke nullability and prototype-augmentation constraints. Live services, many browser interactions and some rendering paths were not tested. See the detailed report for exact triggers, evidence and limitations.
- Preserve `.scratch/` and `.codegraph/`; they are intentionally untracked. Run `make -f docs/audit-status.mk audit-status` for this checkpoint and `make -f docs/audit-status.mk audit-plan` for the plan states.
