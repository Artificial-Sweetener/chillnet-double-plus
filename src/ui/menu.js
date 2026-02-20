/**
 * @file Userscript manager menu command helpers.
 */

/**
 * Registers command against available userscript API.
 *
 * @param {string} label - Menu command label.
 * @param {() => void | Promise<void>} onSelect - Command callback.
 * @returns {void}
 */
function registerMenuCommand(label, onSelect) {
  const gm = globalThis.GM;
  if (gm && typeof gm.registerMenuCommand === 'function') {
    gm.registerMenuCommand(label, onSelect);
    return;
  }

  const legacyRegister = globalThis.GM_registerMenuCommand;
  if (typeof legacyRegister === 'function') {
    legacyRegister(label, onSelect);
  }
}

module.exports = {
  registerMenuCommand,
};
