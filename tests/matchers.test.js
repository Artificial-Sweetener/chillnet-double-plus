const { parseListText } = require('../src/features/filtering/matchers');

/**
 * Verifies list parsing contract used by settings inputs.
 */
describe('matchers', () => {
  test('parses comma-delimited list values', () => {
    expect(parseListText('alpha, @beta, gamma')).toEqual(['alpha', '@beta', 'gamma']);
  });

  test('keeps newline content as part of a token when commas are absent', () => {
    expect(parseListText('alpha\nbeta')).toEqual(['alpha\nbeta']);
  });
});
