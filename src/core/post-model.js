/**
 * @file Post model helpers for deterministic pipeline processing.
 */

/**
 * Normalizes whitespace and trims text.
 *
 * @param {string} value - Raw text value.
 * @returns {string}
 */
function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

/**
 * Creates a stable signature for post processing cache decisions.
 *
 * Why:
 * A compact signature lets pipeline stages skip unchanged cards and avoid
 * repeated expensive DOM work under frequent mutation updates.
 *
 * @param {{
 *   postId: string,
 *   username: string,
 *   displayName: string,
 *   textContent: string,
 *   externalUrls: string[]
 * }} postModel - Canonical post model.
 * @returns {string}
 */
function createPostSignature(postModel) {
  const urlSignature = postModel.externalUrls.join('|');
  return normalizeWhitespace(
    `${postModel.postId}|${postModel.username}|${postModel.displayName}|${postModel.textContent}|${urlSignature}`
  );
}

module.exports = {
  createPostSignature,
  normalizeWhitespace,
};
