const { extractCommentModel } = require('../src/dom/comment-extractor');

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
 * Verifies comment extraction fallbacks for no-link comment variants.
 */
describe('comment-extractor', () => {
  test('extracts username from react props when comment has no profile link', () => {
    document.body.innerHTML = `
      <li class="cn-comment-item">
        <div class="cn-comment-head">
          <div class="cn-comment-author-wrap">
            <img alt="Robert Travesty avatar" class="cn-avatar" />
            <p class="cn-comment-author"><span>Robert Travesty</span></p>
          </div>
        </div>
        <p class="cn-comment-text">Test comment</p>
      </li>
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

    const commentModel = extractCommentModel(commentItem);
    expect(commentModel.username).toBe('poeticboredom');
    expect(commentModel.displayName).toBe('Robert Travesty');
  });

  test('prefers react username matching visible display name', () => {
    document.body.innerHTML = `
      <li class="cn-comment-item">
        <div class="cn-comment-author">Robert Travesty</div>
        <p class="cn-comment-text">Another comment</p>
      </li>
    `;

    const commentItem = document.querySelector('.cn-comment-item');
    attachReactProps(commentItem, {
      children: [
        {
          props: {
            user: {
              username: 'someoneelse',
              displayName: 'Someone Else',
            },
          },
        },
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

    const commentModel = extractCommentModel(commentItem);
    expect(commentModel.username).toBe('poeticboredom');
  });
});
