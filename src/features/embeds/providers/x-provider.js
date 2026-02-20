/**
 * @file X (Twitter) embed resolution.
 */

/**
 * Extracts X status ID from parsed URL.
 *
 * @param {URL} parsedUrl - Parsed URL candidate.
 * @returns {string}
 */
function extractXPostId(parsedUrl) {
  const hostname = parsedUrl.hostname.toLowerCase();
  if (!hostname.endsWith('x.com') && !hostname.endsWith('twitter.com')) {
    return '';
  }

  const statusMatch = parsedUrl.pathname.match(/\/status\/([0-9]{6,25})/i);
  if (!statusMatch) {
    return '';
  }

  return statusMatch[1];
}

/**
 * Resolves an X embed descriptor from URL when supported.
 *
 * @param {string} sourceUrl - External URL candidate.
 * @returns {{
 *   key: string,
 *   kind: "x",
 *   sourceUrl: string,
 *   embedUrl: string,
 *   frameHeight: number,
 *   title: string
 * } | null}
 */
function resolveXEmbed(sourceUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(sourceUrl);
  } catch (_error) {
    return null;
  }

  const postId = extractXPostId(parsedUrl);
  if (!postId) {
    return null;
  }

  const queryParams = new URLSearchParams({
    id: postId,
    dnt: 'true',
  });

  return {
    key: `x:${postId}`,
    kind: 'x',
    sourceUrl: parsedUrl.toString(),
    embedUrl: `https://platform.twitter.com/embed/Tweet.html?${queryParams.toString()}`,
    frameHeight: 560,
    title: 'X post preview',
  };
}

module.exports = {
  extractXPostId,
  resolveXEmbed,
};
