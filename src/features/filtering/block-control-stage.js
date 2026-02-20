/**
 * @file Inline block-control stage for post and comment headers.
 */

const { extractCurrentUsername } = require('../../dom/current-user');
const { syncInlineBlockControl } = require('../../dom/block-control-renderer');
const { extractCommentModel } = require('../../dom/comment-extractor');
const {
  COMMENT_ITEM_SELECTOR,
  POST_CARD_SELECTOR,
  POST_DATE_LINK_SELECTOR,
} = require('../../dom/post-selectors');

const { buildBlockedUserSet, normalizeForMatch } = require('./matchers');

const POST_HEAD_RIGHT_SELECTOR = '.cn-feed-head-right';
const COMMENT_HEAD_RIGHT_SELECTOR = '.cn-comment-head-right';
const COMMENT_DATE_SELECTOR = '.cn-comment-date';

/**
 * Normalizes username token for comparisons.
 *
 * @param {string} username - Candidate username.
 * @returns {string}
 */
function normalizeUsername(username) {
  return String(username || '')
    .replace(/^@+/, '')
    .trim();
}

/**
 * Returns whether user target is present in blocked-user set.
 *
 * @param {{ username: string, displayName: string }} userTarget - Candidate user target.
 * @param {Set<string>} blockedUserSet - Canonical blocked-user set.
 * @returns {boolean}
 */
function isBlockedUserTarget(userTarget, blockedUserSet) {
  const normalizedUsername = normalizeForMatch(normalizeUsername(userTarget.username));
  const normalizedDisplayName = normalizeForMatch(userTarget.displayName || '');
  return (
    Boolean(normalizedUsername && blockedUserSet.has(normalizedUsername)) ||
    Boolean(normalizedDisplayName && blockedUserSet.has(normalizedDisplayName))
  );
}

/**
 * Returns whether target username belongs to current signed-in user.
 *
 * @param {string} currentUsername - Current signed-in username.
 * @param {{ username: string }} userTarget - Candidate user target.
 * @returns {boolean}
 */
function isSelfTarget(currentUsername, userTarget) {
  const normalizedCurrent = normalizeForMatch(normalizeUsername(currentUsername));
  const normalizedTarget = normalizeForMatch(normalizeUsername(userTarget.username));
  return Boolean(normalizedCurrent && normalizedTarget && normalizedCurrent === normalizedTarget);
}

/**
 * Synchronizes a single post-header block control.
 *
 * @param {Element} postCard - Post card element.
 * @param {{ username: string, displayName: string }} postModel - Canonical post model fields.
 * @param {Set<string>} blockedUserSet - Canonical blocked-user set.
 * @param {(blockTarget: { username: string, displayName: string, sourceKind: string }) => void} onRequestBlockUser - Block action callback.
 * @returns {void}
 */
function syncPostHeaderBlockControl(
  postCard,
  postModel,
  blockedUserSet,
  currentUsername,
  onRequestBlockUser
) {
  const postHeadRight = postCard.querySelector(POST_HEAD_RIGHT_SELECTOR);
  const dateElement = postHeadRight ? postHeadRight.querySelector(POST_DATE_LINK_SELECTOR) : null;
  const userTarget = {
    username: normalizeUsername(postModel.username),
    displayName: String(postModel.displayName || '').trim(),
    sourceKind: 'post',
  };

  syncInlineBlockControl({
    container: postHeadRight,
    beforeElement: dateElement,
    hidden: isSelfTarget(currentUsername, userTarget),
    blockTarget: userTarget,
    blocked: isBlockedUserTarget(userTarget, blockedUserSet),
    onRequestBlockUser,
  });
}

/**
 * Synchronizes comment-header block controls for provided comment list.
 *
 * @param {Element[]} commentItems - Comment elements to update.
 * @param {Set<string>} blockedUserSet - Canonical blocked-user set.
 * @param {(blockTarget: { username: string, displayName: string, sourceKind: string }) => void} onRequestBlockUser - Block action callback.
 * @returns {void}
 */
function syncCommentHeaderBlockControls(
  commentItems,
  blockedUserSet,
  currentUsername,
  onRequestBlockUser
) {
  for (const commentItem of commentItems) {
    const commentHeadRight = commentItem.querySelector(COMMENT_HEAD_RIGHT_SELECTOR);
    const commentDateElement = commentHeadRight
      ? commentHeadRight.querySelector(COMMENT_DATE_SELECTOR)
      : null;
    const commentModel = extractCommentModel(commentItem);
    const userTarget = {
      username: normalizeUsername(commentModel.username),
      displayName: String(commentModel.displayName || '').trim(),
      sourceKind: 'comment',
    };

    syncInlineBlockControl({
      container: commentHeadRight,
      beforeElement: commentDateElement,
      hidden: isSelfTarget(currentUsername, userTarget),
      blockTarget: userTarget,
      blocked: isBlockedUserTarget(userTarget, blockedUserSet),
      onRequestBlockUser,
    });
  }
}

/**
 * Synchronizes post + in-card comment block controls.
 *
 * Why:
 * Applying controls in the same pipeline pass as filtering keeps UI state
 * aligned with blocked-user settings across SPA mutations.
 *
 * @param {{
 *   postCard: Element,
 *   postModel: { username: string, displayName: string },
 *   filterSettings: { blockedUsers: string[] },
 *   onRequestBlockUser: (blockTarget: { username: string, displayName: string, sourceKind: string }) => void
 * }} options - Stage options.
 * @returns {void}
 */
function syncPostAndCommentBlockControls(options) {
  const { postCard, postModel, filterSettings, onRequestBlockUser } = options;
  const currentUsername = extractCurrentUsername();
  const blockedUserSet = buildBlockedUserSet(filterSettings.blockedUsers);
  syncPostHeaderBlockControl(
    postCard,
    postModel,
    blockedUserSet,
    currentUsername,
    onRequestBlockUser
  );
  syncCommentHeaderBlockControls(
    Array.from(postCard.querySelectorAll(COMMENT_ITEM_SELECTOR)),
    blockedUserSet,
    currentUsername,
    onRequestBlockUser
  );
}

/**
 * Synchronizes block controls for detached permalink comments.
 *
 * @param {{
 *   filterSettings: { blockedUsers: string[] },
 *   onRequestBlockUser: (blockTarget: { username: string, displayName: string, sourceKind: string }) => void
 * }} options - Stage options.
 * @returns {void}
 */
function syncDetachedCommentBlockControls(options) {
  const { filterSettings, onRequestBlockUser } = options;
  const currentUsername = extractCurrentUsername();
  const blockedUserSet = buildBlockedUserSet(filterSettings.blockedUsers);
  const detachedCommentItems = Array.from(
    globalThis.document.querySelectorAll(COMMENT_ITEM_SELECTOR)
  ).filter((commentItem) => !commentItem.closest(POST_CARD_SELECTOR));
  syncCommentHeaderBlockControls(
    detachedCommentItems,
    blockedUserSet,
    currentUsername,
    onRequestBlockUser
  );
}

module.exports = {
  syncDetachedCommentBlockControls,
  syncPostAndCommentBlockControls,
};
