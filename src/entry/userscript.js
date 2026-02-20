const { createPostPipeline } = require('../core/post-pipeline');
const { whenBodyReady } = require('../dom/body-ready');
const {
  ensureThemeStyleTag,
  installThemeIntegrityWatchers,
  setActiveTheme,
} = require('../dom/style-manager');
const { installAutoLinkTooltip } = require('../dom/tooltip');
const { createSettingsStore } = require('../storage/settings-store');
const { addBlockedUserToSettings } = require('../features/filtering/block-list-updater');
const { buildFeatureStylesCss } = require('../theme/feature-styles');
const { buildThemeStylesheetCss } = require('../theme/palette');
const { createBlockUserModal } = require('../ui/block-user-modal');
const { registerMenuCommand } = require('../ui/menu');
const { createSettingsPanel } = require('../ui/settings-panel');

/**
 * Starts Chillnet Double Plus runtime.
 *
 * Why:
 * Centralized startup keeps side effects and lifecycle sequencing explicit so
 * features remain composable and maintainable as scope grows.
 *
 * @returns {Promise<void>}
 */
async function startUserscript() {
  const settingsStore = createSettingsStore();
  let settings = await settingsStore.load();

  const combinedCss = `${buildThemeStylesheetCss()}\n${buildFeatureStylesCss()}`;
  ensureThemeStyleTag(combinedCss);
  setActiveTheme(settings.theme.id);

  const blockUserModal = createBlockUserModal({
    onConfirm: async (blockTarget) => {
      const blockUpdateResult = addBlockedUserToSettings(settings, blockTarget);
      if (!blockUpdateResult.changed) {
        return;
      }

      await applySettings(blockUpdateResult.nextSettings);
    },
  });

  const postPipeline = createPostPipeline(
    () => settings,
    (blockTarget) => {
      blockUserModal.open(blockTarget);
    }
  );
  let settingsPanel = null;

  /**
   * Persists and applies new settings.
   *
   * @param {unknown} nextSettings - Candidate settings object.
   * @param {{ rerunPipeline?: boolean }} [options] - Apply options.
   * @returns {Promise<void>}
   */
  async function applySettings(nextSettings, options = {}) {
    settings = await settingsStore.save(nextSettings);
    setActiveTheme(settings.theme.id);

    if (settingsPanel) {
      settingsPanel.sync(settings);
    }

    if (options.rerunPipeline !== false) {
      postPipeline.run({ force: true });
    }
  }

  registerMenuCommand('Chillnet Double Plus: Open Settings', () => {
    if (settingsPanel) {
      settingsPanel.open();
      return;
    }

    whenBodyReady(() => {
      if (settingsPanel) {
        settingsPanel.open();
      }
    });
  });

  whenBodyReady(() => {
    settingsPanel = createSettingsPanel({
      getSettings: () => settings,
      onSave: applySettings,
    });
    installAutoLinkTooltip();
    postPipeline.start();
    postPipeline.run({ force: true });
  });

  installThemeIntegrityWatchers(() => settings.theme.id, combinedCss);
}

startUserscript().catch(() => {
  // Runtime errors must not break host page execution.
});
