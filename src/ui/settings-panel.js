/**
 * @file Interactive settings panel for Chillnet Double Plus.
 */

const { normalizeForMatch, parseListText } = require('../features/filtering/matchers');
const { getThemeDefinition, listThemeOptions } = require('../theme/theme-registry');

const { createConfirmModal } = require('./confirm-modal');
const NAV_LAUNCHER_ID = 'cdp-settings-nav-button';
const OVERLAY_ID = 'cdp-settings-overlay';
const IS_JSDOM =
  typeof globalThis.navigator !== 'undefined' &&
  /jsdom/i.test(globalThis.navigator.userAgent || '');

/**
 * Builds canonical dedupe key for blocked-user entries.
 *
 * @param {string} value - User entry text.
 * @returns {string}
 */
function toBlockedUserKey(value) {
  return normalizeForMatch(value.replace(/^@+/, '').trim());
}

/**
 * Normalizes and deduplicates blocked-user entries while preserving order.
 *
 * @param {string[]} values - Candidate blocked-user entries.
 * @returns {string[]}
 */
function dedupeBlockedUsers(values) {
  const uniqueValues = [];
  const seenKeys = new Set();
  for (const value of values) {
    const trimmedValue = String(value || '').trim();
    if (!trimmedValue) {
      continue;
    }

    const key = toBlockedUserKey(trimmedValue);
    if (!key || seenKeys.has(key)) {
      continue;
    }

    seenKeys.add(key);
    uniqueValues.push(trimmedValue);
  }

  return uniqueValues;
}

/**
 * Builds canonical dedupe key for blocked-phrase entries.
 *
 * @param {string} value - Phrase entry text.
 * @returns {string}
 */
function toBlockedPhraseKey(value) {
  return normalizeForMatch(String(value || '').trim());
}

/**
 * Normalizes and deduplicates blocked-phrase entries while preserving order.
 *
 * @param {string[]} values - Candidate blocked-phrase entries.
 * @returns {string[]}
 */
function dedupeBlockedPhrases(values) {
  const uniqueValues = [];
  const seenKeys = new Set();
  for (const value of values) {
    const trimmedValue = String(value || '').trim();
    if (!trimmedValue) {
      continue;
    }

    const key = toBlockedPhraseKey(trimmedValue);
    if (!key || seenKeys.has(key)) {
      continue;
    }

    seenKeys.add(key);
    uniqueValues.push(trimmedValue);
  }

  return uniqueValues;
}

/**
 * Parses and clamps max embeds input.
 *
 * Why:
 * Inputs can briefly contain invalid values while editing. Clamping keeps
 * persisted settings valid without forcing rigid input handling.
 *
 * @param {string} rawValue - Raw input value.
 * @param {number} fallbackValue - Fallback max embeds value.
 * @returns {number}
 */
function parseMaxEmbeds(rawValue, fallbackValue) {
  const parsedValue = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsedValue)) {
    return fallbackValue;
  }

  return Math.min(6, Math.max(1, parsedValue));
}

/**
 * Builds safe option markup for theme picker.
 *
 * @returns {string}
 */
function buildThemeOptionMarkup() {
  return listThemeOptions()
    .map((themeOption) => `<option value="${themeOption.id}">${themeOption.label}</option>`)
    .join('');
}

/**
 * Creates navigation launcher button aligned with native nav styles.
 *
 * @returns {HTMLAnchorElement}
 */
function createNavigationLauncherButton() {
  const launcherButton = globalThis.document.createElement('a');
  launcherButton.id = NAV_LAUNCHER_ID;
  launcherButton.href = '#double-plus-settings';
  launcherButton.setAttribute('role', 'button');
  launcherButton.className = 'cn-nav-link cdp-settings-nav-link';
  launcherButton.innerHTML =
    '<span class="cn-nav-icon cdp-settings-nav-icon" aria-hidden="true">➕</span><span>Double Plus</span>';
  launcherButton.title = 'Open Double Plus settings';
  launcherButton.setAttribute('aria-label', 'Open Double Plus settings');
  return launcherButton;
}

/**
 * Creates settings launcher and panel UI.
 *
 * Why:
 * Keeping UI assembly in one module avoids leaking DOM event wiring into the
 * runtime orchestrator and preserves clear boundaries.
 *
 * @param {{
 *   getSettings: () => object,
 *   onSave: (nextSettings: object) => Promise<void>
 * }} options - Panel behavior options.
 * @returns {{
 *   open: () => void,
 *   close: () => void,
 *   sync: (settings: object) => void
 * }}
 */
function createSettingsPanel(options) {
  const launcherButton = createNavigationLauncherButton();
  const themeOptionMarkup = buildThemeOptionMarkup();

  const overlayElement = globalThis.document.createElement('div');
  overlayElement.id = OVERLAY_ID;
  overlayElement.hidden = true;
  overlayElement.innerHTML = `
    <section id="cdp-settings-panel" role="dialog" aria-modal="true" aria-labelledby="cdp-settings-title">
      <div class="cdp-settings-head">
        <div class="cdp-settings-head-copy">
          <p class="cdp-settings-kicker">CHILLNET DOUBLE PLUS</p>
          <h3 id="cdp-settings-title">Preferences</h3>
        </div>
        <div class="cdp-settings-head-actions" data-cdp-head-actions>
          <div class="cdp-settings-action-set" data-cdp-actions-clean aria-hidden="false">
            <button type="button" class="cdp-settings-btn" data-cdp-close-clean>Close</button>
          </div>
          <div class="cdp-settings-action-set" data-cdp-actions-dirty aria-hidden="true">
            <button type="button" class="cdp-settings-btn is-danger" data-cdp-discard>Discard and Close</button>
            <button type="button" class="cdp-settings-btn is-primary" data-cdp-save>Save and Close</button>
          </div>
        </div>
      </div>
      <div class="cdp-settings-body">
        <div class="cdp-settings-section">
          <h4>Theme</h4>
          <label class="cdp-settings-field-label" for="cdp-theme-select">Theme preset</label>
          <label class="cdp-settings-theme-select-wrap">
            <select id="cdp-theme-select" class="cdp-settings-panel-input" data-cdp-theme-id>
              ${themeOptionMarkup}
            </select>
          </label>
        </div>
        <div class="cdp-settings-section">
          <h4>Filtering</h4>
          <label class="cdp-settings-switch">
            <input type="checkbox" data-cdp-filters-enabled />
            <span class="cdp-settings-switch-label">Enable filtering</span>
          </label>
          <label class="cdp-settings-field-label">Blocked users (comma separated)</label>
          <div class="cdp-settings-token-editor" data-cdp-blocked-users-editor>
            <div class="cdp-settings-token-list" data-cdp-blocked-users-list>
              <input
                class="cdp-settings-token-input"
                type="text"
                data-cdp-blocked-users-entry
                placeholder="Type usernames, separated by commas"
                aria-label="Add blocked users"
              />
            </div>
          </div>
          <label class="cdp-settings-field-label">Blocked phrases/words (comma separated)</label>
          <div class="cdp-settings-token-editor" data-cdp-blocked-phrases-editor>
            <div class="cdp-settings-token-list" data-cdp-blocked-phrases-list>
              <input
                class="cdp-settings-token-input"
                type="text"
                data-cdp-blocked-phrases-entry
                placeholder="Type phrases/words, separated by commas"
                aria-label="Add blocked phrases"
              />
            </div>
          </div>
        </div>
        <div class="cdp-settings-section">
          <h4>Embeds</h4>
          <div class="cdp-settings-inline-row">
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-enabled />
              <span class="cdp-settings-switch-label">Enable inline embeds</span>
            </label>
            <label class="cdp-settings-max-field">
              <span class="cdp-settings-field-label">Max embeds per post</span>
              <input class="cdp-settings-panel-input" type="number" min="1" max="6" data-cdp-max-embeds />
            </label>
          </div>
          <div class="cdp-settings-grid-3">
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-image />
              <span class="cdp-settings-switch-label">Images</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-youtube />
              <span class="cdp-settings-switch-label">YouTube</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-spotify />
              <span class="cdp-settings-switch-label">Spotify</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-x />
              <span class="cdp-settings-switch-label">X</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-reddit />
              <span class="cdp-settings-switch-label">Reddit</span>
            </label>
            <label class="cdp-settings-switch">
              <input type="checkbox" data-cdp-embeds-tiktok />
              <span class="cdp-settings-switch-label">TikTok</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  `;

  const panelElement = /** @type {HTMLElement} */ (
    overlayElement.querySelector('#cdp-settings-panel')
  );
  if (!panelElement) {
    throw new Error('Settings panel root is required.');
  }

  /**
   * Ensures overlay container remains attached to body.
   *
   * Why:
   * Host SPA hydration/rerender can replace body children and detach injected
   * nodes. Re-attaching the same node preserves all listeners and state.
   *
   * @returns {void}
   */
  function ensureOverlayMounted() {
    if (!globalThis.document || !globalThis.document.body) {
      return;
    }

    if (overlayElement.parentElement !== globalThis.document.body) {
      globalThis.document.body.appendChild(overlayElement);
    }
  }

  /**
   * Mounts launcher into current left navigation container when available.
   *
   * @returns {void}
   */
  function ensureNavigationLauncherMounted() {
    if (!globalThis.document || !globalThis.document.body) {
      return;
    }

    const leftRail = globalThis.document.querySelector('.cn-left-rail');
    if (!leftRail) {
      return;
    }

    const nativeNavigationLinks = Array.from(leftRail.querySelectorAll('.cn-nav-link')).filter(
      (element) => element !== launcherButton
    );
    if (nativeNavigationLinks.length === 0) {
      return;
    }

    const lastNavigationLink = nativeNavigationLinks[nativeNavigationLinks.length - 1];
    const navigationContainer = lastNavigationLink.parentElement;
    if (!navigationContainer) {
      return;
    }

    if (
      launcherButton.parentElement !== navigationContainer ||
      launcherButton.previousElementSibling !== lastNavigationLink
    ) {
      navigationContainer.insertBefore(launcherButton, lastNavigationLink.nextSibling);
    }
  }

  /**
   * Starts dom-integrity watchers after initial host render settles.
   *
   * Why:
   * Deferring mount until `load` avoids mutating React hydration trees too early
   * while still recovering from later SPA re-renders.
   *
   * @returns {void}
   */
  function mountUiNodesWhenReady() {
    ensureOverlayMounted();
    ensureNavigationLauncherMounted();

    if (IS_JSDOM || typeof globalThis.MutationObserver !== 'function') {
      return;
    }

    const navigationObserver = new globalThis.MutationObserver(() => {
      ensureOverlayMounted();
      ensureNavigationLauncherMounted();
    });
    navigationObserver.observe(globalThis.document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (globalThis.document.readyState === 'complete') {
    mountUiNodesWhenReady();
  } else {
    globalThis.addEventListener('load', mountUiNodesWhenReady, { once: true });
  }

  /**
   * Synchronizes launcher state based on modal visibility.
   *
   * @param {boolean} isOpen - Whether modal is open.
   * @returns {void}
   */
  function syncLauncherState(isOpen) {
    launcherButton.classList.toggle('is-active', isOpen);
    if (isOpen) {
      launcherButton.setAttribute('aria-current', 'page');
      return;
    }

    launcherButton.removeAttribute('aria-current');
  }

  /**
   * Closes modal when escape key is pressed.
   *
   * @param {KeyboardEvent} event - Keyboard event.
   * @returns {void}
   */
  function closeOnEscape(event) {
    if (event.key !== 'Escape' || overlayElement.hidden) {
      return;
    }

    close();
  }

  globalThis.document.addEventListener('keydown', closeOnEscape);

  overlayElement.addEventListener('click', (event) => {
    if (event.target === overlayElement) {
      close();
    }
  });

  launcherButton.addEventListener('click', (event) => {
    event.preventDefault();
    open();
  });

  function open() {
    ensureOverlayMounted();
    sync(options.getSettings());
    overlayElement.hidden = false;
    syncLauncherState(true);
    themeIdInput.focus();
  }

  function close() {
    overlayElement.hidden = true;
    syncLauncherState(false);
    unblockUserModal.close();
    unblockPhraseModal.close();
  }

  const themeIdInput = /** @type {HTMLSelectElement} */ (
    panelElement.querySelector('[data-cdp-theme-id]')
  );
  const filtersEnabledInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-filters-enabled]')
  );
  const blockedUsersEditorElement = /** @type {HTMLElement} */ (
    panelElement.querySelector('[data-cdp-blocked-users-editor]')
  );
  const blockedUsersListElement = /** @type {HTMLElement} */ (
    panelElement.querySelector('[data-cdp-blocked-users-list]')
  );
  const blockedUsersEntryInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-blocked-users-entry]')
  );
  const blockedPhrasesEditorElement = /** @type {HTMLElement} */ (
    panelElement.querySelector('[data-cdp-blocked-phrases-editor]')
  );
  const blockedPhrasesListElement = /** @type {HTMLElement} */ (
    panelElement.querySelector('[data-cdp-blocked-phrases-list]')
  );
  const blockedPhrasesEntryInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-blocked-phrases-entry]')
  );
  const embedsEnabledInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-embeds-enabled]')
  );
  const embedsImageInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-embeds-image]')
  );
  const embedsSpotifyInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-embeds-spotify]')
  );
  const embedsXInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-embeds-x]')
  );
  const embedsRedditInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-embeds-reddit]')
  );
  const embedsTiktokInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-embeds-tiktok]')
  );
  const embedsYoutubeInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-embeds-youtube]')
  );
  const maxEmbedsInput = /** @type {HTMLInputElement} */ (
    panelElement.querySelector('[data-cdp-max-embeds]')
  );
  const closeCleanButton = /** @type {HTMLButtonElement} */ (
    panelElement.querySelector('[data-cdp-close-clean]')
  );
  const headActionsElement = /** @type {HTMLElement} */ (
    panelElement.querySelector('[data-cdp-head-actions]')
  );
  const cleanActionSetElement = /** @type {HTMLElement} */ (
    panelElement.querySelector('[data-cdp-actions-clean]')
  );
  const dirtyActionSetElement = /** @type {HTMLElement} */ (
    panelElement.querySelector('[data-cdp-actions-dirty]')
  );
  const discardButton = /** @type {HTMLButtonElement} */ (
    panelElement.querySelector('[data-cdp-discard]')
  );
  const saveButton = /** @type {HTMLButtonElement} */ (
    panelElement.querySelector('[data-cdp-save]')
  );
  let draftBlockedUsers = [];
  let draftBlockedPhrases = [];
  let baselineSnapshot = '';

  const unblockUserModal = createConfirmModal({
    overlayId: 'cdp-unblock-confirm-overlay',
    panelId: 'cdp-unblock-confirm-panel',
    title: 'Unblock user?',
    cancelLabel: 'Nevermind',
    confirmLabel: 'Yes, Unblock',
    formatMessage: (blockedEntry) =>
      `Remove ${String(blockedEntry || '').trim()} from blocked users?`,
    onConfirm: async (blockedEntry) => {
      const nextBlockedUsers = draftBlockedUsers.filter(
        (entry) => toBlockedUserKey(entry) !== toBlockedUserKey(String(blockedEntry || ''))
      );
      draftBlockedUsers = nextBlockedUsers;
      renderBlockedUserChips();
      syncDirtyState();
    },
  });

  const unblockPhraseModal = createConfirmModal({
    overlayId: 'cdp-unblock-phrase-confirm-overlay',
    panelId: 'cdp-unblock-phrase-confirm-panel',
    title: 'Remove blocked phrase?',
    cancelLabel: 'Nevermind',
    confirmLabel: 'Yes, Remove',
    formatMessage: (blockedEntry) =>
      `Remove "${String(blockedEntry || '').trim()}" from blocked phrases?`,
    onConfirm: async (blockedEntry) => {
      const nextBlockedPhrases = draftBlockedPhrases.filter(
        (entry) => toBlockedPhraseKey(entry) !== toBlockedPhraseKey(String(blockedEntry || ''))
      );
      draftBlockedPhrases = nextBlockedPhrases;
      renderBlockedPhraseChips();
      syncDirtyState();
    },
  });

  /**
   * Renders blocked-user chips with wrap behavior.
   *
   * @returns {void}
   */
  function renderBlockedUserChips() {
    blockedUsersListElement.textContent = '';
    for (const blockedUserEntry of draftBlockedUsers) {
      const chipButton = globalThis.document.createElement('button');
      chipButton.type = 'button';
      chipButton.className = 'cdp-settings-token-chip';
      chipButton.textContent = blockedUserEntry;
      chipButton.title = `Unblock ${blockedUserEntry}`;
      chipButton.addEventListener('click', () => {
        unblockUserModal.open(blockedUserEntry);
      });
      blockedUsersListElement.appendChild(chipButton);
    }

    blockedUsersListElement.appendChild(blockedUsersEntryInput);
  }

  /**
   * Commits comma-delimited blocked-user input into chip state.
   *
   * @param {{ preserveFocus?: boolean }} [options] - Commit behavior flags.
   * @returns {void}
   */
  function commitBlockedUserEntryInput(options = {}) {
    const preserveFocus = options.preserveFocus === true;
    const shouldRefocus =
      preserveFocus && globalThis.document.activeElement === blockedUsersEntryInput;
    const pendingEntries = parseListText(blockedUsersEntryInput.value);
    blockedUsersEntryInput.value = '';
    if (pendingEntries.length === 0) {
      if (shouldRefocus) {
        blockedUsersEntryInput.focus();
      }
      return;
    }

    const nextBlockedUsers = dedupeBlockedUsers([...draftBlockedUsers, ...pendingEntries]);
    if (
      nextBlockedUsers.length === draftBlockedUsers.length &&
      nextBlockedUsers.every((entry, index) => entry === draftBlockedUsers[index])
    ) {
      return;
    }

    draftBlockedUsers = nextBlockedUsers;
    renderBlockedUserChips();
    if (shouldRefocus) {
      blockedUsersEntryInput.focus();
    }
    syncDirtyState();
  }

  /**
   * Renders blocked-phrase chips with wrap behavior.
   *
   * @returns {void}
   */
  function renderBlockedPhraseChips() {
    blockedPhrasesListElement.textContent = '';
    for (const blockedPhraseEntry of draftBlockedPhrases) {
      const chipButton = globalThis.document.createElement('button');
      chipButton.type = 'button';
      chipButton.className = 'cdp-settings-token-chip';
      chipButton.textContent = blockedPhraseEntry;
      chipButton.title = `Remove phrase "${blockedPhraseEntry}"`;
      chipButton.addEventListener('click', () => {
        unblockPhraseModal.open(blockedPhraseEntry);
      });
      blockedPhrasesListElement.appendChild(chipButton);
    }

    blockedPhrasesListElement.appendChild(blockedPhrasesEntryInput);
  }

  /**
   * Commits comma-delimited blocked-phrase input into chip state.
   *
   * @param {{ preserveFocus?: boolean }} [options] - Commit behavior flags.
   * @returns {void}
   */
  function commitBlockedPhraseEntryInput(options = {}) {
    const preserveFocus = options.preserveFocus === true;
    const shouldRefocus =
      preserveFocus && globalThis.document.activeElement === blockedPhrasesEntryInput;
    const pendingEntries = parseListText(blockedPhrasesEntryInput.value);
    blockedPhrasesEntryInput.value = '';
    if (pendingEntries.length === 0) {
      if (shouldRefocus) {
        blockedPhrasesEntryInput.focus();
      }
      return;
    }

    const nextBlockedPhrases = dedupeBlockedPhrases([...draftBlockedPhrases, ...pendingEntries]);
    if (
      nextBlockedPhrases.length === draftBlockedPhrases.length &&
      nextBlockedPhrases.every((entry, index) => entry === draftBlockedPhrases[index])
    ) {
      return;
    }

    draftBlockedPhrases = nextBlockedPhrases;
    renderBlockedPhraseChips();
    if (shouldRefocus) {
      blockedPhrasesEntryInput.focus();
    }
    syncDirtyState();
  }

  blockedUsersEntryInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ',') {
      return;
    }

    event.preventDefault();
    commitBlockedUserEntryInput({ preserveFocus: true });
  });

  blockedUsersEntryInput.addEventListener('blur', commitBlockedUserEntryInput);

  blockedUsersEditorElement.addEventListener('click', (event) => {
    const eventTarget = /** @type {HTMLElement|null} */ (
      event.target instanceof globalThis.HTMLElement ? event.target : null
    );
    if (eventTarget && eventTarget.closest('.cdp-settings-token-chip')) {
      return;
    }

    blockedUsersEntryInput.focus();
  });

  blockedPhrasesEntryInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ',') {
      return;
    }

    event.preventDefault();
    commitBlockedPhraseEntryInput({ preserveFocus: true });
  });

  blockedPhrasesEntryInput.addEventListener('blur', commitBlockedPhraseEntryInput);

  blockedPhrasesEditorElement.addEventListener('click', (event) => {
    const eventTarget = /** @type {HTMLElement|null} */ (
      event.target instanceof globalThis.HTMLElement ? event.target : null
    );
    if (eventTarget && eventTarget.closest('.cdp-settings-token-chip')) {
      return;
    }

    blockedPhrasesEntryInput.focus();
  });

  /**
   * Serializes settings into a stable shape for dirty-state comparison.
   *
   * Why:
   * Runtime settings may include unrelated keys over time. This projection
   * isolates fields owned by the panel so comparisons stay deterministic.
   *
   * @param {object} settings - Candidate settings object.
   * @returns {string}
   */
  function serializeSettingsSnapshot(settings) {
    return JSON.stringify({
      theme: {
        id: getThemeDefinition(settings.theme.id).id,
      },
      filters: {
        enabled: settings.filters.enabled,
        blockedUsers: settings.filters.blockedUsers,
        blockedPhrases: settings.filters.blockedPhrases,
      },
      embeds: {
        enabled: settings.embeds.enabled,
        image: settings.embeds.image,
        youtube: settings.embeds.youtube,
        spotify: settings.embeds.spotify,
        x: settings.embeds.x,
        reddit: settings.embeds.reddit,
        tiktok: settings.embeds.tiktok,
        maxPerPost: settings.embeds.maxPerPost,
      },
    });
  }

  /**
   * Builds a settings draft object from current form control values.
   *
   * @param {object} currentSettings - Latest persisted settings.
   * @returns {object}
   */
  function buildDraftSettings(currentSettings) {
    return {
      ...currentSettings,
      theme: {
        ...currentSettings.theme,
        id: getThemeDefinition(themeIdInput.value).id,
      },
      filters: {
        ...currentSettings.filters,
        enabled: filtersEnabledInput.checked,
        blockedUsers: [...draftBlockedUsers],
        blockedPhrases: [...draftBlockedPhrases],
      },
      embeds: {
        ...currentSettings.embeds,
        enabled: embedsEnabledInput.checked,
        image: embedsImageInput.checked,
        spotify: embedsSpotifyInput.checked,
        x: embedsXInput.checked,
        reddit: embedsRedditInput.checked,
        tiktok: embedsTiktokInput.checked,
        youtube: embedsYoutubeInput.checked,
        maxPerPost: parseMaxEmbeds(maxEmbedsInput.value, currentSettings.embeds.maxPerPost),
      },
    };
  }

  /**
   * Synchronizes header action visibility for clean vs dirty form state.
   *
   * @param {boolean} isDirty - Whether form differs from synced settings.
   * @returns {void}
   */
  function syncHeaderActions(isDirty) {
    headActionsElement.classList.toggle('is-dirty', isDirty);
    cleanActionSetElement.setAttribute('aria-hidden', String(isDirty));
    dirtyActionSetElement.setAttribute('aria-hidden', String(!isDirty));
    closeCleanButton.disabled = isDirty;
    discardButton.disabled = !isDirty;
    saveButton.disabled = !isDirty;
  }

  /**
   * Computes and applies current dirty state.
   *
   * @returns {void}
   */
  function syncDirtyState() {
    const draftSnapshot = serializeSettingsSnapshot(buildDraftSettings(options.getSettings()));
    syncHeaderActions(draftSnapshot !== baselineSnapshot);
  }

  /**
   * Resets form controls back to persisted settings and closes the modal.
   *
   * @returns {void}
   */
  function discardAndClose() {
    sync(options.getSettings());
    close();
  }

  closeCleanButton.addEventListener('click', close);
  discardButton.addEventListener('click', discardAndClose);

  panelElement.addEventListener('input', syncDirtyState);
  panelElement.addEventListener('change', syncDirtyState);

  /**
   * Synchronizes form controls from settings object.
   *
   * @param {object} settings - Current settings.
   * @returns {void}
   */
  function sync(settings) {
    themeIdInput.value = getThemeDefinition(settings.theme.id).id;
    filtersEnabledInput.checked = settings.filters.enabled;
    draftBlockedUsers = dedupeBlockedUsers(settings.filters.blockedUsers);
    blockedUsersEntryInput.value = '';
    renderBlockedUserChips();
    draftBlockedPhrases = dedupeBlockedPhrases(settings.filters.blockedPhrases);
    blockedPhrasesEntryInput.value = '';
    renderBlockedPhraseChips();
    embedsEnabledInput.checked = settings.embeds.enabled;
    embedsImageInput.checked = settings.embeds.image;
    embedsSpotifyInput.checked = settings.embeds.spotify;
    embedsXInput.checked = settings.embeds.x;
    embedsRedditInput.checked = settings.embeds.reddit;
    embedsTiktokInput.checked = settings.embeds.tiktok;
    embedsYoutubeInput.checked = settings.embeds.youtube;
    maxEmbedsInput.value = String(settings.embeds.maxPerPost);
    baselineSnapshot = serializeSettingsSnapshot(settings);
    syncHeaderActions(false);
  }

  saveButton.addEventListener('click', async () => {
    commitBlockedUserEntryInput();
    commitBlockedPhraseEntryInput();
    const nextSettings = buildDraftSettings(options.getSettings());

    await options.onSave(nextSettings);
    sync(options.getSettings());
    close();
  });

  return {
    open,
    close,
    sync,
  };
}

module.exports = {
  createSettingsPanel,
};
