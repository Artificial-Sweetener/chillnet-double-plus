const {
  extractRedditEmbedPath,
  resolveRedditEmbed,
} = require('../src/features/embeds/providers/reddit-provider');

/**
 * Verifies Reddit URL parsing and descriptor generation.
 */
describe('reddit-provider', () => {
  test('extracts embed path from standard reddit post URL', () => {
    const embedPath = extractRedditEmbedPath(
      new URL('https://www.reddit.com/r/javascript/comments/1abc123/sample_post_title/')
    );
    expect(embedPath).toBe('/r/javascript/comments/1abc123/sample_post_title/');
  });

  test('extracts embed path from redd.it short URL', () => {
    const embedPath = extractRedditEmbedPath(new URL('https://redd.it/1abc123'));
    expect(embedPath).toBe('/comments/1abc123/');
  });

  test('returns empty path for non-post reddit URLs', () => {
    const embedPath = extractRedditEmbedPath(new URL('https://www.reddit.com/r/javascript/'));
    expect(embedPath).toBe('');
  });

  test('builds reddit descriptor for supported URLs', () => {
    const descriptor = resolveRedditEmbed(
      'https://www.reddit.com/r/javascript/comments/1abc123/sample_post_title/'
    );

    expect(descriptor).toEqual({
      key: 'reddit:/r/javascript/comments/1abc123/sample_post_title/',
      kind: 'reddit',
      sourceUrl: 'https://www.reddit.com/r/javascript/comments/1abc123/sample_post_title/',
      embedUrl:
        'https://www.redditmedia.com/r/javascript/comments/1abc123/sample_post_title/?embed=true&ref=share&ref_source=embed&showmedia=true',
      frameHeight: 520,
      title: 'Reddit post preview',
    });
  });
});
