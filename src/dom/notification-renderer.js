/**
 * @file Render primitives for notification visibility state.
 */

const FILTERED_NOTIFICATION_CLASS = 'cdp-hidden-notification';

/**
 * Applies filter visibility state to a notification element.
 *
 * @param {Element} notificationItem - Target notification item.
 * @param {{ blocked: boolean, reasons: string[] }} filterDecision - Filter result.
 * @returns {void}
 */
function applyNotificationFilterDecision(notificationItem, filterDecision) {
  if (filterDecision.blocked) {
    notificationItem.classList.add(FILTERED_NOTIFICATION_CLASS);
    notificationItem.setAttribute(
      'data-cdp-notification-filter-reason',
      filterDecision.reasons.join('|')
    );
    return;
  }

  notificationItem.classList.remove(FILTERED_NOTIFICATION_CLASS);
  notificationItem.removeAttribute('data-cdp-notification-filter-reason');
}

module.exports = {
  FILTERED_NOTIFICATION_CLASS,
  applyNotificationFilterDecision,
};
