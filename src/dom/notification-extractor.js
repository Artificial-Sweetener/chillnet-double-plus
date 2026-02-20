/**
 * @file DOM-to-model extraction for Chillnet notification items.
 */

const { normalizeWhitespace } = require('../core/post-model');
const { parseUrl } = require('../core/url-utils');

const {
  NOTIFICATION_ITEM_TOP_SELECTOR,
  NOTIFICATION_LINK_SELECTOR,
  NOTIFICATION_USER_LINK_SELECTOR,
} = require('./notification-selectors');

const USER_HANDLE_PATTERN = /@([A-Za-z0-9_]+)/g;

/**
 * Normalizes username tokens by removing leading at-signs.
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
 * Extracts username from a user profile URL/path.
 *
 * @param {string} userPath - Candidate profile path/URL.
 * @returns {string}
 */
function extractUsernameFromUserPath(userPath) {
  const absoluteUrl = userPath.startsWith('http') ? userPath : `https://chillnet.me${userPath}`;
  const parsedUrl = parseUrl(absoluteUrl);
  if (!parsedUrl) {
    return '';
  }

  const pathMatch = parsedUrl.pathname.match(/\/u\/([^/?#]+)/i);
  if (!pathMatch) {
    return '';
  }

  return normalizeUsernameToken(decodeURIComponent(pathMatch[1]));
}

/**
 * Extracts handle usernames from notification text.
 *
 * @param {string} textContent - Candidate notification text.
 * @returns {string[]}
 */
function extractUsernamesFromText(textContent) {
  const usernames = new Set();
  const normalizedText = normalizeWhitespace(String(textContent || ''));

  for (const handleMatch of normalizedText.matchAll(USER_HANDLE_PATTERN)) {
    const username = normalizeUsernameToken(handleMatch[1]);
    if (username) {
      usernames.add(username);
    }
  }

  return Array.from(usernames);
}

/**
 * Extracts usernames from links rendered in a notification item.
 *
 * Why:
 * Notification variants are inconsistent: some expose profile links directly,
 * while others only provide a wrapper notification link. Parsing both keeps
 * blocked-user detection stable across popup and page layouts.
 *
 * @param {Element} notificationItem - Notification list item element.
 * @returns {string[]}
 */
function extractUsernamesFromLinks(notificationItem) {
  const usernames = new Set();
  const userLinks = Array.from(notificationItem.querySelectorAll(NOTIFICATION_USER_LINK_SELECTOR));
  const primaryNotificationLink = notificationItem.querySelector(NOTIFICATION_LINK_SELECTOR);
  if (primaryNotificationLink) {
    userLinks.push(primaryNotificationLink);
  }

  for (const userLink of userLinks) {
    const usernameFromPath = extractUsernameFromUserPath(userLink.getAttribute('href') || '');
    if (usernameFromPath) {
      usernames.add(usernameFromPath);
    }

    const usernameFromText = extractUsernamesFromText(userLink.textContent || '');
    for (const username of usernameFromText) {
      usernames.add(username);
    }
  }

  return Array.from(usernames);
}

/**
 * Extracts canonical notification model used by filtering.
 *
 * Why:
 * Notification parsing sits in the DOM layer so filtering logic can remain
 * deterministic and testable without direct selector dependencies.
 *
 * @param {Element} notificationItem - Notification list item element.
 * @returns {{
 *   usernames: string[]
 * }}
 */
function extractNotificationModel(notificationItem) {
  const topTextElement = notificationItem.querySelector(NOTIFICATION_ITEM_TOP_SELECTOR);
  const topText = normalizeWhitespace(topTextElement ? topTextElement.textContent || '' : '');
  const itemText = normalizeWhitespace(notificationItem.textContent || '');
  const usernames = new Set();

  for (const username of extractUsernamesFromLinks(notificationItem)) {
    usernames.add(username);
  }

  for (const username of extractUsernamesFromText(topText)) {
    usernames.add(username);
  }

  for (const username of extractUsernamesFromText(itemText)) {
    usernames.add(username);
  }

  return {
    usernames: Array.from(usernames),
  };
}

module.exports = {
  extractNotificationModel,
  extractUsernameFromUserPath,
  extractUsernamesFromLinks,
  extractUsernamesFromText,
  normalizeUsernameToken,
};
