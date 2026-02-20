/**
 * @file Chillnet DOM selectors used by extraction and rendering modules.
 */

const POST_CARD_SELECTOR = '.cn-feed-card';
const POST_USER_NAME_SELECTOR = '.cn-feed-user-name';
const POST_USER_HANDLE_SELECTOR = '.cn-feed-user-handle';
const POST_DATE_LINK_SELECTOR = '.cn-feed-date-link, .cn-feed-date a, a[href*="/p/"]';
const POST_EXTERNAL_LINK_SELECTOR = 'a[href^="http"]';
const POST_CONTENT_TEXT_SELECTORS = ['.cn-feed-text', '.cn-poll-title', '.cn-poll-option-label'];
const COMMENT_ITEM_SELECTOR = '.cn-comment-item';
const COMMENT_AUTHOR_SELECTOR = '.cn-comment-author';
const COMMENT_TEXT_SELECTOR = '.cn-comment-text';
const COMMENT_STATS_SELECTOR = '.cn-post-stats-right';

module.exports = {
  COMMENT_AUTHOR_SELECTOR,
  COMMENT_ITEM_SELECTOR,
  COMMENT_STATS_SELECTOR,
  COMMENT_TEXT_SELECTOR,
  POST_CARD_SELECTOR,
  POST_CONTENT_TEXT_SELECTORS,
  POST_DATE_LINK_SELECTOR,
  POST_EXTERNAL_LINK_SELECTOR,
  POST_USER_HANDLE_SELECTOR,
  POST_USER_NAME_SELECTOR,
};
