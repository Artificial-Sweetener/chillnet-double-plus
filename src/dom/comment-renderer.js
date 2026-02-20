/**
 * @file Render primitives for comment-level visibility and count summaries.
 */

const { COMMENT_STATS_SELECTOR } = require('./post-selectors');

const FILTERED_COMMENT_CLASS = 'cdp-hidden-comment';
const FILTERED_COMMENT_COUNT_CLASS = 'cdp-filtered-comment-count';

/**
 * Applies filter visibility state to a comment element.
 *
 * @param {Element} commentItem - Target comment element.
 * @param {{ blocked: boolean, reasons: string[] }} filterDecision - Filter result.
 * @returns {void}
 */
function applyCommentFilterDecision(commentItem, filterDecision) {
  if (filterDecision.blocked) {
    commentItem.classList.add(FILTERED_COMMENT_CLASS);
    commentItem.setAttribute('data-cdp-comment-filter-reason', filterDecision.reasons.join('|'));
    return;
  }

  commentItem.classList.remove(FILTERED_COMMENT_CLASS);
  commentItem.removeAttribute('data-cdp-comment-filter-reason');
}

/**
 * Updates comment summary suffix that reports filtered comment count.
 *
 * Why:
 * The host renders total comment counts; this suffix exposes moderation impact
 * without mutating native count text or disrupting host updates.
 *
 * @param {Element} postCard - Post card containing comments.
 * @param {number} filteredCommentCount - Number of hidden comments in the card.
 * @returns {void}
 */
function syncFilteredCommentSummary(postCard, filteredCommentCount) {
  const statsContainer = postCard.querySelector(COMMENT_STATS_SELECTOR);
  if (!statsContainer) {
    return;
  }

  const existingIndicator = statsContainer.querySelector(`.${FILTERED_COMMENT_COUNT_CLASS}`);
  if (filteredCommentCount <= 0) {
    if (existingIndicator) {
      existingIndicator.remove();
    }
    return;
  }

  const indicator = existingIndicator || globalThis.document.createElement('span');
  indicator.className = FILTERED_COMMENT_COUNT_CLASS;
  indicator.textContent = ` - ${filteredCommentCount} filtered`;

  if (!existingIndicator) {
    statsContainer.appendChild(indicator);
  }
}

module.exports = {
  FILTERED_COMMENT_CLASS,
  FILTERED_COMMENT_COUNT_CLASS,
  applyCommentFilterDecision,
  syncFilteredCommentSummary,
};
