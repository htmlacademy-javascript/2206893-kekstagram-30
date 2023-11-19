import {isEscapeKey} from './utils.js';

const container = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const buttonShowMore = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentShownNumber = document.querySelector('.social__comment-shown-count');
let commentShownList = [];
let commentsCounter;

const generateComment = (element) => {
  const comment = commentTemplate.cloneNode(true);
  const image = comment.querySelector('.social__picture');

  image.src = element.avatar;
  image.alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;

  return comment;
};

const onbuttonShowMoreClick = (comments) => {
  buttonShowMore.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (commentsCounter + 5 >= comments.length) {
      comments.slice(commentsCounter, comments.length).forEach((element) => {
        commentList.append(generateComment(element));
      });
      commentsCounter = comments.length;
      buttonShowMore.classList.add('hidden');
    } else {
      commentsCounter += 5;
      buttonShowMore.classList.remove('hidden');
      comments.slice(commentsCounter - 5, commentsCounter).forEach((element) => {
        commentList.append(generateComment(element));
      });
    }
    commentShownNumber.textContent = commentsCounter;
  });
};

const fillComments = (comments) => {
  commentsCounter = 0;

  if (comments.length === 0) {
    buttonShowMore.classList.add('hidden');
    commentShownNumber.textContent = commentsCounter;
    return;
  }
  if (comments.length <= 5) {
    commentsCounter = comments.length;
    buttonShowMore.classList.add('hidden');
  } else {
    commentsCounter = 5;
    buttonShowMore.classList.remove('hidden');
  }

  commentShownNumber.textContent = commentsCounter;
  commentShownList = comments.slice(0, commentsCounter);
  commentShownList.forEach((element) => {
    commentList.append(generateComment(element));
  });

  onbuttonShowMoreClick(comments);
};

const fillPostData = (data) => {
  const picture = container.querySelector('.big-picture__img img');

  picture.src = data.url;
  picture.alt = data.description;
  container.querySelector('.likes-count').textContent = data.likes;
  container.querySelector('.social__comment-total-count').textContent = data.comments.length;
  container.querySelector('.social__caption').textContent = data.description;
  fillComments(data.comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    container.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const closePostModal = () => {
  container.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openPostModal = () => {
  commentList.innerHTML = '';

  container.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  closeButton.addEventListener('click', () => {
    closePostModal();
  });
};

const renderPostModal = (data) => {
  if (!container) {
    return;
  }

  openPostModal();
  fillPostData(data);
};

export {renderPostModal};
