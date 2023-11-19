import {isEscapeKey} from '../utils/util.js';

const DEFAULT_PACK_COMMENTS = 5;

const container = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const buttonShowMore = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentShownNumber = document.querySelector('.social__comment-shown-count');
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

const showComments = () => {
  const counter = Math.min(commentsCounter + DEFAULT_PACK_COMMENTS, comments.length);

  comments.slice(commentsCounter, counter).forEach((element) => commentList.append(generateComment(element)));

  commentsCounter = counter;
  commentShownNumber.textContent = counter;

  if (commentsCounter === comments.length) {
    buttonShowMore.classList.add('hidden');
  }
};

const fillPostData = (data) => {
  commentsCounter = 0;
  commentList.innerHTML = '';

  const picture = container.querySelector('.big-picture__img img');

  picture.src = data.url;
  picture.alt = data.description;
  container.querySelector('.likes-count').textContent = data.likes;
  container.querySelector('.social__comment-total-count').textContent = data.comments.length;
  container.querySelector('.social__caption').textContent = data.description;

  showComments();
  buttonShowMore.addEventListener('click', showComments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePostModal();
  }
};

function closePostModal () {
  container.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonShowMore.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

function openPostModal () {
  container.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', closePostModal);
  document.addEventListener('keydown', onDocumentKeydown);
}

const renderPostModal = (data) => {
  if (!container) {
    return;
  }

  comments = data.comments;
  fillPostData(data);
  openPostModal();
};

export {renderPostModal};
