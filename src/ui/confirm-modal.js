/**
 * @file Generic confirmation modal controller.
 */

/**
 * Creates reusable confirmation modal instance.
 *
 * Why:
 * Multiple flows (block user, unblock chip) need consistent guarded actions
 * without duplicating modal state and lifecycle wiring.
 *
 * @param {{
 *   overlayId: string,
 *   panelId: string,
 *   title: string,
 *   cancelLabel: string,
 *   confirmLabel: string,
 *   confirmButtonClass?: string,
 *   formatMessage: (payload: unknown) => string,
 *   onConfirm: (payload: unknown) => Promise<void>
 * }} options - Modal configuration.
 * @returns {{
 *   open: (payload: unknown) => void,
 *   close: () => void
 * }}
 */
function createConfirmModal(options) {
  const overlayElement = globalThis.document.createElement('div');
  overlayElement.id = options.overlayId;
  overlayElement.className = 'cdp-confirm-overlay';
  overlayElement.hidden = true;
  overlayElement.innerHTML = `
    <section id="${options.panelId}" class="cdp-confirm-panel" role="dialog" aria-modal="true" aria-labelledby="${options.panelId}-title">
      <h3 id="${options.panelId}-title">${options.title}</h3>
      <p class="cdp-confirm-text" data-cdp-confirm-message></p>
      <div class="cdp-confirm-actions">
        <button type="button" class="cdp-confirm-btn" data-cdp-confirm-cancel>${options.cancelLabel}</button>
        <button type="button" class="cdp-confirm-btn ${options.confirmButtonClass || ''}" data-cdp-confirm-confirm>${options.confirmLabel}</button>
      </div>
    </section>
  `;

  const messageElement = /** @type {HTMLElement} */ (
    overlayElement.querySelector('[data-cdp-confirm-message]')
  );
  const cancelButton = /** @type {HTMLButtonElement} */ (
    overlayElement.querySelector('[data-cdp-confirm-cancel]')
  );
  const confirmButton = /** @type {HTMLButtonElement} */ (
    overlayElement.querySelector('[data-cdp-confirm-confirm]')
  );

  let pendingPayload = null;
  let isSaving = false;

  /**
   * Ensures modal overlay remains attached after host SPA re-renders.
   *
   * @returns {void}
   */
  function ensureMounted() {
    if (!globalThis.document || !globalThis.document.body) {
      return;
    }

    if (overlayElement.parentElement !== globalThis.document.body) {
      globalThis.document.body.appendChild(overlayElement);
    }
  }

  /**
   * Closes modal when not in active confirm transition.
   *
   * @returns {void}
   */
  function close() {
    if (isSaving) {
      return;
    }

    overlayElement.hidden = true;
    pendingPayload = null;
  }

  /**
   * Opens modal for provided payload.
   *
   * @param {unknown} payload - Context payload for confirm callback.
   * @returns {void}
   */
  function open(payload) {
    ensureMounted();
    pendingPayload = payload;
    messageElement.textContent = options.formatMessage(payload);
    overlayElement.hidden = false;
    cancelButton.focus();
  }

  overlayElement.addEventListener('click', (event) => {
    if (event.target === overlayElement) {
      close();
    }
  });

  globalThis.document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlayElement.hidden) {
      close();
    }
  });

  cancelButton.addEventListener('click', close);

  confirmButton.addEventListener('click', async () => {
    if (pendingPayload === null || isSaving) {
      return;
    }

    isSaving = true;
    confirmButton.disabled = true;
    cancelButton.disabled = true;
    try {
      await options.onConfirm(pendingPayload);
      overlayElement.hidden = true;
      pendingPayload = null;
    } finally {
      isSaving = false;
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    }
  });

  ensureMounted();

  return {
    close,
    open,
  };
}

module.exports = {
  createConfirmModal,
};
