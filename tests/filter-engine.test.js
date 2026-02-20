const { evaluateFilterDecision } = require('../src/features/filtering/filter-engine');

/**
 * Verifies user and phrase filter behavior.
 */
describe('filter-engine', () => {
  test('blocks by username', () => {
    const decision = evaluateFilterDecision(
      {
        username: 'chillneil',
        displayName: 'Chill Neil',
        searchText: 'hello world',
      },
      {
        enabled: true,
        blockedUsers: ['@chillneil'],
        blockedPhrases: [],
      }
    );

    expect(decision.blocked).toBe(true);
    expect(decision.reasons.some((reason) => reason.startsWith('user:'))).toBe(true);
  });

  test('blocks by phrase', () => {
    const decision = evaluateFilterDecision(
      {
        username: 'userA',
        displayName: 'User A',
        searchText: 'this post contains yerked and other text',
      },
      {
        enabled: true,
        blockedUsers: [],
        blockedPhrases: ['yerked'],
      }
    );

    expect(decision.blocked).toBe(true);
    expect(decision.reasons.some((reason) => reason.startsWith('phrase:'))).toBe(true);
  });

  test('blocks by display name when username is unavailable', () => {
    const decision = evaluateFilterDecision(
      {
        username: '',
        displayName: 'Robert Travesty',
        searchText: 'Comment text body',
      },
      {
        enabled: true,
        blockedUsers: ['Robert Travesty'],
        blockedPhrases: [],
      }
    );

    expect(decision.blocked).toBe(true);
    expect(decision.reasons).toContain('user:robert travesty');
  });

  test('does not block when disabled', () => {
    const decision = evaluateFilterDecision(
      {
        username: 'chillneil',
        displayName: 'Chill Neil',
        searchText: 'contains blocked text',
      },
      {
        enabled: false,
        blockedUsers: ['chillneil'],
        blockedPhrases: ['blocked'],
      }
    );

    expect(decision).toEqual({
      blocked: false,
      reasons: [],
    });
  });
});
