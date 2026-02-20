const { extractPostModel } = require('../src/dom/post-extractor');

/**
 * Verifies Chillnet DOM extraction behavior for filtering and embeds.
 */
describe('post-extractor', () => {
  test('extracts username, text, id, and external links', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-feed-user">
          <a href="/u/chillneil"><span class="cn-feed-user-name">Chill Neil</span></a>
          <span class="cn-feed-user-handle">@chillneil nuggie rank</span>
        </div>
        <a class="cn-feed-date-link" href="/p/abc-123">date</a>
        <div class="cn-feed-text">Look at this https://example.com/pic.jpg and https://chillnet.me/u/test</div>
        <a href="https://youtu.be/dQw4w9WgXcQ">video</a>
        <div class="cn-poll-title">Poll title</div>
      </article>
    `;

    const postCard = document.querySelector('.cn-feed-card');
    const postModel = extractPostModel(postCard, 0);

    expect(postModel.postId).toBe('post:abc-123');
    expect(postModel.username).toBe('chillneil');
    expect(postModel.displayName).toBe('Chill Neil');
    expect(postModel.textContent).toContain('Poll title');
    expect(postModel.externalUrls).toEqual(
      expect.arrayContaining(['https://example.com/pic.jpg', 'https://youtu.be/dQw4w9WgXcQ'])
    );
    expect(postModel.externalUrls.some((url) => url.includes('chillnet.me'))).toBe(false);
    expect(postModel.signature.length).toBeGreaterThan(0);
  });

  test('prefers anchor href over elided link text on reruns', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-feed-user">
          <a href="/u/example"><span class="cn-feed-user-name">Example</span></a>
          <span class="cn-feed-user-handle">@example</span>
        </div>
        <div class="cn-feed-text">
          <a class="cdp-auto-link" href="https://raw.githubusercontent.com/Artificial-Sweetener/chillnet-double-plus/main/logo-white.png">
            https://raw.githubusercontent.com/A…s/chillnet-double-plus/main/logo-white.png
          </a>
        </div>
      </article>
    `;

    const postCard = document.querySelector('.cn-feed-card');
    const postModel = extractPostModel(postCard, 0);

    expect(postModel.externalUrls).toContain(
      'https://raw.githubusercontent.com/Artificial-Sweetener/chillnet-double-plus/main/logo-white.png'
    );
    expect(postModel.externalUrls.some((url) => url.includes('A%E2%80%A6s'))).toBe(false);
  });

  test('does not include comment text in post text model', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-feed-user">
          <a href="/u/example"><span class="cn-feed-user-name">Example</span></a>
          <span class="cn-feed-user-handle">@example</span>
        </div>
        <div class="cn-feed-text">Post body text</div>
        <div class="cn-comment-item">
          <div class="cn-comment-author"><a href="/u/replier">Reply User</a></div>
          <div class="cn-comment-text">Comment-only phrase</div>
        </div>
      </article>
    `;

    const postCard = document.querySelector('.cn-feed-card');
    const postModel = extractPostModel(postCard, 0);

    expect(postModel.textContent).toContain('Post body text');
    expect(postModel.textContent).not.toContain('Comment-only phrase');
  });
});
