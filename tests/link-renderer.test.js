const { linkifyPostContent, splitTextIntoUrlParts } = require('../src/dom/link-renderer');

/**
 * Verifies hyperlink auto-linking and punctuation handling.
 */
describe('link-renderer', () => {
  test('splits text into url and text parts', () => {
    const parts = splitTextIntoUrlParts('hello https://example.com/very/long/path/file.png, world');

    expect(parts.some((part) => part.kind === 'url')).toBe(true);
    expect(parts.find((part) => part.kind === 'url').value).toBe(
      'https://example.com/very/long/path/file.png'
    );
    expect(parts.find((part) => part.kind === 'url').trailing).toBe(',');
  });

  test('linkifies plain urls and keeps trailing punctuation', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-feed-text">see this https://example.com/image.png, right now</div>
      </article>
    `;

    const postCard = document.querySelector('.cn-feed-card');
    linkifyPostContent(postCard);

    const link = postCard.querySelector('.cdp-auto-link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('https://example.com/image.png');
    expect(link.getAttribute('data-cdp-tooltip')).toBe('https://example.com/image.png');
    expect(link.getAttribute('aria-label')).toBe('https://example.com/image.png');
    expect(link.hasAttribute('title')).toBe(false);
    expect(postCard.querySelector('.cn-feed-text').textContent).toContain(', right now');
  });

  test('does not re-linkify links already inside anchors', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-feed-text"><a href="https://example.com/foo">https://example.com/foo</a></div>
      </article>
    `;

    const postCard = document.querySelector('.cn-feed-card');
    linkifyPostContent(postCard);
    linkifyPostContent(postCard);

    expect(postCard.querySelectorAll('.cdp-auto-link')).toHaveLength(0);
    expect(postCard.querySelectorAll('.cn-feed-text a')).toHaveLength(1);
  });
});
