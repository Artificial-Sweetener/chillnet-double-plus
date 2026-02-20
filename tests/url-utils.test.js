const { middleElideUrl, trimUrlPunctuation } = require('../src/core/url-utils');

/**
 * Verifies URL utility behavior.
 */
describe('url-utils', () => {
  test('trims punctuation around urls', () => {
    expect(trimUrlPunctuation('https://example.com/a.jpg,')).toBe('https://example.com/a.jpg');
    expect(trimUrlPunctuation('https://example.com/a.jpg...)')).toBe('https://example.com/a.jpg');
  });

  test('middle-elides long urls', () => {
    const value = middleElideUrl(
      'https://example.com/very/long/path/to/resource/file-name.jpg',
      26
    );
    expect(value).toContain('…');
    expect(value.length).toBeLessThanOrEqual(26);
  });
});
