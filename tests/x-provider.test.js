const { extractXPostId, resolveXEmbed } = require('../src/features/embeds/providers/x-provider');

/**
 * Verifies X status URL parsing and descriptor generation.
 */
describe('x-provider', () => {
  test('extracts status ID from x.com post URL', () => {
    const postId = extractXPostId(new URL('https://x.com/chillnet/status/1890001234567890123'));
    expect(postId).toBe('1890001234567890123');
  });

  test('extracts status ID from twitter.com URL', () => {
    const postId = extractXPostId(
      new URL('https://twitter.com/chillnet/status/1890001234567890123?ref=share')
    );
    expect(postId).toBe('1890001234567890123');
  });

  test('returns empty ID for non-status URL', () => {
    const postId = extractXPostId(new URL('https://x.com/chillnet'));
    expect(postId).toBe('');
  });

  test('builds X descriptor for supported URLs', () => {
    const descriptor = resolveXEmbed('https://x.com/chillnet/status/1890001234567890123');
    expect(descriptor).toEqual({
      key: 'x:1890001234567890123',
      kind: 'x',
      sourceUrl: 'https://x.com/chillnet/status/1890001234567890123',
      embedUrl: 'https://platform.twitter.com/embed/Tweet.html?id=1890001234567890123&dnt=true',
      frameHeight: 560,
      title: 'X post preview',
    });
  });
});
