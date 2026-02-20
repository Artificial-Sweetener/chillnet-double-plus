const { extractCurrentUsername } = require('../src/dom/current-user');

/**
 * Verifies current-user extraction used by self-block safeguards.
 */
describe('current-user', () => {
  beforeEach(() => {
    global.document.body.innerHTML = '';
  });

  test('extracts username from account-name element', () => {
    global.document.body.innerHTML = '<span class="cn-account-name">@ArtificialSweetener</span>';
    expect(extractCurrentUsername()).toBe('ArtificialSweetener');
  });

  test('falls back to account-pill aria-label', () => {
    global.document.body.innerHTML =
      '<button class="cn-account-pill" aria-label="@ArtificialSweetener menu"></button>';
    expect(extractCurrentUsername()).toBe('ArtificialSweetener');
  });
});
