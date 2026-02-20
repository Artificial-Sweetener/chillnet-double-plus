/**
 * @file Styles for non-theme features (filters, embeds, settings panel).
 */

/**
 * Builds CSS used by filtering, embeds, and settings UI.
 *
 * @returns {string}
 */
function buildFeatureStylesCss() {
  return `
.cdp-hidden-post {
  display: none !important;
}

.cdp-hidden-comment {
  display: none !important;
}

.cdp-hidden-notification {
  display: none !important;
}

.cdp-embed-stack {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}

.cdp-auto-link {
  position: relative;
  display: inline-block;
  max-width: min(100%, 560px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
  color: #efc79d !important;
  text-decoration: underline;
  text-decoration-color: rgba(239, 199, 157, 0.48);
  text-underline-offset: 2px;
}

.cdp-auto-link:hover {
  color: #ffd9b2 !important;
  text-decoration-color: rgba(255, 217, 178, 0.8);
}

#cdp-hover-tooltip {
  position: fixed;
  left: 0;
  top: 0;
  max-width: min(74vw, 700px);
  padding: 7px 10px;
  border: 1px solid #464646;
  border-radius: 10px;
  background: #141414;
  color: #e7edf3;
  font-size: 12px;
  line-height: 1.35;
  white-space: nowrap;
  pointer-events: none;
  z-index: 200000;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.56);
}

.cdp-embed-card {
  width: 100%;
  max-width: 100%;
  border: 1px solid #2f2f2f;
  border-radius: 12px;
  overflow: hidden;
  background: #121212;
}

.cdp-embed-link {
  display: block;
}

.cdp-embed-link-fallback {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  color: #e6c39e !important;
  text-decoration: none;
}

.cdp-embed-link-fallback:hover {
  background: #1b1b1b;
}

.cdp-embed-link img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(58vh, 420px);
  object-fit: contain;
  background: #0a0a0a;
}

.cdp-embed-video {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #0a0a0a;
}

.cdp-embed-video iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.cdp-embed-spotify {
  width: 100%;
  background: #0a0a0a;
}

.cdp-embed-spotify iframe {
  display: block;
  width: 100%;
  border: 0;
}

.cdp-embed-social {
  width: 100%;
  background: #0a0a0a;
}

.cdp-embed-social iframe {
  display: block;
  width: 100%;
  border: 0;
}

.cdp-embed-social-vertical iframe {
  min-height: min(80vh, 760px);
}

.cn-feed-head-right .cdp-inline-block-user-btn,
.cn-comment-head-right .cdp-inline-block-user-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--cdp-modal-button-border);
  background: var(--cdp-modal-button);
  color: var(--cdp-modal-button-text);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1;
  padding: 4px 8px;
  min-height: 22px;
  cursor: pointer;
  transition:
    border-color 120ms ease,
    color 120ms ease,
    background 120ms ease,
    transform 120ms ease;
}

.cn-feed-head-right .cdp-inline-block-user-btn:hover,
.cn-comment-head-right .cdp-inline-block-user-btn:hover {
  border-color: var(--cdp-modal-button-hover-border);
  background: var(--cdp-modal-button);
  color: var(--cdp-modal-button-text);
  box-shadow:
    0 8px 18px -12px rgba(0, 0, 0, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  transform: translateY(-1px);
}

.cn-feed-head-right .cdp-inline-block-user-btn:active,
.cn-comment-head-right .cdp-inline-block-user-btn:active {
  transform: translateY(0);
}

.cn-feed-head-right .cdp-inline-block-user-btn[disabled],
.cn-comment-head-right .cdp-inline-block-user-btn[disabled] {
  cursor: default;
  border-color: var(--cdp-modal-danger-border);
  background: var(--cdp-modal-danger-bg);
  color: var(--cdp-modal-danger-text);
  transform: translateY(0);
  box-shadow: none;
}

.cdp-confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 100001;
  display: grid;
  place-items: center;
  padding: 18px;
  background: var(--cdp-modal-backdrop);
  backdrop-filter: blur(2px);
}

.cdp-confirm-overlay[hidden] {
  display: none !important;
}

.cdp-confirm-panel {
  width: min(430px, calc(100vw - 30px));
  border-radius: 16px;
  border: 1px solid var(--cdp-modal-border);
  background: linear-gradient(180deg, var(--cdp-modal-surface-elevated), var(--cdp-modal-surface));
  color: var(--cdp-modal-text);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.34);
  padding: 16px;
  display: grid;
  gap: 12px;
}

.cdp-confirm-panel h3 {
  margin: 0;
  font-size: 18px;
}

.cdp-confirm-text {
  margin: 0;
  color: var(--cdp-modal-text-muted);
  font-size: 14px;
  line-height: 1.45;
}

.cdp-confirm-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.cdp-confirm-btn {
  --cdp-confirm-btn-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.07), var(--cdp-modal-button));
  --cdp-confirm-btn-border: var(--cdp-modal-button-border);
  --cdp-confirm-btn-ink: var(--cdp-modal-button-text);
  border-radius: 999px;
  border: 1px solid var(--cdp-confirm-btn-border);
  background: var(--cdp-confirm-btn-bg);
  background-image: var(--cdp-confirm-btn-bg);
  color: var(--cdp-confirm-btn-ink);
  padding: 7px 13px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 120ms ease,
    border-color 140ms ease,
    box-shadow 140ms ease;
}

.cdp-confirm-panel button.cdp-confirm-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: var(--cdp-modal-button-hover-border) !important;
  background: var(--cdp-confirm-btn-bg) !important;
  background-image: var(--cdp-confirm-btn-bg) !important;
  color: var(--cdp-confirm-btn-ink) !important;
  box-shadow:
    0 8px 18px -12px rgba(0, 0, 0, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06) !important;
}

.cdp-confirm-btn.is-danger {
  --cdp-confirm-btn-border: var(--cdp-modal-danger-border);
  --cdp-confirm-btn-bg: var(--cdp-modal-danger-bg);
  --cdp-confirm-btn-ink: var(--cdp-modal-danger-text);
  --cdp-modal-button-hover-border: var(--cdp-modal-danger-border);
}

.cdp-confirm-panel button.cdp-confirm-btn.is-danger:hover:not(:disabled) {
  border-color: var(--cdp-confirm-btn-border);
  background: var(--cdp-confirm-btn-bg);
  background-image: var(--cdp-confirm-btn-bg);
  color: var(--cdp-confirm-btn-ink);
}

.cdp-confirm-btn:active {
  transform: translateY(0);
  box-shadow:
    0 4px 10px -10px rgba(0, 0, 0, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.cdp-confirm-panel button.cdp-confirm-btn:focus-visible {
  outline: 2px solid var(--cdp-modal-button-border) !important;
  outline-offset: 2px;
  box-shadow: none !important;
}

.cdp-confirm-btn:disabled {
  opacity: 0.7;
  cursor: default;
}

:root {
  --cdp-modal-backdrop: rgba(9, 15, 27, 0.38);
  --cdp-modal-surface: #f7f9fd;
  --cdp-modal-surface-elevated: #ffffff;
  --cdp-modal-border: #ccd8ea;
  --cdp-modal-card-border: #dde6f4;
  --cdp-modal-text: #1c2f4c;
  --cdp-modal-text-muted: #5f7492;
  --cdp-modal-input: #ffffff;
  --cdp-modal-input-border: #c5d3e8;
  --cdp-modal-button: #e8effb;
  --cdp-modal-button-border: #bfd0e8;
  --cdp-modal-button-text: #1a3359;
  --cdp-modal-button-hover-border: #a8bddc;
  --cdp-modal-accent: #2e67cf;
  --cdp-modal-accent-strong: #4f88f0;
  --cdp-modal-primary-border: #1f468e;
  --cdp-modal-primary-bg: linear-gradient(
    180deg,
    var(--cdp-modal-accent-strong),
    var(--cdp-modal-accent)
  );
  --cdp-modal-primary-text: #f5f9ff;
  --cdp-modal-danger-border: #caa28e;
  --cdp-modal-danger-bg: linear-gradient(180deg, #f4dbcf, #e7c6b6);
  --cdp-modal-danger-text: #3e2316;
  --cdp-filtered-comment-text: #6b7a93;
}

html[data-cdp-theme-mode="dark"] {
  --cdp-modal-backdrop: rgba(0, 0, 0, 0.64);
  --cdp-modal-surface: #0f0f0f;
  --cdp-modal-surface-elevated: #151515;
  --cdp-modal-border: #2d2d2d;
  --cdp-modal-card-border: #353535;
  --cdp-modal-text: #e8edf2;
  --cdp-modal-text-muted: #9eabba;
  --cdp-modal-input: #161616;
  --cdp-modal-input-border: #3b3b3b;
  --cdp-modal-button: #1e1e1e;
  --cdp-modal-button-border: #424242;
  --cdp-modal-button-text: #e8edf2;
  --cdp-modal-button-hover-border: #5a5a5a;
  --cdp-modal-primary-text: #1f130c;
  --cdp-modal-danger-border: #7e4343;
  --cdp-modal-danger-bg: linear-gradient(180deg, #4b2525, #341818);
  --cdp-modal-danger-text: #f7dddf;
  --cdp-filtered-comment-text: #b2bcc8;
}

html[data-cdp-theme="dark"] {
  --cdp-modal-accent: #cf5b2d;
  --cdp-modal-accent-strong: #e17346;
  --cdp-modal-primary-border: #6f3b22;
  --cdp-modal-primary-bg: linear-gradient(180deg, #da7448, #c4572d);
  --cdp-modal-primary-text: #21130b;
  --cdp-modal-danger-border: #8a4545;
  --cdp-modal-danger-bg: linear-gradient(180deg, #552a2a, #3b1b1b);
  --cdp-modal-danger-text: #ffe1e3;
}

html[data-cdp-theme="brown"] {
  --cdp-modal-accent: #a26b3f;
  --cdp-modal-accent-strong: #c88d59;
  --cdp-modal-primary-border: #5f3d24;
  --cdp-modal-primary-bg: linear-gradient(180deg, #bf8756, #9b653c);
  --cdp-modal-primary-text: #21130b;
  --cdp-modal-danger-border: #7d4f3b;
  --cdp-modal-danger-bg: linear-gradient(180deg, #5a3628, #3f251b);
  --cdp-modal-danger-text: #f6e0d3;
}

html[data-cdp-theme="pink"] {
  --cdp-modal-accent: #cd4f94;
  --cdp-modal-accent-strong: #e774b2;
  --cdp-modal-primary-border: #74375d;
  --cdp-modal-primary-bg: linear-gradient(180deg, #dc72ad, #bf4b8b);
  --cdp-modal-primary-text: #2a1021;
  --cdp-modal-danger-border: #7f4467;
  --cdp-modal-danger-bg: linear-gradient(180deg, #5a2d4a, #3f1f33);
  --cdp-modal-danger-text: #f8deef;
}

html[data-cdp-theme="olden"] {
  --cdp-modal-backdrop: rgba(90, 60, 27, 0.3);
  --cdp-modal-surface: #f5e7ca;
  --cdp-modal-surface-elevated: #fbf2de;
  --cdp-modal-border: #b99766;
  --cdp-modal-card-border: #c9ab76;
  --cdp-modal-text: #3a2816;
  --cdp-modal-text-muted: #6f5635;
  --cdp-modal-input: #f9efda;
  --cdp-modal-input-border: #b99869;
  --cdp-modal-button: #ead6af;
  --cdp-modal-button-border: #a68552;
  --cdp-modal-button-text: #4d321b;
  --cdp-modal-accent: #7f4224;
  --cdp-modal-accent-strong: #9f6038;
  --cdp-modal-primary-border: #6e3a1f;
  --cdp-modal-primary-bg: linear-gradient(180deg, #a86a40, #804427);
  --cdp-modal-primary-text: #fff5e5;
  --cdp-modal-danger-border: #8d6244;
  --cdp-modal-danger-bg: linear-gradient(180deg, #c49767, #996744);
  --cdp-modal-danger-text: #29170d;
  --cdp-filtered-comment-text: #7f6846;
}

html[data-cdp-theme="aurora"] {
  --cdp-modal-accent: #4db4ff;
  --cdp-modal-accent-strong: #7ae874;
  --cdp-modal-primary-border: #3974a8;
  --cdp-modal-primary-bg: linear-gradient(120deg, #57b6ff, #6fd7a3, #b987ff);
  --cdp-modal-primary-text: #13243f;
  --cdp-modal-danger-border: #40557d;
  --cdp-modal-danger-bg: linear-gradient(180deg, #2b3b5c, #1f2b45);
  --cdp-modal-danger-text: #dce8ff;
}

html[data-cdp-theme="olden"] #cdp-settings-panel {
  font-family:
    "Edwardian Script ITC",
    "Kunstler Script",
    "French Script MT",
    "Segoe Script",
    "Lucida Handwriting",
    "Brush Script MT",
    "Palatino Linotype",
    "Book Antiqua",
    cursive;
}

#cdp-settings-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: grid;
  place-items: center;
  padding: 18px;
  background: var(--cdp-modal-backdrop);
  backdrop-filter: blur(2px);
}

#cdp-settings-overlay[hidden] {
  display: none !important;
}

#cdp-settings-panel {
  width: min(700px, calc(100vw - 30px));
  max-height: min(84vh, 860px);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--cdp-modal-border);
  background: linear-gradient(180deg, var(--cdp-modal-surface-elevated), var(--cdp-modal-surface));
  color: var(--cdp-modal-text);
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.36);
  font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
}

.cdp-settings-head,
.cdp-settings-body {
  padding: 14px 16px;
}

.cdp-settings-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid var(--cdp-modal-border);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0)
  );
}

.cdp-settings-head-copy {
  display: grid;
  gap: 3px;
}

.cdp-settings-kicker {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--cdp-modal-text-muted);
}

.cdp-settings-head h3 {
  margin: 0;
  font-size: 19px;
}

.cdp-settings-head-actions {
  position: relative;
  display: grid;
  align-items: center;
  justify-items: end;
}

.cdp-settings-action-set {
  grid-area: 1 / 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition:
    opacity 160ms ease,
    transform 180ms ease;
}

.cdp-settings-action-set[data-cdp-actions-clean] {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.cdp-settings-action-set[data-cdp-actions-dirty] {
  opacity: 0;
  transform: translateY(-4px);
  pointer-events: none;
}

.cdp-settings-head-actions.is-dirty .cdp-settings-action-set[data-cdp-actions-clean] {
  opacity: 0;
  transform: translateY(4px);
  pointer-events: none;
}

.cdp-settings-head-actions.is-dirty .cdp-settings-action-set[data-cdp-actions-dirty] {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.cdp-settings-body {
  display: grid;
  gap: 14px;
  min-height: 0;
  overflow: auto;
  scrollbar-gutter: stable;
}

.cdp-settings-section {
  display: grid;
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--cdp-modal-card-border);
  background: var(--cdp-modal-surface-elevated);
}

.cdp-settings-section h4 {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--cdp-modal-text-muted);
}

.cdp-settings-field-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--cdp-modal-text-muted);
}

.cdp-settings-theme-select-wrap {
  display: block;
}

#cdp-settings-panel input[type="checkbox"] {
  accent-color: var(--cdp-modal-accent-strong);
}

.cdp-settings-panel-input,
.cdp-settings-panel-textarea {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--cdp-modal-input-border);
  background: var(--cdp-modal-input);
  color: var(--cdp-modal-text);
  padding: 9px 10px;
  font-size: 13px;
}

.cdp-settings-panel-textarea {
  min-height: 84px;
  resize: vertical;
}

.cdp-settings-token-editor {
  padding: 6px 8px;
  border-radius: 10px;
  border: 1px solid var(--cdp-modal-input-border);
  background: var(--cdp-modal-input);
  cursor: text;
}

.cdp-settings-token-editor:focus-within {
  outline: 2px solid var(--cdp-modal-accent-strong);
  outline-offset: 2px;
}

.cdp-settings-token-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  min-height: 26px;
}

.cdp-settings-token-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--cdp-modal-input-border);
  background: rgba(127, 146, 170, 0.14);
  color: var(--cdp-modal-text);
  padding: 3px 9px;
  font-size: 13px;
  line-height: 1.25;
  cursor: pointer;
  transition:
    border-color 120ms ease,
    background-color 120ms ease;
}

#cdp-settings-panel button.cdp-settings-token-chip:hover:not(:disabled) {
  border-color: var(--cdp-modal-input-border) !important;
  background: rgba(127, 146, 170, 0.16) !important;
  color: var(--cdp-modal-text) !important;
  box-shadow: none !important;
  transform: none !important;
}

#cdp-settings-panel button.cdp-settings-token-chip:focus-visible {
  outline: 2px solid var(--cdp-modal-button-border) !important;
  outline-offset: 2px;
  box-shadow: none !important;
}

#cdp-settings-panel .cdp-settings-token-input {
  flex: 1 0 180px;
  min-width: 150px;
  max-width: 100%;
  appearance: none;
  -webkit-appearance: none;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
  color: var(--cdp-modal-text);
  font: inherit;
  font-size: 13px;
  line-height: 1.35;
  padding: 3px 2px;
}

#cdp-settings-panel .cdp-settings-token-input:hover,
#cdp-settings-panel .cdp-settings-token-input:focus,
#cdp-settings-panel .cdp-settings-token-input:focus-visible {
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
}

#cdp-settings-panel .cdp-settings-token-input::placeholder {
  color: var(--cdp-modal-text-muted);
}

.cdp-settings-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.cdp-settings-inline-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(180px, 220px);
  gap: 8px;
  align-items: stretch;
}

.cdp-settings-inline-row .cdp-settings-switch,
.cdp-settings-inline-row .cdp-settings-max-field {
  min-height: 42px;
}

.cdp-settings-max-field {
  min-height: 42px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 78px;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--cdp-modal-card-border);
  background: rgba(127, 146, 170, 0.08);
}

.cdp-settings-max-field .cdp-settings-field-label {
  font-size: 12px;
  margin: 0;
  white-space: nowrap;
}

.cdp-settings-max-field .cdp-settings-panel-input {
  width: 100%;
  height: 28px;
  line-height: 1.2;
  padding: 4px 8px;
}

.cdp-settings-switch {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--cdp-modal-card-border);
  background: rgba(127, 146, 170, 0.08);
  font-size: 14px;
  color: var(--cdp-modal-text);
}

.cdp-settings-switch input[type="checkbox"] {
  width: 16px !important;
  height: 16px !important;
  margin: 0 !important;
  display: block !important;
  flex: 0 0 auto !important;
}

.cdp-settings-switch-label {
  line-height: 1.4;
}

#cdp-settings-panel .cdp-settings-btn {
  --cdp-settings-btn-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.07), var(--cdp-modal-button));
  --cdp-settings-btn-border: var(--cdp-modal-button-border);
  --cdp-settings-btn-ink: var(--cdp-modal-button-text);
  border-radius: 999px;
  border: 1px solid var(--cdp-settings-btn-border) !important;
  background: var(--cdp-settings-btn-bg) !important;
  background-image: var(--cdp-settings-btn-bg) !important;
  background-color: transparent !important;
  color: var(--cdp-settings-btn-ink) !important;
  padding: 7px 13px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 120ms ease,
    border-color 140ms ease,
    box-shadow 140ms ease;
}

#cdp-settings-panel .cdp-settings-btn:hover {
  transform: translateY(-1px);
  border-color: var(--cdp-modal-button-hover-border) !important;
  background: var(--cdp-settings-btn-bg) !important;
  background-image: var(--cdp-settings-btn-bg) !important;
  background-color: transparent !important;
  color: var(--cdp-settings-btn-ink) !important;
  box-shadow:
    0 8px 18px -12px rgba(0, 0, 0, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08) !important;
}

#cdp-settings-panel .cdp-settings-btn:active {
  transform: translateY(0);
  box-shadow:
    0 4px 10px -10px rgba(0, 0, 0, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

#cdp-settings-panel .cdp-settings-btn:disabled {
  opacity: 0.72;
  cursor: default;
}

#cdp-settings-panel .cdp-settings-btn.is-danger {
  --cdp-settings-btn-border: var(--cdp-modal-danger-border);
  --cdp-settings-btn-bg: var(--cdp-modal-danger-bg);
  --cdp-settings-btn-ink: var(--cdp-modal-danger-text);
  --cdp-modal-button-hover-border: var(--cdp-modal-danger-border);
}

#cdp-settings-panel .cdp-settings-btn.is-primary {
  --cdp-settings-btn-border: var(--cdp-modal-primary-border);
  --cdp-settings-btn-bg: var(--cdp-modal-primary-bg);
  --cdp-settings-btn-ink: var(--cdp-modal-primary-text);
  --cdp-modal-button-hover-border: var(--cdp-modal-primary-border);
  font-weight: 600;
}

.cdp-settings-panel-input:focus,
.cdp-settings-panel-textarea:focus,
#cdp-settings-panel .cdp-settings-btn:focus-visible {
  outline: 2px solid var(--cdp-modal-accent-strong);
  outline-offset: 2px;
}

.cdp-settings-nav-link {
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-align: start;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-weight: 400;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.cdp-settings-nav-icon {
  flex: 0 0 auto;
  line-height: 1;
}

.cn-left-rail .cn-nav-link + .cdp-settings-nav-link,
.cn-left-rail .cdp-settings-nav-link + .cn-nav-link {
  margin-top: 8px;
}

.cdp-settings-nav-link.is-active {
  border-color: var(--cdp-modal-accent) !important;
}

.cdp-filtered-comment-count {
  color: var(--cdp-filtered-comment-text);
  font-size: 0.94em;
  white-space: nowrap;
}

@media (max-width: 720px) {
  .cdp-settings-head {
    align-items: flex-start;
  }

  .cdp-settings-head-actions {
    width: 100%;
    justify-items: stretch;
  }

  .cdp-settings-action-set {
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .cdp-settings-inline-row {
    grid-template-columns: 1fr;
  }

  .cdp-settings-grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .cdp-settings-grid-3 {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cdp-settings-action-set,
  .cdp-settings-btn {
    transition: none !important;
  }
}
`;
}

module.exports = {
  buildFeatureStylesCss,
};
