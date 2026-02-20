/**
 * @file Notification filtering stage for popup and notifications page.
 */

const { extractNotificationModel } = require('../../dom/notification-extractor');
const {
  FILTERED_NOTIFICATION_CLASS,
  applyNotificationFilterDecision,
} = require('../../dom/notification-renderer');
const { NOTIFICATION_ITEM_SELECTOR } = require('../../dom/notification-selectors');

const { buildBlockedUserSet, normalizeForMatch } = require('./matchers');

/**
 * Finds first username from notification model that exists in blocked set.
 *
 * @param {{ usernames: string[] }} notificationModel - Notification model.
 * @param {Set<string>} blockedUserSet - Canonical blocked-user set.
 * @returns {string}
 */
function findBlockedNotificationUsername(notificationModel, blockedUserSet) {
  for (const candidateUsername of notificationModel.usernames) {
    const normalizedUsername = normalizeForMatch(
      String(candidateUsername || '').replace(/^@+/, '')
    );
    if (normalizedUsername && blockedUserSet.has(normalizedUsername)) {
      return normalizedUsername;
    }
  }

  return '';
}

/**
 * Returns whether notification is hidden by direct filter class state.
 *
 * @param {Element} notificationItem - Notification list item.
 * @returns {boolean}
 */
function isNotificationHiddenByFilter(notificationItem) {
  return notificationItem.classList.contains(FILTERED_NOTIFICATION_CLASS);
}

/**
 * Builds notification filter decision for one notification item.
 *
 * @param {Element} notificationItem - Notification list item.
 * @param {Set<string>} blockedUserSet - Canonical blocked-user set.
 * @returns {{ blocked: boolean, reasons: string[] }}
 */
function buildNotificationFilterDecision(notificationItem, blockedUserSet) {
  if (blockedUserSet.size === 0) {
    return {
      blocked: false,
      reasons: [],
    };
  }

  const notificationModel = extractNotificationModel(notificationItem);
  const blockedUsername = findBlockedNotificationUsername(notificationModel, blockedUserSet);
  if (blockedUsername) {
    return {
      blocked: true,
      reasons: [`user:${blockedUsername}`],
    };
  }

  return {
    blocked: false,
    reasons: [],
  };
}

/**
 * Applies blocked-user filtering to notifications across popup and page views.
 *
 * Why:
 * Notification filtering is isolated from post/comment filtering because
 * notifications render in distinct containers and can update independently of
 * feed-card lifecycles.
 *
 * @param {{
 *   enabled: boolean,
 *   blockedUsers: string[]
 * }} filterSettings - User filter settings.
 * @returns {number} Number of currently filtered notifications.
 */
function filterNotificationItems(filterSettings) {
  const notificationItems = Array.from(
    globalThis.document.querySelectorAll(NOTIFICATION_ITEM_SELECTOR)
  );
  if (notificationItems.length === 0) {
    return 0;
  }

  const blockedUserSet = filterSettings.enabled
    ? buildBlockedUserSet(filterSettings.blockedUsers)
    : new Set();

  for (const notificationItem of notificationItems) {
    const filterDecision = buildNotificationFilterDecision(notificationItem, blockedUserSet);
    applyNotificationFilterDecision(notificationItem, filterDecision);
  }

  return notificationItems.filter((notificationItem) =>
    isNotificationHiddenByFilter(notificationItem)
  ).length;
}

module.exports = {
  buildNotificationFilterDecision,
  filterNotificationItems,
  findBlockedNotificationUsername,
  isNotificationHiddenByFilter,
};
