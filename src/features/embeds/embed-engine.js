/**
 * @file Embed descriptor resolution pipeline.
 */

const { resolveImageEmbed } = require('./providers/image-provider');
const { resolveRedditEmbed } = require('./providers/reddit-provider');
const { resolveSpotifyEmbed } = require('./providers/spotify-provider');
const { resolveTiktokEmbed } = require('./providers/tiktok-provider');
const { resolveXEmbed } = require('./providers/x-provider');
const { resolveYoutubeEmbed } = require('./providers/youtube-provider');

/**
 * Resolves embeds for a post model according to settings.
 *
 * Why:
 * Provider orchestration belongs in a dedicated engine so URL parsing rules and
 * feature toggles remain isolated from rendering concerns.
 *
 * @param {{
 *   externalUrls: string[]
 * }} postModel - Canonical post model.
 * @param {{
 *   enabled: boolean,
 *   image: boolean,
 *   reddit: boolean,
 *   spotify: boolean,
 *   tiktok: boolean,
 *   x: boolean,
 *   youtube: boolean,
 *   maxPerPost: number
 * }} embedSettings - Embed settings.
 * @returns {Array<object>}
 */
function resolveEmbedDescriptors(postModel, embedSettings) {
  if (!embedSettings.enabled) {
    return [];
  }

  const descriptors = [];
  const seenKeys = new Set();
  const maxEmbeds = Math.max(1, Math.min(6, embedSettings.maxPerPost));

  for (const externalUrl of postModel.externalUrls) {
    if (descriptors.length >= maxEmbeds) {
      break;
    }

    let descriptor = null;
    if (embedSettings.youtube) {
      descriptor = resolveYoutubeEmbed(externalUrl);
    }

    if (!descriptor && embedSettings.spotify) {
      descriptor = resolveSpotifyEmbed(externalUrl);
    }

    if (!descriptor && embedSettings.x) {
      descriptor = resolveXEmbed(externalUrl);
    }

    if (!descriptor && embedSettings.reddit) {
      descriptor = resolveRedditEmbed(externalUrl);
    }

    if (!descriptor && embedSettings.tiktok) {
      descriptor = resolveTiktokEmbed(externalUrl);
    }

    if (!descriptor && embedSettings.image) {
      descriptor = resolveImageEmbed(externalUrl);
    }

    if (!descriptor || seenKeys.has(descriptor.key)) {
      continue;
    }

    seenKeys.add(descriptor.key);
    descriptors.push(descriptor);
  }

  return descriptors;
}

module.exports = {
  resolveEmbedDescriptors,
};
