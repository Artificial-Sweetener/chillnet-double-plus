/**
 * @file Render primitives for post visibility state.
 */

const FILTERED_POST_CLASS = 'cdp-hidden-post';

/**
 * Applies filter decision visibility state to card element.
 *
 * @param {Element} postCard - Target post card.
 * @param {{ blocked: boolean, reasons: string[] }} filterDecision - Filter result.
 * @returns {void}
 */
function applyFilterDecision(postCard, filterDecision) {
  if (filterDecision.blocked) {
    postCard.classList.add(FILTERED_POST_CLASS);
    postCard.setAttribute('data-cdp-filter-reason', filterDecision.reasons.join('|'));
    return;
  }

  postCard.classList.remove(FILTERED_POST_CLASS);
  postCard.removeAttribute('data-cdp-filter-reason');
}

module.exports = {
  FILTERED_POST_CLASS,
  applyFilterDecision,
};
