const { resolveEmbedDescriptors } = require('../src/features/embeds/embed-engine');

/**
 * Verifies media embed descriptor resolution.
 */
describe('embed-engine', () => {
  test('resolves youtube and image embeds in order', () => {
    const descriptors = resolveEmbedDescriptors(
      {
        externalUrls: [
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          'https://example.com/cat.png',
        ],
      },
      {
        enabled: true,
        image: true,
        reddit: true,
        spotify: true,
        tiktok: true,
        x: true,
        youtube: true,
        maxPerPost: 3,
      }
    );

    expect(descriptors).toHaveLength(2);
    expect(descriptors[0].kind).toBe('youtube');
    expect(descriptors[1].kind).toBe('image');
  });

  test('respects max per post', () => {
    const descriptors = resolveEmbedDescriptors(
      {
        externalUrls: [
          'https://example.com/a.jpg',
          'https://example.com/b.jpg',
          'https://example.com/c.jpg',
        ],
      },
      {
        enabled: true,
        image: true,
        reddit: true,
        spotify: true,
        tiktok: true,
        x: true,
        youtube: false,
        maxPerPost: 2,
      }
    );

    expect(descriptors).toHaveLength(2);
  });

  test('returns no embeds when disabled', () => {
    const descriptors = resolveEmbedDescriptors(
      {
        externalUrls: ['https://example.com/a.jpg'],
      },
      {
        enabled: false,
        image: true,
        reddit: true,
        spotify: true,
        tiktok: true,
        x: true,
        youtube: true,
        maxPerPost: 3,
      }
    );

    expect(descriptors).toEqual([]);
  });

  test('resolves spotify embeds when enabled', () => {
    const descriptors = resolveEmbedDescriptors(
      {
        externalUrls: ['https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P?si=abc123'],
      },
      {
        enabled: true,
        image: true,
        reddit: true,
        spotify: true,
        tiktok: true,
        x: true,
        youtube: true,
        maxPerPost: 3,
      }
    );

    expect(descriptors).toHaveLength(1);
    expect(descriptors[0].kind).toBe('spotify');
    expect(descriptors[0].embedUrl).toContain('/embed/track/7ouMYWpwJ422jRcDASZB7P');
  });

  test('resolves x, reddit, and tiktok embeds when enabled', () => {
    const descriptors = resolveEmbedDescriptors(
      {
        externalUrls: [
          'https://x.com/example/status/1890001234567890123',
          'https://www.reddit.com/r/javascript/comments/1abc123/sample_post_title/',
          'https://www.tiktok.com/@scout2015/video/6718335390845095173',
        ],
      },
      {
        enabled: true,
        image: true,
        reddit: true,
        spotify: true,
        tiktok: true,
        x: true,
        youtube: true,
        maxPerPost: 6,
      }
    );

    expect(descriptors).toHaveLength(3);
    expect(descriptors[0].kind).toBe('x');
    expect(descriptors[1].kind).toBe('reddit');
    expect(descriptors[2].kind).toBe('tiktok');
  });
});
