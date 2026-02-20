/**
 * @file Shared stylesheet generator for Chillnet Double Plus themes.
 */

const { DARK_THEME_ID, THEMES, getThemeDefinition } = require('./theme-registry');

const APP_BACKGROUND_SELECTORS = Object.freeze([
  '.cn-shell-main',
  '.cn-shell-grid',
  '.cn-center-column',
  '.cn-left-rail',
  '.cn-right-rail',
]);

const SURFACE_SELECTORS = Object.freeze([
  '.cn-topbar',
  '.cn-mobile-nav',
  '.cn-compose-card',
  '.cn-rail-card',
  '.cn-feed-card',
  '.cn-feed-switch',
  '.cn-comments-block',
  '.cn-user-pill',
  '.cn-account-pill',
  '.cn-notification-menu',
  '.cn-avatar-menu',
  '.cn-inline-menu-popover',
  '.cn-admin-user-card',
  '.cn-admin-invite-item',
  '.cn-admin-user-block',
  '[class^="cn-admin-"]',
  '[class*=" cn-admin-"]',
]);

const MUTED_TEXT_SELECTORS = Object.freeze([
  '.cn-topic-button',
  '.cn-comment-author',
  '.cn-handle-with-medal',
  '.cn-dookie-stack',
  '.cn-post-stats-right',
  '.cn-action-label',
  '.cn-action-icon',
]);

const MODULE_BLOCK_SELECTORS = Object.freeze([
  '[class*="__howToPlayStat"]',
  '[class*="__inviteLink"]',
  '[class*="__inviteIconButton"]',
  '[class*="__desktopGiantKnob"]',
  '[class*="__limitCard"]',
]);

const MODULE_MUTED_SELECTORS = Object.freeze([
  '[class*="__howToPlayTitle"]',
  '[class*="__howToPlayLead"]',
  '[class*="__howToPlayList"]',
  '[class*="__eyebrow"]',
  '[class*="__subtitle"]',
  '[class*="__inviteCopy"]',
  '[class*="__inviteCounter"]',
  '[class*="__toolsMeta"]',
  '[class*="__boardHint"]',
  '[class*="__leaderboardEmpty"]',
  '[class*="__limitLabel"]',
  '[class*="__limitMeta"]',
]);

const MODULE_ACCENT_SELECTORS = Object.freeze(['[class*="__limitValue"]']);

const STATUS_SELECTORS = Object.freeze([
  '[class*="__statusPill"]',
  '[class*="__statusPillCompact"]',
  '[class*="__statusLive"]',
]);

/**
 * Returns fully scoped selectors for a theme id.
 *
 * @param {string} themeId - Theme id.
 * @param {string[]} selectors - Unscoped selectors.
 * @returns {string}
 */
function scopeSelectors(themeId, selectors) {
  return selectors.map((selector) => `html[data-cdp-theme="${themeId}"] ${selector}`).join(',\n');
}

/**
 * Converts token map into CSS variable declarations.
 *
 * @param {Record<string, string>} tokens - Theme token map.
 * @returns {string}
 */
function buildTokenVariableDeclarations(tokens) {
  return Object.entries(tokens)
    .map(([tokenKey, tokenValue]) => `  --cdp-theme-${tokenKey}: ${tokenValue};`)
    .join('\n');
}

/**
 * Builds scoped CSS for one custom theme.
 *
 * Why:
 * Centralizing selector ownership in this template makes future retheme work a
 * one-file edit and avoids copy/paste drift between theme variants.
 *
 * @param {{
 *   id: string,
 *   mode: "light" | "dark",
 *   tokens: Record<string, string>,
 *   useCustomStyles: boolean,
 *   cssOverrides?: string
 * }} themeDefinition - Theme definition.
 * @returns {string}
 */
function buildScopedThemeCss(themeDefinition) {
  if (!themeDefinition.useCustomStyles) {
    return '';
  }

  const tokenDeclarations = buildTokenVariableDeclarations(themeDefinition.tokens);
  const scopedSurfaces = scopeSelectors(themeDefinition.id, SURFACE_SELECTORS);
  const scopedAppBackground = scopeSelectors(themeDefinition.id, APP_BACKGROUND_SELECTORS);
  const scopedMutedText = scopeSelectors(themeDefinition.id, MUTED_TEXT_SELECTORS);
  const scopedModuleBlocks = scopeSelectors(themeDefinition.id, MODULE_BLOCK_SELECTORS);
  const scopedModuleMuted = scopeSelectors(themeDefinition.id, MODULE_MUTED_SELECTORS);
  const scopedModuleAccent = scopeSelectors(themeDefinition.id, MODULE_ACCENT_SELECTORS);
  const scopedStatus = scopeSelectors(themeDefinition.id, STATUS_SELECTORS);
  const cssOverrides =
    typeof themeDefinition.cssOverrides === 'string' ? themeDefinition.cssOverrides : '';

  return `
html[data-cdp-theme="${themeDefinition.id}"] {
  color-scheme: ${themeDefinition.mode};
${tokenDeclarations}
  --background: var(--cdp-theme-pageBg);
  --foreground: var(--cdp-theme-foreground);
  --panel: var(--cdp-theme-panel);
  --panel-muted: var(--cdp-theme-panelMuted);
  --border: var(--cdp-theme-border);
  --muted: var(--cdp-theme-muted);
  --accent: var(--cdp-theme-accent);
  --accent-strong: var(--cdp-theme-accentStrong);
  --accent-soft: var(--cdp-theme-accentSoft);
  --ok-soft: var(--cdp-theme-statusBg);
  --ok-border: var(--cdp-theme-statusBorder);
  --ok-ink: var(--cdp-theme-statusInk);
  --shadow: var(--cdp-theme-shadow);
}

html[data-cdp-theme="${themeDefinition.id}"],
html[data-cdp-theme="${themeDefinition.id}"] body {
  background: var(--cdp-theme-pageBg) !important;
  color: var(--cdp-theme-foreground);
}

${scopedAppBackground} {
  background: var(--cdp-theme-pageBg) !important;
}

${scopedSurfaces} {
  background: var(--cdp-theme-panel) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-item {
  background: var(--cdp-theme-commentPanel) !important;
  border-color: var(--cdp-theme-commentBorder) !important;
  color: var(--cdp-theme-foreground);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-card,
html[data-cdp-theme="${themeDefinition.id}"] .cn-compose-card,
html[data-cdp-theme="${themeDefinition.id}"] .cn-rail-card {
  box-shadow: var(--cdp-theme-shadow);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-trigger {
  background: var(--cdp-theme-inlineTriggerBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-popover button,
html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-popover a {
  background: transparent !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-popover button:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-inline-menu-popover a:hover {
  background: var(--cdp-theme-hoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-menu {
  background: var(--cdp-theme-panelMuted) !important;
  border: 1px solid var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
  box-shadow: var(--cdp-theme-shadow);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-list {
  background: transparent !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-list > li {
  border-bottom: 1px solid var(--cdp-theme-border);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-list > li:last-child {
  border-bottom: 0;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-option {
  width: 100%;
  background: transparent !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-option span:last-child {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-option:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-mention-option.is-active {
  background: var(--cdp-theme-hoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-nav-link,
html[data-cdp-theme="${themeDefinition.id}"] .cn-mobile-nav-link,
html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-link {
  color: var(--cdp-theme-foreground);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-nav-link.is-active,
html[data-cdp-theme="${themeDefinition.id}"] .cn-mobile-nav-link[aria-current="page"] {
  background: linear-gradient(
    180deg,
    var(--cdp-theme-navActiveStart),
    var(--cdp-theme-navActiveEnd)
  ) !important;
  border-color: var(--cdp-theme-accent) !important;
  box-shadow: inset 0 0 0 1px var(--cdp-theme-accentGlow);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-btn-primary {
  background: linear-gradient(
    180deg,
    var(--cdp-theme-accentStrong),
    var(--cdp-theme-accent)
  ) !important;
  border-color: var(--cdp-theme-accent) !important;
  color: var(--cdp-theme-primaryText) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-btn-soft,
html[data-cdp-theme="${themeDefinition.id}"] .cn-icon-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-compose-tool-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-format-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-reply-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn,
html[data-cdp-theme="${themeDefinition.id}"] .cn-topic-button {
  background: var(--cdp-theme-panelMuted) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn {
  background: var(--cdp-theme-actionBg) !important;
  border-color: var(--cdp-theme-actionBorder) !important;
  color: var(--cdp-theme-actionInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn .cn-action-label,
html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn .cn-action-icon {
  color: inherit !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn.is-active {
  background: var(--cdp-theme-actionActiveBg) !important;
  border-color: var(--cdp-theme-actionActiveBorder) !important;
  color: var(--cdp-theme-actionActiveInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn.is-active,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn[aria-pressed="true"] {
  background: linear-gradient(
    180deg,
    var(--cdp-theme-feedSwitchActiveStart),
    var(--cdp-theme-feedSwitchActiveEnd)
  ) !important;
  border-color: var(--cdp-theme-accent) !important;
  box-shadow: inset 0 0 0 1px var(--cdp-theme-accentGlow);
  color: var(--cdp-theme-accentStrong) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-btn-soft.is-danger,
html[data-cdp-theme="${themeDefinition.id}"] .cn-alert-error {
  background: var(--cdp-theme-dangerSoft) !important;
  border-color: var(--cdp-theme-dangerBorder) !important;
  color: var(--cdp-theme-dangerInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] a,
html[data-cdp-theme="${themeDefinition.id}"] .cn-brand-title,
html[data-cdp-theme="${themeDefinition.id}"] .cn-account-name,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-author {
  color: var(--cdp-theme-foreground);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-handle-medal,
html[data-cdp-theme="${themeDefinition.id}"] .cn-brand-count,
html[data-cdp-theme="${themeDefinition.id}"] .cn-scoreboard-score,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn[aria-pressed="true"] {
  color: var(--cdp-theme-accentStrong) !important;
}

${scopedMutedText} {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn.is-sqwang,
html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn.is-sqwang .cn-action-label,
html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn.is-sqwang .cn-action-icon {
  background: var(--cdp-theme-sqwangBg) !important;
  border-color: var(--cdp-theme-sqwangBorder) !important;
  color: var(--cdp-theme-sqwangInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-actions > .cn-post-action-btn:last-child {
  background: var(--cdp-theme-actionActiveBg) !important;
  border-color: var(--cdp-theme-actionActiveBorder) !important;
  color: var(--cdp-theme-actionActiveInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"]
  .cn-post-actions
  > .cn-post-action-btn:last-child
  .cn-action-label,
html[data-cdp-theme="${themeDefinition.id}"]
  .cn-post-actions
  > .cn-post-action-btn:last-child
  .cn-action-icon {
  color: inherit !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-reply-btn {
  background: var(--cdp-theme-commentCallToActionBg) !important;
  border-color: var(--cdp-theme-commentCallToActionBorder) !important;
  color: var(--cdp-theme-commentCallToActionInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-reply-btn:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-comment-format-btn:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-topic-button:hover,
html[data-cdp-theme="${themeDefinition.id}"] .cn-feed-switch-btn:hover {
  border-color: var(--cdp-theme-border) !important;
  background: var(--cdp-theme-hoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-post-action-btn:hover {
  filter: brightness(1.08);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-card {
  background: var(--cdp-theme-pollCardBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-btn {
  background: var(--cdp-theme-pollOptionBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-btn:hover {
  background: var(--cdp-theme-pollOptionHoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-bar {
  background: var(--cdp-theme-pollOptionBarBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-label,
html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-option-votes,
html[data-cdp-theme="${themeDefinition.id}"] .cn-poll-meta {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-tag {
  background: var(--cdp-theme-donateTagBg) !important;
  border-color: var(--cdp-theme-donateTagBorder) !important;
  color: var(--cdp-theme-donateTagInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-hero,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-grid,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-card,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-card-head,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-actions {
  background: var(--cdp-theme-donateSurfaceBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-card.is-featured {
  background: var(--cdp-theme-donateFeaturedBg) !important;
  border-color: var(--cdp-theme-donateFeaturedBorder) !important;
  box-shadow: var(--cdp-theme-donateFeaturedShadow) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-eyebrow,
html[data-cdp-theme="${themeDefinition.id}"] .cn-donate-point {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-special-chip {
  background: var(--cdp-theme-specialChipBg) !important;
  border-color: var(--cdp-theme-specialChipBorder) !important;
  color: var(--cdp-theme-specialChipInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special {
  background: var(--cdp-theme-specialItemBg) !important;
  border-color: var(--cdp-theme-specialItemBorder) !important;
  box-shadow: var(--cdp-theme-specialItemShadow);
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special:hover {
  background: var(--cdp-theme-specialItemHoverBg) !important;
  border-color: var(--cdp-theme-specialItemHoverBorder) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special .cn-notification-link,
html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special .cn-notification-item-top {
  color: var(--cdp-theme-specialItemText) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special .cn-notification-time,
html[data-cdp-theme="${themeDefinition.id}"] .cn-notification-item-special .cn-notification-post {
  color: var(--cdp-theme-specialItemMuted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] [class*="__emojiBtn"] {
  background: var(--cdp-theme-emojiButtonBg) !important;
  border-color: var(--cdp-theme-emojiButtonBorder) !important;
  color: var(--cdp-theme-emojiButtonInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] [class*="__emojiBtn"]:hover {
  background: var(--cdp-theme-emojiButtonHoverBg) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] [class*="__canvasWrap"] {
  background: var(--cdp-theme-canvasWrapBg) !important;
  border-color: var(--cdp-theme-canvasWrapBorder) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] [class*="__canvas"] {
  background: var(--cdp-theme-canvasBg) !important;
  border-color: var(--cdp-theme-canvasBorder) !important;
}

${scopedModuleBlocks} {
  background: var(--cdp-theme-moduleBlockBg) !important;
  border-color: var(--cdp-theme-moduleBlockBorder) !important;
  color: var(--cdp-theme-moduleBlockInk) !important;
}

${scopedModuleMuted} {
  color: var(--cdp-theme-moduleMuted) !important;
}

${scopedModuleAccent} {
  color: var(--cdp-theme-accentStrong) !important;
}

${scopedStatus} {
  background: var(--cdp-theme-statusBg) !important;
  border-color: var(--cdp-theme-statusBorder) !important;
  color: var(--cdp-theme-statusInk) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] input,
html[data-cdp-theme="${themeDefinition.id}"] textarea,
html[data-cdp-theme="${themeDefinition.id}"] select {
  background: var(--cdp-theme-inputBg) !important;
  border-color: var(--cdp-theme-border) !important;
  color: var(--cdp-theme-foreground) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] input::placeholder,
html[data-cdp-theme="${themeDefinition.id}"] textarea::placeholder {
  color: var(--cdp-theme-muted) !important;
}

html[data-cdp-theme="${themeDefinition.id}"] input:focus,
html[data-cdp-theme="${themeDefinition.id}"] textarea:focus,
html[data-cdp-theme="${themeDefinition.id}"] select:focus,
html[data-cdp-theme="${themeDefinition.id}"] button:focus-visible,
html[data-cdp-theme="${themeDefinition.id}"] a:focus-visible {
  outline: 2px solid var(--cdp-theme-accentStrong) !important;
  outline-offset: 2px !important;
}

html[data-cdp-theme="${themeDefinition.id}"] img {
  background: transparent;
}
${cssOverrides}
`;
}

/**
 * Builds stylesheet text covering all custom themes.
 *
 * @returns {string}
 */
function buildThemeStylesheetCss() {
  return THEMES.map((themeDefinition) => buildScopedThemeCss(themeDefinition)).join('\n');
}

/**
 * Backward-compatible helper returning dark mode scoped css only.
 *
 * @returns {string}
 */
function buildAmoledThemeCss() {
  return buildScopedThemeCss(getThemeDefinition(DARK_THEME_ID));
}

module.exports = {
  buildAmoledThemeCss,
  buildThemeStylesheetCss,
  buildScopedThemeCss,
};
