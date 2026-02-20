/**
 * @file DOM-to-model extraction for Chillnet comment items.
 */

const { normalizeWhitespace } = require('../core/post-model');
const { parseUrl } = require('../core/url-utils');

const { COMMENT_AUTHOR_SELECTOR, COMMENT_TEXT_SELECTOR } = require('./post-selectors');

const REACT_PROPS_KEY_PREFIX = '__reactProps$';
const COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE = 'data-cdp-comment-react-username';
const COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE = 'data-cdp-comment-react-username-scanned';
const MAX_REACT_PROPS_NODES = 2500;

/**
 * Removes leading at-signs and trims username-like values.
 *
 * @param {string} username - Candidate username.
 * @returns {string}
 */
function normalizeUsername(username) {
  return username.replace(/^@+/, '').trim();
}

/**
 * Extracts username from the first profile link within the comment item.
 *
 * Why:
 * Profile links are the most stable source for username matching when author
 * display text can include timestamps or rank labels.
 *
 * @param {Element} commentItem - Comment root element.
 * @returns {string}
 */
function extractUsernameFromProfileLink(commentItem) {
  const profileLink = commentItem.querySelector('a[href*="/u/"]');
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
 * Extracts username from visible author text when handle text is present.
 *
 * @param {Element} commentItem - Comment root element.
 * @returns {string}
 */
function extractUsernameFromAuthorText(commentItem) {
  const authorElement = commentItem.querySelector(COMMENT_AUTHOR_SELECTOR);
  const authorText = normalizeWhitespace(authorElement ? authorElement.textContent || '' : '');
  const usernameMatch = authorText.match(/@([A-Za-z0-9_]+)/);
  if (!usernameMatch) {
    return '';
  }

  return normalizeUsername(usernameMatch[1]);
}

/**
 * Returns react props object attached to a DOM node when available.
 *
 * @param {Element} element - DOM element that may hold React internals.
 * @returns {Record<string, unknown> | null}
 */
function getReactPropsObject(element) {
  const ownPropertyNames = Object.getOwnPropertyNames(element);
  const reactPropsKey = ownPropertyNames.find((propertyName) =>
    propertyName.startsWith(REACT_PROPS_KEY_PREFIX)
  );
  if (!reactPropsKey) {
    return null;
  }

  const reactPropsValue = element[reactPropsKey];
  if (!reactPropsValue || typeof reactPropsValue !== 'object') {
    return null;
  }

  return /** @type {Record<string, unknown>} */ (reactPropsValue);
}

/**
 * Selects username from a React-props object branch.
 *
 * Why:
 * Comment nodes can contain parent render context with other usernames. Matching
 * against the visible author display name keeps this fallback deterministic.
 *
 * @param {Record<string, unknown>} candidateObject - Candidate object branch.
 * @param {string} authorDisplayName - Visible author display name.
 * @returns {{ preferred: string, fallback: string }}
 */
function selectReactUsernameCandidate(candidateObject, authorDisplayName) {
  const candidateUsername =
    typeof candidateObject.username === 'string' ? normalizeUsername(candidateObject.username) : '';
  if (!candidateUsername) {
    return { preferred: '', fallback: '' };
  }

  const candidateDisplayName =
    typeof candidateObject.displayName === 'string'
      ? normalizeWhitespace(candidateObject.displayName)
      : '';
  const normalizedAuthorDisplayName = normalizeWhitespace(authorDisplayName);
  if (
    candidateDisplayName &&
    normalizedAuthorDisplayName &&
    candidateDisplayName.toLowerCase() === normalizedAuthorDisplayName.toLowerCase()
  ) {
    return { preferred: candidateUsername, fallback: '' };
  }

  return { preferred: '', fallback: candidateUsername };
}

/**
 * Extracts username from React props when comment markup omits profile links.
 *
 * Why:
 * Some ChillNet comment variants render display name + avatar only. React props
 * still include the canonical username used by moderation actions.
 *
 * @param {Element} commentItem - Comment root element.
 * @param {string} displayName - Visible comment display name.
 * @returns {string}
 */
function extractUsernameFromReactProps(commentItem, displayName) {
  if (commentItem.hasAttribute(COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE)) {
    return normalizeUsername(
      commentItem.getAttribute(COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE) || ''
    );
  }

  const reactPropsObject = getReactPropsObject(commentItem);
  if (!reactPropsObject) {
    commentItem.setAttribute(COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE, 'true');
    commentItem.setAttribute(COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE, '');
    return '';
  }

  const seenNodes = new WeakSet();
  const nodesToScan = [reactPropsObject];
  let scannedNodeCount = 0;
  let fallbackUsername = '';

  while (nodesToScan.length > 0 && scannedNodeCount < MAX_REACT_PROPS_NODES) {
    const currentNode = nodesToScan.pop();
    if (!currentNode || typeof currentNode !== 'object') {
      continue;
    }

    if (seenNodes.has(currentNode)) {
      continue;
    }

    seenNodes.add(currentNode);
    scannedNodeCount += 1;

    if (Array.isArray(currentNode)) {
      for (const nestedValue of currentNode) {
        if (nestedValue && typeof nestedValue === 'object') {
          nodesToScan.push(nestedValue);
        }
      }
      continue;
    }

    const candidate = selectReactUsernameCandidate(
      /** @type {Record<string, unknown>} */ (currentNode),
      displayName
    );
    if (candidate.preferred) {
      commentItem.setAttribute(COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE, 'true');
      commentItem.setAttribute(COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE, candidate.preferred);
      return candidate.preferred;
    }

    if (!fallbackUsername && candidate.fallback) {
      fallbackUsername = candidate.fallback;
    }

    for (const nestedValue of Object.values(currentNode)) {
      if (nestedValue && typeof nestedValue === 'object') {
        nodesToScan.push(nestedValue);
      }
    }
  }

  commentItem.setAttribute(COMMENT_REACT_USERNAME_SCANNED_ATTRIBUTE, 'true');
  commentItem.setAttribute(COMMENT_REACT_USERNAME_CACHE_ATTRIBUTE, fallbackUsername);
  return fallbackUsername;
}

/**
 * Extracts visible author name text.
 *
 * @param {Element} commentItem - Comment root element.
 * @returns {string}
 */
function extractDisplayName(commentItem) {
  const authorElement = commentItem.querySelector(COMMENT_AUTHOR_SELECTOR);
  if (!authorElement) {
    return '';
  }

  const linkedAuthor = authorElement.querySelector('a[href*="/u/"]');
  if (linkedAuthor) {
    return normalizeWhitespace(linkedAuthor.textContent || '');
  }

  return normalizeWhitespace(authorElement.textContent || '');
}

/**
 * Extracts visible comment body text.
 *
 * @param {Element} commentItem - Comment root element.
 * @returns {string}
 */
function extractCommentText(commentItem) {
  const commentTextElements = Array.from(commentItem.querySelectorAll(COMMENT_TEXT_SELECTOR));
  const textChunks = commentTextElements
    .map((commentTextElement) => normalizeWhitespace(commentTextElement.textContent || ''))
    .filter(Boolean);

  return textChunks.join('\n');
}

/**
 * Extracts canonical comment model used by filtering.
 *
 * Why:
 * Keeping comment parsing isolated from filter evaluation makes the filtering
 * stage deterministic and easier to validate with focused tests.
 *
 * @param {Element} commentItem - Comment root element.
 * @returns {{
 *   username: string,
 *   displayName: string,
 *   textContent: string,
 *   searchText: string
 * }}
 */
function extractCommentModel(commentItem) {
  const displayName = extractDisplayName(commentItem);
  const username =
    extractUsernameFromProfileLink(commentItem) ||
    extractUsernameFromAuthorText(commentItem) ||
    extractUsernameFromReactProps(commentItem, displayName);
  const textContent = extractCommentText(commentItem);

  return {
    username,
    displayName,
    textContent,
    searchText: normalizeWhitespace(`${username} ${displayName} ${textContent}`),
  };
}

module.exports = {
  extractCommentModel,
  extractDisplayName,
  extractUsernameFromAuthorText,
  extractUsernameFromProfileLink,
  extractUsernameFromReactProps,
  getReactPropsObject,
};
