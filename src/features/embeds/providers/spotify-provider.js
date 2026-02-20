/**
 * @file Spotify embed resolution.
 */

const SPOTIFY_EMBED_TYPES = new Set(['track', 'album', 'playlist', 'episode', 'show']);
const SPOTIFY_COMPACT_TYPES = new Set(['track', 'episode']);

/**
 * Resolves embed payload from parsed Spotify URL.
 *
 * @param {URL} parsedUrl - Parsed URL candidate.
 * @returns {{ embedType: string, embedId: string } | null}
 */
function extractSpotifyEmbedPayload(parsedUrl) {
  const hostname = parsedUrl.hostname.toLowerCase();
  if (!hostname.endsWith('open.spotify.com')) {
    return null;
  }

  const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
  if (pathSegments.length < 2) {
    return null;
  }

  const normalizedSegments = pathSegments[0].toLowerCase().startsWith('intl-')
    ? pathSegments.slice(1)
    : pathSegments;
  if (normalizedSegments.length < 2) {
    return null;
  }

  const embedType = normalizedSegments[0].toLowerCase();
  const embedId = normalizedSegments[1];
  if (!SPOTIFY_EMBED_TYPES.has(embedType)) {
    return null;
  }

  const sanitizedEmbedId = embedId.replace(/[^A-Za-z0-9]/g, '');
  if (!sanitizedEmbedId) {
    return null;
  }

  return {
    embedType,
    embedId: sanitizedEmbedId,
  };
}

/**
 * Computes iframe height for Spotify embed type.
 *
 * @param {string} embedType - Spotify embed type.
 * @returns {number}
 */
function resolveSpotifyFrameHeight(embedType) {
  return SPOTIFY_COMPACT_TYPES.has(embedType) ? 152 : 352;
}

/**
 * Resolves a Spotify embed descriptor from URL when supported.
 *
 * @param {string} sourceUrl - External URL candidate.
 * @returns {{
 *   key: string,
 *   kind: "spotify",
 *   sourceUrl: string,
 *   embedUrl: string,
 *   frameHeight: number,
 *   title: string
 * } | null}
 */
function resolveSpotifyEmbed(sourceUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(sourceUrl);
  } catch (_error) {
    return null;
  }

  const payload = extractSpotifyEmbedPayload(parsedUrl);
  if (!payload) {
    return null;
  }

  return {
    key: `spotify:${payload.embedType}:${payload.embedId}`,
    kind: 'spotify',
    sourceUrl: parsedUrl.toString(),
    embedUrl: `https://open.spotify.com/embed/${payload.embedType}/${payload.embedId}`,
    frameHeight: resolveSpotifyFrameHeight(payload.embedType),
    title: `Spotify ${payload.embedType}`,
  };
}

module.exports = {
  extractSpotifyEmbedPayload,
  resolveSpotifyEmbed,
  resolveSpotifyFrameHeight,
};
