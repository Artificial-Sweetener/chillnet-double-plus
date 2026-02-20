/**
 * @file Image embed resolution.
 */

const IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|png|webp)$/i;

/**
 * Resolves an image embed descriptor from URL when supported.
 *
 * @param {string} sourceUrl - External URL candidate.
 * @returns {{
 *   key: string,
 *   kind: "image",
 *   sourceUrl: string
 * } | null}
 */
function resolveImageEmbed(sourceUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(sourceUrl);
  } catch (_error) {
    return null;
  }

  if (!IMAGE_EXTENSIONS.test(parsedUrl.pathname)) {
    return null;
  }

  return {
    key: `image:${parsedUrl.toString()}`,
    kind: 'image',
    sourceUrl: parsedUrl.toString(),
  };
}

module.exports = {
  resolveImageEmbed,
};
