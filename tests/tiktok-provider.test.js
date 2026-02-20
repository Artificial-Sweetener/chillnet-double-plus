const {
  extractTiktokVideoId,
  resolveTiktokEmbed,
} = require('../src/features/embeds/providers/tiktok-provider');

/**
 * Verifies TikTok URL parsing and descriptor generation.
 */
describe('tiktok-provider', () => {
  test('extracts video ID from profile video URL', () => {
    const videoId = extractTiktokVideoId(
      new URL('https://www.tiktok.com/@scout2015/video/6718335390845095173')
    );
    expect(videoId).toBe('6718335390845095173');
  });

  test('extracts video ID from embed URL', () => {
    const videoId = extractTiktokVideoId(
      new URL('https://www.tiktok.com/embed/v2/6718335390845095173')
    );
    expect(videoId).toBe('6718335390845095173');
  });

  test('returns empty ID for non-video URL', () => {
    const videoId = extractTiktokVideoId(new URL('https://www.tiktok.com/@scout2015'));
    expect(videoId).toBe('');
  });

  test('builds tiktok descriptor for supported URLs', () => {
    const descriptor = resolveTiktokEmbed(
      'https://www.tiktok.com/@scout2015/video/6718335390845095173'
    );
    expect(descriptor).toEqual({
      key: 'tiktok:6718335390845095173',
      kind: 'tiktok',
      sourceUrl: 'https://www.tiktok.com/@scout2015/video/6718335390845095173',
      embedUrl:
        'https://www.tiktok.com/player/v1/6718335390845095173?controls=1&description=1&music_info=1',
      frameHeight: 760,
      title: 'TikTok video preview',
    });
  });
});
