const { createSettingsPanel } = require('../src/ui/settings-panel');

/**
 * Builds baseline settings object for panel tests.
 *
 * @returns {object}
 */
function buildSettingsFixture() {
  return {
    theme: {
      id: 'dark',
    },
    filters: {
      enabled: true,
      blockedUsers: ['alpha'],
      blockedPhrases: ['beta'],
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
 * Waits for queued async handlers to complete.
 *
 * @returns {Promise<void>}
 */
function flushAsyncQueue() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

/**
 * Dispatches bubbling form events so panel dirty tracking updates in tests.
 *
 * @param {HTMLElement} element - Target control.
 * @returns {void}
 */
function fireFormUpdateEvents(element) {
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * Commits chip-entry input via keyboard trigger.
 *
 * @param {HTMLInputElement} entryInput - Chip-entry input element.
 * @param {string} [key='Enter'] - Trigger key.
 * @returns {void}
 */
function commitTokenEntry(entryInput, key = 'Enter') {
  entryInput.dispatchEvent(
    new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
    })
  );
}

/**
 * Verifies settings panel launcher mounting and modal behavior.
 */
describe('settings-panel', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <aside class="cn-left-rail">
        <nav class="cn-nav-list">
          <a class="cn-nav-link" href="/">Home</a>
          <a class="cn-nav-link" href="/about">About</a>
          <a class="cn-nav-link" href="/donate">Donate</a>
        </nav>
      </aside>
    `;
  });

  test('mounts launcher in navigation and toggles modal visibility', () => {
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async () => {},
    });

    const launcherButton = document.getElementById('cdp-settings-nav-button');
    const overlay = document.getElementById('cdp-settings-overlay');
    const navLinks = Array.from(document.querySelectorAll('.cn-left-rail .cn-nav-link'));
    expect(launcherButton).toBeTruthy();
    expect(overlay).toBeTruthy();
    if (!launcherButton || !overlay) {
      throw new Error('Settings launcher and overlay are required for this test.');
    }
    const iconElement = launcherButton.querySelector('.cdp-settings-nav-icon');
    const fieldLabels = Array.from(document.querySelectorAll('.cdp-settings-field-label')).map(
      (element) => element.textContent
    );
    expect(launcherButton.parentElement).toBe(document.querySelector('.cn-nav-list'));
    expect(navLinks[navLinks.length - 1]).toBe(launcherButton);
    expect(iconElement.textContent).toBe('➕');
    expect(launcherButton.textContent.replace(/\s+/g, ' ').trim()).toBe('➕Double Plus');
    expect(fieldLabels.join(' | ')).toContain('Theme preset');
    expect(fieldLabels.join(' | ')).toContain('Blocked users');

    panel.open();
    expect(overlay.hidden).toBe(false);
    expect(launcherButton.classList.contains('is-active')).toBe(true);
    const headActions = document.querySelector('[data-cdp-head-actions]');
    const closeCleanButton = document.querySelector('[data-cdp-close-clean]');
    const discardButton = document.querySelector('[data-cdp-discard]');
    const saveButton = document.querySelector('[data-cdp-save]');
    expect(headActions.classList.contains('is-dirty')).toBe(false);
    expect(closeCleanButton.disabled).toBe(false);
    expect(discardButton.disabled).toBe(true);
    expect(saveButton.disabled).toBe(true);

    panel.close();
    expect(overlay.hidden).toBe(true);
    expect(launcherButton.classList.contains('is-active')).toBe(false);
  });

  test('saves parsed settings values and clamps max embeds', async () => {
    const savedSettings = [];
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async (nextSettings) => {
        savedSettings.push(nextSettings);
      },
    });

    panel.open();

    const themeSelect = /** @type {HTMLSelectElement} */ (
      document.querySelector('[data-cdp-theme-id]')
    );
    themeSelect.value = 'original';
    fireFormUpdateEvents(themeSelect);

    const closeCleanButton = /** @type {HTMLButtonElement} */ (
      document.querySelector('[data-cdp-close-clean]')
    );
    const headActions = /** @type {HTMLElement} */ (
      document.querySelector('[data-cdp-head-actions]')
    );
    const discardButton = /** @type {HTMLButtonElement} */ (
      document.querySelector('[data-cdp-discard]')
    );
    const saveButton = /** @type {HTMLButtonElement} */ (document.querySelector('[data-cdp-save]'));
    expect(headActions.classList.contains('is-dirty')).toBe(true);
    expect(closeCleanButton.disabled).toBe(true);
    expect(discardButton.disabled).toBe(false);
    expect(saveButton.disabled).toBe(false);

    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-filters-enabled]')).checked =
      true;
    const blockedUsersEntryInput = /** @type {HTMLInputElement} */ (
      document.querySelector('[data-cdp-blocked-users-entry]')
    );
    blockedUsersEntryInput.value = ' one, @Two ';
    commitTokenEntry(blockedUsersEntryInput);
    const blockedPhrasesEntryInput = /** @type {HTMLInputElement} */ (
      document.querySelector('[data-cdp-blocked-phrases-entry]')
    );
    blockedPhrasesEntryInput.value = 'foo, bar';
    commitTokenEntry(blockedPhrasesEntryInput);
    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-embeds-enabled]')).checked =
      true;
    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-embeds-image]')).checked =
      false;
    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-embeds-spotify]')).checked =
      false;
    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-embeds-x]')).checked = false;
    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-embeds-reddit]')).checked =
      false;
    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-embeds-tiktok]')).checked =
      false;
    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-embeds-youtube]')).checked =
      true;
    /** @type {HTMLInputElement} */ (document.querySelector('[data-cdp-max-embeds]')).value = '99';

    saveButton.click();
    await flushAsyncQueue();

    expect(savedSettings).toHaveLength(1);
    expect(savedSettings[0].theme.id).toBe('original');
    expect(savedSettings[0].filters.blockedUsers).toEqual(['alpha', 'one', '@Two']);
    expect(savedSettings[0].filters.blockedPhrases).toEqual(['beta', 'foo', 'bar']);
    expect(savedSettings[0].embeds.image).toBe(false);
    expect(savedSettings[0].embeds.reddit).toBe(false);
    expect(savedSettings[0].embeds.spotify).toBe(false);
    expect(savedSettings[0].embeds.tiktok).toBe(false);
    expect(savedSettings[0].embeds.x).toBe(false);
    expect(savedSettings[0].embeds.youtube).toBe(true);
    expect(savedSettings[0].embeds.maxPerPost).toBe(6);
  });

  test('discards dirty changes and closes without saving', () => {
    const settings = buildSettingsFixture();
    const onSave = jest.fn(async () => {});
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave,
    });

    panel.open();
    const overlay = /** @type {HTMLElement} */ (document.getElementById('cdp-settings-overlay'));
    const blockedUsersEntryInput = /** @type {HTMLInputElement} */ (
      document.querySelector('[data-cdp-blocked-users-entry]')
    );
    const closeCleanButton = /** @type {HTMLButtonElement} */ (
      document.querySelector('[data-cdp-close-clean]')
    );
    const headActions = /** @type {HTMLElement} */ (
      document.querySelector('[data-cdp-head-actions]')
    );
    const discardButton = /** @type {HTMLButtonElement} */ (
      document.querySelector('[data-cdp-discard]')
    );
    const saveButton = /** @type {HTMLButtonElement} */ (document.querySelector('[data-cdp-save]'));

    blockedUsersEntryInput.value = 'changed-user';
    commitTokenEntry(blockedUsersEntryInput);
    expect(headActions.classList.contains('is-dirty')).toBe(true);
    expect(closeCleanButton.disabled).toBe(true);
    expect(discardButton.disabled).toBe(false);
    expect(saveButton.disabled).toBe(false);

    discardButton.click();

    expect(onSave).not.toHaveBeenCalled();
    expect(overlay.hidden).toBe(true);

    panel.open();
    const blockedUsersList = /** @type {HTMLElement} */ (
      document.querySelector('[data-cdp-blocked-users-list]')
    );
    const blockedUserChips = Array.from(
      blockedUsersList.querySelectorAll('.cdp-settings-token-chip')
    ).map((element) => element.textContent);
    expect(blockedUserChips).toEqual(['alpha']);
    expect(headActions.classList.contains('is-dirty')).toBe(false);
    expect(closeCleanButton.disabled).toBe(false);
    expect(discardButton.disabled).toBe(true);
    expect(saveButton.disabled).toBe(true);
  });

  test('removes blocked user chip through confirmation modal', async () => {
    const savedSettings = [];
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async (nextSettings) => {
        savedSettings.push(nextSettings);
      },
    });

    panel.open();
    const headActions = /** @type {HTMLElement} */ (
      document.querySelector('[data-cdp-head-actions]')
    );
    const saveButton = /** @type {HTMLButtonElement} */ (document.querySelector('[data-cdp-save]'));
    const blockedUsersList = /** @type {HTMLElement} */ (
      document.querySelector('[data-cdp-blocked-users-list]')
    );
    const firstChip = /** @type {HTMLButtonElement} */ (
      blockedUsersList.querySelector('.cdp-settings-token-chip')
    );
    firstChip.click();

    const unblockOverlay = /** @type {HTMLElement} */ (
      document.getElementById('cdp-unblock-confirm-overlay')
    );
    const unblockConfirmButton = /** @type {HTMLButtonElement} */ (
      unblockOverlay.querySelector('[data-cdp-confirm-confirm]')
    );
    unblockConfirmButton.click();
    await flushAsyncQueue();

    expect(headActions.classList.contains('is-dirty')).toBe(true);
    saveButton.click();
    await flushAsyncQueue();

    expect(savedSettings).toHaveLength(1);
    expect(savedSettings[0].filters.blockedUsers).toEqual([]);
  });

  test('commits blocked-user chip when comma is typed', async () => {
    const savedSettings = [];
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async (nextSettings) => {
        savedSettings.push(nextSettings);
      },
    });

    panel.open();
    const blockedUsersEntryInput = /** @type {HTMLInputElement} */ (
      document.querySelector('[data-cdp-blocked-users-entry]')
    );
    blockedUsersEntryInput.value = 'Gamma';
    commitTokenEntry(blockedUsersEntryInput, ',');

    const blockedUsersList = /** @type {HTMLElement} */ (
      document.querySelector('[data-cdp-blocked-users-list]')
    );
    const blockedUserChips = Array.from(
      blockedUsersList.querySelectorAll('.cdp-settings-token-chip')
    ).map((element) => element.textContent);
    expect(blockedUsersEntryInput.value).toBe('');
    expect(blockedUserChips).toEqual(['alpha', 'Gamma']);

    const saveButton = /** @type {HTMLButtonElement} */ (document.querySelector('[data-cdp-save]'));
    saveButton.click();
    await flushAsyncQueue();
    expect(savedSettings).toHaveLength(1);
    expect(savedSettings[0].filters.blockedUsers).toEqual(['alpha', 'Gamma']);
  });

  test('keeps blocked-user token input focused after comma commit', () => {
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async () => {},
    });

    panel.open();
    const blockedUsersEntryInput = /** @type {HTMLInputElement} */ (
      document.querySelector('[data-cdp-blocked-users-entry]')
    );
    blockedUsersEntryInput.focus();
    blockedUsersEntryInput.value = 'focused-user';
    commitTokenEntry(blockedUsersEntryInput, ',');

    expect(document.activeElement).toBe(blockedUsersEntryInput);
  });

  test('commits blocked-phrase chip when comma is typed', async () => {
    const savedSettings = [];
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async (nextSettings) => {
        savedSettings.push(nextSettings);
      },
    });

    panel.open();
    const blockedPhrasesEntryInput = /** @type {HTMLInputElement} */ (
      document.querySelector('[data-cdp-blocked-phrases-entry]')
    );
    blockedPhrasesEntryInput.value = 'Gamma phrase';
    commitTokenEntry(blockedPhrasesEntryInput, ',');

    const blockedPhrasesList = /** @type {HTMLElement} */ (
      document.querySelector('[data-cdp-blocked-phrases-list]')
    );
    const blockedPhraseChips = Array.from(
      blockedPhrasesList.querySelectorAll('.cdp-settings-token-chip')
    ).map((element) => element.textContent);
    expect(blockedPhrasesEntryInput.value).toBe('');
    expect(blockedPhraseChips).toEqual(['beta', 'Gamma phrase']);

    const saveButton = /** @type {HTMLButtonElement} */ (document.querySelector('[data-cdp-save]'));
    saveButton.click();
    await flushAsyncQueue();
    expect(savedSettings).toHaveLength(1);
    expect(savedSettings[0].filters.blockedPhrases).toEqual(['beta', 'Gamma phrase']);
  });

  test('removes blocked phrase chip through confirmation modal', async () => {
    const savedSettings = [];
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async (nextSettings) => {
        savedSettings.push(nextSettings);
      },
    });

    panel.open();
    const blockedPhrasesList = /** @type {HTMLElement} */ (
      document.querySelector('[data-cdp-blocked-phrases-list]')
    );
    const firstChip = /** @type {HTMLButtonElement} */ (
      blockedPhrasesList.querySelector('.cdp-settings-token-chip')
    );
    firstChip.click();

    const removePhraseOverlay = /** @type {HTMLElement} */ (
      document.getElementById('cdp-unblock-phrase-confirm-overlay')
    );
    const removePhraseConfirmButton = /** @type {HTMLButtonElement} */ (
      removePhraseOverlay.querySelector('[data-cdp-confirm-confirm]')
    );
    removePhraseConfirmButton.click();
    await flushAsyncQueue();

    const saveButton = /** @type {HTMLButtonElement} */ (document.querySelector('[data-cdp-save]'));
    saveButton.click();
    await flushAsyncQueue();

    expect(savedSettings).toHaveLength(1);
    expect(savedSettings[0].filters.blockedPhrases).toEqual([]);
  });

  test('keeps blocked-phrase token input focused after comma commit', () => {
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async () => {},
    });

    panel.open();
    const blockedPhrasesEntryInput = /** @type {HTMLInputElement} */ (
      document.querySelector('[data-cdp-blocked-phrases-entry]')
    );
    blockedPhrasesEntryInput.focus();
    blockedPhrasesEntryInput.value = 'focused phrase';
    commitTokenEntry(blockedPhrasesEntryInput, ',');

    expect(document.activeElement).toBe(blockedPhrasesEntryInput);
  });

  test('re-attaches overlay when host dom removes it', () => {
    const settings = buildSettingsFixture();
    const panel = createSettingsPanel({
      getSettings: () => settings,
      onSave: async () => {},
    });

    const overlay = document.getElementById('cdp-settings-overlay');
    expect(overlay).toBeTruthy();

    overlay.remove();
    expect(document.getElementById('cdp-settings-overlay')).toBeNull();

    panel.open();

    const restoredOverlay = document.getElementById('cdp-settings-overlay');
    expect(restoredOverlay).toBeTruthy();
    expect(restoredOverlay.hidden).toBe(false);
  });
});
