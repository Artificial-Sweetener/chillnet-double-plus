/**
 * @file Theme style and state application primitives.
 */

const { getThemeDefinition } = require('../theme/theme-registry');

const STYLE_ID = 'cdp-runtime-style';
const THEME_ID_ATTRIBUTE = 'data-cdp-theme';
const THEME_MODE_ATTRIBUTE = 'data-cdp-theme-mode';

/**
 * Queues root-attribute updates until `<html>` exists.
 *
 * Why:
 * At `document-start`, some engines can execute before `documentElement` is
 * available. Deferring avoids a one-time no-op that leaves theme state unapplied.
 *
 * @param {string} themeId - Active theme id.
 * @returns {void}
 */
function queueThemeApplyOnDocumentReady(themeId) {
  if (!globalThis.document || globalThis.document.documentElement) {
    return;
  }

  const onReadyStateChange = () => {
    if (globalThis.document.documentElement) {
      setActiveTheme(themeId);
      globalThis.document.removeEventListener('readystatechange', onReadyStateChange);
    }
  };

  globalThis.document.addEventListener('readystatechange', onReadyStateChange);
}

/**
 * Queues style injection until `<head>` exists.
 *
 * Why:
 * The userscript runs at `document-start`, where `document.head` can briefly be
 * unavailable. Delayed retry preserves early theming without brittle polling.
 *
 * @param {string} cssText - Compiled theme stylesheet text.
 * @returns {void}
 */
function queueStyleInjectionOnHeadReady(cssText) {
  if (!globalThis.document || globalThis.document.head) {
    return;
  }

  const onReadyStateChange = () => {
    if (globalThis.document.head) {
      ensureThemeStyleTag(cssText);
      globalThis.document.removeEventListener('readystatechange', onReadyStateChange);
    }
  };

  globalThis.document.addEventListener('readystatechange', onReadyStateChange);
}

/**
 * Injects or updates the theme style tag in document head.
 *
 * Why:
 * Host apps can replace head nodes during hydration or navigation. This update
 * path ensures the stylesheet remains singular and current.
 *
 * @param {string} cssText - Compiled theme stylesheet text.
 * @returns {HTMLStyleElement | null}
 */
function ensureThemeStyleTag(cssText) {
  if (!globalThis.document || !globalThis.document.head) {
    queueStyleInjectionOnHeadReady(cssText);
    return null;
  }

  let styleTag = globalThis.document.getElementById(STYLE_ID);
  if (!styleTag) {
    styleTag = globalThis.document.createElement('style');
    styleTag.id = STYLE_ID;
    globalThis.document.head.appendChild(styleTag);
  }

  if (styleTag.textContent !== cssText) {
    styleTag.textContent = cssText;
  }

  return styleTag;
}

/**
 * Applies active theme identity and color-scheme mode to `<html>`.
 *
 * @param {string} themeId - Active theme id.
 * @returns {void}
 */
function setActiveTheme(themeId) {
  if (!globalThis.document || !globalThis.document.documentElement) {
    queueThemeApplyOnDocumentReady(themeId);
    return;
  }

  const themeDefinition = getThemeDefinition(themeId);
  globalThis.document.documentElement.setAttribute(THEME_ID_ATTRIBUTE, themeDefinition.id);
  globalThis.document.documentElement.setAttribute(THEME_MODE_ATTRIBUTE, themeDefinition.mode);
}

/**
 * Queues integrity watcher installation until `<html>` exists.
 *
 * @param {() => string} getThemeId - Current theme id getter.
 * @param {string} cssText - Compiled theme stylesheet text.
 * @returns {void}
 */
function queueIntegrityWatchersOnDocumentReady(getThemeId, cssText) {
  if (!globalThis.document || globalThis.document.documentElement) {
    return;
  }

  const onReadyStateChange = () => {
    if (globalThis.document.documentElement) {
      installThemeIntegrityWatchers(getThemeId, cssText);
      globalThis.document.removeEventListener('readystatechange', onReadyStateChange);
    }
  };

  globalThis.document.addEventListener('readystatechange', onReadyStateChange);
}

/**
 * Returns whether `<html>` attributes currently match expected theme values.
 *
 * @param {string} themeId - Active theme id.
 * @returns {boolean}
 */
function hasExpectedThemeAttributes(themeId) {
  if (!globalThis.document || !globalThis.document.documentElement) {
    return false;
  }

  const themeDefinition = getThemeDefinition(themeId);
  const activeThemeId = globalThis.document.documentElement.getAttribute(THEME_ID_ATTRIBUTE);
  const activeThemeMode = globalThis.document.documentElement.getAttribute(THEME_MODE_ATTRIBUTE);
  return activeThemeId === themeDefinition.id && activeThemeMode === themeDefinition.mode;
}

/**
 * Installs lightweight integrity watchers for style and attribute presence.
 *
 * Why:
 * Some SPA updates can unexpectedly remove injected style tags or root
 * attributes. This watcher restores expected state without page reload.
 *
 * @param {() => string} getThemeId - Current theme id getter.
 * @param {string} cssText - Compiled theme stylesheet text.
 * @returns {void}
 */
function installThemeIntegrityWatchers(getThemeId, cssText) {
  if (!globalThis.document || !globalThis.document.documentElement) {
    queueIntegrityWatchersOnDocumentReady(getThemeId, cssText);
    return;
  }

  const refreshThemeState = () => {
    ensureThemeStyleTag(cssText);
    setActiveTheme(getThemeId());
  };

  refreshThemeState();

  if (globalThis.document.head && typeof globalThis.MutationObserver === 'function') {
    const headObserver = new globalThis.MutationObserver(() => {
      if (!globalThis.document.getElementById(STYLE_ID)) {
        refreshThemeState();
      }
    });
    headObserver.observe(globalThis.document.head, { childList: true });
  }

  if (typeof globalThis.MutationObserver === 'function') {
    const htmlAttributeObserver = new globalThis.MutationObserver(() => {
      if (!hasExpectedThemeAttributes(getThemeId())) {
        refreshThemeState();
      }
    });
    htmlAttributeObserver.observe(globalThis.document.documentElement, {
      attributes: true,
      attributeFilter: [THEME_ID_ATTRIBUTE, THEME_MODE_ATTRIBUTE],
    });
  }

  globalThis.document.addEventListener('readystatechange', refreshThemeState);
  globalThis.addEventListener('DOMContentLoaded', refreshThemeState);
  globalThis.addEventListener('load', refreshThemeState);
  globalThis.addEventListener('popstate', refreshThemeState);
  globalThis.addEventListener('pageshow', refreshThemeState);
  globalThis.document.addEventListener('visibilitychange', () => {
    if (!globalThis.document.hidden) {
      refreshThemeState();
    }
  });
}

module.exports = {
  STYLE_ID,
  THEME_ID_ATTRIBUTE,
  THEME_MODE_ATTRIBUTE,
  ensureThemeStyleTag,
  installThemeIntegrityWatchers,
  setActiveTheme,
};
