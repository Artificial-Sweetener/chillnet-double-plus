/**
 * @file Persistence adapter for Chillnet Double Plus settings.
 */

const { getValue, setValue } = require('./userscript-storage');
const {
  LEGACY_DARK_MODE_KEY,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
} = require('./settings-schema');

/**
 * Creates a settings repository abstraction for runtime usage.
 *
 * Why:
 * Encapsulating storage behavior behind this boundary isolates migration and
 * serialization concerns from feature logic.
 *
 * @returns {{
 *   load: () => Promise<object>,
 *   save: (nextSettings: unknown) => Promise<object>,
 *   normalize: (nextSettings: unknown) => object
 * }}
 */
function createSettingsStore() {
  /**
   * Loads, normalizes, and persists settings.
   *
   * @returns {Promise<object>}
   */
  async function load() {
    const [storedSettings, legacyThemePreference] = await Promise.all([
      getValue(SETTINGS_STORAGE_KEY, null),
      getValue(LEGACY_DARK_MODE_KEY, null),
    ]);

    const normalizedSettings = normalizeSettings(storedSettings, legacyThemePreference);
    await setValue(SETTINGS_STORAGE_KEY, normalizedSettings);
    return normalizedSettings;
  }

  /**
   * Normalizes and saves settings.
   *
   * @param {unknown} nextSettings - Candidate settings object.
   * @returns {Promise<object>}
   */
  async function save(nextSettings) {
    const normalizedSettings = normalizeSettings(nextSettings, null);
    await setValue(SETTINGS_STORAGE_KEY, normalizedSettings);
    return normalizedSettings;
  }

  /**
   * Normalizes settings without persistence.
   *
   * @param {unknown} nextSettings - Candidate settings object.
   * @returns {object}
   */
  function normalize(nextSettings) {
    return normalizeSettings(nextSettings, null);
  }

  return {
    load,
    save,
    normalize,
  };
}

module.exports = {
  createSettingsStore,
};
