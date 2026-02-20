/**
 * @file Body-ready synchronization helper.
 */

/**
 * Runs callback once document body is available.
 *
 * Why:
 * Userscripts execute at `document-start`, and body-dependent features should
 * initialize only when host containers exist.
 *
 * @param {() => void} onReady - Callback invoked when body is ready.
 * @returns {void}
 */
function whenBodyReady(onReady) {
  if (globalThis.document && globalThis.document.body) {
    onReady();
    return;
  }

  const onReadyStateChange = () => {
    if (globalThis.document && globalThis.document.body) {
      globalThis.document.removeEventListener('readystatechange', onReadyStateChange);
      onReady();
    }
  };

  globalThis.document.addEventListener('readystatechange', onReadyStateChange);
}

module.exports = {
  whenBodyReady,
};
