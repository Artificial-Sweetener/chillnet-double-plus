/**
 * @file Confirmation modal for inline block-user actions.
 */

const { createConfirmModal } = require('./confirm-modal');

/**
 * Resolves compact label for block target display.
 *
 * @param {{ username: string, displayName: string }} blockTarget - Target user.
 * @returns {string}
 */
function resolveTargetLabel(blockTarget) {
  const username = String(blockTarget.username || '')
    .replace(/^@+/, '')
    .trim();
  if (username) {
    return `@${username}`;
  }

  const displayName = String(blockTarget.displayName || '').trim();
  return displayName || 'this user';
}

/**
 * Creates reusable block-confirmation modal controller.
 *
 * Why:
 * Inline block buttons sit near high-frequency reply actions. A confirmation
 * boundary prevents accidental moderation actions without polluting stage logic.
 *
 * @param {{
 *   onConfirm: (blockTarget: { username: string, displayName: string, sourceKind: string }) => Promise<void>
 * }} options - Modal behavior options.
 * @returns {{
 *   open: (blockTarget: { username: string, displayName: string, sourceKind: string }) => void,
 *   close: () => void
 * }}
 */
function createBlockUserModal(options) {
  return createConfirmModal({
    overlayId: 'cdp-block-confirm-overlay',
    panelId: 'cdp-block-confirm-panel',
    title: 'Block user?',
    cancelLabel: 'Nevermind',
    confirmLabel: 'Block and Filter',
    confirmButtonClass: 'is-danger',
    formatMessage: (blockTarget) =>
      `Add ${resolveTargetLabel(
        /** @type {{ username: string, displayName: string }} */ (blockTarget)
      )} to blocked users?`,
    onConfirm: async (blockTarget) => {
      await options.onConfirm(
        /** @type {{ username: string, displayName: string, sourceKind: string }} */ (blockTarget)
      );
    },
  });
}

module.exports = {
  createBlockUserModal,
};
