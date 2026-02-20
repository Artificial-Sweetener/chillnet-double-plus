/**
 * @file Comment filtering stage applied within each post card.
 */

const { extractCommentModel } = require('../../dom/comment-extractor');
const {
  FILTERED_COMMENT_CLASS,
  applyCommentFilterDecision,
  syncFilteredCommentSummary,
} = require('../../dom/comment-renderer');
const { COMMENT_ITEM_SELECTOR, POST_CARD_SELECTOR } = require('../../dom/post-selectors');

const { evaluateFilterDecision } = require('./filter-engine');

/**
 * Returns whether a comment is hidden by direct or ancestor filter state.
 *
 * Why:
 * Replies can remain unflagged while inheriting hidden state from a blocked
 * parent comment. Counting effective visibility makes summary text accurate.
 *
 * @param {Element} commentItem - Comment element.
 * @returns {boolean}
 */
function isCommentHiddenByFilter(commentItem) {
  return Boolean(commentItem.closest(`.${FILTERED_COMMENT_CLASS}`));
}

/**
 * Applies filter decisions to a specific list of comment items.
 *
 * @param {Element[]} commentItems - Comment items to evaluate.
 * @param {{
 *   enabled: boolean,
 *   blockedUsers: string[],
 *   blockedPhrases: string[]
 * }} filterSettings - Filter settings.
 * @returns {number}
 */
function filterCommentItems(commentItems, filterSettings) {
  for (const commentItem of commentItems) {
    const commentModel = extractCommentModel(commentItem);
    const filterDecision = evaluateFilterDecision(commentModel, filterSettings);
    applyCommentFilterDecision(commentItem, filterDecision);
  }

  return commentItems.filter((commentItem) => isCommentHiddenByFilter(commentItem)).length;
}

/**
 * Applies user/phrase filters to comments in a post card.
 *
 * Why:
 * Comment filtering is separated from post filtering so newly-loaded comments
 * can be re-evaluated without re-running every heavy post stage.
 *
 * @param {Element} postCard - Post card root element.
 * @param {{
 *   enabled: boolean,
 *   blockedUsers: string[],
 *   blockedPhrases: string[]
 * }} filterSettings - Filter settings.
 * @returns {number} Number of comments filtered in this post card.
 */
function filterPostComments(postCard, filterSettings) {
  const commentItems = Array.from(postCard.querySelectorAll(COMMENT_ITEM_SELECTOR));
  const filteredCommentCount = filterCommentItems(commentItems, filterSettings);
  syncFilteredCommentSummary(postCard, filteredCommentCount);
  return filteredCommentCount;
}

/**
 * Applies filtering to comment threads that are rendered outside feed cards.
 *
 * Why:
 * Permalink pages render the primary post and comments as sibling sections.
 * Routing these detached comments through the same filter stage preserves
 * parity with feed-card behavior and filtered-count summaries.
 *
 * @param {Element} postCard - Primary post card for stats summary updates.
 * @param {{
 *   enabled: boolean,
 *   blockedUsers: string[],
 *   blockedPhrases: string[]
 * }} filterSettings - Filter settings.
 * @returns {number}
 */
function filterDetachedComments(postCard, filterSettings) {
  const detachedCommentItems = Array.from(
    globalThis.document.querySelectorAll(COMMENT_ITEM_SELECTOR)
  ).filter((commentItem) => !commentItem.closest(POST_CARD_SELECTOR));
  const filteredCommentCount = filterCommentItems(detachedCommentItems, filterSettings);
  syncFilteredCommentSummary(postCard, filteredCommentCount);
  return filteredCommentCount;
}

module.exports = {
  filterDetachedComments,
  filterCommentItems,
  filterPostComments,
  isCommentHiddenByFilter,
};
