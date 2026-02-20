/**
 * @file Filter decision engine for post and comment suppression.
 */

const { buildBlockedPhraseList, buildBlockedUserSet, normalizeForMatch } = require('./matchers');

/**
 * Computes block decision for a text-bearing content model.
 *
 * Why:
 * Centralized decision logic keeps filtering behavior deterministic and fully
 * testable without DOM dependencies.
 *
 * @param {{
 *   username: string,
 *   displayName: string,
 *   searchText: string
 * }} contentModel - Canonical post or comment model.
 * @param {{
 *   enabled: boolean,
 *   blockedUsers: string[],
 *   blockedPhrases: string[]
 * }} filterSettings - User filter settings.
 * @returns {{
 *   blocked: boolean,
 *   reasons: string[]
 * }}
 */
function evaluateFilterDecision(contentModel, filterSettings) {
  if (!filterSettings.enabled) {
    return {
      blocked: false,
      reasons: [],
    };
  }

  const blockedUserSet = buildBlockedUserSet(filterSettings.blockedUsers);
  const blockedPhraseList = buildBlockedPhraseList(filterSettings.blockedPhrases);
  const normalizedUsername = normalizeForMatch(contentModel.username);
  const normalizedDisplayName = normalizeForMatch(contentModel.displayName);
  const normalizedSearchText = normalizeForMatch(contentModel.searchText);
  const reasons = [];

  const blockedByUsername = normalizedUsername && blockedUserSet.has(normalizedUsername);
  const blockedByDisplayName = normalizedDisplayName && blockedUserSet.has(normalizedDisplayName);
  if (blockedByUsername || blockedByDisplayName) {
    reasons.push(`user:${blockedByUsername ? normalizedUsername : normalizedDisplayName}`);
  }

  for (const blockedPhrase of blockedPhraseList) {
    if (!blockedPhrase) {
      continue;
    }

    if (normalizedSearchText.includes(blockedPhrase)) {
      reasons.push(`phrase:${blockedPhrase}`);
      break;
    }
  }

  return {
    blocked: reasons.length > 0,
    reasons,
  };
}

module.exports = {
  evaluateFilterDecision,
};
