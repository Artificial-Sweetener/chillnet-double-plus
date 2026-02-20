/**
 * @file URL parsing and normalization utilities shared across features.
 */

const URL_PATTERN = /https?:\/\/[^\s<>"')\]]+/gi;

/**
 * Safely parses URL string.
 *
 * @param {string} rawUrl - Candidate URL string.
 * @returns {URL | null}
 */
function parseUrl(rawUrl) {
  try {
    return new URL(rawUrl);
  } catch (_error) {
    return null;
  }
}

/**
 * Trims punctuation that frequently appears adjacent to URLs in prose.
 *
 * @param {string} rawUrl - Candidate URL string.
 * @returns {string}
 */
function trimUrlPunctuation(rawUrl) {
  return rawUrl.replace(/[),.!?]+$/g, '');
}

/**
 * Returns true when URL belongs to Chillnet host.
 *
 * @param {URL} parsedUrl - Parsed URL instance.
 * @returns {boolean}
 */
function isChillnetUrl(parsedUrl) {
  return /(^|\.)chillnet\.me$/i.test(parsedUrl.hostname);
}

/**
 * Creates one-line middle-ellided URL label.
 *
 * Why:
 * URLs in post text can be very long and break visual rhythm. Middle elision
 * preserves useful start/end context while keeping lines compact.
 *
 * @param {string} urlText - Full URL string.
 * @param {number} maxChars - Maximum rendered characters.
 * @returns {string}
 */
function middleElideUrl(urlText, maxChars) {
  if (urlText.length <= maxChars) {
    return urlText;
  }

  const safeMax = Math.max(18, maxChars);
  const headChars = Math.floor((safeMax - 1) * 0.62);
  const tailChars = safeMax - 1 - headChars;
  return `${urlText.slice(0, headChars)}…${urlText.slice(-tailChars)}`;
}

module.exports = {
  URL_PATTERN,
  isChillnetUrl,
  middleElideUrl,
  parseUrl,
  trimUrlPunctuation,
};
