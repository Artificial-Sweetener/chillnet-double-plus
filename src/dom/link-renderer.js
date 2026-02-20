/**
 * @file Auto-link rendering for plain URLs in Chillnet post content.
 */

const { URL_PATTERN, middleElideUrl, parseUrl, trimUrlPunctuation } = require('../core/url-utils');

const LINKIFY_TARGET_SELECTORS = ['.cn-feed-text', '.cn-comment-text', '.cn-poll-title'];

/**
 * Splits text into URL and non-URL segments.
 *
 * @param {string} rawText - Source text value.
 * @returns {Array<{ kind: "text" | "url", value: string, trailing: string }>}
 */
function splitTextIntoUrlParts(rawText) {
  const parts = [];
  let cursor = 0;
  const matches = Array.from(rawText.matchAll(URL_PATTERN));
  for (const match of matches) {
    const fullMatch = match[0];
    const matchIndex = match.index || 0;
    if (matchIndex > cursor) {
      parts.push({
        kind: 'text',
        value: rawText.slice(cursor, matchIndex),
        trailing: '',
      });
    }

    const trimmedUrl = trimUrlPunctuation(fullMatch);
    const trailingText = fullMatch.slice(trimmedUrl.length);
    parts.push({
      kind: 'url',
      value: trimmedUrl,
      trailing: trailingText,
    });

    cursor = matchIndex + fullMatch.length;
  }

  if (cursor < rawText.length) {
    parts.push({
      kind: 'text',
      value: rawText.slice(cursor),
      trailing: '',
    });
  }

  return parts;
}

/**
 * Creates a hyperlink node for URL text.
 *
 * @param {string} urlText - URL string.
 * @returns {HTMLElement | null}
 */
function createAutoLinkNode(urlText) {
  const parsedUrl = parseUrl(urlText);
  if (!parsedUrl) {
    return null;
  }

  const linkElement = globalThis.document.createElement('a');
  linkElement.href = parsedUrl.toString();
  linkElement.target = '_blank';
  linkElement.rel = 'noopener noreferrer';
  linkElement.className = 'cdp-auto-link';
  linkElement.setAttribute('data-cdp-tooltip', parsedUrl.toString());
  linkElement.setAttribute('aria-label', parsedUrl.toString());
  linkElement.textContent = middleElideUrl(parsedUrl.toString(), 58);

  return linkElement;
}

/**
 * Linkifies URLs in a single text node.
 *
 * @param {Text} textNode - Target text node.
 * @returns {boolean}
 */
function linkifyTextNode(textNode) {
  const sourceText = textNode.nodeValue || '';
  if (!URL_PATTERN.test(sourceText)) {
    URL_PATTERN.lastIndex = 0;
    return false;
  }
  URL_PATTERN.lastIndex = 0;

  const fragment = globalThis.document.createDocumentFragment();
  const parts = splitTextIntoUrlParts(sourceText);
  let changed = false;

  for (const part of parts) {
    if (part.kind === 'text') {
      fragment.appendChild(globalThis.document.createTextNode(part.value));
      continue;
    }

    const linkNode = createAutoLinkNode(part.value);
    if (linkNode) {
      fragment.appendChild(linkNode);
      changed = true;
    } else {
      fragment.appendChild(globalThis.document.createTextNode(part.value));
    }

    if (part.trailing) {
      fragment.appendChild(globalThis.document.createTextNode(part.trailing));
    }
  }

  if (!changed) {
    return false;
  }

  textNode.parentNode.replaceChild(fragment, textNode);
  return true;
}

/**
 * Linkifies plain URLs for supported content blocks within post card.
 *
 * Why:
 * Linkification is isolated from extraction/filtering so content processing
 * remains deterministic while presentation evolves independently.
 *
 * @param {Element} postCard - Target post card.
 * @returns {void}
 */
function linkifyPostContent(postCard) {
  for (const selector of LINKIFY_TARGET_SELECTORS) {
    const contentContainers = Array.from(postCard.querySelectorAll(selector));
    for (const contentContainer of contentContainers) {
      const walker = globalThis.document.createTreeWalker(
        contentContainer,
        globalThis.NodeFilter.SHOW_TEXT
      );
      const textNodes = [];
      let currentNode = walker.nextNode();
      while (currentNode) {
        if (currentNode.parentElement && !currentNode.parentElement.closest('a')) {
          textNodes.push(currentNode);
        }
        currentNode = walker.nextNode();
      }

      for (const textNode of textNodes) {
        linkifyTextNode(textNode);
      }
    }
  }
}

module.exports = {
  linkifyPostContent,
  splitTextIntoUrlParts,
};
