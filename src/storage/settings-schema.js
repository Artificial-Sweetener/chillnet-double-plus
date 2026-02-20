/**
 * @file Schema and normalization logic for Chillnet Double Plus settings.
 */

const {
  DARK_THEME_ID,
  DEFAULT_THEME_ID,
  ORIGINAL_THEME_ID,
  isValidThemeId,
} = require('../theme/theme-registry');

const SETTINGS_SCHEMA_VERSION = 1;
const LEGACY_DARK_MODE_KEY = 'chillnetDarkModePreference';
const SETTINGS_STORAGE_KEY = 'cdp:settings';

/**
 * Creates the default settings object.
 *
 * Why:
 * A single default constructor prevents drift across initialization, migration,
 * and reset flows.
 *
 * @returns {object}
 */
function createDefaultSettings() {
  return {
    schemaVersion: SETTINGS_SCHEMA_VERSION,
    theme: {
      id: DEFAULT_THEME_ID,
    },
    filters: {
      enabled: true,
      blockedUsers: [],
      blockedPhrases: [],
    },
    embeds: {
      enabled: true,
      image: true,
      reddit: true,
      spotify: true,
      tiktok: true,
      x: true,
      youtube: true,
      maxPerPost: 3,
    },
  };
}

/**
 * Normalizes a value into a finite integer bounded by [minValue, maxValue].
 *
 * @param {unknown} rawValue - Candidate numeric value.
 * @param {number} fallbackValue - Used when parsing fails.
 * @param {number} minValue - Inclusive minimum.
 * @param {number} maxValue - Inclusive maximum.
 * @returns {number}
 */
function normalizeBoundedInteger(rawValue, fallbackValue, minValue, maxValue) {
  const parsedValue = Number.parseInt(String(rawValue), 10);
  if (!Number.isFinite(parsedValue)) {
    return fallbackValue;
  }

  return Math.min(maxValue, Math.max(minValue, parsedValue));
}

/**
 * Returns a sanitized, unique list of non-empty strings.
 *
 * @param {unknown} rawValue - Candidate list-like value.
 * @returns {string[]}
 */
function normalizeStringList(rawValue) {
  if (!Array.isArray(rawValue)) {
    return [];
  }

  const normalizedSet = new Set();
  for (const entry of rawValue) {
    const normalizedEntry = String(entry === null || entry === undefined ? '' : entry).trim();
    if (!normalizedEntry) {
      continue;
    }
    normalizedSet.add(normalizedEntry);
  }

  return Array.from(normalizedSet);
}

/**
 * Resolves theme id with migration from legacy boolean and key values.
 *
 * @param {Record<string, unknown>} themeCandidate - Candidate theme object.
 * @param {unknown} legacyThemePreference - Legacy dark mode preference.
 * @param {string} fallbackThemeId - Fallback theme id.
 * @returns {string}
 */
function resolveThemeId(themeCandidate, legacyThemePreference, fallbackThemeId) {
  if (isValidThemeId(themeCandidate.id)) {
    return themeCandidate.id;
  }

  if (typeof themeCandidate.enabled === 'boolean') {
    return themeCandidate.enabled ? DARK_THEME_ID : ORIGINAL_THEME_ID;
  }

  if (legacyThemePreference === 'enabled') {
    return DARK_THEME_ID;
  }

  if (legacyThemePreference === 'disabled') {
    return ORIGINAL_THEME_ID;
  }

  return fallbackThemeId;
}

/**
 * Normalizes unknown settings input and applies migration from legacy keys.
 *
 * Why:
 * Userscript storage is mutable by users and can include stale versions. This
 * function enforces a trusted in-memory shape for all runtime behavior.
 *
 * @param {unknown} rawSettings - Stored settings candidate.
 * @param {unknown} legacyThemePreference - Legacy dark mode preference value.
 * @returns {object}
 */
function normalizeSettings(rawSettings, legacyThemePreference) {
  const defaults = createDefaultSettings();
  const settingsCandidate =
    rawSettings && typeof rawSettings === 'object'
      ? /** @type {Record<string, unknown>} */ (rawSettings)
      : {};
  const themeCandidate =
    settingsCandidate.theme && typeof settingsCandidate.theme === 'object'
      ? /** @type {Record<string, unknown>} */ (settingsCandidate.theme)
      : {};
  const filtersCandidate =
    settingsCandidate.filters && typeof settingsCandidate.filters === 'object'
      ? /** @type {Record<string, unknown>} */ (settingsCandidate.filters)
      : {};
  const embedsCandidate =
    settingsCandidate.embeds && typeof settingsCandidate.embeds === 'object'
      ? /** @type {Record<string, unknown>} */ (settingsCandidate.embeds)
      : {};

  return {
    schemaVersion: SETTINGS_SCHEMA_VERSION,
    theme: {
      id: resolveThemeId(themeCandidate, legacyThemePreference, defaults.theme.id),
    },
    filters: {
      enabled:
        typeof filtersCandidate.enabled === 'boolean'
          ? filtersCandidate.enabled
          : defaults.filters.enabled,
      blockedUsers: normalizeStringList(filtersCandidate.blockedUsers),
      blockedPhrases: normalizeStringList(filtersCandidate.blockedPhrases),
    },
    embeds: {
      enabled:
        typeof embedsCandidate.enabled === 'boolean'
          ? embedsCandidate.enabled
          : defaults.embeds.enabled,
      image:
        typeof embedsCandidate.image === 'boolean' ? embedsCandidate.image : defaults.embeds.image,
      reddit:
        typeof embedsCandidate.reddit === 'boolean'
          ? embedsCandidate.reddit
          : defaults.embeds.reddit,
      spotify:
        typeof embedsCandidate.spotify === 'boolean'
          ? embedsCandidate.spotify
          : defaults.embeds.spotify,
      tiktok:
        typeof embedsCandidate.tiktok === 'boolean'
          ? embedsCandidate.tiktok
          : defaults.embeds.tiktok,
      x: typeof embedsCandidate.x === 'boolean' ? embedsCandidate.x : defaults.embeds.x,
      youtube:
        typeof embedsCandidate.youtube === 'boolean'
          ? embedsCandidate.youtube
          : defaults.embeds.youtube,
      maxPerPost: normalizeBoundedInteger(
        embedsCandidate.maxPerPost,
        defaults.embeds.maxPerPost,
        1,
        6
      ),
    },
  };
}

module.exports = {
  LEGACY_DARK_MODE_KEY,
  SETTINGS_SCHEMA_VERSION,
  SETTINGS_STORAGE_KEY,
  createDefaultSettings,
  normalizeSettings,
};
