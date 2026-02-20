const { buildFeatureStylesCss } = require('../src/theme/feature-styles');

/**
 * Guards modal action button theming contracts in generated feature CSS.
 */
describe('feature-styles', () => {
  test('emits explicit primary and danger button contrast tokens', () => {
    const css = buildFeatureStylesCss();
    expect(css).toContain('--cdp-modal-primary-text');
    expect(css).toContain('--cdp-modal-danger-border');
    expect(css).toContain('--cdp-modal-danger-bg');
    expect(css).toContain('--cdp-modal-danger-text');
  });

  test('maps action button styles to contrast token variables', () => {
    const css = buildFeatureStylesCss();
    expect(css).toContain('#cdp-settings-panel .cdp-settings-btn.is-primary');
    expect(css).toContain('--cdp-settings-btn-ink: var(--cdp-modal-primary-text);');
    expect(css).toContain('#cdp-settings-panel .cdp-settings-btn.is-danger');
    expect(css).toContain('--cdp-settings-btn-ink: var(--cdp-modal-danger-text);');
  });

  test('uses neutral hover treatment without brightness filter washout', () => {
    const css = buildFeatureStylesCss();
    expect(css).toContain('--cdp-modal-button-hover-border');
    expect(css).toContain('--cdp-settings-btn-bg');
    expect(css).toContain('#cdp-settings-panel .cdp-settings-btn:hover');
    expect(css).toContain('background: var(--cdp-settings-btn-bg) !important;');
    expect(css).toContain('background-image: var(--cdp-settings-btn-bg) !important;');
    expect(css).not.toContain('filter: brightness(1.06);');
  });

  test('themes inline block controls with modal tokens across light and dark modes', () => {
    const css = buildFeatureStylesCss();
    expect(css).toContain('.cn-feed-head-right .cdp-inline-block-user-btn');
    expect(css).toContain('background: var(--cdp-modal-button);');
    expect(css).toContain('color: var(--cdp-modal-button-text);');
    expect(css).toContain('border-color: var(--cdp-modal-button-hover-border);');
    expect(css).toContain('background: var(--cdp-modal-danger-bg);');
    expect(css).not.toContain('var(--cdp-theme-panelMuted');
    expect(css).not.toContain('var(--cdp-theme-dangerSoft');
  });

  test('keeps modal header gradient full-width by scrolling settings body instead of panel root', () => {
    const css = buildFeatureStylesCss();
    expect(css).toContain('#cdp-settings-panel {');
    expect(css).toContain('grid-template-rows: auto minmax(0, 1fr);');
    expect(css).toContain('overflow: hidden;');
    expect(css).toContain('.cdp-settings-body {');
    expect(css).toContain('overflow: auto;');
    expect(css).toContain('scrollbar-gutter: stable;');
    expect(css).not.toContain('scrollbar-gutter: stable both-edges;');
  });
});
