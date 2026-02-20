const { createPostPipeline } = require('../src/core/post-pipeline');
const { FILTERED_NOTIFICATION_CLASS } = require('../src/dom/notification-renderer');
const { filterNotificationItems } = require('../src/features/filtering/notification-filter-stage');

/**
 * Verifies notification filtering behavior across popup and notifications page.
 */
describe('notification-filter-stage', () => {
  test('filters blocked users in popup and notifications page lists', () => {
    document.body.innerHTML = `
      <div class="cn-notification-menu" role="menu">
        <a href="/notifications/all">All</a>
        <button type="button">Refresh</button>
        <ul class="cn-notification-list">
          <li class="cn-notification-item">
            <a class="cn-notification-link" href="/p/abc">
              <div class="cn-notification-item-top">@poeticboredom commented on your post 5m ago</div>
              <p class="cn-notification-post">blocked popup notification</p>
            </a>
          </li>
          <li class="cn-notification-item">
            <a class="cn-notification-link" href="/p/def">
              <div class="cn-notification-item-top">@safeuser commented on your post 4m ago</div>
              <p class="cn-notification-post">safe popup notification</p>
            </a>
          </li>
        </ul>
      </div>
      <ul class="cn-notification-list cn-notification-page-list">
        <li class="cn-notification-item">
          <a class="cn-notification-link" href="/p/ghi">
            <div class="cn-notification-item-top">@poeticboredom followed you 3m ago</div>
          </a>
        </li>
        <li class="cn-notification-item">
          <a class="cn-notification-link" href="/p/jkl">
            <div class="cn-notification-item-top">@anotherfriend chorked your post 2m ago</div>
          </a>
        </li>
      </ul>
    `;

    const filteredCount = filterNotificationItems({
      enabled: true,
      blockedUsers: ['@poeticboredom'],
      blockedPhrases: [],
    });

    const notificationItems = Array.from(document.querySelectorAll('.cn-notification-item'));
    expect(filteredCount).toBe(2);
    expect(notificationItems[0].classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(true);
    expect(notificationItems[1].classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(false);
    expect(notificationItems[2].classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(true);
    expect(notificationItems[3].classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(false);
  });

  test('filters notification when username only exists in /u/ notification URL', () => {
    document.body.innerHTML = `
      <ul class="cn-notification-list cn-notification-page-list">
        <li class="cn-notification-item">
          <a class="cn-notification-link" href="/u/poeticboredom">
            <div class="cn-notification-item-top">followed you 1m ago</div>
          </a>
        </li>
      </ul>
    `;

    const filteredCount = filterNotificationItems({
      enabled: true,
      blockedUsers: ['poeticboredom'],
      blockedPhrases: [],
    });

    const notificationItem = document.querySelector('.cn-notification-item');
    expect(filteredCount).toBe(1);
    expect(notificationItem.classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(true);
  });

  test('restores hidden notifications when filtering is disabled', () => {
    document.body.innerHTML = `
      <ul class="cn-notification-list cn-notification-page-list">
        <li class="cn-notification-item">
          <a class="cn-notification-link" href="/p/abc">
            <div class="cn-notification-item-top">@poeticboredom commented on your post</div>
          </a>
        </li>
      </ul>
    `;

    const notificationItem = document.querySelector('.cn-notification-item');
    filterNotificationItems({
      enabled: true,
      blockedUsers: ['@poeticboredom'],
      blockedPhrases: [],
    });
    expect(notificationItem.classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(true);

    const filteredCount = filterNotificationItems({
      enabled: false,
      blockedUsers: ['@poeticboredom'],
      blockedPhrases: [],
    });

    expect(filteredCount).toBe(0);
    expect(notificationItem.classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(false);
  });
});

/**
 * Verifies pipeline behavior for notifications page updates.
 */
describe('post-pipeline notification integration', () => {
  test('filters notifications even when route renders no post cards', () => {
    window.history.pushState({}, '', '/notifications/all');

    document.body.innerHTML = `
      <main>
        <ul class="cn-notification-list cn-notification-page-list">
          <li class="cn-notification-item">
            <a class="cn-notification-link" href="/p/abc">
              <div class="cn-notification-item-top">@blockeduser commented on your post</div>
            </a>
          </li>
          <li class="cn-notification-item">
            <a class="cn-notification-link" href="/p/def">
              <div class="cn-notification-item-top">@safeuser commented on your post</div>
            </a>
          </li>
        </ul>
      </main>
    `;

    const settings = {
      filters: {
        enabled: true,
        blockedUsers: ['@blockeduser'],
        blockedPhrases: [],
      },
      embeds: {
        enabled: false,
        image: true,
        reddit: true,
        spotify: true,
        tiktok: true,
        x: true,
        youtube: true,
        maxPerPost: 3,
      },
    };

    const pipeline = createPostPipeline(() => settings);
    pipeline.run({ force: true });

    const notificationItems = Array.from(document.querySelectorAll('.cn-notification-item'));
    expect(notificationItems[0].classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(true);
    expect(notificationItems[1].classList.contains(FILTERED_NOTIFICATION_CLASS)).toBe(false);
  });
});
