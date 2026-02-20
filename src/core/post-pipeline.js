/**
 * @file Orchestrates extraction, filtering, embedding, and rendering.
 */

const { renderEmbeds, clearEmbeds } = require('../dom/embed-renderer');
const { extractPostModel } = require('../dom/post-extractor');
const { linkifyPostContent } = require('../dom/link-renderer');
const { POST_CARD_SELECTOR } = require('../dom/post-selectors');
const { applyFilterDecision } = require('../dom/post-renderer');
const { resolveEmbedDescriptors } = require('../features/embeds/embed-engine');
const {
  syncDetachedCommentBlockControls,
  syncPostAndCommentBlockControls,
} = require('../features/filtering/block-control-stage');
const {
  filterDetachedComments,
  filterPostComments,
} = require('../features/filtering/comment-filter-stage');
const { evaluateFilterDecision } = require('../features/filtering/filter-engine');
const { filterNotificationItems } = require('../features/filtering/notification-filter-stage');
const { filterRailSections } = require('../features/filtering/rail-filter-stage');

const CARD_FINGERPRINT_ATTRIBUTE = 'data-cdp-fingerprint';
const PERMALINK_PATH_PATTERN = /^\/p\/[^/?#]+/i;

/**
 * Builds deterministic fingerprint for card processing cache.
 *
 * @param {{
 *   filters: object,
 *   embeds: object
 * }} settings - Current settings object.
 * @param {string} signature - Post model signature.
 * @returns {string}
 */
function createProcessingFingerprint(settings, signature) {
  return JSON.stringify({
    filters: settings.filters,
    embeds: settings.embeds,
    signature,
  });
}

/**
 * Creates post pipeline controller.
 *
 * Why:
 * A dedicated controller keeps mutation scheduling, DOM traversal, and feature
 * stage execution in one boundary while preserving strict SoC across modules.
 *
 * @param {() => {
 *   filters: { enabled: boolean, blockedUsers: string[], blockedPhrases: string[] },
 *   embeds: {
 *     enabled: boolean,
 *     image: boolean,
 *     reddit: boolean,
 *     spotify: boolean,
 *     tiktok: boolean,
 *     x: boolean,
 *     youtube: boolean,
 *     maxPerPost: number
 *   }
 * }} getSettings - Lazy settings accessor.
 * @param {(blockTarget: { username: string, displayName: string, sourceKind: string }) => void} [onRequestBlockUser] - Inline block callback.
 * @returns {{
 *   run: (options?: { force?: boolean }) => void,
 *   start: () => void,
 *   stop: () => void
 * }}
 */
function createPostPipeline(getSettings, onRequestBlockUser = () => {}) {
  let mutationObserver = null;
  let locationWatcherTimer = null;
  let debounceTimer = null;
  let lastKnownUrl = '';

  /**
   * Processes every currently matched post card.
   *
   * @param {{ force?: boolean }} [options] - Execution options.
   * @returns {void}
   */
  function run(options = {}) {
    const settings = getSettings();
    const shouldForce = options.force === true;
    const postCards = Array.from(globalThis.document.querySelectorAll(POST_CARD_SELECTOR));

    filterNotificationItems(settings.filters);
    filterRailSections(settings.filters);

    postCards.forEach((postCard, index) => {
      filterPostComments(postCard, settings.filters);

      const postModel = extractPostModel(postCard, index);
      syncPostAndCommentBlockControls({
        postCard,
        postModel,
        filterSettings: settings.filters,
        onRequestBlockUser,
      });
      const fingerprint = createProcessingFingerprint(settings, postModel.signature);
      const previousFingerprint = postCard.getAttribute(CARD_FINGERPRINT_ATTRIBUTE);

      if (!shouldForce && previousFingerprint === fingerprint) {
        return;
      }

      const filterDecision = evaluateFilterDecision(postModel, settings.filters);
      applyFilterDecision(postCard, filterDecision);

      if (filterDecision.blocked) {
        clearEmbeds(postCard);
        postCard.setAttribute(CARD_FINGERPRINT_ATTRIBUTE, fingerprint);
        return;
      }

      linkifyPostContent(postCard);
      const embedDescriptors = resolveEmbedDescriptors(postModel, settings.embeds);
      renderEmbeds(postCard, embedDescriptors);
      postCard.setAttribute(CARD_FINGERPRINT_ATTRIBUTE, fingerprint);
    });

    if (postCards.length > 0 && PERMALINK_PATH_PATTERN.test(globalThis.location.pathname)) {
      filterDetachedComments(postCards[0], settings.filters);
      syncDetachedCommentBlockControls({
        filterSettings: settings.filters,
        onRequestBlockUser,
      });
    }
  }

  /**
   * Schedules debounced pipeline run.
   *
   * @param {boolean} force - Whether run should bypass fingerprints.
   * @returns {void}
   */
  function scheduleRun(force) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      run({ force });
    }, 120);
  }

  /**
   * Starts observers and route watchers.
   *
   * @returns {void}
   */
  function start() {
    if (!globalThis.document || !globalThis.document.body) {
      return;
    }

    run({ force: true });
    lastKnownUrl = globalThis.location.href;

    mutationObserver = new globalThis.MutationObserver(() => {
      scheduleRun(false);
    });
    mutationObserver.observe(globalThis.document.body, {
      childList: true,
      subtree: true,
    });

    locationWatcherTimer = setInterval(() => {
      if (globalThis.location.href === lastKnownUrl) {
        return;
      }

      lastKnownUrl = globalThis.location.href;
      scheduleRun(true);
    }, 750);
  }

  /**
   * Stops observers and timers.
   *
   * @returns {void}
   */
  function stop() {
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }

    if (locationWatcherTimer) {
      clearInterval(locationWatcherTimer);
      locationWatcherTimer = null;
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
  }

  return {
    run,
    start,
    stop,
  };
}

module.exports = {
  createPostPipeline,
};
