# AGENTS.md

## Purpose

- This file defines engineering guardrails for AI agents working on `chillnet-dark-mode`.
- Keep this file focused on code quality, architecture, verification, and release discipline.
- Do not use this file for product brainstorming or scratch notes.

## Command Environment (Windows 11)

- Use PowerShell syntax and Windows paths.
- Avoid Linux/WSL-only assumptions and commands.
- Ensure local scripts and examples work from Windows terminals.

## Project Context

- Project type: userscript built from `src/` into a distributable `.user.js` artifact.
- Target managers: Violentmonkey, Tampermonkey, and FireMonkey.
- Primary host scope: `https://chillnet.me/*`.

## Architecture and Strong SoC (non-negotiable)

- Strong separation of concerns (SoC) is required.
- Each module, class, and function must have one clear responsibility.
- Pure logic, DOM logic, route detection, persistence, and UI controls must remain in separate layers.
- Mixed-responsibility modules are not acceptable.
- Recommended layout:
  - `src/entry/` for userscript bootstrap and metadata wiring.
  - `src/core/` for pure logic and orchestration.
  - `src/theme/` for tokens, palettes, and theme mapping.
  - `src/dom/` for DOM interaction, observers, and style injection.
  - `src/routes/` for route/view-specific behavior.
  - `src/storage/` for persistence wrappers.
  - `tests/` for unit and DOM integration tests.
  - `tools/` for build, lint, and release utilities.

## Core Code Standards (non-negotiable)

- Code must be self-documenting.
- Use expressive, concise names for modules, classes, functions, methods, and variables.
- Names must communicate intent without relying on comments.

- Inline comments are allowed only for non-obvious behavior, constraints, or edge cases.
- Do not add comments that restate obvious code behavior.

- Docstrings are mandatory, but depth must match complexity.
- Simple code should use brief docstrings.
- Complex code must use detailed Google-style docstrings.
- Docstrings must explain intent and rationale ("why"), not just mechanics ("what").

- DRY is mandatory by default.
- Do not abstract when it obscures intent or creates unnecessary indirection.
- If duplication is clearer and safer than abstraction, keep the clearer form.

## Public Contract and Compatibility

- Treat these as the public contract:
  - Userscript metadata header fields.
  - User-visible theming behavior and toggles.
  - Stored settings shape and migration behavior.
  - Installation and usage steps in `README.md`.
- Do not change user-visible behavior unless explicitly requested.
- Internal refactors are allowed, but remove old paths and shims in the same change.

## Userscript Safety and Reliability

- Never break host-page interaction.
- All DOM access must be null-safe and failure-tolerant.
- CSS injection must be idempotent.
- Mutation observers must be scoped, throttled/debounced, and disconnectable.
- Prefer semantic/stable selectors over brittle positional selectors.
- Fail soft when selectors drift: skip safely and log only in debug mode.

## Build and Artifact Discipline

- Source of truth is `src/`.
- Generated `.user.js` output is build-only and must never be manually edited.
- Build output should be deterministic for identical source inputs.
- Metadata version should be sourced from project versioning.

## Required Tooling and Quality Gates

- Linting, format checks, tests, and build are blocking gates before completion.
- If project scripts exist, run them before reporting completion:
  - `npm run lint`
  - `npm run format:check`
  - `npm run test`
  - `npm run build`
- If dependencies are missing, install with `npm ci`.
- Do not mark work complete when a blocking gate fails.

## Testing Requirements

- Add or update tests alongside every behavior change.
- Cover pure logic with unit tests.
- Cover DOM theming/injection behavior with integration tests (jsdom or equivalent).
- Include regression tests for route changes and observer-triggered reapplication.
- Verify idempotency: repeated initialization must not duplicate style blocks or handlers.

## Documentation

- Keep docs concise and practical.
- Update `README.md` whenever user-facing behavior, install steps, or configuration changes.
- Keep comments/docstrings aligned with current implementation after refactors.

## Refactor and Change Policy

- Refactors must be complete: update all callsites and remove dead code.
- Do not leave compatibility layers in internal code unless explicitly required.
- Keep changes cohesive and production-ready.
- No placeholder TODOs, temporary debug logs, or commented-out code in final changes.

## Definition of Done

- Implementation is complete, coherent, and native-looking in codebase style.
- Strong SoC is preserved.
- Naming, comments, docstrings, and DRY standards are satisfied.
- All blocking checks pass.
- Tests cover changed behavior.
- Build artifact is generated from source.

## Commit Messages

- When asked to draft a commit, use Conventional Commits: `type(scope): subject`.
