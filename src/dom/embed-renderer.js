/**
 * @file Embed rendering and reconciliation helpers.
 */

const { THEME_MODE_ATTRIBUTE } = require('./style-manager');

const EMBED_STACK_SELECTOR = '[data-cdp-embed-stack]';

/**
 * Creates fallback link node when image cannot be rendered.
 *
 * @param {string} sourceUrl - Target URL.
 * @returns {HTMLElement}
 */
function createImageFallbackLink(sourceUrl) {
  const fallbackLink = globalThis.document.createElement('a');
  fallbackLink.href = sourceUrl;
  fallbackLink.target = '_blank';
  fallbackLink.rel = 'noopener noreferrer';
  fallbackLink.className = 'cdp-embed-link cdp-embed-link-fallback';
  fallbackLink.textContent = 'Open image';
  return fallbackLink;
}

/**
 * Appends X theme query parameter to iframe URL.
 *
 * Why:
 * X iframe embeds require explicit theme assignment for reliable dark-mode
 * rendering inside cross-origin frames.
 *
 * @param {string} rawUrl - Base X embed URL.
 * @returns {string}
 */
function resolveXFrameUrl(rawUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(rawUrl);
  } catch (_error) {
    return rawUrl;
  }

  const isDarkTheme =
    globalThis.document &&
    globalThis.document.documentElement.getAttribute(THEME_MODE_ATTRIBUTE) === 'dark';
  parsedUrl.searchParams.set('theme', isDarkTheme ? 'dark' : 'light');
  return parsedUrl.toString();
}

/**
 * Creates reusable iframe wrapper card for media descriptors.
 *
 * @param {{
 *   descriptor: {
 *     embedUrl?: string,
 *     frameHeight?: number,
 *     title?: string,
 *     kind: string
 *   },
 *   frameClassName: string,
 *   iframeAllow: string,
 *   allowFullscreen?: boolean,
 *   fallbackHeight: number,
 *   fallbackTitle: string
 * }} options - Iframe renderer options.
 * @returns {HTMLElement}
 */
function createIframeEmbedCard(options) {
  const embedCard = globalThis.document.createElement('div');
  embedCard.className = 'cdp-embed-card';
  embedCard.setAttribute('data-cdp-embed-key', options.descriptor.key);

  const frameWrap = globalThis.document.createElement('div');
  frameWrap.className = options.frameClassName;

  const iframeElement = globalThis.document.createElement('iframe');
  iframeElement.src = options.descriptor.embedUrl || '';
  iframeElement.loading = 'lazy';
  iframeElement.width = '100%';
  iframeElement.height = String(options.descriptor.frameHeight || options.fallbackHeight);
  iframeElement.allow = options.iframeAllow;
  iframeElement.referrerPolicy = 'strict-origin-when-cross-origin';
  iframeElement.title = options.descriptor.title || options.fallbackTitle;

  if (options.allowFullscreen) {
    iframeElement.allowFullscreen = true;
  }

  frameWrap.appendChild(iframeElement);
  embedCard.appendChild(frameWrap);
  return embedCard;
}

/**
 * Ensures embed stack container exists within post card.
 *
 * @param {Element} postCard - Target post card.
 * @returns {HTMLElement | null}
 */
function ensureEmbedStack(postCard) {
  const existingStack = postCard.querySelector(EMBED_STACK_SELECTOR);
  if (existingStack) {
    return /** @type {HTMLElement} */ (existingStack);
  }

  const embedStack = globalThis.document.createElement('div');
  embedStack.className = 'cdp-embed-stack';
  embedStack.setAttribute('data-cdp-embed-stack', 'true');

  const anchorElement = postCard.querySelector('.cn-feed-text, .cn-poll-card');
  if (anchorElement && anchorElement.parentElement) {
    anchorElement.insertAdjacentElement('afterend', embedStack);
  } else {
    postCard.appendChild(embedStack);
  }

  return embedStack;
}

/**
 * Creates DOM node for embed descriptor.
 *
 * @param {{
 *   key: string,
 *   kind: string,
 *   sourceUrl: string,
 *   embedUrl?: string,
 *   frameHeight?: number,
 *   title?: string
 * }} descriptor - Embed descriptor.
 * @returns {HTMLElement}
 */
function createEmbedNode(descriptor) {
  if (descriptor.kind === 'youtube') {
    return createIframeEmbedCard({
      descriptor,
      frameClassName: 'cdp-embed-video',
      iframeAllow:
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowFullscreen: true,
      fallbackHeight: 400,
      fallbackTitle: 'YouTube video preview',
    });
  }

  if (descriptor.kind === 'spotify') {
    return createIframeEmbedCard({
      descriptor,
      frameClassName: 'cdp-embed-spotify',
      iframeAllow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
      fallbackHeight: 352,
      fallbackTitle: 'Spotify preview',
    });
  }

  if (descriptor.kind === 'x') {
    return createIframeEmbedCard({
      descriptor: {
        ...descriptor,
        embedUrl: resolveXFrameUrl(descriptor.embedUrl || ''),
      },
      frameClassName: 'cdp-embed-social',
      iframeAllow: 'clipboard-write; encrypted-media; fullscreen; picture-in-picture',
      allowFullscreen: true,
      fallbackHeight: 560,
      fallbackTitle: 'X post preview',
    });
  }

  if (descriptor.kind === 'reddit') {
    return createIframeEmbedCard({
      descriptor,
      frameClassName: 'cdp-embed-social',
      iframeAllow: 'clipboard-write; encrypted-media; fullscreen; picture-in-picture',
      allowFullscreen: true,
      fallbackHeight: 520,
      fallbackTitle: 'Reddit post preview',
    });
  }

  if (descriptor.kind === 'tiktok') {
    return createIframeEmbedCard({
      descriptor,
      frameClassName: 'cdp-embed-social cdp-embed-social-vertical',
      iframeAllow: 'autoplay; encrypted-media; fullscreen; picture-in-picture',
      allowFullscreen: true,
      fallbackHeight: 760,
      fallbackTitle: 'TikTok video preview',
    });
  }

  const embedCard = globalThis.document.createElement('div');
  embedCard.className = 'cdp-embed-card';
  embedCard.setAttribute('data-cdp-embed-key', descriptor.key);

  const imageLink = globalThis.document.createElement('a');
  imageLink.href = descriptor.sourceUrl;
  imageLink.target = '_blank';
  imageLink.rel = 'noopener noreferrer';
  imageLink.className = 'cdp-embed-link';

  const imageElement = globalThis.document.createElement('img');
  imageElement.src = descriptor.sourceUrl;
  imageElement.loading = 'lazy';
  imageElement.alt = 'Embedded image';
  imageElement.addEventListener(
    'error',
    () => {
      if (!imageLink.isConnected) {
        return;
      }
      imageLink.replaceWith(createImageFallbackLink(descriptor.sourceUrl));
    },
    { once: true }
  );

  imageLink.appendChild(imageElement);
  embedCard.appendChild(imageLink);
  return embedCard;
}

/**
 * Removes all embed content from a post card.
 *
 * @param {Element} postCard - Target post card.
 * @returns {void}
 */
function clearEmbeds(postCard) {
  const embedStack = postCard.querySelector(EMBED_STACK_SELECTOR);
  if (!embedStack) {
    return;
  }

  embedStack.remove();
}

/**
 * Renders descriptors into embed stack while preserving card boundaries.
 *
 * Why:
 * Reconciliation avoids duplicate embeds across repeated mutation scans and
 * keeps embed nodes in sync with current URL extraction output.
 *
 * @param {Element} postCard - Target post card.
 * @param {Array<{
 *   key: string,
 *   kind: string,
 *   sourceUrl: string,
 *   embedUrl?: string,
 *   frameHeight?: number,
 *   title?: string
 * }>} descriptors - Embed descriptors.
 * @returns {void}
 */
function renderEmbeds(postCard, descriptors) {
  if (descriptors.length === 0) {
    clearEmbeds(postCard);
    return;
  }

  const embedStack = ensureEmbedStack(postCard);
  if (!embedStack) {
    return;
  }

  const existingByKey = new Map();
  for (const childElement of Array.from(embedStack.children)) {
    const embedKey = childElement.getAttribute('data-cdp-embed-key');
    if (embedKey) {
      existingByKey.set(embedKey, childElement);
    }
  }

  const desiredKeys = new Set();
  for (const descriptor of descriptors) {
    desiredKeys.add(descriptor.key);
    if (!existingByKey.has(descriptor.key)) {
      embedStack.appendChild(createEmbedNode(descriptor));
    }
  }

  for (const [embedKey, element] of existingByKey.entries()) {
    if (!desiredKeys.has(embedKey)) {
      element.remove();
    }
  }
}

module.exports = {
  clearEmbeds,
  renderEmbeds,
};
