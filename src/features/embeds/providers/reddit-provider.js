/**
 * @file Reddit embed resolution.
 */

const REDDIT_HOST_SUFFIX = 'reddit.com';
const REDDIT_SHORT_HOST = 'redd.it';

/**
 * Returns true when URL host belongs to Reddit.
 *
 * @param {string} hostname - Parsed hostname.
 * @returns {boolean}
 */
function isRedditHostname(hostname) {
  return (
    hostname === REDDIT_SHORT_HOST ||
    hostname.endsWith(`.${REDDIT_HOST_SUFFIX}`) ||
    hostname === REDDIT_HOST_SUFFIX
  );
}

/**
 * Builds canonical reddit path suitable for redditmedia embeds.
 *
 * @param {URL} parsedUrl - Parsed URL candidate.
 * @returns {string}
 */
function extractRedditEmbedPath(parsedUrl) {
  const hostname = parsedUrl.hostname.toLowerCase();
  if (!isRedditHostname(hostname)) {
    return '';
  }

  if (hostname === REDDIT_SHORT_HOST) {
    const shortId = parsedUrl.pathname.replace(/^\/+/, '').split('/')[0] || '';
    const sanitizedShortId = shortId.replace(/[^A-Za-z0-9]/g, '');
    if (!sanitizedShortId) {
      return '';
    }
    return `/comments/${sanitizedShortId}/`;
  }

  if (!/\/comments\/[A-Za-z0-9]+/i.test(parsedUrl.pathname)) {
    return '';
  }

  return `${parsedUrl.pathname.replace(/\/+$/, '')}/`;
}

/**
 * Resolves a Reddit embed descriptor from URL when supported.
 *
 * @param {string} sourceUrl - External URL candidate.
 * @returns {{
 *   key: string,
 *   kind: "reddit",
 *   sourceUrl: string,
 *   embedUrl: string,
 *   frameHeight: number,
 *   title: string
 * } | null}
 */
function resolveRedditEmbed(sourceUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(sourceUrl);
  } catch (_error) {
    return null;
  }

  const embedPath = extractRedditEmbedPath(parsedUrl);
  if (!embedPath) {
    return null;
  }

  const queryParams = new URLSearchParams({
    embed: 'true',
    ref: 'share',
    ref_source: 'embed',
    showmedia: 'true',
  });

  return {
    key: `reddit:${embedPath.toLowerCase()}`,
    kind: 'reddit',
    sourceUrl: parsedUrl.toString(),
    embedUrl: `https://www.redditmedia.com${embedPath}?${queryParams.toString()}`,
    frameHeight: 520,
    title: 'Reddit post preview',
  };
}

module.exports = {
  extractRedditEmbedPath,
  resolveRedditEmbed,
};
