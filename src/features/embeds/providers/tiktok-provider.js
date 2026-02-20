/**
 * @file TikTok embed resolution.
 */

/**
 * Extracts TikTok video ID from parsed URL.
 *
 * @param {URL} parsedUrl - Parsed URL candidate.
 * @returns {string}
 */
function extractTiktokVideoId(parsedUrl) {
  const hostname = parsedUrl.hostname.toLowerCase();
  if (!hostname.endsWith('tiktok.com')) {
    return '';
  }

  const videoPathMatch = parsedUrl.pathname.match(/\/video\/([0-9]{8,25})/i);
  if (videoPathMatch) {
    return videoPathMatch[1];
  }

  const embedPathMatch = parsedUrl.pathname.match(/\/embed\/v2\/([0-9]{8,25})/i);
  if (embedPathMatch) {
    return embedPathMatch[1];
  }

  return '';
}

/**
 * Resolves a TikTok embed descriptor from URL when supported.
 *
 * @param {string} sourceUrl - External URL candidate.
 * @returns {{
 *   key: string,
 *   kind: "tiktok",
 *   sourceUrl: string,
 *   embedUrl: string,
 *   frameHeight: number,
 *   title: string
 * } | null}
 */
function resolveTiktokEmbed(sourceUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(sourceUrl);
  } catch (_error) {
    return null;
  }

  const videoId = extractTiktokVideoId(parsedUrl);
  if (!videoId) {
    return null;
  }

  const queryParams = new URLSearchParams({
    controls: '1',
    description: '1',
    music_info: '1',
  });

  return {
    key: `tiktok:${videoId}`,
    kind: 'tiktok',
    sourceUrl: parsedUrl.toString(),
    embedUrl: `https://www.tiktok.com/player/v1/${videoId}?${queryParams.toString()}`,
    frameHeight: 760,
    title: 'TikTok video preview',
  };
}

module.exports = {
  extractTiktokVideoId,
  resolveTiktokEmbed,
};
