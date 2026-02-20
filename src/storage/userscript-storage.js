/**
 * @file Cross-manager preference storage adapter.
 */

/**
 * Reads a value from userscript or local storage.
 *
 * Why:
 * Different managers expose sync and async APIs with slightly different names.
 * This adapter hides those differences and guarantees a Promise-based contract.
 *
 * @param {string} key - Storage key.
 * @param {unknown} fallbackValue - Value returned when no stored value exists.
 * @returns {Promise<unknown>}
 */
async function getValue(key, fallbackValue) {
  const gm = globalThis.GM;
  if (gm && typeof gm.getValue === 'function') {
    return gm.getValue(key, fallbackValue);
  }

  const legacyGetter = globalThis.GM_getValue;
  if (typeof legacyGetter === 'function') {
    return legacyGetter(key, fallbackValue);
  }

  try {
    const rawValue = globalThis.localStorage.getItem(key);
    if (rawValue === null) {
      return fallbackValue;
    }
    return JSON.parse(rawValue);
  } catch (_error) {
    return fallbackValue;
  }
}

/**
 * Writes a value to userscript or local storage.
 *
 * Why:
 * Single-path writes keep persistence behavior deterministic and avoid accidental
 * divergence between managers.
 *
 * @param {string} key - Storage key.
 * @param {unknown} value - Serializable value.
 * @returns {Promise<void>}
 */
async function setValue(key, value) {
  const gm = globalThis.GM;
  if (gm && typeof gm.setValue === 'function') {
    await gm.setValue(key, value);
    return;
  }

  const legacySetter = globalThis.GM_setValue;
  if (typeof legacySetter === 'function') {
    legacySetter(key, value);
    return;
  }

  try {
    globalThis.localStorage.setItem(key, JSON.stringify(value));
  } catch (_error) {
    // Persistence failure should not break page behavior.
  }
}

module.exports = {
  getValue,
  setValue,
};
