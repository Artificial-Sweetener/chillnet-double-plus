/**
 * @file Right-rail filtering stage for suggestions and scoreboards.
 */

const { parseUrl } = require('../../core/url-utils');
const {
  RAIL_CARD_SELECTOR,
  RAIL_TITLE_SELECTOR,
  RIGHT_RAIL_SELECTOR,
  SCOREBOARD_LIST_SELECTOR,
  SCOREBOARD_ROW_SELECTOR,
  SCOREBOARD_TITLE_SELECTOR,
  SCOREBOARD_USER_LINK_SELECTOR,
  SUGGEST_HANDLE_LINK_SELECTOR,
  SUGGEST_ITEM_SELECTOR,
  SUGGEST_LIST_SELECTOR,
  SUGGEST_USER_LINK_SELECTOR,
} = require('../../dom/rail-selectors');

const { buildBlockedUserSet, normalizeForMatch } = require('./matchers');

const TARGETED_SCOREBOARD_TITLES = ['nuggiebash daily scoreboard', 'emojart lifetime scoreboard'];

/**
 * Extracts canonical username from user profile path.
 *
 * @param {string} userPath - User profile URL/path.
 * @returns {string}
 */
function extractUsernameFromUserPath(userPath) {
  const absoluteUrl = userPath.startsWith('http') ? userPath : `https://chillnet.me${userPath}`;
  const parsedUrl = parseUrl(absoluteUrl);
  if (!parsedUrl) {
    return '';
  }

  const userPathMatch = parsedUrl.pathname.match(/\/u\/([^/?#]+)/i);
  if (!userPathMatch) {
    return '';
  }

  return normalizeForMatch(decodeURIComponent(userPathMatch[1]).replace(/^@+/, ''));
}

/**
 * Extracts canonical username from text content.
 *
 * @param {string} textContent - Text containing optional handle.
 * @returns {string}
 */
function extractUsernameFromText(textContent) {
  const normalizedText = String(textContent || '').trim();
  const handleMatch = normalizedText.match(/@([A-Za-z0-9_]+)/);
  if (handleMatch) {
    return normalizeForMatch(handleMatch[1]);
  }

  return normalizeForMatch(normalizedText.replace(/^@+/, ''));
}

/**
 * Extracts username from a link element.
 *
 * @param {Element | null} linkElement - User link element.
 * @returns {string}
 */
function extractUsernameFromLink(linkElement) {
  if (!linkElement) {
    return '';
  }

  return (
    extractUsernameFromUserPath(linkElement.getAttribute('href') || '') ||
    extractUsernameFromText(linkElement.textContent || '')
  );
}

/**
 * Filters "Who to Follow" suggestions by blocked users.
 *
 * @param {Element} rightRail - Right rail root element.
 * @param {Set<string>} blockedUserSet - Canonical blocked usernames.
 * @returns {void}
 */
function filterWhoToFollow(rightRail, blockedUserSet) {
  const railCards = Array.from(rightRail.querySelectorAll(`:scope > ${RAIL_CARD_SELECTOR}`));
  for (const railCard of railCards) {
    const railTitleElement = railCard.querySelector(RAIL_TITLE_SELECTOR);
    const railTitle = normalizeForMatch(railTitleElement ? railTitleElement.textContent || '' : '');
    if (railTitle !== 'who to follow') {
      continue;
    }

    const suggestList = railCard.querySelector(SUGGEST_LIST_SELECTOR);
    if (!suggestList) {
      continue;
    }

    for (const suggestItem of Array.from(suggestList.querySelectorAll(SUGGEST_ITEM_SELECTOR))) {
      const handleLink = suggestItem.querySelector(SUGGEST_HANDLE_LINK_SELECTOR);
      const userLink = suggestItem.querySelector(SUGGEST_USER_LINK_SELECTOR);
      const username =
        extractUsernameFromLink(handleLink) ||
        extractUsernameFromLink(userLink) ||
        extractUsernameFromText(suggestItem.textContent || '');
      if (username && blockedUserSet.has(username)) {
        suggestItem.remove();
      }
    }

    if (!suggestList.querySelector(SUGGEST_ITEM_SELECTOR)) {
      railCard.remove();
    }
  }
}

/**
 * Returns whether scoreboard title is one of targeted sections.
 *
 * @param {string} scoreboardTitle - Raw scoreboard title.
 * @returns {boolean}
 */
function isTargetedScoreboard(scoreboardTitle) {
  const normalizedTitle = normalizeForMatch(scoreboardTitle);
  return TARGETED_SCOREBOARD_TITLES.some((title) => normalizedTitle.includes(title));
}

/**
 * Filters targeted scoreboard rows by blocked users.
 *
 * @param {Element} rightRail - Right rail root element.
 * @param {Set<string>} blockedUserSet - Canonical blocked usernames.
 * @returns {void}
 */
function filterScoreboards(rightRail, blockedUserSet) {
  const railCards = Array.from(rightRail.querySelectorAll(`:scope > ${RAIL_CARD_SELECTOR}`));
  for (const railCard of railCards) {
    const scoreboardTitleElement = railCard.querySelector(SCOREBOARD_TITLE_SELECTOR);
    const scoreboardTitle = scoreboardTitleElement ? scoreboardTitleElement.textContent || '' : '';
    if (!isTargetedScoreboard(scoreboardTitle)) {
      continue;
    }

    const scoreboardList = railCard.querySelector(SCOREBOARD_LIST_SELECTOR);
    if (!scoreboardList) {
      continue;
    }

    for (const scoreboardRow of Array.from(
      scoreboardList.querySelectorAll(SCOREBOARD_ROW_SELECTOR)
    )) {
      const userLink = scoreboardRow.querySelector(SCOREBOARD_USER_LINK_SELECTOR);
      const username =
        extractUsernameFromLink(userLink) ||
        extractUsernameFromText(scoreboardRow.textContent || '');
      if (username && blockedUserSet.has(username)) {
        scoreboardRow.remove();
      }
    }

    if (!scoreboardList.querySelector(SCOREBOARD_ROW_SELECTOR)) {
      railCard.remove();
    }
  }
}

/**
 * Applies blocked-user filtering to right-rail sections.
 *
 * Why:
 * Right-rail filtering is independent from post/comment filtering, so it stays
 * maintainable as ChillNet adds new feed and sidebar render paths.
 *
 * @param {{
 *   enabled: boolean,
 *   blockedUsers: string[]
 * }} filterSettings - User filter settings.
 * @returns {void}
 */
function filterRailSections(filterSettings) {
  const rightRail = globalThis.document.querySelector(RIGHT_RAIL_SELECTOR);
  if (!rightRail) {
    return;
  }

  const blockedUserSet = filterSettings.enabled
    ? buildBlockedUserSet(filterSettings.blockedUsers)
    : new Set();

  if (blockedUserSet.size === 0) {
    return;
  }

  filterWhoToFollow(rightRail, blockedUserSet);
  filterScoreboards(rightRail, blockedUserSet);
}

module.exports = {
  extractUsernameFromLink,
  extractUsernameFromText,
  extractUsernameFromUserPath,
  filterRailSections,
  isTargetedScoreboard,
};
