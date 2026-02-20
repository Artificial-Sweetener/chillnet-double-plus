/**
 * @file Settings updater for one-click user blocking actions.
 */

const { buildBlockedUserSet, normalizeForMatch } = require('./matchers');

/**
 * Normalizes username tokens for blocked-user entry generation.
 *
 * @param {string} username - Candidate username token.
 * @returns {string}
 */
function normalizeUsernameToken(username) {
  return String(username || '')
    .replace(/^@+/, '')
    .trim();
}

/**
 * Builds preferred blocked-user list entry from action target.
 *
 * Why:
 * Username-based entries are deterministic across profile display-name changes.
 * Display-name fallback remains available when username cannot be resolved.
 *
 * @param {{ username: string, displayName: string }} blockTarget - Action target.
 * @returns {string}
 */
function buildBlockedEntry(blockTarget) {
  const normalizedUsername = normalizeUsernameToken(blockTarget.username);
  if (normalizedUsername) {
    return `@${normalizedUsername}`;
  }

  return String(blockTarget.displayName || '').trim();
}

/**
 * Returns whether target is already represented by blocked-user settings.
 *
 * @param {{ username: string, displayName: string }} blockTarget - Action target.
 * @param {Set<string>} blockedUserSet - Canonical blocked-user set.
 * @returns {boolean}
 */
function isTargetAlreadyBlocked(blockTarget, blockedUserSet) {
  const normalizedUsername = normalizeForMatch(normalizeUsernameToken(blockTarget.username));
  const normalizedDisplayName = normalizeForMatch(blockTarget.displayName || '');
  return (
    Boolean(normalizedUsername && blockedUserSet.has(normalizedUsername)) ||
    Boolean(normalizedDisplayName && blockedUserSet.has(normalizedDisplayName))
  );
}

/**
 * Adds a user to blocked settings with deterministic normalization.
 *
 * Why:
 * UI action handlers should not own merge/dedupe logic for blocked users.
 * Centralizing this transition keeps settings updates predictable and testable.
 *
 * @param {object} currentSettings - Current settings snapshot.
 * @param {{ username: string, displayName: string }} blockTarget - Action target.
 * @returns {{
 *   changed: boolean,
 *   addedEntry: string,
 *   nextSettings: object
 * }}
 */
function addBlockedUserToSettings(currentSettings, blockTarget) {
  const blockedUserSet = buildBlockedUserSet(currentSettings.filters.blockedUsers);
  if (isTargetAlreadyBlocked(blockTarget, blockedUserSet)) {
    return {
      changed: false,
      addedEntry: '',
      nextSettings: currentSettings,
    };
  }

  const blockedEntry = buildBlockedEntry(blockTarget);
  if (!blockedEntry) {
    return {
      changed: false,
      addedEntry: '',
      nextSettings: currentSettings,
    };
  }

  return {
    changed: true,
    addedEntry: blockedEntry,
    nextSettings: {
      ...currentSettings,
      filters: {
        ...currentSettings.filters,
        enabled: true,
        blockedUsers: [...currentSettings.filters.blockedUsers, blockedEntry],
      },
    },
  };
}

module.exports = {
  addBlockedUserToSettings,
  buildBlockedEntry,
  normalizeUsernameToken,
};
