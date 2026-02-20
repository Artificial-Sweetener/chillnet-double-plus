const { filterRailSections } = require('../src/features/filtering/rail-filter-stage');

/**
 * Verifies right-rail filtering behavior for suggestions and scoreboards.
 */
describe('rail-filter-stage', () => {
  test('removes blocked users from who-to-follow and targeted scoreboards', () => {
    document.body.innerHTML = `
      <aside class="cn-right-rail">
        <div class="cn-rail-card">
          <p class="cn-rail-title">Who to Follow</p>
          <ul class="cn-suggest-list">
            <li class="cn-suggest-item">
              <a class="cn-suggest-user" href="/u/poeticboredom">Robert Travesty</a>
              <a class="cn-suggest-handle" href="/u/poeticboredom">@poeticboredom</a>
            </li>
            <li class="cn-suggest-item">
              <a class="cn-suggest-user" href="/u/chillneil">Chill Neil</a>
              <a class="cn-suggest-handle" href="/u/chillneil">@chillneil</a>
            </li>
          </ul>
        </div>
        <div class="cn-rail-card">
          <p class="cn-scoreboard-title"><span aria-hidden="true">🍗</span> NUGGIEBASH DAILY SCOREBOARD (UTC)</p>
          <ol class="cn-scoreboard-list">
            <li class="cn-scoreboard-row">
              <a class="cn-scoreboard-user-link" href="/u/poeticboredom">@poeticboredom</a>
              <strong class="cn-scoreboard-score">1003</strong>
            </li>
            <li class="cn-scoreboard-row">
              <a class="cn-scoreboard-user-link" href="/u/chillneil">@chillneil</a>
              <strong class="cn-scoreboard-score">3183</strong>
            </li>
          </ol>
        </div>
        <div class="cn-rail-card">
          <p class="cn-scoreboard-title"><span aria-hidden="true">🎨</span> EMOJART LIFETIME SCOREBOARD</p>
          <ol class="cn-scoreboard-list">
            <li class="cn-scoreboard-row">
              <a class="cn-scoreboard-user-link" href="/u/poeticboredom">@poeticboredom</a>
              <strong class="cn-scoreboard-score">32</strong>
            </li>
            <li class="cn-scoreboard-row">
              <a class="cn-scoreboard-user-link" href="/u/antisweep">@antisweep</a>
              <strong class="cn-scoreboard-score">28</strong>
            </li>
          </ol>
        </div>
      </aside>
    `;

    filterRailSections({
      enabled: true,
      blockedUsers: ['@poeticboredom'],
      blockedPhrases: [],
    });

    expect(document.querySelector('.cn-suggest-list').textContent.includes('poeticboredom')).toBe(
      false
    );
    expect(
      document.querySelectorAll('.cn-scoreboard-list')[0].textContent.includes('poeticboredom')
    ).toBe(false);
    expect(
      document.querySelectorAll('.cn-scoreboard-list')[1].textContent.includes('poeticboredom')
    ).toBe(false);
    expect(document.querySelector('.cn-suggest-list').textContent.includes('chillneil')).toBe(true);
    expect(
      document.querySelectorAll('.cn-scoreboard-list')[1].textContent.includes('antisweep')
    ).toBe(true);
  });

  test('does not filter when feature is disabled', () => {
    document.body.innerHTML = `
      <aside class="cn-right-rail">
        <div class="cn-rail-card">
          <p class="cn-rail-title">Who to Follow</p>
          <ul class="cn-suggest-list">
            <li class="cn-suggest-item">
              <a class="cn-suggest-user" href="/u/poeticboredom">Robert Travesty</a>
              <a class="cn-suggest-handle" href="/u/poeticboredom">@poeticboredom</a>
            </li>
          </ul>
        </div>
      </aside>
    `;

    filterRailSections({
      enabled: false,
      blockedUsers: ['@poeticboredom'],
      blockedPhrases: [],
    });

    expect(document.querySelector('.cn-suggest-list').textContent.includes('poeticboredom')).toBe(
      true
    );
  });
});
