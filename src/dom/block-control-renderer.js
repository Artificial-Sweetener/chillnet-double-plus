/**
 * @file Render primitives for inline user block controls.
 */

const BLOCK_CONTROL_CLASS = 'cdp-inline-block-user-btn';
const BLOCK_CONTROL_MARKER_ATTRIBUTE = 'data-cdp-inline-block-control';

/**
 * Creates action button element for a block target.
 *
 * @returns {HTMLButtonElement}
 */
function createBlockControlButton() {
  const buttonElement = globalThis.document.createElement('button');
  buttonElement.type = 'button';
  buttonElement.className = BLOCK_CONTROL_CLASS;
  buttonElement.setAttribute(BLOCK_CONTROL_MARKER_ATTRIBUTE, 'true');
  return buttonElement;
}

/**
 * Returns stable user label for tooltip and aria strings.
 *
 * @param {{ username: string, displayName: string }} blockTarget - Action target.
 * @returns {string}
 */
function resolveUserLabel(blockTarget) {
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
 * Updates and inserts block-control button into a header action container.
 *
 * Why:
 * A dedicated renderer keeps idempotent DOM updates isolated from filter-stage
 * orchestration and prevents duplicated controls across mutation passes.
 *
 * @param {{
 *   container: Element | null,
 *   beforeElement: Element | null,
 *   hidden?: boolean,
 *   blockTarget: { username: string, displayName: string, sourceKind: string },
 *   blocked: boolean,
 *   onRequestBlockUser: (blockTarget: { username: string, displayName: string, sourceKind: string }) => void
 * }} options - Render options.
 * @returns {void}
 */
function syncInlineBlockControl(options) {
  const { container, beforeElement, hidden, blockTarget, blocked, onRequestBlockUser } = options;
  if (!container) {
    return;
  }

  const userLabel = resolveUserLabel(blockTarget);
  if (userLabel === 'this user') {
    const staleButton = container.querySelector(`[${BLOCK_CONTROL_MARKER_ATTRIBUTE}="true"]`);
    if (staleButton) {
      staleButton.remove();
    }
    return;
  }

  if (hidden === true) {
    const staleButton = container.querySelector(`[${BLOCK_CONTROL_MARKER_ATTRIBUTE}="true"]`);
    if (staleButton) {
      staleButton.remove();
    }
    return;
  }

  let buttonElement = /** @type {HTMLButtonElement | null} */ (
    container.querySelector(`[${BLOCK_CONTROL_MARKER_ATTRIBUTE}="true"]`)
  );
  if (!buttonElement) {
    buttonElement = createBlockControlButton();
    buttonElement.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (buttonElement.disabled) {
        return;
      }

      onRequestBlockUser({
        username: buttonElement.dataset.cdpBlockUsername || '',
        displayName: buttonElement.dataset.cdpBlockDisplayName || '',
        sourceKind: buttonElement.dataset.cdpBlockSourceKind || 'post',
      });
    });
  }

  buttonElement.dataset.cdpBlockUsername = String(blockTarget.username || '');
  buttonElement.dataset.cdpBlockDisplayName = String(blockTarget.displayName || '');
  buttonElement.dataset.cdpBlockSourceKind = String(blockTarget.sourceKind || 'post');
  buttonElement.dataset.cdpBlockState = blocked ? 'blocked' : 'ready';
  buttonElement.disabled = blocked;
  buttonElement.textContent = blocked ? 'Blocked' : 'Block';
  buttonElement.setAttribute(
    'aria-label',
    blocked ? `${userLabel} is already blocked` : `Block ${userLabel}`
  );
  buttonElement.title = blocked ? `${userLabel} is already in blocked users` : `Block ${userLabel}`;

  if (
    beforeElement &&
    beforeElement.parentElement === container &&
    buttonElement.nextElementSibling !== beforeElement
  ) {
    container.insertBefore(buttonElement, beforeElement);
    return;
  }

  if (buttonElement.parentElement !== container) {
    container.prepend(buttonElement);
  }
}

module.exports = {
  BLOCK_CONTROL_CLASS,
  BLOCK_CONTROL_MARKER_ATTRIBUTE,
  syncInlineBlockControl,
};
