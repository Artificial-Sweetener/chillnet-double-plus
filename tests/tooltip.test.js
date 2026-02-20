const { installAutoLinkTooltip } = require('../src/dom/tooltip');

/**
 * Verifies runtime tooltip visibility for auto-links.
 */
describe('tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('shows tooltip text on hover and hides on mouseout', () => {
    document.body.innerHTML = `
      <a
        class="cdp-auto-link"
        href="https://example.com/test"
        data-cdp-tooltip="https://example.com/test"
      >example</a>
    `;

    installAutoLinkTooltip();

    const link = document.querySelector('.cdp-auto-link');
    link.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

    const tooltip = document.getElementById('cdp-hover-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip.hidden).toBe(true);

    jest.advanceTimersByTime(700);
    expect(tooltip.hidden).toBe(false);
    expect(tooltip.textContent).toBe('https://example.com/test');

    link.dispatchEvent(
      new MouseEvent('mouseout', {
        bubbles: true,
        relatedTarget: document.body,
      })
    );

    jest.advanceTimersByTime(180);
    expect(tooltip.hidden).toBe(true);
  });
});
