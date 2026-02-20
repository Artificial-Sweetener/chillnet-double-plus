const { createBlockUserModal } = require('../src/ui/block-user-modal');

/**
 * Verifies confirmation modal guards inline block actions.
 */
describe('block-user-modal', () => {
  beforeEach(() => {
    global.document.body.innerHTML = '';
  });

  test('opens with target label and confirms action', async () => {
    const onConfirm = jest.fn(async () => {});
    const modal = createBlockUserModal({ onConfirm });

    modal.open({
      username: 'alpha_user',
      displayName: 'Alpha User',
      sourceKind: 'post',
    });

    const overlay = /** @type {HTMLElement} */ (
      global.document.querySelector('#cdp-block-confirm-overlay')
    );
    const message = overlay.querySelector('[data-cdp-confirm-message]');
    const confirmButton = /** @type {HTMLButtonElement} */ (
      overlay.querySelector('[data-cdp-confirm-confirm]')
    );

    expect(overlay.hidden).toBe(false);
    expect(message.textContent).toContain('@alpha_user');

    confirmButton.click();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(onConfirm).toHaveBeenCalledWith({
      username: 'alpha_user',
      displayName: 'Alpha User',
      sourceKind: 'post',
    });
    expect(overlay.hidden).toBe(true);
  });
});
