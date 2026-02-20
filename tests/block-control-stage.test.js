const {
  syncPostAndCommentBlockControls,
} = require('../src/features/filtering/block-control-stage');

/**
 * Verifies inline block control placement and click behavior.
 */
describe('block-control-stage', () => {
  function buildPostCardFixture(options = {}) {
    const accountMarkup = options.currentUsername
      ? `<span class="cn-account-name">@${options.currentUsername}</span>`
      : '';
    global.document.body.innerHTML = `
      <header class="cn-header">${accountMarkup}</header>
      <ul class="cn-feed-list">
        <li class="cn-feed-card">
          <div class="cn-feed-head">
            <div class="cn-feed-user">
              <p class="cn-feed-user-name">Alpha User</p>
              <p class="cn-feed-user-handle">@alpha_user</p>
            </div>
            <div class="cn-feed-head-right">
              <a class="cn-feed-date-link" href="/p/abc">02/20/26 09:40:01 AM</a>
            </div>
          </div>
          <div class="cn-comments-block">
            <ul class="cn-comments-list">
              <li class="cn-comment-item">
                <div class="cn-comment-head">
                  <p class="cn-comment-author">Commenter @beta_user</p>
                  <div class="cn-comment-head-right">
                    <p class="cn-comment-date">02/20/26 09:46:30 AM</p>
                  </div>
                </div>
                <p class="cn-comment-text">hello</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    `;

    return /** @type {HTMLElement} */ (global.document.querySelector('.cn-feed-card'));
  }

  test('inserts post and comment block controls before date labels', () => {
    const postCard = buildPostCardFixture();
    const onRequestBlockUser = jest.fn();

    syncPostAndCommentBlockControls({
      postCard,
      postModel: {
        username: 'alpha_user',
        displayName: 'Alpha User',
      },
      filterSettings: {
        blockedUsers: [],
      },
      onRequestBlockUser,
    });

    const postHeaderRight = postCard.querySelector('.cn-feed-head-right');
    const postDate = postHeaderRight.querySelector('.cn-feed-date-link');
    const postButton = postHeaderRight.querySelector('.cdp-inline-block-user-btn');
    expect(postButton).not.toBeNull();
    expect(postButton.textContent).toBe('Block');
    expect(postButton.nextElementSibling).toBe(postDate);

    const commentHeaderRight = postCard.querySelector('.cn-comment-head-right');
    const commentDate = commentHeaderRight.querySelector('.cn-comment-date');
    const commentButton = commentHeaderRight.querySelector('.cdp-inline-block-user-btn');
    expect(commentButton).not.toBeNull();
    expect(commentButton.textContent).toBe('Block');
    expect(commentButton.nextElementSibling).toBe(commentDate);

    commentButton.click();
    expect(onRequestBlockUser).toHaveBeenCalledWith({
      username: 'beta_user',
      displayName: 'Commenter @beta_user',
      sourceKind: 'comment',
    });
  });

  test('keeps controls idempotent and reflects blocked state', () => {
    const postCard = buildPostCardFixture();

    const runStage = () =>
      syncPostAndCommentBlockControls({
        postCard,
        postModel: {
          username: 'alpha_user',
          displayName: 'Alpha User',
        },
        filterSettings: {
          blockedUsers: ['@alpha_user', '@beta_user'],
        },
        onRequestBlockUser: () => {},
      });

    runStage();
    runStage();

    expect(
      postCard.querySelectorAll('.cn-feed-head-right .cdp-inline-block-user-btn')
    ).toHaveLength(1);
    expect(
      postCard.querySelectorAll('.cn-comment-head-right .cdp-inline-block-user-btn')
    ).toHaveLength(1);

    const postButton = postCard.querySelector('.cn-feed-head-right .cdp-inline-block-user-btn');
    expect(postButton.textContent).toBe('Blocked');
    expect(postButton.disabled).toBe(true);
  });

  test('does not render a block control for the current signed-in user', () => {
    const postCard = buildPostCardFixture({ currentUsername: 'alpha_user' });

    syncPostAndCommentBlockControls({
      postCard,
      postModel: {
        username: 'alpha_user',
        displayName: 'Alpha User',
      },
      filterSettings: {
        blockedUsers: [],
      },
      onRequestBlockUser: () => {},
    });

    expect(
      postCard.querySelectorAll('.cn-feed-head-right .cdp-inline-block-user-btn')
    ).toHaveLength(0);
    expect(
      postCard.querySelectorAll('.cn-comment-head-right .cdp-inline-block-user-btn')
    ).toHaveLength(1);
  });
});
