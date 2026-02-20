/**
 * @file Matching utilities for user and phrase filters.
 */

/**
 * Normalizes text for case-insensitive comparisons.
 *
 * @param {string} value - Source text.
 * @returns {string}
 */
function normalizeForMatch(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Builds canonical blocked-user set.
 *
 * @param {string[]} blockedUsers - User-defined blocked usernames.
 * @returns {Set<string>}
 */
function buildBlockedUserSet(blockedUsers) {
  const blockedSet = new Set();
  for (const rawUser of blockedUsers) {
    const normalizedUser = normalizeForMatch(String(rawUser).replace(/^@+/, ''));
    if (normalizedUser) {
      blockedSet.add(normalizedUser);
    }
  }
  return blockedSet;
}

/**
 * Builds canonical blocked phrase list.
 *
 * @param {string[]} blockedPhrases - User-defined blocked phrases.
 * @returns {string[]}
 */
function buildBlockedPhraseList(blockedPhrases) {
  const phraseSet = new Set();
  for (const rawPhrase of blockedPhrases) {
    const normalizedPhrase = normalizeForMatch(rawPhrase);
    if (normalizedPhrase) {
      phraseSet.add(normalizedPhrase);
    }
  }
  return Array.from(phraseSet);
}

/**
 * Converts user-provided list text into array input.
 *
 * Why:
 * Settings UI accepts comma-delimited values only, so parsing stays strict and
 * deterministic for both blocked users and blocked phrases.
 *
 * @param {string} rawList - Free-form list input.
 * @returns {string[]}
 */
function parseListText(rawList) {
  return rawList
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

module.exports = {
  buildBlockedPhraseList,
  buildBlockedUserSet,
  normalizeForMatch,
  parseListText,
};
