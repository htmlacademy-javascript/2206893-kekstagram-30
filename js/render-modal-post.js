import {isEscapeKey} from './utils.js';

const container = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentShowMore = document.querySelector('.comments-loader');
const commentShownNumber = document.querySelector('.social__comment-shown-count');
const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');

const generateComment = (element) => {
  const comment = commentTemplate.cloneNode(true);
  const image = comment.querySelector('.social__picture');

  image.src = element.avatar;
  image.alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;

  return comment;
};

const fillComments = (comments) => {
  if (comments.length === 0) {
    commentShownNumber.textContent = 0;
    return;
  }

  if (comments.length <= 5) {
    commentShownNumber.textContent = comments.length;
  } else {
    commentShownNumber.textContent = 5;
  }

  comments.forEach((element) => {
    commentList.append(generateComment(element));
  });
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

  commentCount.classList.remove('hidden');
  commentShowMore.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openPostModal = () => {
  commentList.innerHTML = '';

  container.classList.remove('hidden');

  commentCount.classList.add('hidden');
  commentShowMore.classList.add('hidden');
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
