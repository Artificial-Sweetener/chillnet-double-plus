const { addBlockedUserToSettings } = require('../src/features/filtering/block-list-updater');

/**
 * Ensures inline block actions produce deterministic filter settings updates.
 */
describe('block-list-updater', () => {
  function createSettings() {
    return {
      theme: { id: 'dark' },
      filters: {
        enabled: false,
        blockedUsers: [],
        blockedPhrases: [],
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

  test('adds canonical username entry and enables filtering', () => {
    const initialSettings = createSettings();
    const result = addBlockedUserToSettings(initialSettings, {
      username: 'poeticboredom',
      displayName: 'Robert Travesty',
    });

    expect(result.changed).toBe(true);
    expect(result.addedEntry).toBe('@poeticboredom');
    expect(result.nextSettings.filters.enabled).toBe(true);
    expect(result.nextSettings.filters.blockedUsers).toEqual(['@poeticboredom']);
  });

  test('keeps settings unchanged when target user is already blocked', () => {
    const initialSettings = createSettings();
    initialSettings.filters.blockedUsers = ['@poeticboredom'];

    const result = addBlockedUserToSettings(initialSettings, {
      username: 'PoeticBoredom',
      displayName: 'Robert Travesty',
    });

    expect(result.changed).toBe(false);
    expect(result.nextSettings).toBe(initialSettings);
  });

  test('falls back to display name when username is unavailable', () => {
    const initialSettings = createSettings();

    const result = addBlockedUserToSettings(initialSettings, {
      username: '',
      displayName: 'Display Name Only',
    });

    expect(result.changed).toBe(true);
    expect(result.addedEntry).toBe('Display Name Only');
    expect(result.nextSettings.filters.blockedUsers).toEqual(['Display Name Only']);
  });
});
