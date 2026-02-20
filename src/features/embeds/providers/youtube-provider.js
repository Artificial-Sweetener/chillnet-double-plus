/**
 * @file YouTube embed resolution.
 */

/**
 * Extracts YouTube video ID from URL.
 *
 * @param {URL} parsedUrl - Parsed URL candidate.
 * @returns {string}
 */
function extractYoutubeVideoId(parsedUrl) {
  const hostname = parsedUrl.hostname.toLowerCase();
  if (hostname === 'youtu.be') {
    return parsedUrl.pathname.replace(/^\/+/, '').split('/')[0] || '';
  }

  if (hostname.endsWith('youtube.com')) {
    if (parsedUrl.pathname === '/watch') {
      return parsedUrl.searchParams.get('v') || '';
    }

    const embedMatch = parsedUrl.pathname.match(/^\/(?:embed|shorts)\/([^/?#]+)/i);
    if (embedMatch) {
      return embedMatch[1];
    }
  }

  return '';
}

/**
 * Resolves a YouTube embed descriptor from URL when supported.
 *
 * @param {string} sourceUrl - External URL candidate.
 * @returns {{
 *   key: string,
 *   kind: "youtube",
 *   sourceUrl: string,
 *   embedUrl: string
 * } | null}
 */
function resolveYoutubeEmbed(sourceUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(sourceUrl);
  } catch (_error) {
    return null;
  }

  const videoId = extractYoutubeVideoId(parsedUrl);
  if (!videoId) {
    return null;
  }

  const sanitizedVideoId = videoId.replace(/[^A-Za-z0-9_-]/g, '');
  if (!sanitizedVideoId) {
    return null;
  }

  return {
    key: `youtube:${sanitizedVideoId}`,
    kind: 'youtube',
    sourceUrl: parsedUrl.toString(),
    embedUrl: `https://www.youtube-nocookie.com/embed/${sanitizedVideoId}`,
  };
}

module.exports = {
  resolveYoutubeEmbed,
};
