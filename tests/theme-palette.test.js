const { buildThemeStylesheetCss, buildScopedThemeCss } = require('../src/theme/palette');
const { getThemeDefinition } = require('../src/theme/theme-registry');

/**
 * Guards key theme stylesheet selectors from regressions.
 */
describe('theme-palette', () => {
  test('emits scoped css for each custom theme id', () => {
    const css = buildThemeStylesheetCss();
    expect(css).toContain('html[data-cdp-theme="dark"]');
    expect(css).toContain('html[data-cdp-theme="olden"]');
    expect(css).toContain('html[data-cdp-theme="brown"]');
    expect(css).toContain('html[data-cdp-theme="pink"]');
    expect(css).toContain('html[data-cdp-theme="aurora"]');
    expect(css).not.toContain('html[data-cdp-theme="original"] .cn-feed-card');
  });

  test('includes core feed and comment selectors for dark theme', () => {
    const css = buildScopedThemeCss(getThemeDefinition('dark'));
    expect(css).toContain('.cn-feed-card');
    expect(css).toContain('.cn-comment-item');
    expect(css).toContain('.cn-comment-format-btn');
    expect(css).toContain('.cn-inline-menu-trigger');
    expect(css).toContain('.cn-mention-menu');
    expect(css).toContain('.cn-mention-option.is-active');
    expect(css).toContain('.cn-post-action-btn.is-sqwang');
    expect(css).toContain('.cn-notification-item-special');
  });

  test('includes themed poll, donate, and module overrides', () => {
    const css = buildScopedThemeCss(getThemeDefinition('pink'));
    expect(css).toContain('.cn-poll-card');
    expect(css).toContain('.cn-donate-card.is-featured');
    expect(css).toContain('[class*="__emojiBtn"]');
    expect(css).toContain('[class*="__howToPlayStat"]');
    expect(css).toContain('[class*="__limitCard"]');
    expect(css).toContain('[class*="__limitValue"]');
  });

  test('includes olden manuscript typography overrides', () => {
    const css = buildScopedThemeCss(getThemeDefinition('olden'));
    expect(css).toContain('UnifrakturCook');
    expect(css).toContain('Pirata One');
    expect(css).toContain('repeating-linear-gradient');
    expect(css).toContain('.cn-feed-card .cn-feed-text::first-letter');
  });
});
