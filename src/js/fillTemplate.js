/* eslint-disable max-len */
import constants from './constants';
import ExpansibleTextBox from './ExpansibleTextBox';
const maxCharacters = 142;
const CSS_PREFIX = 'Post';
/**
 * @method fillTemplate
 * @param  {Object} review
 * @return {HTMLElement}
 */
export default function fillTemplate(review, modulePrefix) {
  const reviewUserName = review.reviewer.name;
  const reviewUserUrl = `https://www.facebook.com/${review.reviewer.id}`;
  const reviewUserPic = review.reviewer.picture;
  const reviewText = review.review_text;
  const reviewStars = review.rating;
  const reviewDate = review.created_time;
  const slvUrl = 'https://www.facebook.com/slvglobal';
  const slvReviewsUrl = `${slvUrl}/reviews`;

  const cssPrefix = `${modulePrefix}_${CSS_PREFIX}`;
  const postStr = `
  <div class="${cssPrefix}-post">
    <div class="${cssPrefix}-header">
      <img class="${cssPrefix}-header-image"src="${reviewUserPic}" alt="">
      <div class="${cssPrefix}-header-text">
        <span class="${cssPrefix}-header-text-top">
          <a class="${cssPrefix}-header-text-top-name" href=${reviewUserUrl}>
            ${reviewUserName}
          </a>
          reviewed
          <a class="${cssPrefix}-header-text-top-actionTarget" href="${slvUrl}">
            SLV
          </a>
            –
          <a class="${cssPrefix}-header-text-stars" href="${slvReviewsUrl}">
            ${reviewStars}
          </a>
        </span>
        <span class="${cssPrefix}-header-text-bottom">
          ${constants.monthNames[new Date(reviewDate).getMonth()]}
          ${new Date(reviewDate).getDate()}
          <span class="${cssPrefix}-header-text-globe">${constants.globeIcon}</span>
        </span>
      </div>
      <span class="${cssPrefix}-header-arrowDown">${constants.arrowDownIcon}</span>
    </div>
  </div>`;

  const post = compile(postStr);
  const reviewTextBox = new ExpansibleTextBox(reviewText, maxCharacters, cssPrefix);
  post.appendChild(reviewTextBox.getBox());
  return post;
}

function compile(str) {
  const container = document.createElement('div');
  container.innerHTML = str;
  return container.children[0];
}
