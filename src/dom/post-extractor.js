/**
 * @file DOM-to-model extraction for Chillnet feed cards.
 */

const { createPostSignature, normalizeWhitespace } = require('../core/post-model');
const { URL_PATTERN, isChillnetUrl, parseUrl, trimUrlPunctuation } = require('../core/url-utils');

const {
  POST_CONTENT_TEXT_SELECTORS,
  POST_DATE_LINK_SELECTOR,
  POST_EXTERNAL_LINK_SELECTOR,
  POST_USER_HANDLE_SELECTOR,
  POST_USER_NAME_SELECTOR,
} = require('./post-selectors');

/**
 * Normalizes username value for matching and rendering.
 *
 * @param {string} username - Candidate username.
 * @returns {string}
 */
function normalizeUsername(username) {
  return username.replace(/^@+/, '').trim();
}

/**
 * Extracts username from first profile link in card.
 *
 * @param {Element} postCard - Card root element.
 * @returns {string}
 */
function extractUsernameFromProfileLink(postCard) {
  const profileLink = postCard.querySelector('a[href*="/u/"]');
  if (!profileLink) {
    return '';
  }

  const href = profileLink.getAttribute('href') || '';
  const absoluteUrl = href.startsWith('http') ? href : `https://chillnet.me${href}`;
  const parsedUrl = parseUrl(absoluteUrl);
  if (!parsedUrl) {
    return '';
  }

  const pathMatch = parsedUrl.pathname.match(/\/u\/([^/?#]+)/i);
  if (!pathMatch) {
    return '';
  }

  return normalizeUsername(decodeURIComponent(pathMatch[1]));
}

/**
 * Extracts username from visible handle text.
 *
 * @param {Element} postCard - Card root element.
 * @returns {string}
 */
function extractUsernameFromHandle(postCard) {
  const handleElement = postCard.querySelector(POST_USER_HANDLE_SELECTOR);
  const handleText = normalizeWhitespace(handleElement ? handleElement.textContent || '' : '');
  const usernameMatch = handleText.match(/@([A-Za-z0-9_]+)/);
  if (!usernameMatch) {
    return '';
  }

  return normalizeUsername(usernameMatch[1]);
}

/**
 * Extracts display name from post card.
 *
 * @param {Element} postCard - Card root element.
 * @returns {string}
 */
function extractDisplayName(postCard) {
  const nameElement = postCard.querySelector(POST_USER_NAME_SELECTOR);
  return normalizeWhitespace(nameElement ? nameElement.textContent || '' : '');
}

/**
 * Extracts post identifier using permalink path where possible.
 *
 * @param {Element} postCard - Card root element.
 * @param {number} index - Card index fallback.
 * @returns {string}
 */
function extractPostId(postCard, index) {
  const permalinkElement = postCard.querySelector(POST_DATE_LINK_SELECTOR);
  if (permalinkElement) {
    const href = permalinkElement.getAttribute('href') || '';
    const absoluteUrl = href.startsWith('http') ? href : `https://chillnet.me${href}`;
    const parsedUrl = parseUrl(absoluteUrl);
    if (parsedUrl) {
      const pathMatch = parsedUrl.pathname.match(/\/p\/([^/?#]+)/i);
      if (pathMatch) {
        return `post:${pathMatch[1]}`;
      }
    }
  }

  return `card-index:${index}`;
}

/**
 * Extracts normalized textual content from known post and poll zones.
 *
 * @param {Element} postCard - Card root element.
 * @returns {string}
 */
function extractCardText(postCard) {
  const uniqueChunks = new Set();
  for (const selector of POST_CONTENT_TEXT_SELECTORS) {
    for (const element of postCard.querySelectorAll(selector)) {
      const chunk = normalizeWhitespace(element.textContent || '');
      if (chunk) {
        uniqueChunks.add(chunk);
      }
    }
  }

  return Array.from(uniqueChunks).join('\n');
}

/**
 * Adds external URL candidate to set when valid.
 *
 * @param {Set<string>} urls - Mutable URL set.
 * @param {string} rawUrl - Candidate URL value.
 * @returns {void}
 */
function addExternalUrl(urls, rawUrl) {
  const normalizedUrl = trimUrlPunctuation(rawUrl);
  const parsedUrl = parseUrl(normalizedUrl);
  if (!parsedUrl || isChillnetUrl(parsedUrl)) {
    return;
  }

  urls.add(parsedUrl.toString());
}

/**
 * Extracts external URLs from plain text nodes not inside anchors.
 *
 * Why:
 * Auto-link rendering can middle-elide visible URL text. Traversing plain text
 * nodes avoids re-parsing elided link labels and preserves canonical href URLs.
 *
 * @param {Element} postCard - Card root element.
 * @returns {string[]}
 */
function extractExternalUrlsFromPlainText(postCard) {
  const urls = new Set();
  const walker = globalThis.document.createTreeWalker(postCard, globalThis.NodeFilter.SHOW_TEXT);
  let currentNode = walker.nextNode();
  while (currentNode) {
    const parentElement = currentNode.parentElement;
    if (parentElement && parentElement.closest('a')) {
      currentNode = walker.nextNode();
      continue;
    }

    const textValue = currentNode.nodeValue || '';
    URL_PATTERN.lastIndex = 0;
    const matches = textValue.match(URL_PATTERN) || [];
    for (const match of matches) {
      addExternalUrl(urls, match);
    }

    currentNode = walker.nextNode();
  }

  return Array.from(urls);
}

/**
 * Extracts external URLs from anchor tags and plain text nodes.
 *
 * @param {Element} postCard - Card root element.
 * @returns {string[]}
 */
function extractExternalUrls(postCard) {
  const urls = new Set();

  for (const anchorElement of postCard.querySelectorAll(POST_EXTERNAL_LINK_SELECTOR)) {
    addExternalUrl(urls, anchorElement.getAttribute('href') || '');
  }

  for (const plainTextUrl of extractExternalUrlsFromPlainText(postCard)) {
    urls.add(plainTextUrl);
  }

  return Array.from(urls);
}

/**
 * Extracts canonical post model for feature pipeline processing.
 *
 * Why:
 * Feature modules should consume stable, host-independent data objects rather
 * than directly traversing the DOM repeatedly.
 *
 * @param {Element} postCard - Chillnet feed card element.
 * @param {number} index - Post index fallback used for deterministic IDs.
 * @returns {{
 *   postId: string,
 *   username: string,
 *   displayName: string,
 *   textContent: string,
 *   searchText: string,
 *   externalUrls: string[],
 *   signature: string
 * }}
 */
function extractPostModel(postCard, index) {
  const usernameFromLink = extractUsernameFromProfileLink(postCard);
  const usernameFromHandle = extractUsernameFromHandle(postCard);
  const username = usernameFromLink || usernameFromHandle;
  const displayName = extractDisplayName(postCard);
  const textContent = extractCardText(postCard);
  const externalUrls = extractExternalUrls(postCard);

  const postModel = {
    postId: extractPostId(postCard, index),
    username,
    displayName,
    textContent,
    searchText: normalizeWhitespace(`${username} ${displayName} ${textContent}`),
    externalUrls,
    signature: '',
  };

  postModel.signature = createPostSignature(postModel);
  return postModel;
}

module.exports = {
  extractPostModel,
  extractUsernameFromHandle,
  extractUsernameFromProfileLink,
};
