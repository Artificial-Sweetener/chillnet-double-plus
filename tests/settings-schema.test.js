const { createDefaultSettings, normalizeSettings } = require('../src/storage/settings-schema');

/**
 * Verifies settings defaults and migration behavior.
 */
describe('settings-schema', () => {
  test('creates expected defaults', () => {
    const defaults = createDefaultSettings();
    expect(defaults.theme.id).toBe('dark');
    expect(defaults.filters.blockedUsers).toEqual([]);
    expect(defaults.embeds.reddit).toBe(true);
    expect(defaults.embeds.spotify).toBe(true);
    expect(defaults.embeds.tiktok).toBe(true);
    expect(defaults.embeds.x).toBe(true);
    expect(defaults.embeds.maxPerPost).toBe(3);
  });

  test('migrates legacy theme disabled preference', () => {
    const migrated = normalizeSettings(null, 'disabled');
    expect(migrated.theme.id).toBe('original');
  });

  test('migrates legacy boolean theme flag to theme id', () => {
    const normalized = normalizeSettings(
      {
        theme: { enabled: false },
      },
      null
    );

    expect(normalized.theme.id).toBe('original');
  });

  test('normalizes invalid values', () => {
    const normalized = normalizeSettings(
      {
        theme: { id: 'unknown' },
        filters: {
          enabled: true,
          blockedUsers: ['a', 'a', '', null],
          blockedPhrases: ['  test  ', '', 'x'],
        },
        embeds: {
          enabled: true,
          image: true,
          reddit: false,
          spotify: 'yes',
          tiktok: false,
          x: 'yes',
          youtube: true,
          maxPerPost: 99,
        },
      },
      null
    );

    expect(normalized.filters.blockedUsers).toEqual(['a']);
    expect(normalized.filters.blockedPhrases).toEqual(['test', 'x']);
    expect(normalized.embeds.reddit).toBe(false);
    expect(normalized.embeds.spotify).toBe(true);
    expect(normalized.embeds.tiktok).toBe(false);
    expect(normalized.embeds.x).toBe(true);
    expect(normalized.embeds.maxPerPost).toBe(6);
    expect(normalized.theme.id).toBe('dark');
  });
});
