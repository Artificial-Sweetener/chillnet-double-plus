const { createPostPipeline } = require('../src/core/post-pipeline');
const {
  FILTERED_COMMENT_CLASS,
  FILTERED_COMMENT_COUNT_CLASS,
} = require('../src/dom/comment-renderer');
const { filterPostComments } = require('../src/features/filtering/comment-filter-stage');

/**
 * Attaches synthetic React props object to a comment element for extraction tests.
 *
 * @param {Element} commentItem - Target comment element.
 * @param {Record<string, unknown>} reactProps - Synthetic React props payload.
 * @returns {void}
 */
function attachReactProps(commentItem, reactProps) {
  Object.defineProperty(commentItem, '__reactProps$test', {
    configurable: true,
    value: reactProps,
  });
}

/**
 * Verifies comment-level filtering behavior and filtered-count rendering.
 */
describe('comment-filter-stage', () => {
  test('filters blocked comment users and phrases and reports filtered count', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-post-stats-right">3 comments</div>
        <div class="cn-comment-item">
          <div class="cn-comment-author"><a href="/u/blocked_user">Blocked User</a></div>
          <div class="cn-comment-text">Normal text</div>
        </div>
        <div class="cn-comment-item">
          <div class="cn-comment-author">Safe Person</div>
          <div class="cn-comment-text">This has spoiler words</div>
        </div>
        <div class="cn-comment-item">
          <div class="cn-comment-author"><a href="/u/safe_user">Safe User</a></div>
          <div class="cn-comment-text">All good here</div>
        </div>
      </article>
    `;

    const postCard = document.querySelector('.cn-feed-card');
    const filteredCount = filterPostComments(postCard, {
      enabled: true,
      blockedUsers: ['blocked_user'],
      blockedPhrases: ['spoiler'],
    });

    expect(filteredCount).toBe(2);
    expect(postCard.querySelectorAll(`.${FILTERED_COMMENT_CLASS}`)).toHaveLength(2);
    expect(postCard.querySelector('.cn-post-stats-right').textContent).toContain(
      '3 comments - 2 filtered'
    );
  });

  test('restores comments and removes summary suffix when filtering is disabled', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-post-stats-right">2 comments</div>
        <div class="cn-comment-item">
          <div class="cn-comment-author"><a href="/u/blocked_user">Blocked User</a></div>
          <div class="cn-comment-text">Normal text</div>
        </div>
        <div class="cn-comment-item">
          <div class="cn-comment-author">Safe User</div>
          <div class="cn-comment-text">All good</div>
        </div>
      </article>
    `;

    const postCard = document.querySelector('.cn-feed-card');
    filterPostComments(postCard, {
      enabled: true,
      blockedUsers: ['blocked_user'],
      blockedPhrases: [],
    });

    const statsContainer = postCard.querySelector('.cn-post-stats-right');
    expect(statsContainer.querySelector(`.${FILTERED_COMMENT_COUNT_CLASS}`)).not.toBeNull();

    const filteredCount = filterPostComments(postCard, {
      enabled: false,
      blockedUsers: ['blocked_user'],
      blockedPhrases: [],
    });

    expect(filteredCount).toBe(0);
    expect(postCard.querySelectorAll(`.${FILTERED_COMMENT_CLASS}`)).toHaveLength(0);
    expect(statsContainer.querySelector(`.${FILTERED_COMMENT_COUNT_CLASS}`)).toBeNull();
    expect(statsContainer.textContent).toBe('2 comments');
  });

  test('filters blocked username using react props when comment has no profile link', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-post-stats-right">1 comments</div>
        <li class="cn-comment-item">
          <div class="cn-comment-head">
            <div class="cn-comment-author-wrap">
              <img alt="Robert Travesty avatar" class="cn-avatar" />
              <p class="cn-comment-author"><span>Robert Travesty</span></p>
            </div>
          </div>
          <p class="cn-comment-text">No public handle in comment markup</p>
        </li>
      </article>
    `;

    const commentItem = document.querySelector('.cn-comment-item');
    attachReactProps(commentItem, {
      children: [
        {
          props: {
            user: {
              username: 'poeticboredom',
              displayName: 'Robert Travesty',
            },
          },
        },
      ],
    });

    const postCard = document.querySelector('.cn-feed-card');
    const filteredCount = filterPostComments(postCard, {
      enabled: true,
      blockedUsers: ['@poeticboredom'],
      blockedPhrases: [],
    });

    expect(filteredCount).toBe(1);
    expect(commentItem.classList.contains(FILTERED_COMMENT_CLASS)).toBe(true);
    expect(postCard.querySelector('.cn-post-stats-right').textContent).toContain(
      '1 comments - 1 filtered'
    );
  });

  test('counts replies hidden by a filtered parent comment', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-post-stats-right">2 comments</div>
        <ul class="cn-comment-list">
          <li class="cn-comment-item">
            <div class="cn-comment-author"><a href="/u/blocked_user">Blocked User</a></div>
            <div class="cn-comment-text">Top-level blocked comment</div>
            <ul>
              <li class="cn-comment-item cn-comment-reply-item">
                <div class="cn-comment-author"><a href="/u/safe_user">Safe User</a></div>
                <div class="cn-comment-text">Reply under blocked parent</div>
              </li>
            </ul>
          </li>
        </ul>
      </article>
    `;

    const postCard = document.querySelector('.cn-feed-card');
    const filteredCount = filterPostComments(postCard, {
      enabled: true,
      blockedUsers: ['blocked_user'],
      blockedPhrases: [],
    });

    const commentItems = Array.from(postCard.querySelectorAll('.cn-comment-item'));
    expect(filteredCount).toBe(2);
    expect(commentItems[0].classList.contains(FILTERED_COMMENT_CLASS)).toBe(true);
    expect(commentItems[1].classList.contains(FILTERED_COMMENT_CLASS)).toBe(false);
    expect(postCard.querySelector('.cn-post-stats-right').textContent).toContain(
      '2 comments - 2 filtered'
    );
  });
});

/**
 * Verifies pipeline behavior for comments loaded after initial card processing.
 */
describe('post-pipeline comment integration', () => {
  test('filters newly loaded comments even when post fingerprint is unchanged', () => {
    document.body.innerHTML = `
      <article class="cn-feed-card">
        <div class="cn-feed-user">
          <a href="/u/author"><span class="cn-feed-user-name">Author</span></a>
          <span class="cn-feed-user-handle">@author</span>
        </div>
        <div class="cn-feed-text">Base post text with no links</div>
        <div class="cn-post-stats-right">5 comments</div>
        <div class="cn-comment-item">
          <div class="cn-comment-author"><a href="/u/blocked_user">Blocked User</a></div>
          <div class="cn-comment-text">Already loaded comment</div>
        </div>
      </article>
    `;

    const settings = {
      filters: {
        enabled: true,
        blockedUsers: ['blocked_user'],
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

    const postCard = document.querySelector('.cn-feed-card');
    const pipeline = createPostPipeline(() => settings);

    pipeline.run({ force: true });
    expect(postCard.querySelectorAll(`.${FILTERED_COMMENT_CLASS}`)).toHaveLength(1);
    expect(postCard.querySelector('.cn-post-stats-right').textContent).toContain(
      '5 comments - 1 filtered'
    );

    postCard.insertAdjacentHTML(
      'beforeend',
      `
        <div class="cn-comment-item">
          <div class="cn-comment-author"><a href="/u/blocked_user">Blocked User</a></div>
          <div class="cn-comment-text">Loaded from View more comments</div>
        </div>
      `
    );

    pipeline.run();
    expect(postCard.querySelectorAll(`.${FILTERED_COMMENT_CLASS}`)).toHaveLength(2);
    expect(postCard.querySelector('.cn-post-stats-right').textContent).toContain(
      '5 comments - 2 filtered'
    );
  });

  test('filters detached permalink comments and syncs post summary', () => {
    window.history.pushState({}, '', '/p/d575a2e0-09c4-4b99-b464-02de2f74f2c4');

    document.body.innerHTML = `
      <main class="cn-page-main">
        <article class="cn-feed-card">
          <div class="cn-feed-user">
            <span class="cn-feed-user-name">Author</span>
            <span class="cn-feed-user-handle">@author</span>
          </div>
          <div class="cn-feed-text">Permalink post body</div>
          <div class="cn-post-stats-right">2 comments</div>
        </article>
        <ul class="cn-comments-list">
          <li class="cn-comment-item">
            <div class="cn-comment-head">
              <div class="cn-comment-author-wrap">
                <p class="cn-comment-author"><span>Blocked Person</span></p>
              </div>
            </div>
            <p class="cn-comment-text">Detached comment one</p>
          </li>
          <li class="cn-comment-item">
            <div class="cn-comment-head">
              <div class="cn-comment-author-wrap">
                <p class="cn-comment-author"><span>Safe Person</span></p>
              </div>
            </div>
            <p class="cn-comment-text">Detached comment two</p>
          </li>
        </ul>
      </main>
    `;

    const detachedComments = Array.from(
      document.querySelectorAll('.cn-comments-list .cn-comment-item')
    );
    attachReactProps(detachedComments[0], {
      children: [
        {
          props: {
            user: {
              username: 'blocked_user',
              displayName: 'Blocked Person',
            },
          },
        },
      ],
    });

    attachReactProps(detachedComments[1], {
      children: [
        {
          props: {
            user: {
              username: 'safe_user',
              displayName: 'Safe Person',
            },
          },
        },
      ],
    });

    const settings = {
      filters: {
        enabled: true,
        blockedUsers: ['@blocked_user'],
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

    expect(detachedComments[0].classList.contains(FILTERED_COMMENT_CLASS)).toBe(true);
    expect(detachedComments[1].classList.contains(FILTERED_COMMENT_CLASS)).toBe(false);
    expect(document.querySelector('.cn-post-stats-right').textContent).toContain(
      '2 comments - 1 filtered'
    );
  });
});
