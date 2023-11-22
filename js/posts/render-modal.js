import {isEscapeKey} from '../utils/util.js';

const DEFAULT_PACK_COMMENTS = 5;

const container = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const showMoreButton = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const shownComments = document.querySelector('.social__comment-shown-count');
const totalComments = document.querySelector('.social__comment-total-count');

let commentsCounter;
let comments = [];

const generateComment = (element) => {
  const comment = commentTemplate.cloneNode(true);
  const image = comment.querySelector('.social__picture');

  image.src = element.avatar;
  image.alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;

  return comment;
};

const updateCommentsCounter = () => {
  shownComments.textContent = commentsCounter;
};

const setShowMoreButtonState = () => {
  showMoreButton.classList.toggle('hidden', commentsCounter === comments.length);
};

const renderComments = () => {
  comments.slice(commentsCounter, commentsCounter + DEFAULT_PACK_COMMENTS).forEach((element) => commentList.append(generateComment(element)));
  commentsCounter = Math.min(commentsCounter + DEFAULT_PACK_COMMENTS, comments.length);

  setShowMoreButtonState();
  updateCommentsCounter();
  shownComments.textContent = commentsCounter;
};

const onShowMoreButtonClick = () => renderComments();

const fillPostData = (data) => {
  const picture = container.querySelector('.big-picture__img img');

  picture.src = data.url;
  picture.alt = data.description;
  container.querySelector('.likes-count').textContent = data.likes;
  container.querySelector('.social__caption').textContent = data.description;

  renderComments();
  showMoreButton.addEventListener('click', onShowMoreButtonClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePostModal();
  }
};

const onCloseButtonClick = () => closePostModal();

function closePostModal () {
  container.classList.add('hidden');
  document.body.classList.remove('modal-open');
  showMoreButton.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

function openPostModal () {
  container.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

const resetPostModal = () => {
  commentsCounter = 0;
  commentList.innerHTML = '';
};

const renderPostModal = (data) => {
  comments = data.comments;
  totalComments.textContent = comments.length;
  resetPostModal();
  fillPostData(data);
  openPostModal();
};

export {renderPostModal};
