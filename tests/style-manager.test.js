const {
  STYLE_ID,
  THEME_ID_ATTRIBUTE,
  THEME_MODE_ATTRIBUTE,
  ensureThemeStyleTag,
  installThemeIntegrityWatchers,
  setActiveTheme,
} = require('../src/dom/style-manager');

/**
 * Waits for queued mutation callbacks to flush.
 *
 * @returns {Promise<void>}
 */
function flushMutationQueue() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

/**
 * Verifies DOM-side style idempotency and theme attribute behavior.
 */
describe('style-manager', () => {
  test('ensures one style tag and updates content', () => {
    const firstTag = ensureThemeStyleTag('body{color:red}');
    const secondTag = ensureThemeStyleTag('body{color:blue}');

    expect(firstTag).toBeTruthy();
    expect(secondTag).toBeTruthy();
    expect(firstTag.id).toBe(STYLE_ID);
    expect(secondTag.id).toBe(STYLE_ID);
    expect(document.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
    expect(document.getElementById(STYLE_ID).textContent).toBe('body{color:blue}');
  });

  test('sets html theme id and mode attributes', () => {
    setActiveTheme('pink');
    expect(document.documentElement.getAttribute(THEME_ID_ATTRIBUTE)).toBe('pink');
    expect(document.documentElement.getAttribute(THEME_MODE_ATTRIBUTE)).toBe('dark');

    setActiveTheme('original');
    expect(document.documentElement.getAttribute(THEME_ID_ATTRIBUTE)).toBe('original');
    expect(document.documentElement.getAttribute(THEME_MODE_ATTRIBUTE)).toBe('light');
  });

  test('restores theme attributes when host mutates html state', async () => {
    installThemeIntegrityWatchers(() => 'pink', 'body{color:pink}');
    expect(document.documentElement.getAttribute(THEME_ID_ATTRIBUTE)).toBe('pink');
    expect(document.documentElement.getAttribute(THEME_MODE_ATTRIBUTE)).toBe('dark');

    document.documentElement.removeAttribute(THEME_ID_ATTRIBUTE);
    await flushMutationQueue();

    expect(document.documentElement.getAttribute(THEME_ID_ATTRIBUTE)).toBe('pink');
    expect(document.documentElement.getAttribute(THEME_MODE_ATTRIBUTE)).toBe('dark');
  });
});
