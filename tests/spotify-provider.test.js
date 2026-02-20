const {
  extractSpotifyEmbedPayload,
  resolveSpotifyEmbed,
  resolveSpotifyFrameHeight,
} = require('../src/features/embeds/providers/spotify-provider');

/**
 * Verifies Spotify embed URL parsing and descriptor generation.
 */
describe('spotify-provider', () => {
  test('extracts payload from track URL', () => {
    const payload = extractSpotifyEmbedPayload(
      new URL('https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P?si=123')
    );

    expect(payload).toEqual({
      embedType: 'track',
      embedId: '7ouMYWpwJ422jRcDASZB7P',
    });
  });

  test('extracts payload from localized playlist URL', () => {
    const payload = extractSpotifyEmbedPayload(
      new URL('https://open.spotify.com/intl-en/playlist/37i9dQZF1DXcBWIGoYBM5M')
    );

    expect(payload).toEqual({
      embedType: 'playlist',
      embedId: '37i9dQZF1DXcBWIGoYBM5M',
    });
  });

  test('returns null for non-spotify URLs', () => {
    const descriptor = resolveSpotifyEmbed('https://example.com/track/7ouMYWpwJ422jRcDASZB7P');
    expect(descriptor).toBeNull();
  });

  test('builds descriptor with correct iframe sizing', () => {
    const trackDescriptor = resolveSpotifyEmbed('https://open.spotify.com/track/abc123XYZ789');
    const albumDescriptor = resolveSpotifyEmbed('https://open.spotify.com/album/abc123XYZ789');

    expect(trackDescriptor.kind).toBe('spotify');
    expect(trackDescriptor.frameHeight).toBe(152);
    expect(trackDescriptor.embedUrl).toBe('https://open.spotify.com/embed/track/abc123XYZ789');
    expect(albumDescriptor.frameHeight).toBe(352);
  });

  test('resolves frame heights by embed type', () => {
    expect(resolveSpotifyFrameHeight('track')).toBe(152);
    expect(resolveSpotifyFrameHeight('episode')).toBe(152);
    expect(resolveSpotifyFrameHeight('playlist')).toBe(352);
  });
});
