const {
  DEFAULT_THEME_ID,
  getThemeDefinition,
  isValidThemeId,
  listThemeOptions,
} = require('../src/theme/theme-registry');

/**
 * Verifies theme registry definitions and lookup fallbacks.
 */
describe('theme-registry', () => {
  test('returns default theme when id is unknown', () => {
    const theme = getThemeDefinition('not-a-theme');
    expect(theme.id).toBe(DEFAULT_THEME_ID);
  });

  test('exposes expected user-facing theme options', () => {
    const optionIds = listThemeOptions().map((themeOption) => themeOption.id);
    expect(optionIds).toEqual(['original', 'dark', 'olden', 'brown', 'pink', 'aurora']);
  });

  test('validates known ids', () => {
    expect(isValidThemeId('dark')).toBe(true);
    expect(isValidThemeId('original')).toBe(true);
    expect(isValidThemeId('invalid')).toBe(false);
  });
});
