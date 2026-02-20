/**
 * @file Current-session user identity extraction.
 */

/**
 * Normalizes username token by removing at-sign prefix.
 *
 * @param {string} username - Candidate username.
 * @returns {string}
 */
function normalizeUsernameToken(username) {
  return String(username || '')
    .replace(/^@+/, '')
    .trim();
}

/**
 * Extracts current signed-in username from account-name text.
 *
 * @returns {string}
 */
function extractUsernameFromAccountName() {
  const accountNameElement = globalThis.document.querySelector('.cn-account-name');
  const accountNameText = accountNameElement ? accountNameElement.textContent || '' : '';
  const usernameMatch = accountNameText.match(/@([A-Za-z0-9_]+)/);
  if (!usernameMatch) {
    return '';
  }

  return normalizeUsernameToken(usernameMatch[1]);
}

/**
 * Extracts current signed-in username from account-pill aria-label.
 *
 * @returns {string}
 */
function extractUsernameFromAccountPillLabel() {
  const accountMenuButton = globalThis.document.querySelector('button[aria-label*=" menu"]');
  const ariaLabel = accountMenuButton ? accountMenuButton.getAttribute('aria-label') || '' : '';
  const usernameMatch = ariaLabel.match(/@([A-Za-z0-9_]+)\s+menu/i);
  if (!usernameMatch) {
    return '';
  }

  return normalizeUsernameToken(usernameMatch[1]);
}

/**
 * Resolves current signed-in username from stable header affordances.
 *
 * Why:
 * Self-target block controls should never be actionable. Centralizing current
 * user resolution keeps that policy consistent across post/comment stages.
 *
 * @returns {string}
 */
function extractCurrentUsername() {
  return extractUsernameFromAccountName() || extractUsernameFromAccountPillLabel();
}

module.exports = {
  extractCurrentUsername,
  normalizeUsernameToken,
};
